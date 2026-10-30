/* The Book of Elon — one continuous 3D world.
   Loaded as a module from index.html (the root page, where modules execute).
   Every transform is a pure function of t: renderAt(t) fully determines the frame. */
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const W = 1920, H = 1080, DUR = 60;
const FG = 0xf2f4f8, DIM = 0x79839b, FLAME = 0xff3b1f;

/* ---------- deterministic helpers ---------- */
let _s = 20260324;
const rnd = () => { _s = (_s * 1103515245 + 12345) % 2147483648; return _s / 2147483648; };
const rr = (a, b) => a + (b - a) * rnd();
const cl = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const eInOut = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const eOut = (x) => 1 - Math.pow(1 - x, 3);
const eOut5 = (x) => 1 - Math.pow(1 - x, 5);
const eIn = (x) => x * x * x;
/* piecewise keyframe track — pts = [[t,v],…] */
function pw(t, pts, e = eInOut) {
  if (t <= pts[0][0]) return pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, v0] = pts[i], [t1, v1] = pts[i + 1];
    if (t <= t1) return v0 + (v1 - v0) * e(cl((t - t0) / (t1 - t0)));
  }
  return pts[pts.length - 1][1];
}
/* single ramp between two times */
const rmp = (t, t0, t1, a, b, e = eOut) => a + (b - a) * e(cl((t - t0) / (t1 - t0)));

/* ---------- renderer ---------- */
const canvas = document.getElementById("world");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(W, H, false);
renderer.setPixelRatio(1);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.82;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07080b);
scene.fog = new THREE.FogExp2(0x07080b, 0.0125);

const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 900);

const composer = new EffectComposer(renderer);
composer.setSize(W, H);
composer.addPass(new RenderPass(scene, camera));
/* high threshold: only genuinely emissive surfaces bloom, not every lit face */
const bloom = new UnrealBloomPass(new THREE.Vector2(W, H), 0.38, 0.55, 0.88);
composer.addPass(bloom);
composer.addPass(new OutputPass());

/* ---------- environment ----------
   MeshStandardMaterial with metalness and NO envMap renders BLACK: a metal with
   nothing to reflect reflects nothing. A PMREM-prefiltered room gives every metal
   surface something real to pick up, which is what makes the steel read as steel. */
{
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.30;
  pmrem.dispose();
}

/* ---------- lighting ---------- */
scene.add(new THREE.HemisphereLight(0xbfd2ff, 0x0a0a10, 0.35));
const key = new THREE.DirectionalLight(0xffffff, 1.65); key.position.set(8, 12, 10); scene.add(key);
const rim = new THREE.DirectionalLight(0x9fb6ff, 0.95); rim.position.set(-10, 4, -6); scene.add(rim);
const flameLight = new THREE.PointLight(FLAME, 0, 60, 2); scene.add(flameLight);

/* ---------- materials ---------- */
const mSteel = new THREE.MeshStandardMaterial({ color: FG, roughness: 0.34, metalness: 0.62 });
const mDim   = new THREE.MeshStandardMaterial({ color: DIM, roughness: 0.62, metalness: 0.34 });
const mFlame = new THREE.MeshStandardMaterial({ color: FLAME, emissive: FLAME, emissiveIntensity: 1.5, roughness: 0.4 });
const mGlowW = new THREE.MeshBasicMaterial({ color: FG });
const lDim   = new THREE.LineBasicMaterial({ color: DIM, transparent: true, opacity: 0.6 });
const lFlame = new THREE.LineBasicMaterial({ color: FLAME, transparent: true, opacity: 0.9 });

/* NEVER scale a mesh to exactly 0. A degenerate matrix produces NaN normals, and the
   bloom blur smears that NaN across the entire frame (the whole thing renders black).
   Hide it instead, and keep the scale at a harmless epsilon. */
const EPS = 1e-3;
function sc(o, v) { const on = v > EPS; o.visible = on; o.scale.setScalar(on ? v : EPS); }
function scv(o, v, vis) { const on = vis && v > EPS; o.visible = on; o.scale.setScalar(on ? v : EPS); }

const grp = (x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); scene.add(g); return g; };
const RX = 6.8;   /* stations 1-6 frame right of centre; type owns the left */

/* ================= STATION 1 — launchpad + vehicle ================= */
const S1 = grp(RX, -1.2, 0);
const ship = new THREE.Group(); S1.add(ship);
ship.add(new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 7.2, 48, 1, true), mSteel));
const nose = new THREE.Mesh(new THREE.ConeGeometry(0.85, 2.6, 48), mSteel);
nose.position.y = 4.9; ship.add(nose);
for (let i = 0; i < 3; i++) {
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.16, 2.1, 1.5), mSteel);
  const a = (i / 3) * Math.PI * 2;
  fin.position.set(Math.cos(a) * 0.85, -3.2, Math.sin(a) * 0.85);
  fin.rotation.y = -a; ship.add(fin);
}
for (const y of [1.4, -0.6]) {
  const b = new THREE.Mesh(new THREE.TorusGeometry(0.87, 0.035, 8, 48), mDim);
  b.rotation.x = Math.PI / 2; b.position.y = y; ship.add(b);
}
const plume = new THREE.Mesh(new THREE.ConeGeometry(0.72, 4.4, 32, 1, true),
  new THREE.MeshBasicMaterial({ color: FLAME, transparent: true, opacity: 0.92, side: THREE.DoubleSide }));
plume.rotation.x = Math.PI; plume.position.y = -5.8; ship.add(plume);
const plumeCore = new THREE.Mesh(new THREE.ConeGeometry(0.34, 2.7, 24, 1, true),
  new THREE.MeshBasicMaterial({ color: 0xffd9c8, transparent: true, opacity: 0.95, side: THREE.DoubleSide }));
plumeCore.rotation.x = Math.PI; plumeCore.position.y = -4.9; ship.add(plumeCore);
const tower = new THREE.Group(); tower.position.set(-2.6, -1.6, 0); S1.add(tower);
tower.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 8, 0.2), mDim));
for (let i = 0; i < 5; i++) {
  const r = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.09, 0.09), mDim);
  r.position.set(0.75, -3.4 + i * 1.7, 0); tower.add(r);
}
const padRing = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.05, 8, 64), mDim);
padRing.rotation.x = Math.PI / 2; padRing.position.y = -5.6; S1.add(padRing);

/* ================= STATION 2 — biographies → blueprint ================= */
const S2 = grp(RX, 0, -55);
const books = new THREE.Group(); S2.add(books);
for (let i = 0; i < 4; i++) {
  const b = new THREE.Mesh(new THREE.BoxGeometry(5.4 - i * 0.25, 0.72, 3.4), mDim);
  b.position.set(rr(-0.2, 0.2), 2.4 - i * 0.95, rr(-0.15, 0.15));
  b.rotation.y = rr(-0.06, 0.06); books.add(b);
}
const slab = new THREE.Group(); S2.add(slab);
const slabMat = new THREE.MeshStandardMaterial({ color: 0x0d1118, roughness: 0.5, metalness: 0.3,
  transparent: true, opacity: 0.96, side: THREE.DoubleSide });
slab.add(new THREE.Mesh(new THREE.BoxGeometry(7.4, 5.2, 0.12), slabMat));
const gridPts = [];
for (let i = -3; i <= 3; i++) { gridPts.push(-3.4, i * 0.74, 0.08, 3.4, i * 0.74, 0.08); }
for (let i = -4; i <= 4; i++) { gridPts.push(i * 0.82, -2.4, 0.08, i * 0.82, 2.4, 0.08); }
const gg = new THREE.BufferGeometry();
gg.setAttribute("position", new THREE.Float32BufferAttribute(gridPts, 3));
slab.add(new THREE.LineSegments(gg, new THREE.LineBasicMaterial({ color: DIM, transparent: true, opacity: 0.3 })));
const schemPts = [-2.4,-1.6,0.12, -2.4,0.4,0.12, -0.4,0.4,0.12, -0.4,1.6,0.12, 1.9,1.6,0.12,
                  -0.4,0.4,0.12, 1.9,0.4,0.12, 1.9,-1.2,0.12];
const sg = new THREE.BufferGeometry();
sg.setAttribute("position", new THREE.Float32BufferAttribute(schemPts, 3));
const schem = new THREE.Line(sg, lFlame); slab.add(schem);
for (const p of [[-2.4,-1.6],[1.9,1.6],[1.9,-1.2]]) {
  const n = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 16), mFlame);
  n.position.set(p[0], p[1], 0.14); slab.add(n);
}

/* ================= STATION 3 — utility network ================= */
const S3 = grp(RX, 0, -112);
const hub = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 2), mFlame); S3.add(hub);
const ring1 = [], ring2 = [], linePts1 = [], linePts2 = [];
for (let i = 0; i < 8; i++) {
  const a = (i / 8) * Math.PI * 2, R = 3.5;
  const p = new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * R, Math.sin(a * 2) * 1.1);
  const n = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 18), mSteel);
  n.position.copy(p); S3.add(n); ring1.push(n);
  linePts1.push(0, 0, 0, p.x, p.y, p.z);
  for (let j = 0; j < 2; j++) {
    const a2 = a + (j ? 0.34 : -0.34), R2 = 6.6;
    const q = new THREE.Vector3(Math.cos(a2) * R2, Math.sin(a2) * R2, Math.sin(a2 * 2) * 2.1);
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 12), mDim);
    m.position.copy(q); S3.add(m); ring2.push(m);
    linePts2.push(p.x, p.y, p.z, q.x, q.y, q.z);
  }
}
const g1 = new THREE.BufferGeometry(); g1.setAttribute("position", new THREE.Float32BufferAttribute(linePts1, 3));
const net1 = new THREE.LineSegments(g1, new THREE.LineBasicMaterial({ color: FG, transparent: true, opacity: 0.8 })); S3.add(net1);
const g2 = new THREE.BufferGeometry(); g2.setAttribute("position", new THREE.Float32BufferAttribute(linePts2, 3));
const net2 = new THREE.LineSegments(g2, lDim); S3.add(net2);

/* ================= STATION 4 — first principles: shatter & rebuild ================= */
const S4 = grp(RX, 0, -170);
const shards = [];
{
  const src = new THREE.IcosahedronGeometry(2.4, 1);
  const pos = src.getAttribute("position");
  for (let f = 0; f < pos.count; f += 3) {
    const a = new THREE.Vector3().fromBufferAttribute(pos, f);
    const b = new THREE.Vector3().fromBufferAttribute(pos, f + 1);
    const c = new THREE.Vector3().fromBufferAttribute(pos, f + 2);
    const mid = new THREE.Vector3().add(a).add(b).add(c).multiplyScalar(1 / 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([
      a.x - mid.x, a.y - mid.y, a.z - mid.z,
      b.x - mid.x, b.y - mid.y, b.z - mid.z,
      c.x - mid.x, c.y - mid.y, c.z - mid.z], 3));
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
      color: FG, roughness: 0.42, metalness: 0.5, side: THREE.DoubleSide }));
    m.position.copy(mid);
    m.userData = { home: mid.clone(), dir: mid.clone().normalize(),
                   spin: new THREE.Vector3(rr(-1, 1), rr(-1, 1), rr(-1, 1)) };
    S4.add(m); shards.push(m);
  }
}
const rebuilt = new THREE.Mesh(new THREE.IcosahedronGeometry(1.85, 0),
  new THREE.MeshStandardMaterial({ color: FLAME, emissive: FLAME, emissiveIntensity: 0.85,
    roughness: 0.3, metalness: 0.4, transparent: true, opacity: 1 }));
S4.add(rebuilt);
const rebuiltWire = new THREE.LineSegments(
  new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.86, 0)),
  new THREE.LineBasicMaterial({ color: 0xffd9c8, transparent: true, opacity: 0.9 }));
S4.add(rebuiltWire);

/* ================= STATION 5 — the assembly ================= */
const S5 = grp(RX, 0, -232);
const plates = [];
const PLATE_Y = [3.3, 1.65, 0, -1.65, -3.3];
for (let i = 0; i < 5; i++) {
  const doomed = i === 2;
  const m = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.15, 3.4),
    doomed ? new THREE.MeshStandardMaterial({ color: FLAME, emissive: FLAME,
              emissiveIntensity: 0.55, roughness: 0.42, metalness: 0.35, transparent: true, opacity: 1 })
           : new THREE.MeshStandardMaterial({ color: FG, roughness: 0.38, metalness: 0.55,
              transparent: true, opacity: 1 }));
  m.position.set(0, PLATE_Y[i], 0);
  m.userData = { home: PLATE_Y[i] };
  S5.add(m); plates.push(m);
  const e = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(6.62, 1.17, 3.42)),
    new THREE.LineBasicMaterial({ color: doomed ? 0xffd9c8 : DIM, transparent: true, opacity: 0.5 }));
  e.position.copy(m.position); m.userData.edge = e; S5.add(e);
}
const gear = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.2, 12, 8), mFlame);
gear.position.set(-5.3, 0, 0); S5.add(gear);
const gearHub = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.4, 20), mFlame);
gearHub.rotation.x = Math.PI / 2; gearHub.position.copy(gear.position); S5.add(gearHub);

/* ================= STATION 6 — the glass ridge ================= */
const S6 = grp(RX, -1.2, -300);
const ridges = [];
for (let i = 0; i < 14; i++) {
  const h = 1.4 + Math.abs(Math.sin(i * 2.3)) * 5.4;
  const m = new THREE.Mesh(new THREE.ConeGeometry(0.44, h, 4),
    new THREE.MeshStandardMaterial({ color: 0xdfe6f2, roughness: 0.24, metalness: 0.14,
      transparent: true, opacity: 0.68 }));
  m.position.set(-5.2 + i * 0.8, h / 2 - 2.2, rr(-0.5, 0.5));
  m.rotation.y = rr(0, 1.2);
  m.userData = { h, i }; S6.add(m); ridges.push(m);
}
const bar = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.36, 0.36), mFlame);
bar.position.set(0, -2.9, 0); S6.add(bar);

/* ================= STATION 7 — Earth · trajectory · Mars ================= */
const S7 = grp(0, 0, -372);
const earth = new THREE.Mesh(new THREE.SphereGeometry(4.4, 64, 48),
  new THREE.MeshStandardMaterial({ color: 0x1b3a63, roughness: 0.85, metalness: 0.1 }));
earth.position.set(-9.5, -5.2, 0); S7.add(earth);
const earthWire = new THREE.LineSegments(
  new THREE.WireframeGeometry(new THREE.SphereGeometry(4.44, 24, 16)),
  new THREE.LineBasicMaterial({ color: FG, transparent: true, opacity: 0.3 }));
earthWire.position.copy(earth.position); S7.add(earthWire);
const earthRim = new THREE.Mesh(new THREE.SphereGeometry(4.62, 48, 32),
  new THREE.MeshBasicMaterial({ color: 0x5fa8ff, transparent: true, opacity: 0.11, side: THREE.BackSide }));
earthRim.position.copy(earth.position); S7.add(earthRim);
const mars = new THREE.Mesh(new THREE.SphereGeometry(2.2, 26, 18),
  new THREE.MeshStandardMaterial({ color: 0xa8391a, emissive: 0x5e1a08, emissiveIntensity: 0.55, roughness: 0.82, metalness: 0.08, flatShading: true }));
mars.position.set(9.6, 4.6, -2); S7.add(mars);
const marsRim = new THREE.Mesh(new THREE.SphereGeometry(2.34, 40, 28),
  new THREE.MeshBasicMaterial({ color: FLAME, transparent: true, opacity: 0.16, side: THREE.BackSide }));
marsRim.position.copy(mars.position); S7.add(marsRim);
const traj = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(-6.4, -2.2, 1.6), new THREE.Vector3(0.5, 8.6, 0), new THREE.Vector3(8.0, 5.4, -1.2));
const trajMesh = new THREE.Mesh(new THREE.TubeGeometry(traj, 120, 0.055, 8, false),
  new THREE.MeshBasicMaterial({ color: DIM, transparent: true, opacity: 0.9 }));
S7.add(trajMesh);
const spark = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 16), mGlowW); S7.add(spark);
const sparkHalo = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 16),
  new THREE.MeshBasicMaterial({ color: FG, transparent: true, opacity: 0.2 })); S7.add(sparkHalo);

/* ================= STATION 8 — title space ================= */
const S8 = grp(0, 0, -440);
const halo = new THREE.Mesh(new THREE.TorusGeometry(11, 0.03, 8, 128),
  new THREE.MeshBasicMaterial({ color: FLAME, transparent: true, opacity: 0.5 }));
halo.rotation.x = 1.15; S8.add(halo);
const halo2 = new THREE.Mesh(new THREE.TorusGeometry(15.5, 0.02, 8, 128),
  new THREE.MeshBasicMaterial({ color: DIM, transparent: true, opacity: 0.35 }));
halo2.rotation.x = 1.02; halo2.rotation.z = 0.4; S8.add(halo2);

/* ================= starfield along the whole path ================= */
{
  const N = 4000, p = new Float32Array(N * 3), sz = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    p[i * 3] = rr(-130, 130); p[i * 3 + 1] = rr(-90, 90); p[i * 3 + 2] = rr(-560, 40);
    sz[i] = rr(0.05, 0.26);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute("size", new THREE.Float32BufferAttribute(sz, 1));
  const stars = new THREE.Points(g, new THREE.PointsMaterial({
    color: FG, size: 0.2, sizeAttenuation: true, transparent: true, opacity: 0.9, fog: false }));
  scene.add(stars);
}

/* ================= the flight ================= */
/* Arrive → dwell (slow push) → whip. Each transit straddles the type cut, so the
   camera move IS the transition. Station z: 0, -55, -112, -170, -232, -300, -372, -440. */
const CAM_Z = [
  [0.0, 27], [1.2, 20],            /* S1  launchpad   z=0    */
  [6.1, 17], [7.5, -34],           /* whip to S2      z=-55  */
  [12.1, -38], [13.5, -91],        /* whip to S3      z=-112 */
  [19.1, -95], [20.5, -149],       /* whip to S4      z=-170 */
  [26.6, -153], [28.0, -208],      /* whip to S5      z=-232 */
  [38.1, -214], [39.5, -279],      /* whip to S6      z=-300 */
  [45.6, -283], [47.0, -350],      /* whip to S7      z=-372 */
  [52.1, -354], [53.5, -419],      /* whip to S8      z=-440 */
  [60.0, -425],
];
const CAM_Y = [[0,-1.2],[3,0.2],[7,2.2],[13,0.4],[20,0.1],[27.5,0.3],[39,-0.5],[46.5,1.2],[53,0.4],[60,0.1]];
const CAM_X = [[0,-0.8],[7,0.3],[20,0.5],[39,-0.3],[46.5,0],[60,0]];
const FOG_C = [[0,0x07080b],[16,0x080d16],[30,0x04050a],[50,0x160b07],[60,0x160b07]];
const fogCol = new THREE.Color(), tmpA = new THREE.Color(), tmpB = new THREE.Color();

function fogAt(t) {
  for (let i = 0; i < FOG_C.length - 1; i++) {
    const [t0, c0] = FOG_C[i], [t1, c1] = FOG_C[i + 1];
    if (t <= t1) { tmpA.setHex(c0); tmpB.setHex(c1);
      return fogCol.copy(tmpA).lerp(tmpB, eInOut(cl((t - t0) / (t1 - t0)))); }
  }
  return fogCol.setHex(FOG_C[FOG_C.length - 1][1]);
}

export function renderAt(t) {
  /* camera: one unbroken flight, decelerating into each station */
  camera.position.set(pw(t, CAM_X), pw(t, CAM_Y), pw(t, CAM_Z));
  camera.rotation.z = Math.sin(t * 0.21) * 0.012;
  camera.lookAt(pw(t, CAM_X) * 0.6 + (t > 46 ? 0 : RX * 0.22), pw(t, CAM_Y) * 0.5, camera.position.z - 18);

  const f = fogAt(t);
  scene.fog.color.copy(f); scene.background.copy(f);
  scene.fog.density = pw(t, [[0,0.0165],[14,0.011],[30,0.0082],[46,0.0093],[60,0.0105]]);

  /* --- S1 ignition --- */
  const IGN = 4.15;
  const lift = t < IGN ? 0 : Math.pow(cl((t - IGN) / 2.85), 2.6) * 66;
  ship.position.y = lift;
  ship.rotation.y = t * 0.16;
  const burn = t < IGN ? 0 : cl((t - IGN) / 0.3);
  const flick = 0.86 + 0.28 * ((Math.sin(t * 61.3) * 43758.5453) % 1);
  plume.scale.set(burn * (0.92 + flick * 0.12), burn * flick * 1.25, burn * (0.92 + flick * 0.12));
  plumeCore.scale.set(burn, burn * flick, burn);
  plume.visible = plumeCore.visible = burn > EPS;
  if (burn <= EPS) { plume.scale.setScalar(EPS); plumeCore.scale.setScalar(EPS); }
  flameLight.position.set(RX, -1.2 + lift - 6, 0);
  flameLight.intensity = burn * 22 * flick;
  tower.position.y = -1.6;
  padRing.rotation.z = t * 0.1;
  S1.visible = t < 8.2;

  /* --- S2 books shoved out by the blueprint --- */
  const P2 = 9.05;
  books.position.x = rmp(t, P2, P2 + 0.5, 0, -26, eIn);
  books.rotation.z = rmp(t, P2, P2 + 0.5, 0, -0.5, eIn);
  books.rotation.y = Math.sin(t * 0.4) * 0.06;
  slab.position.x = rmp(t, P2 - 0.1, P2 + 0.6, 30, 0, eOut5);
  slab.rotation.y = rmp(t, P2 - 0.1, P2 + 0.6, 0.7, -0.16, eOut5) + Math.sin(t * 0.5) * 0.05;
  slab.rotation.x = Math.sin(t * 0.37) * 0.04;
  const drawn = cl((t - (P2 + 0.35)) / 1.1);
  schem.geometry.setDrawRange(0, Math.max(2, Math.round(drawn * (schemPts.length / 3))));

  /* --- S3 the network compounds --- */
  S3.rotation.y = Math.sin(t * 0.24) * 0.34 + 0.2;
  S3.rotation.x = Math.sin(t * 0.19) * 0.16;
  const gen1 = cl((t - 14.1) / 1.0), gen2 = cl((t - 15.6) / 1.2);
  ring1.forEach((n, i) => sc(n, eOut(cl(gen1 * 1.5 - i * 0.05))));
  ring2.forEach((n, i) => sc(n, eOut(cl(gen2 * 1.6 - i * 0.035))));
  net1.material.opacity = 0.8 * eOut(gen1); net2.material.opacity = 0.55 * eOut(gen2);
  sc(hub, eOut(cl((t - 13.4) / 0.6)) * (1 + Math.sin(t * 2.2) * 0.06));
  hub.rotation.y = t * 0.5;

  /* --- S4 shatter to primitives, rebuild simpler --- */
  const BRK = 22.6, REB = 24.4;
  const spread = cl((t - BRK) / 1.0), pull = cl((t - REB) / 0.9);
  shards.forEach((m, i) => {
    const d = (1.4 + (i % 5) * 0.42) * spread * (1 - pull);
    m.position.copy(m.userData.home).addScaledVector(m.userData.dir, d);
    const sp = spread * (1 - pull * 0.4);
    m.rotation.set(m.userData.spin.x * sp * 2.4, m.userData.spin.y * sp * 2.4, m.userData.spin.z * sp * 2.4);
    m.material.opacity = 1 - pull; m.material.transparent = true;
    const born = eOut(cl((t - 20.4 - i * 0.012) / 0.4));
    scv(m, born, t > 20.3 && pull < 0.99);
  });
  S4.rotation.y = 0.35 + (t - 20) * 0.075;
  S4.rotation.x = Math.sin(t * 0.3) * 0.12;
  const rb = eOut(cl((t - (REB + 0.35)) / 0.7));
  sc(rebuilt, rb * (1 + Math.sin(t * 1.7) * 0.035));
  scv(rebuiltWire, rb * (1 + Math.sin(t * 1.7) * 0.035), true);
  rebuilt.rotation.y = rebuiltWire.rotation.y = t * 0.34;
  rebuilt.rotation.x = rebuiltWire.rotation.x = t * 0.19;

  /* --- S5 the algorithm: the part is really deleted --- */
  const DEL = 30.7;
  const kill = cl((t - DEL) / 0.42), close = eInOut(cl((t - DEL - 0.14) / 0.62));
  plates.forEach((m, i) => {
    const born = eOut(cl((t - 27.95 - i * 0.1) / 0.5));
    let y = m.userData.home;
    if (i > 2) y = m.userData.home + close * 1.65;
    m.position.set(rmp(t, 27.95 + i * 0.1, 28.6 + i * 0.1, 9, 0, eOut5), y, 0);
    if (i === 2) {
      const pre = 1 + 0.1 * cl((t - (DEL - 0.22)) / 0.22);
      m.material.opacity = 1 - kill;
      scv(m, born * pre * (1 - kill), kill < 0.99);
    } else {
      sc(m, born);
    }
    m.userData.edge.position.copy(m.position);
    scv(m.userData.edge, m.scale.x, m.visible);
  });
  S5.rotation.y = -0.32 + Math.sin(t * 0.2) * 0.08;
  S5.rotation.x = Math.sin(t * 0.16) * 0.07;
  const gearOn = eOut(cl((t - 34.85) / 0.5));
  sc(gear, gearOn); sc(gearHub, gearOn);
  gear.rotation.z = -(t - 34.85) * 2.1; gearHub.rotation.z = gear.rotation.z;

  /* --- S6 the grind --- */
  ridges.forEach((m, i) => {
    sc(m, eOut(cl((t - 39.4 - i * 0.045) / 0.5)));
    m.rotation.y = i * 0.4 + t * 0.18;
    m.position.y = m.userData.h / 2 - 2.2 + Math.sin(t * 2.1 + i) * 0.09;
  });
  const barF = eInOut(cl((t - 41.5) / 2.2));
  bar.visible = barF > EPS;
  bar.scale.x = Math.max(barF, EPS);
  bar.position.x = -5.6 + bar.scale.x * 5.6;
  S6.rotation.y = -0.3 + Math.sin(t * 0.22) * 0.12;

  /* --- S7 the transfer --- */
  earth.rotation.y = t * 0.055; earthWire.rotation.y = t * 0.055;
  mars.rotation.y = -t * 0.08;
  const marsPop = 1 + 0.16 * eOut(cl((t - 51.0) / 0.5)) * (1 - cl((t - 51.6) / 1.2));
  mars.scale.setScalar(marsPop); marsRim.scale.setScalar(marsPop);
  const tp = eInOut(cl((t - 48.05) / 3.1));
  const P = traj.getPoint(cl(tp));
  spark.position.copy(P); sparkHalo.position.copy(P);
  const sparkOn = cl((t - 48.0) / 0.3) * (1 - cl((t - 51.05) / 0.4));
  sc(spark, sparkOn); sc(sparkHalo, sparkOn * (1 + Math.sin(t * 6) * 0.12));
  trajMesh.material.opacity = 0.9 * cl((t - 47.05) / 1.0);
  S7.rotation.y = Math.sin(t * 0.14) * 0.06;

  /* --- S8 the halo --- */
  halo.rotation.z = t * 0.09; halo2.rotation.z = -t * 0.06;
  const h8 = cl((t - 53.2) / 1.4);
  halo.scale.setScalar(0.85 + 0.15 * eOut(h8)); halo2.scale.setScalar(0.9 + 0.1 * eOut(h8));

  /* bloom eases up as the film leaves the atmosphere, and blooms out at the end */
  bloom.strength = pw(t, [[0,0.30],[7,0.42],[27,0.34],[46,0.48],[56,0.58],[60,0.58]]);

  composer.render();
}

/* Register the timeline HERE, at the end of the module — not in a classic script.
   The runtime waits for window.__timelines before capturing, so registering only
   once the whole scene exists makes the module load a barrier instead of a race.
   The canvas repaints from a property SETTER because gsap's seek() suppresses
   onUpdate callbacks, which would silently freeze the canvas on frame 0. */
window.__worldRenderAt = renderAt;
renderAt(0);

window.__worldReady = true;
/* If the host driver already advanced before this module finished, catch up now. */
if (typeof window.__worldPendingT === "number") renderAt(window.__worldPendingT);
