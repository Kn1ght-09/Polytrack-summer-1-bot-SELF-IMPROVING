
import { PolyMod, MixinType } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

// "drive" = the bot drives the recorded lap.
// "record" = you drive manually and the mod records the lap.
const MODE = "drive";

// Where the driving line comes from:
//   "auto"      = generate from this track (never guess a match from start position alone)
//   "recorded"  = always use the embedded recorded lap; only choose this for its exact track
//   "generated" = always build a line from this track's geometry
const ROUTE_SOURCE = "generated";

// ---- SELF-LEARNING ----
const LEARN = true;

// ---- RECON ----
const RECON = true;

// ---- AIRBRAKE ----
const AIRBRAKE = true;
const AIR_DELAY = 120;
const AIR_MATCH_SLOPE = false;
const AIR_BIAS = 0;
const AIR_DOWN_IS_NOSE_UP = true;
const AIR_LEAD = 40;
const AIR_DEADBAND = 0.08;
const AIR_LOOK_SEC = 0.36;

const SPEED_VALUE = 0.8;
const MAX_LINE_SHIFT = 6;
const MAX_SPEED_SHIFT = 0.2;
const EXPLORE_RUNS = 60;
const USE_3D = true; // build lines on the road surface itself (ramps, banks, walls, loops); false = old flat-road builder
const REC_KEY = "o"; // press once to start recording YOUR driving (bot steps aside), press again to stop and save
const AUTO_RESTART = true;
const AUTO_START = true;
const AUTO_START_MS = 100;
const AUTO_START_DELAY = 700;
const RESTART_KEY = { key: "t", code: "KeyT", keyCode: 84 };

// ---- DRIVING SETTINGS ----
const SPEED_FACTOR = 1.0;
const STEER_GAIN = 2.6; // lower steering duty to reduce sudden over-corrections
const LAT_ACCEL = 18; // conservative cornering limit: brake for bends sooner
const SLOW_ZONES = [[5, 17, 95]];
const LOW_SPEED_BOOST = 0.8; // avoid excessive steering amplification at low speed
const LINE_PULL = 0.045; // stronger surface-relative correction to hold the route on loops/walls
const LOOK_BASE = 9; // look farther ahead before reacting to bends
const LOOK_SPEED = 0.12;
const LOOK_MAX = 42;
const DECODE_OFFSET = 4;
const STEER_SIGN = -1;
const FORWARD_SIGN = 1;

// Your recorded lap: [x, height, z, speed in km/h]
const ROUTE = [
  [319.0,55.3,20.0,5],[318.6,55.3,20,7],[318.3,55.3,20,14],
  [317.8,55.3,20,21],[317.1,55.3,20,28],[316.2,55.3,20,35],
  [315.2,55.3,19.8,41],[313.9,55.3,19.7,48],[312.5,55.3,19.6,55],
  [310.9,55.3,19.4,61],[309.1,55.3,19.3,68],[307.2,55.3,18.9,74],
  [305.1,55.3,18.4,80],[302.9,55.3,17.8,87],[300.4,55.3,17.2,93],
  [297.9,55.3,16.5,99],[295.2,55.3,15.6,105],[292.3,55.3,14.7,111],
  [289.3,55.3,13.7,117],[286.1,55.3,12.7,123],[282.8,55.3,11.7,129],
  [279.3,55.3,10.6,135],[275.7,55.3,9.4,140],[271.9,55.3,8.2,146],
  [267.9,55.3,7.2,152],[263.7,55.3,6.4,157],[259.3,55.3,5.5,163],
  [254.8,55.3,4.7,168],[250.1,55.3,3.9,173],[245.2,55.3,3.4,178],
  [240.2,55.3,3,184],[235.1,55.3,2.6,189],[229.8,55.3,2.2,194],
  [224.3,55.3,1.7,199],[218.7,55.3,1.3,204],[213,55.3,0.8,209],
  [207.1,55.3,0.4,214],[201.1,55.3,-0.1,219],[195,55.3,-0.6,224],
  [188.7,55.3,-1.1,229],[182.3,55.3,-1.6,234],[175.8,55.3,-2.1,238],
  [169.1,55.3,-2.6,243],[162.3,55.2,-3.2,243],[155.7,54.9,-3.7,241],
  [149,54.5,-4.2,238],[142.5,53.9,-4.7,236],[136,53.1,-5.3,234],
  [129.7,52.1,-5.8,232],[123.4,50.9,-6.3,230],[117.1,49.6,-6.8,229],
  [111,48.2,-7.2,227],[104.9,46.6,-7.7,226],[98.9,44.8,-8.2,225],
  [93,42.8,-8.7,224],[87.2,40.8,-9.1,223],[81.4,38.5,-9.6,222],
  [75.8,36.1,-10.1,222],[70.2,33.6,-10.5,221],[64.7,30.9,-11,221],
  [59.2,28.1,-11.4,221],[53.9,25.2,-11.8,221],[48.6,22.1,-12.3,221],
  [43.4,18.8,-12.7,221],[38.3,15.5,-13.1,221],[33.2,12,-13.5,222],
  [28.3,8.3,-13.9,222],[23.4,4.6,-14.4,223],[18.6,0.7,-14.8,198],
  [13.8,0.3,-15.2,171],[9.1,0.3,-15.5,170],[4.3,0.3,-15.9,175],
  [-0.6,0.3,-16.3,180],[-5.7,0.3,-16.7,186],[-10.9,0.3,-17.2,191],
  [-16.2,0.3,-17.6,196],[-21.7,0.3,-18.1,201],[-27.4,0.3,-18.5,206],
  [-33.1,0.3,-19,211],[-39.1,0.3,-19.5,216],[-45.1,0.3,-19.9,221],
  [-51.3,0.3,-19.9,225],[-57.6,0.3,-19.6,230],[-64.1,0.3,-19.3,235],
  [-70.6,0.3,-18.7,239],[-77.2,0.3,-17.7,242],[-83.8,0.3,-16.1,247],
  [-90.5,0.3,-14.4,251],[-97.4,0.3,-12.6,256],[-104.3,0.3,-10.9,260],
  [-111.4,0.3,-9,265],[-118.5,0.3,-7.2,269],[-125.8,0.3,-5.3,273],
  [-133.3,0.3,-3.4,278],[-140.8,0.3,-1.7,282],[-148.6,0.3,-0.4,286],
  [-156.5,0.3,0.9,290],[-164.5,0.3,1.7,288],[-172.5,0.3,2.1,285],
  [-180.3,0.3,1.9,282],[-188.1,0.3,1.2,279],[-195.7,0.7,-0.1,275],
  [-202.9,2.4,-1.8,271],[-209.5,5.1,-4,262],[-215.3,8,-6.6,244],
  [-220.7,10.7,-9.5,235],[-225.6,13.1,-12.7,225],
  [-230.1,15.4,-16.2,215],[-234.1,17.4,-19.9,204],
  [-237.6,19.2,-23.8,197],[-240.8,20.7,-27.9,192],
  [-243.5,22.1,-32.2,186],[-245.7,23.2,-36.6,181],
  [-247.6,24.1,-41.1,175],[-249,24.8,-45.6,170],
  [-249.9,25.3,-50.2,165],[-250.5,25.6,-54.7,161],
  [-250.7,25.7,-59.1,158],[-250.4,25.6,-63.4,155],
  [-249.8,25.3,-67.6,153],[-248.9,24.8,-71.7,152],
  [-248,24.3,-75.8,151],[-247.1,23.9,-79.9,149],
  [-246.1,23.4,-83.9,155],[-244.7,22.7,-88,159],
  [-243,21.8,-92.1,164],[-240.8,20.8,-96,169],
  [-238.3,19.5,-99.9,174],[-235.5,18.1,-103.6,180],
  [-232.3,16.5,-107.3,186],[-229,14.9,-111,192],
  [-225.3,13.3,-114.7,197],[-221.3,11.9,-118.1,201],
  [-216.8,11,-121.5,206],[-212,10.4,-124.6,209],
  [-206.9,10.4,-127.3,211],[-201.5,10.4,-129.9,216],
  [-196,10.4,-132.3,221],[-190.2,10.4,-134.4,224],
  [-184.1,10.4,-136.1,228],[-177.9,10.4,-137.3,227],
  [-171.7,10.4,-138,224],[-165.5,10.4,-138.2,222],
  [-159.3,10.4,-138,220],[-153.3,10.4,-137.2,217],
  [-147.4,10.4,-136,215],[-141.7,10.3,-134.4,213],
  [-136.2,10.3,-132.4,210],[-130.9,10.3,-129.9,208],
  [-126,10.3,-127.2,196],[-121.6,10.3,-124.2,188],
  [-117.6,10.3,-120.9,181],[-114.1,10.3,-117.4,178],
  [-111,10.3,-113.7,175],[-108.3,10.3,-109.7,172],
  [-106,10.3,-105.5,168],[-104.1,10.3,-101.3,166],
  [-102.6,10.3,-97,167],[-101.5,10.3,-92.4,172],
  [-100.7,10.3,-87.6,176],[-100.3,10.3,-82.7,180],
  [-100.2,10.3,-77.6,185],[-100,10.3,-72.4,191],
  [-99.9,10.3,-67,196],[-99.7,10.3,-61.5,201],
  [-99.7,10.3,-55.9,206],[-100.1,10.3,-50.1,210],
  [-100.8,10.8,-44.3,214],[-101.5,12,-38.5,218],
  [-102.4,14.1,-32.8,221],[-103.3,16.7,-27.2,223],
  [-104.2,19.1,-21.7,219],[-105.1,21.4,-16.2,215],
  [-106,23.5,-10.7,212],[-106.8,25.5,-5.3,208],
  [-107.7,27.2,0.1,205],[-108.5,28.7,5.5,201],
  [-109.4,30.1,10.8,198],[-110.2,31.3,16.1,195],
  [-111,32.3,21.3,192],[-111.8,33.1,26.5,190],
  [-112.5,33.8,31.6,187],[-113.3,34.3,36.7,185],
  [-114,34.6,41.8,183],[-114.7,34.7,46.7,180],
  [-115.4,34.7,51.7,179],[-116.1,34.6,56.6,177],
  [-116.8,34.3,61.4,175],[-117.4,33.8,66.2,174],
  [-118.1,33.2,70.9,173],[-118.7,32.4,75.6,172],
  [-119.3,31.5,80.2,171],[-119.9,30.4,84.8,170],
  [-120.5,29.2,89.4,170],[-121,27.9,93.8,170],
  [-121.6,26.4,98.3,169],[-122.1,24.7,102.6,169],
  [-122.7,23,107,169],[-123.2,21.1,111.3,170],
  [-123.6,20.4,115.5,153],[-124,20.4,119.7,151],
  [-124.5,20.4,123.9,155],[-125.3,20.4,128.2,160],
  [-126.1,20.4,132.7,166],[-127,20.4,137.3,171],
  [-127.9,20.4,142,177],[-129.2,20.4,146.8,181],
  [-130.8,20.4,151.7,186],[-132.4,20.4,156.6,192],
  [-134.1,20.4,161.8,197],[-135.8,20.4,167,202],
  [-137.8,20.4,172.3,206],[-140.2,20.4,177.7,211],
  [-142.6,20.4,183.1,216],[-145.3,20.4,188.5,221],
  [-148.4,20.4,193.9,225],[-151.7,20.4,199.3,230],
  [-155.2,20.4,204.7,234],[-159.1,20.4,209.9,239],
  [-163.2,20.3,215.2,243],[-167.5,20.3,220.6,248],
  [-172.1,20.3,225.7,251],[-177.2,20.3,230.6,255],
  [-182.4,20.3,235.5,260],[-187.7,20.3,240.4,264],
  [-193.1,20.3,245.5,268],[-198.8,20.3,250.3,272],
  [-204.9,20.3,254.8,275],[-211.4,20.3,259,278],
  [-218.2,20.3,262.7,281],[-225.4,20.3,266,284],
  [-232.7,20.3,269,288],[-240.3,20.3,271.9,292],
  [-248.1,20.3,274.3,295],[-256.1,20.3,276.2,298],
  [-264.3,20.3,277.6,301],[-272.6,20.3,278.4,304],
  [-281.1,20.3,278.7,307],[-289.6,20.3,278.5,309]
];

// Builds a driving line from the track pieces (runs inside the physics worker).
// Self-contained: builds a driving line for any track. No outside references.
// dec = { parts:[[x,y,z,id,rot,axis,cpo,so,qx,qy,qz,qw],...], lib:{id:{v:[...],detector,startOffset}}, start:{p:[x,y,z]} }
function generateRoute3D(dec, opt) {
  opt = opt || {};
  var S = opt.step || 1.3, SPACING = opt.spacing || 3.5, MINCLR = opt.minClr || 3.0, VMAX = opt.vmax || 250;
  var GRAV = 16.0, VHS = [12, 35, 55, 75], VH = 55.0;
  var NB = 16, RAD = S*1.7, T0 = Date.now();

  function qrot(q, x, y, z) {
    var n = Math.sqrt(q[0]*q[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3]) || 1;
    var qx=q[0]/n, qy=q[1]/n, qz=q[2]/n, qw=q[3]/n;
    return [
      (1-2*(qy*qy+qz*qz))*x + 2*(qx*qy-qz*qw)*y + 2*(qx*qz+qy*qw)*z,
      2*(qx*qy+qz*qw)*x + (1-2*(qx*qx+qz*qz))*y + 2*(qy*qz-qx*qw)*z,
      2*(qx*qz-qy*qw)*x + 2*(qy*qz+qx*qw)*y + (1-2*(qx*qx+qy*qy))*z
    ];
  }

  // ---- 1. surface samples: every face of every part, with its outward normal ----
  var cap = 200000, PX = new Float32Array(cap), PY = new Float32Array(cap), PZ = new Float32Array(cap);
  var NX = new Float32Array(cap), NY = new Float32Array(cap), NZ = new Float32Array(cap);
  var n = 0, seen = new Set();
  function grow() {
    cap *= 2;
    function g(a) { var b = new Float32Array(cap); b.set(a); return b; }
    PX = g(PX); PY = g(PY); PZ = g(PZ); NX = g(NX); NY = g(NY); NZ = g(NZ);
  }
  function addNode(x, y, z, nx, ny, nz) {
    var ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
    var dom = ax >= ay && ax >= az ? (nx > 0 ? 0 : 1) : (ay >= az ? (ny > 0 ? 2 : 3) : (nz > 0 ? 4 : 5));
    var key = (((Math.floor(x/0.6)+8192)*16384 + (Math.floor(y/0.6)+8192))*16384 + (Math.floor(z/0.6)+8192))*8 + dom;
    if (seen.has(key)) return;
    seen.add(key);
    if (n >= cap) grow();
    PX[n] = x; PY[n] = y; PZ[n] = z; NX[n] = nx; NY[n] = ny; NZ[n] = nz; n++;
  }
  for (var pi = 0; pi < dec.parts.length; pi++) {
    var p = dec.parts[pi], e = dec.lib[p[3]];
    if (!e) continue;
    var v = e.v, q = [p[8], p[9], p[10], p[11]], ox = p[0]*5, oy = p[1]*5, oz = p[2]*5;
    for (var i = 0; i + 8 < v.length; i += 9) {
      var a = qrot(q, v[i], v[i+1], v[i+2]), b = qrot(q, v[i+3], v[i+4], v[i+5]), c = qrot(q, v[i+6], v[i+7], v[i+8]);
      a[0]+=ox; a[1]+=oy; a[2]+=oz; b[0]+=ox; b[1]+=oy; b[2]+=oz; c[0]+=ox; c[1]+=oy; c[2]+=oz;
      var ux=b[0]-a[0], uy=b[1]-a[1], uz=b[2]-a[2], wx=c[0]-a[0], wy=c[1]-a[1], wz=c[2]-a[2];
      var tx=uy*wz-uz*wy, ty=uz*wx-ux*wz, tz=ux*wy-uy*wx, L=Math.sqrt(tx*tx+ty*ty+tz*tz);
      if (L < 1e-9) continue;
      tx/=L; ty/=L; tz/=L;
      var nu = Math.max(1, Math.ceil(Math.sqrt(ux*ux+uy*uy+uz*uz)/S)), nv = Math.max(1, Math.ceil(Math.sqrt(wx*wx+wy*wy+wz*wz)/S));
      for (var iu = 0; iu <= nu; iu++) for (var iv = 0; iv <= nv; iv++) {
        var fu = iu/nu, fv = iv/nv;
        if (fu + fv > 1.0001) continue;
        addNode(a[0]+ux*fu+wx*fv, a[1]+uy*fu+wy*fv, a[2]+uz*fu+wz*fv, tx, ty, tz);
      }
      if (n > 2500000) return { ok: false, why: "track too large" };
    }
  }
  seen = null;
  if (n < 50) return { ok: false, why: "no surfaces found" };

  // ---- 2. spatial hash (cell = 1.8 m) ----
  var CS = Math.max(1.8, RAD), HS = 1 << 22, HM = HS - 1;
  var head = new Int32Array(HS).fill(-1), nxt = new Int32Array(n), CX = new Int32Array(n), CY = new Int32Array(n), CZ = new Int32Array(n);
  function hsh(ix, iy, iz) { return (((ix*73856093) ^ (iy*19349663) ^ (iz*83492791)) >>> 0) & HM; }
  for (var h0 = 0; h0 < n; h0++) {
    var ix = Math.floor(PX[h0]/CS), iy = Math.floor(PY[h0]/CS), iz = Math.floor(PZ[h0]/CS);
    CX[h0] = ix; CY[h0] = iy; CZ[h0] = iz;
    var hh = hsh(ix, iy, iz); nxt[h0] = head[hh]; head[hh] = h0;
  }
  function near(x, y, z, r, fn) {
    var ix = Math.floor(x/CS), iy = Math.floor(y/CS), iz = Math.floor(z/CS);
    for (var a = -1; a <= 1; a++) for (var b = -1; b <= 1; b++) for (var c = -1; c <= 1; c++) {
      var jx = ix+a, jy = iy+b, jz = iz+c;
      for (var j = head[hsh(jx, jy, jz)]; j >= 0; j = nxt[j]) {
        if (CX[j] !== jx || CY[j] !== jy || CZ[j] !== jz) continue;
        fn(j);
      }
    }
  }

  // ---- 3. blocked: something solid just above the surface (walls, curbs, ceilings) ----
  var blocked = new Uint8Array(n);
  for (var i1 = 0; i1 < n; i1++) {
    var bx = PX[i1], by = PY[i1], bz = PZ[i1], bnx = NX[i1], bny = NY[i1], bnz = NZ[i1], hit = false;
    near(bx, by, bz, 1.8, function (j) {
      if (hit || j === i1) return;
      var dx = PX[j]-bx, dy = PY[j]-by, dz = PZ[j]-bz, hgt = dx*bnx + dy*bny + dz*bnz;
      if (hgt < 0.6 || hgt > 1.8) return;
      var pr = dx*dx+dy*dy+dz*dz - hgt*hgt;
      if (pr <= 0.64) hit = true;
    });
    if (hit) blocked[i1] = 1;
  }

  // ---- 4. smooth neighbours: close, same surface, similar direction ----
  var nbr = new Int32Array(n*NB).fill(-1), cnt = new Uint8Array(n);
  for (var i2 = 0; i2 < n; i2++) {
    if (blocked[i2]) continue;
    var cx0 = PX[i2], cy0 = PY[i2], cz0 = PZ[i2], n0x = NX[i2], n0y = NY[i2], n0z = NZ[i2], k = 0;
    near(cx0, cy0, cz0, RAD, function (j) {
      if (j === i2 || blocked[j] || k >= NB) return;
      var dx = PX[j]-cx0, dy = PY[j]-cy0, dz = PZ[j]-cz0, d2 = dx*dx+dy*dy+dz*dz;
      if (d2 > RAD*RAD || d2 < 0.01) return;
      if (n0x*NX[j] + n0y*NY[j] + n0z*NZ[j] < 0.82) return;
      var d = Math.sqrt(d2);
      if (Math.abs(dx*n0x+dy*n0y+dz*n0z) > 0.4*d || Math.abs(dx*NX[j]+dy*NY[j]+dz*NZ[j]) > 0.4*d) return;
      nbr[i2*NB + k] = j; k++;
    });
    cnt[i2] = k;
  }

  // ---- heap ----
  function Heap() { this.k = []; this.v = []; }
  Heap.prototype.push = function (key, val) {
    var k = this.k, v = this.v, i = k.length; k.push(key); v.push(val);
    while (i > 0) { var pr = (i-1) >> 1; if (k[pr] <= key) break; k[i] = k[pr]; v[i] = v[pr]; i = pr; }
    k[i] = key; v[i] = val;
  };
  Heap.prototype.pop = function () {
    var k = this.k, v = this.v, tk = k[0], tv = v[0], lk = k.pop(), lv = v.pop(), len = k.length;
    if (len > 0) {
      var i = 0;
      for (;;) { var c = 2*i+1; if (c >= len) break; if (c+1 < len && k[c+1] < k[c]) c++; if (k[c] >= lk) break; k[i] = k[c]; v[i] = v[c]; i = c; }
      k[i] = lk; v[i] = lv;
    }
    return [tk, tv];
  };
  Heap.prototype.size = function () { return this.k.length; };

  // ---- 5. clearance = distance along the surface to the nearest edge ----
  var clr = new Float64Array(n).fill(1e9), hp = new Heap();
  for (var i3 = 0; i3 < n; i3++) if (!blocked[i3] && cnt[i3] < 6) { clr[i3] = 0.5; hp.push(0.5, i3); }
  while (hp.size()) {
    var tp = hp.pop(), dc = tp[0], ic = tp[1];
    if (dc > clr[ic]) continue;
    for (var q2 = 0; q2 < cnt[ic]; q2++) {
      var jn = nbr[ic*NB+q2], nd2 = dc + Math.hypot(PX[jn]-PX[ic], PY[jn]-PY[ic], PZ[jn]-PZ[ic]);
      if (nd2 < clr[jn]) { clr[jn] = nd2; hp.push(nd2, jn); }
    }
  }

  function nearestNode(x, y, z, needUp) {
    var best = -1, bd = 1e18;
    for (var rr = 1; rr <= 4 && best < 0; rr++) {
      var R = rr*1.6;
      var ix = Math.floor(x/CS), iy = Math.floor(y/CS), iz = Math.floor(z/CS), m = Math.ceil(R/CS);
      for (var a = -m; a <= m; a++) for (var b = -m; b <= m; b++) for (var c = -m; c <= m; c++) {
        var jx = ix+a, jy = iy+b, jz = iz+c;
        for (var j = head[hsh(jx, jy, jz)]; j >= 0; j = nxt[j]) {
          if (CX[j] !== jx || CY[j] !== jy || CZ[j] !== jz) continue;
          if (blocked[j] || !cnt[j]) continue;
          if (needUp && NY[j] < 0.5) continue;
          var d2 = (PX[j]-x)*(PX[j]-x) + (PY[j]-y)*(PY[j]-y) + (PZ[j]-z)*(PZ[j]-z);
          if (d2 < bd) { bd = d2; best = j; }
        }
      }
    }
    return best;
  }

  // ---- 6. jumps: leave the end of a surface, fly, land on the first surface below ----
  function jumpEdges(i, hx, hz, slope) {
    var x0 = PX[i], y0 = PY[i], z0 = PZ[i], out = new Map(), angs = [-12,-8,-4,0,4,8,12];
    for (var vi = 0; vi < VHS.length; vi++) for (var ai = 0; ai < angs.length; ai++) {
      var vh = VHS[vi], ar = angs[ai]*Math.PI/180, c = Math.cos(ar), s = Math.sin(ar);
      var dx = hx*c - hz*s, dz = hx*s + hz*c, found = -1;
      for (var d = 3; d <= 150 && found < 0; d += 1) {
        var ty = y0 + slope*d - GRAV*d*d/(2*vh*vh), x = x0+dx*d, z = z0+dz*d;
        if (ty < minY - 3) break;
        near(x, ty, z, 1.2, function (j) {
          if (found >= 0 || blocked[j] || !cnt[j] || NY[j] < 0.5) return;
          var df = ty - PY[j], hd = Math.hypot(PX[j]-x, PZ[j]-z);
          if (hd <= 0.9 && df >= -1.2 && df <= 0.6) found = j;
        });
        if (found >= 0) { if (clr[found] >= 3.0 && (!out.has(found) || out.get(found) > d)) out.set(found, d); }
      }
    }
    var res = []; out.forEach(function (d, j) { res.push([j, d]); });
    return res;
  }
  var minY = 1e9;
  for (var iy2 = 0; iy2 < n; iy2++) if (PY[iy2] < minY) minY = PY[iy2];

  // ---- 7. search ----
  var dist = new Float64Array(n), prev = new Int32Array(n), hxA = new Float32Array(n), hzA = new Float32Array(n), slA = new Float32Array(n);
  var jumpFrom = new Uint8Array(n);
  function search(src, goal) {
    var dst = -1;
    dist.fill(1e18); prev.fill(-1); jumpFrom.fill(0);
    dist[src] = 0; hxA[src] = 1; hzA[src] = 0; slA[src] = 0;
    var pq = new Heap(); pq.push(0, src);
    while (pq.size()) {
      var tp = pq.pop(), dd = tp[0], i = tp[1];
      if (dd > dist[i]) continue;
      if (goal[i] && i !== src) { dst = i; break; }
      var x1 = PX[i], y1 = PY[i], z1 = PZ[i], fwd = false;
      for (var q = 0; q < cnt[i]; q++) {
        var j = nbr[i*NB+q], x2 = PX[j], y2 = PY[j], z2 = PZ[j];
        var Ld = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1)), cj = clr[j];
        var pen = 1 + 8*Math.pow(Math.max(0, (4-cj)/4), 2);
        if (cj < 1.5) pen += 40;
        var nd = dd + Ld*pen;
        var hl = Math.hypot(x2-x1, z2-z1);
        if (hl > 0.3 && ((x2-x1)*hxA[i] + (z2-z1)*hzA[i]) / hl > 0.5) fwd = true;
        if (nd < dist[j]) {
          dist[j] = nd; prev[j] = i; jumpFrom[j] = 0;
          if (hl > 0.2) {
            var ux = (x2-x1)/hl, uz = (z2-z1)/hl, mx = hxA[i]*0.8 + ux*0.2, mz = hzA[i]*0.8 + uz*0.2, ml = Math.hypot(mx, mz) || 1;
            hxA[j] = mx/ml; hzA[j] = mz/ml; slA[j] = slA[i]*0.8 + 0.2*(y2-y1)/hl;
          } else { hxA[j] = hxA[i]; hzA[j] = hzA[i]; slA[j] = slA[i]; }
          pq.push(nd, j);
        }
      }
      if (!fwd && NY[i] > 0.5 && (cnt[i] < 10)) {
        var je = jumpEdges(i, hxA[i], hzA[i], Math.max(-0.5, Math.min(1.0, slA[i])));
        for (var q3 = 0; q3 < je.length; q3++) {
          // Artificial jump links are much riskier than following a connected road
          // branch. Keep them as a last resort, not a shortcut across holes.
          var jj = je[q3][0], dj = je[q3][1], nd3 = dd + dj*5 + 300;
          if (nd3 < dist[jj]) {
            dist[jj] = nd3; prev[jj] = i; jumpFrom[jj] = 1;
            var jx = PX[jj]-x1, jz = PZ[jj]-z1, jl = Math.hypot(jx, jz) || 1;
            hxA[jj] = jx/jl; hzA[jj] = jz/jl; slA[jj] = -0.3;
            pq.push(nd3, jj);
          }
        }
      }
    }
    search.approx = false;
    if (dst < 0) {
      var gl = [];
      for (var g1 = 0; g1 < n; g1++) if (goal[g1]) gl.push(g1);
      var bestD = 1e18, bestN = -1;
      for (var k1 = 0; k1 < n; k1++) {
        if (dist[k1] > 1e17 || k1 === src) continue;
        for (var h1 = 0; h1 < gl.length; h1++) {
          var e1 = PX[k1]-PX[gl[h1]], e2 = PZ[k1]-PZ[gl[h1]], e3 = PY[k1]-PY[gl[h1]], d1 = e1*e1+e2*e2+e3*e3;
          if (d1 < bestD) { bestD = d1; bestN = k1; }
        }
      }
      if (bestN < 0) return null;
      dst = bestN; search.approx = true;
    }
    var path = [dst];
    while (path[path.length-1] !== src) path.push(prev[path[path.length-1]]);
    path.reverse();
    return path;
  }

  // ---- 8. way points ----
  var wps = [], st = dec.start.p;
  wps.push({ name: "start", x: st[0], y: st[1], z: st[2] });
  var cps = [];
  for (var pi2 = 0; pi2 < dec.parts.length; pi2++) {
    var pp = dec.parts[pi2], ee = dec.lib[pp[3]];
    if (pp[6] >= 0 && ee && ee.detector) cps.push(pp);
  }
  cps.sort(function (a, b) { return a[6] - b[6]; });
  function centreOf(pp, ee) {
    var cc = ee.detector.center, r = qrot([pp[8], pp[9], pp[10], pp[11]], cc[0], cc[1], cc[2]);
    return { x: r[0] + pp[0]*5, y: r[1] + pp[1]*5, z: r[2] + pp[2]*5 };
  }
  var seenOrder = {};
  for (var ci2 = 0; ci2 < cps.length; ci2++) {
    if (seenOrder[cps[ci2][6]]) continue; seenOrder[cps[ci2][6]] = true;
    var cc2 = centreOf(cps[ci2], dec.lib[cps[ci2][3]]);
    wps.push({ name: "checkpoint " + (cps[ci2][6]+1), x: cc2.x, y: cc2.y, z: cc2.z, part: cps[ci2] });
  }
  var fin = null, finPart = null;
  for (var pi3 = 0; pi3 < dec.parts.length; pi3++) {
    var pf = dec.parts[pi3], ef = dec.lib[pf[3]];
    if (ef && ef.detector && ef.detector.type === 1) { fin = centreOf(pf, ef); finPart = pf; break; }
  }
  if (!fin) return { ok: false, why: "no finish line found" };
  wps.push({ name: "finish", x: fin.x, y: fin.y, z: fin.z, part: finPart });

  function qinv(q) { return [-q[0], -q[1], -q[2], q[3]]; }
  function gateGoal(pp, ee, fx, fy, fz) {
    var det = ee.detector, cc = det.center, sz = det.size, qi = qinv([pp[8], pp[9], pp[10], pp[11]]);
    var ox = pp[0]*5, oy = pp[1]*5, oz = pp[2]*5, flags = new Uint8Array(n), count = 0;
    for (var i = 0; i < n; i++) {
      if (blocked[i] || !cnt[i]) continue;
      var l = qrot(qi, PX[i]-ox, PY[i]-oy, PZ[i]-oz);
      if (Math.abs(l[0]-cc[0]) <= sz[0]/2 + 1.0 && Math.abs(l[1]-cc[1]) <= sz[1]/2 + 1.2 && Math.abs(l[2]-cc[2]) <= sz[2]/2 + 1.0) { flags[i] = 1; count++; }
    }
    if (!count) { var fb = nearestNode(fx, fy, fz, false); if (fb >= 0) { flags[fb] = 1; count = 1; } }
    return { flags: flags, count: count };
  }
  var startNode = nearestNode(st[0], st[1] - 0.2, st[2], true);
  if (startNode < 0) return { ok: false, why: "no road under the start" };
  var gates = [];
  for (var wi = 1; wi < wps.length; wi++) {
    var gp = wps[wi].part, ge = dec.lib[gp[3]];
    gates.push(gateGoal(gp, ge, wps[wi].x, wps[wi].y, wps[wi].z));
    if (!gates[gates.length-1].count) return { ok: false, why: "no road near the " + wps[wi].name };
  }
  var path = [], src = startNode, reached = 0, partialWhy = null, jumpAt = [];
  for (var wk = 0; wk < gates.length; wk++) {
    var seg = search(src, gates[wk].flags);
    if (!seg) { partialWhy = "no way from the " + wps[wk].name + " to the " + wps[wk+1].name; break; }
    for (var sk = (path.length ? 1 : 0); sk < seg.length; sk++) { path.push(seg[sk]); }
    if (search.approx) { partialWhy = "no way from the " + wps[wk].name + " to the " + wps[wk+1].name + " (drove as close as the road goes)"; break; }
    src = seg[seg.length-1]; reached = wk + 1;
  }
  if (!reached && path.length < 5) return { ok: false, why: partialWhy || "no path" };

  // ---- 9. resample in 3D, smooth along the surface, mark jumps ----
  var pts = [], jumpEdge = [], jumps = 0;
  for (var pk = 0; pk < path.length; pk++) {
    var nd9 = path[pk];
    pts.push([PX[nd9], PY[nd9], PZ[nd9], NX[nd9], NY[nd9], NZ[nd9]]);
    var big = pk > 0 && Math.hypot(PX[nd9]-PX[path[pk-1]], PZ[nd9]-PZ[path[pk-1]], PY[nd9]-PY[path[pk-1]]) > 4.0;
    jumpEdge.push(big); if (big) jumps++;
  }
  var segLen = [0];
  for (var k3 = 1; k3 < pts.length; k3++) segLen.push(segLen[k3-1] + Math.hypot(pts[k3][0]-pts[k3-1][0], pts[k3][1]-pts[k3-1][1], pts[k3][2]-pts[k3-1][2]));
  var total = segLen[segLen.length-1], m2 = Math.max(8, Math.round(total/SPACING)) + 1;
  var out = [], isj = [], kk = 1;
  for (var mi = 0; mi < m2; mi++) {
    var sdist = total*mi/(m2-1);
    while (kk < pts.length-1 && segLen[kk] < sdist) kk++;
    var pa = pts[kk-1], pb = pts[kk], Ls = segLen[kk]-segLen[kk-1];
    var tt = Ls < 1e-9 ? 0 : Math.min(1, Math.max(0, (sdist-segLen[kk-1])/Ls));
    var nrm = [pa[3]+(pb[3]-pa[3])*tt, pa[4]+(pb[4]-pa[4])*tt, pa[5]+(pb[5]-pa[5])*tt], nl = Math.hypot(nrm[0], nrm[1], nrm[2]) || 1;
    out.push([pa[0]+(pb[0]-pa[0])*tt, pa[1]+(pb[1]-pa[1])*tt, pa[2]+(pb[2]-pa[2])*tt, nrm[0]/nl, nrm[1]/nl, nrm[2]/nl]);
    isj.push(jumpEdge[kk] && tt > 0 && tt < 1);
  }
  var pinned = [];
  for (var mp = 0; mp < m2; mp++) pinned.push(isj[mp] || (mp > 0 && isj[mp-1]) || (mp < m2-1 && isj[mp+1]));
  pinned[0] = true; pinned[m2-1] = true;
  function snap(x, y, z, nrm, tol) {
    var best = -1, bd = 1e18;
    near(x, y, z, tol, function (j) {
      if (blocked[j] || !cnt[j]) return;
      if (NX[j]*nrm[0] + NY[j]*nrm[1] + NZ[j]*nrm[2] < 0.6) return;
      var d2 = (PX[j]-x)*(PX[j]-x) + (PY[j]-y)*(PY[j]-y) + (PZ[j]-z)*(PZ[j]-z);
      if (d2 < bd && d2 <= tol*tol) { bd = d2; best = j; }
    });
    return best;
  }
  for (var it = 0; it < 60; it++) {
    for (var mq = 1; mq < m2-1; mq++) {
      if (pinned[mq]) continue;
      var P = out[mq];
      var nxp = P[0] + 0.45*((out[mq-1][0]+out[mq+1][0])/2 - P[0]);
      var nyp = P[1] + 0.45*((out[mq-1][1]+out[mq+1][1])/2 - P[1]);
      var nzp = P[2] + 0.45*((out[mq-1][2]+out[mq+1][2])/2 - P[2]);
      var jl = snap(nxp, nyp, nzp, P.slice(3), 1.6);
      if (jl < 0 || clr[jl] < MINCLR) continue;
      var okk = true, nb = [out[mq-1], out[mq+1]];
      for (var bi = 0; bi < 2; bi++) {
        var jm = snap((nxp+nb[bi][0])/2, (nyp+nb[bi][1])/2, (nzp+nb[bi][2])/2, P.slice(3), 2.2);
        if (jm < 0 || clr[jm] < MINCLR*0.8) { okk = false; break; }
      }
      if (!okk) continue;
      P[0] = nxp; P[1] = nyp; P[2] = nzp; P[3] = NX[jl]; P[4] = NY[jl]; P[5] = NZ[jl];
    }
  }
  var mj = 0;
  while (mj < m2) {
    if (isj[mj]) {
      var ja = mj; while (ja > 0 && isj[ja-1]) ja--;
      var jb = mj; while (jb < m2-1 && isj[jb]) jb++;
      var pA = out[Math.max(0, ja-1)], pB = out[Math.min(m2-1, jb)];
      var Dtot = Math.hypot(pB[0]-pA[0], pB[2]-pA[2]) || 1;
      var sl0 = ja >= 2 ? (out[ja-1][1]-out[ja-2][1])/Math.max(1e-6, Math.hypot(out[ja-1][0]-out[ja-2][0], out[ja-1][2]-out[ja-2][2])) : 0;
      var endBal = pA[1] + sl0*Dtot - GRAV*Dtot*Dtot/(2*VH*VH);
      for (var jj2 = ja; jj2 < jb; jj2++) {
        var dd2 = Math.hypot(out[jj2][0]-pA[0], out[jj2][2]-pA[2]);
        var bal = pA[1] + sl0*dd2 - GRAV*dd2*dd2/(2*VH*VH);
        out[jj2][1] = bal + (pB[1]-endBal)*(dd2/Dtot);
        out[jj2][3] = 0; out[jj2][4] = 1; out[jj2][5] = 0;
      }
      mj = jb;
    }
    mj++;
  }
  var route = [];
  function r2(v) { return Math.round(v*100)/100; }
  for (var ri = 0; ri < m2; ri++) route.push([r2(out[ri][0]), r2(out[ri][1]), r2(out[ri][2]), ri === 0 ? 5 : VMAX, r2(out[ri][3]), r2(out[ri][4]), r2(out[ri][5])]);
  var res = { ok: true, partial: partialWhy, reachedGates: reached, route: route, jumpPoints: isj.filter(Boolean).length, jumps: jumps, nodes: n, ms: Date.now()-T0, lengthM: Math.round(total), waypoints: wps.map(function (w) { return { name: w.name, x: w.x, y: w.y, z: w.z }; }) };
  if (opt.debug) res.debug = { n: n, PX: PX, PY: PY, PZ: PZ, NX: NX, NY: NY, NZ: NZ, blocked: blocked, nbr: nbr, cnt: cnt, NB: NB, nearestNode: nearestNode, clr: clr };
  return res;
}

function generateRoute(dec, opt) {
  opt = opt || {};
  var CELL = 1.0, SPACING = opt.spacing || 5.5, MINCLR = opt.minClr || 3.3, VMAX = opt.vmax || 250;
  var GRAV = 16.0, VH = 55.0, VHS = [12, 35, 55, 75];
  var t0 = Date.now();

  function qrot(q, x, y, z) {
    var n = Math.sqrt(q[0]*q[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3]) || 1;
    var qx=q[0]/n, qy=q[1]/n, qz=q[2]/n, qw=q[3]/n;
    return [
      (1-2*(qy*qy+qz*qz))*x + 2*(qx*qy-qz*qw)*y + 2*(qx*qz+qy*qw)*z,
      2*(qx*qy+qz*qw)*x + (1-2*(qx*qx+qz*qz))*y + 2*(qy*qz-qx*qw)*z,
      2*(qx*qz-qy*qw)*x + 2*(qy*qz+qx*qw)*y + (1-2*(qx*qx+qy*qy))*z
    ];
  }

  // ---- 1. world triangles, split into upward faces (drivable) and steep faces (walls, curbs) ----
  var ups = [], sides = [];
  var minx = 1e9, minz = 1e9, maxx = -1e9, maxz = -1e9;
  for (var pi = 0; pi < dec.parts.length; pi++) {
    var p = dec.parts[pi];
    var e = dec.lib[p[3]];
    if (!e) continue;
    var v = e.v, q = [p[8], p[9], p[10], p[11]];
    var ox = p[0]*5, oy = p[1]*5, oz = p[2]*5;
    for (var i = 0; i + 8 < v.length; i += 9) {
      var a = qrot(q, v[i], v[i+1], v[i+2]), b = qrot(q, v[i+3], v[i+4], v[i+5]), c = qrot(q, v[i+6], v[i+7], v[i+8]);
      a[0]+=ox; a[1]+=oy; a[2]+=oz; b[0]+=ox; b[1]+=oy; b[2]+=oz; c[0]+=ox; c[1]+=oy; c[2]+=oz;
      var ux=b[0]-a[0], uy=b[1]-a[1], uz=b[2]-a[2], wx=c[0]-a[0], wy=c[1]-a[1], wz=c[2]-a[2];
      var nx=uy*wz-uz*wy, ny=uz*wx-ux*wz, nz=ux*wy-uy*wx;
      var L = Math.sqrt(nx*nx+ny*ny+nz*nz);
      if (L < 1e-9) continue;
      var tri = [a, b, c];
      if (ny/L > 0.6) {
        ups.push(tri);
        for (var k = 0; k < 3; k++) {
          if (tri[k][0] < minx) minx = tri[k][0]; if (tri[k][0] > maxx) maxx = tri[k][0];
          if (tri[k][2] < minz) minz = tri[k][2]; if (tri[k][2] > maxz) maxz = tri[k][2];
        }
      } else if (Math.abs(ny/L) <= 0.6) sides.push(tri);
    }
  }
  if (ups.length < 20) return { ok: false, why: "no road surfaces found" };
  minx = Math.floor(minx) - 6; minz = Math.floor(minz) - 6; maxx = Math.ceil(maxx) + 6; maxz = Math.ceil(maxz) + 6;
  var W = Math.floor((maxx-minx)/CELL) + 1, H = Math.floor((maxz-minz)/CELL) + 1;
  if (W*H > 6000000) return { ok: false, why: "track too large" };

  // ---- 2. height layers per 1 m cell ----
  var cells = new Map();
  function addSample(x, z, y) {
    var cx = Math.floor((x-minx)/CELL), cz = Math.floor((z-minz)/CELL);
    if (cz < 0 || cz >= H || cx < 0 || cx >= W) return;
    var key = cx*H + cz, arr = cells.get(key);
    if (!arr) { cells.set(key, [y]); return; }
    for (var m = 0; m < arr.length; m++) {
      if (Math.abs(arr[m]-y) <= 0.5) { if (y > arr[m]) arr[m] = y; return; }
    }
    arr.push(y);
  }
  var S = 0.5;
  for (var t = 0; t < ups.length; t++) {
    var A = ups[t][0], B = ups[t][1], C = ups[t][2];
    var x0 = Math.min(A[0],B[0],C[0]), x1 = Math.max(A[0],B[0],C[0]);
    var z0 = Math.min(A[2],B[2],C[2]), z1 = Math.max(A[2],B[2],C[2]);
    var d = (B[2]-C[2])*(A[0]-C[0]) + (C[0]-B[0])*(A[2]-C[2]);
    if (Math.abs(d) < 1e-9) continue;
    for (var gx = Math.floor(x0/S)*S + S/2; gx < x1 + S; gx += S) {
      for (var gz = Math.floor(z0/S)*S + S/2; gz < z1 + S; gz += S) {
        var al = ((B[2]-C[2])*(gx-C[0]) + (C[0]-B[0])*(gz-C[2]))/d;
        var be = ((C[2]-A[2])*(gx-C[0]) + (A[0]-C[0])*(gz-C[2]))/d;
        var ga = 1 - al - be;
        if (al < -0.02 || be < -0.02 || ga < -0.02) continue;
        addSample(gx, gz, al*A[1] + be*B[1] + ga*C[1]);
      }
    }
  }
  // number the nodes
  var nodeKey = [], nodeY = [];
  cells.forEach(function (arr, key) { for (var m = 0; m < arr.length; m++) { nodeKey.push(key); nodeY.push(arr[m]); } });
  var n = nodeKey.length;
  var minNodeY = 1e9;
  for (var iy = 0; iy < n; iy++) if (nodeY[iy] < minNodeY) minNodeY = nodeY[iy];
  if (n < 50) return { ok: false, why: "too few road nodes" };
  var cellNodes = new Map();
  for (var i2 = 0; i2 < n; i2++) { var l = cellNodes.get(nodeKey[i2]); if (l) l.push(i2); else cellNodes.set(nodeKey[i2], [i2]); }
  function nodesAt(cx, cz) { if (cz < 0 || cz >= H || cx < 0 || cx >= W) return []; return cellNodes.get(cx*H + cz) || []; }
  function nx_(i) { return minx + (Math.floor(nodeKey[i]/H) + 0.5)*CELL; }
  function nz_(i) { return minz + (nodeKey[i] % H + 0.5)*CELL; }

  // ---- 3. block nodes that have walls or curbs rising just above them ----
  var blocked = new Uint8Array(n);
  for (var s2 = 0; s2 < sides.length; s2++) {
    var A2 = sides[s2][0], B2 = sides[s2][1], C2 = sides[s2][2];
    var lab = Math.max(Math.hypot(B2[0]-A2[0],B2[1]-A2[1],B2[2]-A2[2]), Math.hypot(C2[0]-A2[0],C2[1]-A2[1],C2[2]-A2[2]), Math.hypot(C2[0]-B2[0],C2[1]-B2[1],C2[2]-B2[2]));
    var mm = Math.max(1, Math.ceil(lab/0.5));
    for (var a1 = 0; a1 <= mm; a1++) for (var b1 = 0; b1 <= mm - a1; b1++) {
      var uu = a1/mm, vv = b1/mm;
      var px = A2[0] + (B2[0]-A2[0])*uu + (C2[0]-A2[0])*vv;
      var py = A2[1] + (B2[1]-A2[1])*uu + (C2[1]-A2[1])*vv;
      var pz = A2[2] + (B2[2]-A2[2])*uu + (C2[2]-A2[2])*vv;
      var lst = nodesAt(Math.floor((px-minx)/CELL), Math.floor((pz-minz)/CELL));
      var CURB_BLOCK_MIN = 0.6;
      var CURB_BLOCK_MAX = 1.8;
      for (var li = 0; li < lst.length; li++) {
        var nd = lst[li];
        if (py >= nodeY[nd] + CURB_BLOCK_MIN && py <= nodeY[nd] + CURB_BLOCK_MAX) blocked[nd] = 1;
      }
    }
  }

  // ---- 4. neighbours (8 directions, slope limited) ----
  var nbr = new Int32Array(n*8).fill(-1), ncount = new Uint8Array(n);
  var DX = [1,-1,0,0,1,1,-1,-1], DZ = [0,0,1,-1,1,-1,1,-1];
  for (var i3 = 0; i3 < n; i3++) {
    if (blocked[i3]) continue;
    var cx3 = Math.floor(nodeKey[i3]/H), cz3 = nodeKey[i3] % H;
    for (var dd = 0; dd < 8; dd++) {
      var cand = nodesAt(cx3+DX[dd], cz3+DZ[dd]);
      var best = -1, bd = 9, dist = Math.hypot(DX[dd], DZ[dd])*CELL;
      for (var ci = 0; ci < cand.length; ci++) {
        var j = cand[ci]; if (blocked[j]) continue;
        var dy = Math.abs(nodeY[j]-nodeY[i3]);
        if (dy <= 1.0*dist && dy < bd) { bd = dy; best = j; }
      }
      if (best >= 0) { nbr[i3*8 + ncount[i3]] = best; ncount[i3]++; }
    }
  }

  // ---- tiny binary heap ----
  function Heap() { this.k = []; this.v = []; }
  Heap.prototype.push = function (key, val) {
    var k = this.k, v = this.v, i = k.length; k.push(key); v.push(val);
    while (i > 0) { var pr = (i-1) >> 1; if (k[pr] <= key) break; k[i] = k[pr]; v[i] = v[pr]; i = pr; }
    k[i] = key; v[i] = val;
  };
  Heap.prototype.pop = function () {
    var k = this.k, v = this.v, topK = k[0], topV = v[0], lastK = k.pop(), lastV = v.pop(), len = k.length;
    if (len > 0) {
      var i = 0;
      for (;;) { var c = 2*i+1; if (c >= len) break; if (c+1 < len && k[c+1] < k[c]) c++; if (k[c] >= lastK) break; k[i] = k[c]; v[i] = v[c]; i = c; }
      k[i] = lastK; v[i] = lastV;
    }
    return [topK, topV];
  };
  Heap.prototype.size = function () { return this.k.length; };

  // ---- 5. clearance = distance to the nearest road edge ----
  var clr = new Float32Array(n).fill(1e9);
  var hp = new Heap();
  for (var i4 = 0; i4 < n; i4++) if (!blocked[i4] && ncount[i4] < 8) { clr[i4] = 0.5; hp.push(0.5, i4); }
  while (hp.size()) {
    var tp = hp.pop(), dcur = tp[0], ic = tp[1];
    if (dcur > clr[ic]) continue;
    for (var q2 = 0; q2 < ncount[ic]; q2++) {
      var jn = nbr[ic*8+q2], nd2 = dcur + Math.hypot(nx_(jn)-nx_(ic), nz_(jn)-nz_(ic));
      if (nd2 < clr[jn]) { clr[jn] = nd2; hp.push(nd2, jn); }
    }
  }

  function nearestNode(x, z, y) {
    var cx = Math.floor((x-minx)/CELL), cz = Math.floor((z-minz)/CELL), best = -1, bd = 1e18;
    for (var r = 0; r <= 6; r++) {
      for (var ddx = -r; ddx <= r; ddx++) for (var ddz = -r; ddz <= r; ddz++) {
        if (Math.max(Math.abs(ddx), Math.abs(ddz)) !== r) continue;
        var lst2 = nodesAt(cx+ddx, cz+ddz);
        for (var u = 0; u < lst2.length; u++) {
          var j = lst2[u]; if (blocked[j] || !ncount[j]) continue;
          var ex = nx_(j)-x, ez = nz_(j)-z, ey = (nodeY[j]-y)*3, dsq = ex*ex+ez*ez+ey*ey;
          if (dsq < bd) { bd = dsq; best = j; }
        }
      }
      if (best >= 0 && r >= 1) break;
    }
    return best;
  }

  // ---- 6. jumps: where the road ends, fly along the heading and land on the first surface below ----
  function surfaceAhead(x, y, z) {
    var lst = nodesAt(Math.floor((x-minx)/CELL), Math.floor((z-minz)/CELL));
    for (var u = 0; u < lst.length; u++) if (!blocked[lst[u]] && Math.abs(nodeY[lst[u]]-y) <= 1.5) return true;
    return false;
  }
  function jumpEdges(i, hx, hz, slope) {
    var x0 = nx_(i), y0 = nodeY[i], z0 = nz_(i);
    if (surfaceAhead(x0+hx*2.5, y0+slope*2.5, z0+hz*2.5)) return [];
    var out = new Map(), angs = [-12,-8,-4,0,4,8,12];
    for (var vi = 0; vi < VHS.length; vi++) for (var ai = 0; ai < angs.length; ai++) {
      var VH = VHS[vi];
      var ar = angs[ai]*Math.PI/180, c = Math.cos(ar), s = Math.sin(ar);
      var dx = hx*c - hz*s, dz = hx*s + hz*c;
      for (var d = 3; d <= 150; d += 1) {
        var ty = y0 + slope*d - GRAV*d*d/(2*VH*VH), x = x0+dx*d, z = z0+dz*d, hit = -1;
        if (ty < minNodeY - 3) break;
        var lst = nodesAt(Math.floor((x-minx)/CELL), Math.floor((z-minz)/CELL));
        for (var u = 0; u < lst.length; u++) {
          var j = lst[u]; if (blocked[j] || !ncount[j]) continue;
          var df = ty - nodeY[j];
          if (df >= -1.2 && df <= 0.6) { hit = j; break; }
        }
        if (hit >= 0) {
          var MIN_CLR_LONG_JUMP = 3.0;
          var MIN_CLR_SHORT_JUMP = 1.2;
          var minClrNeeded = (d <= 8) ? MIN_CLR_SHORT_JUMP : MIN_CLR_LONG_JUMP;
          if (clr[hit] >= minClrNeeded && (!out.has(hit) || out.get(hit) > d)) out.set(hit, d);
          break;
        }
      }
    }
    var res = []; out.forEach(function (d, j) { res.push([j, d]); });
    return res;
  }

  // ---- 7. shortest path with a penalty near road edges ----
  var dist = new Float64Array(n), prev = new Int32Array(n), hxA = new Float32Array(n), hzA = new Float32Array(n), slA = new Float32Array(n);
  function search(src, goal) {
    var dst = -1;
    dist.fill(1e18); prev.fill(-1);
    dist[src] = 0; hxA[src] = 1; hzA[src] = 0; slA[src] = 0;
    var pq = new Heap(); pq.push(0, src);
    while (pq.size()) {
      var tp = pq.pop(), dd = tp[0], i = tp[1];
      if (dd > dist[i]) continue;
      if (goal[i] && i !== src) { dst = i; break; }
      var x1 = nx_(i), y1 = nodeY[i], z1 = nz_(i);
      for (var q = 0; q < ncount[i]; q++) {
        var j = nbr[i*8+q], x2 = nx_(j), y2 = nodeY[j], z2 = nz_(j);
        var hl = Math.hypot(x2-x1, z2-z1), Ld = Math.sqrt(hl*hl + (y2-y1)*(y2-y1)), cj = clr[j];
        var pen = 1 + 8*Math.pow(Math.max(0, (4-cj)/4), 2);
        if (cj < 1.5) pen += 40;
        var nd = dd + Ld*pen;
        if (nd < dist[j]) {
          dist[j] = nd; prev[j] = i;
          var ux = (x2-x1)/hl, uz = (z2-z1)/hl, mx = hxA[i]*0.8 + ux*0.2, mz = hzA[i]*0.8 + uz*0.2, ml = Math.hypot(mx, mz) || 1;
          hxA[j] = mx/ml; hzA[j] = mz/ml; slA[j] = slA[i]*0.8 + 0.2*(y2-y1)/hl;
          pq.push(nd, j);
        }
      }
      if (ncount[i] < 8) {
        var je = jumpEdges(i, hxA[i], hzA[i], slA[i]);
        for (var q3 = 0; q3 < je.length; q3++) {
          // Artificial jump links are much riskier than following a connected road
          // branch. Keep them as a last resort, not a shortcut across holes.
          var jj = je[q3][0], dj = je[q3][1], nd3 = dd + dj*5 + 300;
          if (nd3 < dist[jj]) {
            dist[jj] = nd3; prev[jj] = i;
            var jx = nx_(jj)-x1, jz = nz_(jj)-z1, jl = Math.hypot(jx, jz) || 1;
            hxA[jj] = jx/jl; hzA[jj] = jz/jl; slA[jj] = -0.3;
            pq.push(nd3, jj);
          }
        }
      }
    }
    search.approx = false;
    if (dst < 0) {
      var gl = [];
      for (var g1 = 0; g1 < n; g1++) if (goal[g1]) gl.push(g1);
      var bestD = 1e18, bestN = -1;
      for (var k1 = 0; k1 < n; k1++) {
        if (dist[k1] > 1e17 || k1 === src) continue;
        for (var h1 = 0; h1 < gl.length; h1++) {
          var e1 = nx_(k1)-nx_(gl[h1]), e2 = nz_(k1)-nz_(gl[h1]), e3 = nodeY[k1]-nodeY[gl[h1]], d1 = e1*e1+e2*e2+e3*e3;
          if (d1 < bestD) { bestD = d1; bestN = k1; }
        }
      }
      if (bestN < 0) return null;
      dst = bestN; search.approx = true;
    }
    var path = [dst];
    while (path[path.length-1] !== src) path.push(prev[path[path.length-1]]);
    path.reverse();
    return path;
  }

  // ---- 8. way points: start, checkpoints in order, finish ----
  var wps = [];
  var st = dec.start.p; wps.push({ name: "start", x: st[0], y: st[1], z: st[2] });
  var cps = [];
  for (var pi2 = 0; pi2 < dec.parts.length; pi2++) {
    var pp = dec.parts[pi2], ee = dec.lib[pp[3]];
    if (pp[6] >= 0 && ee && ee.detector) cps.push(pp);
  }
  cps.sort(function (a, b) { return a[6] - b[6]; });
  function centreOf(pp, ee) {
    var cc = ee.detector.center, r = qrot([pp[8], pp[9], pp[10], pp[11]], cc[0], cc[1], cc[2]);
    return { x: r[0] + pp[0]*5, y: r[1] + pp[1]*5, z: r[2] + pp[2]*5 };
  }
  var seenOrder = {};
  for (var ci2 = 0; ci2 < cps.length; ci2++) {
    if (seenOrder[cps[ci2][6]]) continue; seenOrder[cps[ci2][6]] = true;
    var cc2 = centreOf(cps[ci2], dec.lib[cps[ci2][3]]);
    wps.push({ name: "checkpoint " + (cps[ci2][6]+1), x: cc2.x, y: cc2.y, z: cc2.z, part: cps[ci2] });
  }
  var fin = null, finPart = null;
  for (var pi3 = 0; pi3 < dec.parts.length; pi3++) {
    var pf = dec.parts[pi3], ef = dec.lib[pf[3]];
    if (ef && ef.detector && ef.detector.type === 1) { fin = centreOf(pf, ef); finPart = pf; break; }
  }
  if (!fin) return { ok: false, why: "no finish line found" };
  wps.push({ name: "finish", x: fin.x, y: fin.y, z: fin.z, part: finPart });

  function qinv(q) { return [-q[0], -q[1], -q[2], q[3]]; }
  function gateGoal(pp, ee, fallback) {
    var det = ee.detector, cc = det.center, sz = det.size, qi = qinv([pp[8], pp[9], pp[10], pp[11]]);
    var ox = pp[0]*5, oy = pp[1]*5, oz = pp[2]*5, flags = new Uint8Array(n), count = 0;
    for (var i = 0; i < n; i++) {
      if (blocked[i] || !ncount[i]) continue;
      var l = qrot(qi, nx_(i)-ox, nodeY[i]-oy, nz_(i)-oz);
      if (Math.abs(l[0]-cc[0]) <= sz[0]/2 + 1.0 && Math.abs(l[2]-cc[2]) <= sz[2]/2 + 1.0 && l[1] >= -0.8 && l[1] <= cc[1] + sz[1]/2 + 0.5) { flags[i] = 1; count++; }
    }
    if (!count && fallback >= 0) { flags[fallback] = 1; count = 1; }
    return { flags: flags, count: count };
  }
  var gates = [];
  var startNode = nearestNode(wps[0].x, wps[0].z, wps[0].y - 2.0);
  if (startNode < 0) return { ok: false, why: "no road near the start" };
  for (var wi = 1; wi < wps.length; wi++) {
    var gp = wps[wi].part, ge = dec.lib[gp[3]];
    var nn = nearestNode(wps[wi].x, wps[wi].z, wps[wi].y - 2.0);
    gates.push(gateGoal(gp, ge, nn));
    if (!gates[gates.length-1].count) return { ok: false, why: "no road near the " + wps[wi].name };
  }
  var path = [], src = startNode, reached = 0, partialWhy = null;
  for (var wk = 0; wk < gates.length; wk++) {
    var seg = search(src, gates[wk].flags);
    if (!seg) { partialWhy = "no way from the " + wps[wk].name + " to the " + wps[wk+1].name; break; }
    for (var sk = (path.length ? 1 : 0); sk < seg.length; sk++) path.push(seg[sk]);
    if (search.approx) { partialWhy = "no way from the " + wps[wk].name + " to the " + wps[wk+1].name + " (drove as close as the road goes)"; break; }
    src = seg[seg.length-1]; reached = wk + 1;
  }
  if (!reached) return { ok: false, why: partialWhy };

  // ---- 9. resample, smooth inside the road, mark jumps ----
  var pts = path.map(function (i) { return [nx_(i), nodeY[i], nz_(i)]; });
  var jumpEdge = new Array(pts.length).fill(false);
  var jumps = 0;
  for (var k2 = 1; k2 < pts.length; k2++) if (Math.hypot(pts[k2][0]-pts[k2-1][0], pts[k2][1]-pts[k2-1][1], pts[k2][2]-pts[k2-1][2]) > 4.0) { jumpEdge[k2] = true; jumps++; }
  var segLen = [0];
  for (var k3 = 1; k3 < pts.length; k3++) segLen.push(segLen[k3-1] + Math.hypot(pts[k3][0]-pts[k3-1][0], pts[k3][2]-pts[k3-1][2]));
  var total = segLen[segLen.length-1], m2 = Math.max(8, Math.round(total/SPACING)) + 1;
  var out = [], isj = [], kk = 1;
  for (var mi = 0; mi < m2; mi++) {
    var sdist = total*mi/(m2-1);
    while (kk < pts.length-1 && segLen[kk] < sdist) kk++;
    var pa = pts[kk-1], pb = pts[kk], Ls = segLen[kk]-segLen[kk-1];
    var tt = Ls < 1e-9 ? 0 : Math.min(1, Math.max(0, (sdist-segLen[kk-1])/Ls));
    out.push([pa[0]+(pb[0]-pa[0])*tt, pa[1]+(pb[1]-pa[1])*tt, pa[2]+(pb[2]-pa[2])*tt]);
    isj.push(jumpEdge[kk] && tt > 0 && tt < 1);
  }
  var pinned = [];
  for (var mp = 0; mp < m2; mp++) pinned.push(isj[mp] || (mp > 0 && isj[mp-1]) || (mp < m2-1 && isj[mp+1]));
  pinned[0] = true; pinned[m2-1] = true;
  function layerNear(x, z, y, tol) {
    var lst = nodesAt(Math.floor((x-minx)/CELL), Math.floor((z-minz)/CELL)), best = -1, bd = 1e9;
    for (var u = 0; u < lst.length; u++) {
      var j = lst[u]; if (blocked[j]) continue;
      var df = Math.abs(nodeY[j]-y);
      if (df < bd && df <= tol) { bd = df; best = j; }
    }
    return best;
  }
  for (var it = 0; it < 80; it++) {
    for (var mq = 1; mq < m2-1; mq++) {
      if (pinned[mq]) continue;
      var P = out[mq];
      var nxp = P[0] + 0.45*((out[mq-1][0]+out[mq+1][0])/2 - P[0]);
      var nzp = P[2] + 0.45*((out[mq-1][2]+out[mq+1][2])/2 - P[2]);
      var jl = layerNear(nxp, nzp, P[1], 1.6);
      if (jl < 0 || clr[jl] < MINCLR) continue;
      var okk = true, nb = [out[mq-1], out[mq+1]];
      for (var bi = 0; bi < 2; bi++) {
        var jm = layerNear((nxp+nb[bi][0])/2, (nzp+nb[bi][2])/2, (P[1]+nb[bi][1])/2, 2.2);
        if (jm < 0 || clr[jm] < MINCLR*0.8) { okk = false; break; }
      }
      if (!okk) continue;
      P[0] = nxp; P[2] = nzp; P[1] = nodeY[jl];
    }
  }
  // height inside a jump: the arc a car follows, bent so it ends on the landing spot
  var mj = 0;
  while (mj < m2) {
    if (isj[mj] || (mj > 0 && isj[mj-1] && false)) {
      var ja = mj; while (ja > 0 && isj[ja-1]) ja--;
      var jb = mj; while (jb < m2-1 && isj[jb]) jb++;
      var pA = out[Math.max(0, ja-1)], pB = out[Math.min(m2-1, jb)];
      var Dtot = Math.hypot(pB[0]-pA[0], pB[2]-pA[2]) || 1;
      var sl0 = ja >= 2 ? (out[ja-1][1]-out[ja-2][1])/Math.max(1e-6, Math.hypot(out[ja-1][0]-out[ja-2][0], out[ja-1][2]-out[ja-2][2])) : 0;
      var endBal = pA[1] + sl0*Dtot - GRAV*Dtot*Dtot/(2*VH*VH);
      for (var jj2 = ja; jj2 < jb; jj2++) {
        var dd2 = Math.hypot(out[jj2][0]-pA[0], out[jj2][2]-pA[2]);
        var bal = pA[1] + sl0*dd2 - GRAV*dd2*dd2/(2*VH*VH);
        out[jj2][1] = bal + (pB[1]-endBal)*(dd2/Dtot);
      }
      mj = jb;
    }
    mj++;
  }
  var route = [];
  for (var ri = 0; ri < m2; ri++) route.push([Math.round(out[ri][0]*100)/100, Math.round(out[ri][1]*100)/100, Math.round(out[ri][2]*100)/100, ri === 0 ? 5 : VMAX]);
  return { ok: true, partial: partialWhy, reachedGates: reached, route: route, jumpPoints: isj.filter(Boolean).length, jumps: jumps, nodes: n, ms: Date.now()-t0, lengthM: Math.round(total), waypoints: wps.map(function (w) { return { name: w.name, x: w.x, y: w.y, z: w.z }; }) };
}

const WORKER_HELPERS = `
(() => {
  if (globalThis.__ptTutorialBot) return;
  const ROUTE_REC = ${JSON.stringify(ROUTE)};
  const ROUTE_SOURCE = ${JSON.stringify(ROUTE_SOURCE)};
  let ROUTE = ROUTE_REC;
  let N = ROUTE.length;
  let TRACK_ID = null;
  const SPEED_FACTOR = ${SPEED_FACTOR};
  const STEER_GAIN = ${STEER_GAIN};
  const LAT_ACCEL = ${LAT_ACCEL};
  const LINE_PULL = ${LINE_PULL};
  const LOW_SPEED_BOOST = ${LOW_SPEED_BOOST};
  const SLOW_ZONES_REC = ${JSON.stringify(SLOW_ZONES)};
  let SLOW_ZONES = SLOW_ZONES_REC.slice();
  const LOOK_BASE = ${LOOK_BASE};
  const LEARN = ${LEARN};
  const AIRBRAKE = ${AIRBRAKE};
  const AIR_DELAY = ${AIR_DELAY};
  const AIR_MATCH_SLOPE = ${AIR_MATCH_SLOPE};
  const AIR_BIAS = ${AIR_BIAS};
  const AIR_DOWN_IS_NOSE_UP = ${AIR_DOWN_IS_NOSE_UP};
  const AIR_LEAD = ${AIR_LEAD};
  const AIR_DEADBAND = ${AIR_DEADBAND};
  const AIR_LOOK_SEC = ${AIR_LOOK_SEC};
  const MAX_LINE_SHIFT = ${MAX_LINE_SHIFT};
  const MAX_SPEED_SHIFT = ${MAX_SPEED_SHIFT};
  const EXPLORE_RUNS = ${EXPLORE_RUNS};
  const SPEED_VALUE = ${SPEED_VALUE};
  const AVG_MS = 55;
  const LOOK_SPEED = ${LOOK_SPEED};
  const LOOK_MAX = ${LOOK_MAX};
  const DECODE_OFFSET = ${DECODE_OFFSET};
  const FORWARD_SIGN = ${FORWARD_SIGN};
  const STEER_SIGN = ${STEER_SIGN};

  const bot = {
    mode: "${MODE}",
    enabled: true,
    idx: Object.create(null),
    acc: Object.create(null),
    stuck: Object.create(null),
    lastPos: Object.create(null),
    lastFrames: Object.create(null),
    hist: Object.create(null),
    lastCrash: Object.create(null),
    lastOff: Object.create(null),
    lastCp: Object.create(null),
    airSince: Object.create(null),
    airV0: Object.create(null),
    lastAirborne: Object.create(null),
    keepSpeed: Object.create(null),
    keepUntil: Object.create(null),
    lastLand: Object.create(null),
    lastBrakeLog: Object.create(null),
    landSteerUntil: Object.create(null),
    lastPitch: Object.create(null),
    airMatched: Object.create(null),
    finLogged: Object.create(null),
    dbg: null,
    recRun: 0,
    recChunk: [],
    recChunkIndex: 0,
    recDone: false,
    recLastFrames: undefined,
    recLastSample: -1
  };

  function dist2(p,q) {
    const dx=p.x-q[0], dy=p.y-q[1], dz=p.z-q[2];
    return dx*dx+dy*dy+dz*dz;
  }

  function nearestIndex(p,id,forceGlobal=false) {
    const start=bot.idx[id] ?? 0;
    let best=start, bestD=Infinity;
    const lo=forceGlobal ? 0 : Math.max(0,start-5);
    const hi=forceGlobal ? N-1 : Math.min(N-1,start+40);

    for(let i=lo;i<=hi;i++) {
      const d=dist2(p,ROUTE[i]);
      if(d<bestD) { bestD=d; best=i; }
    }

    if(!forceGlobal && bestD>45*45) {
      for(let i=0;i<N;i++) {
        const d=dist2(p,ROUTE[i]);
        if(d<bestD) { bestD=d; best=i; }
      }
    }

    bot.idx[id]=best;
    return best;
  }

  // a route point is "flat" when it has no surface direction recorded (your lap) or the road there is close to level
  function flatSeg(k) {
    const a=ROUTE[Math.max(0,Math.min(N-1,k))], b=ROUTE[Math.max(0,Math.min(N-1,k+1))];
    return a[5]===undefined || (a[5]>=0.8 && (b[5]===undefined || b[5]>=0.8));
  }

  function lookAhead(p,ld,i) {
    // First project the car onto a nearby route segment. Starting the look-ahead
    // from the car's raw position made it walk back toward a waypoint behind the
    // car when the car was offset, producing late U-turn-like corrections.
    const lo=Math.max(0,i-2), hi=Math.min(N-2,i+3);
    let seg=Math.max(0,Math.min(N-2,i)), bestT=0, bestD=Infinity;
    let sx=ROUTE[seg][0], sy=ROUTE[seg][1], sz=ROUTE[seg][2];
    for(let k=lo;k<=hi;k++) {
      const a=ROUTE[k], b=ROUTE[k+1], flat=flatSeg(k);
      const dx=b[0]-a[0], dy=flat?0:b[1]-a[1], dz=b[2]-a[2];
      const px=p.x-a[0], py=flat?0:p.y-a[1], pz=p.z-a[2];
      const l2=dx*dx+dy*dy+dz*dz;
      const t=Math.max(0,Math.min(1,l2>1e-9?(px*dx+py*dy+pz*dz)/l2:0));
      const x=a[0]+(b[0]-a[0])*t, y=a[1]+(b[1]-a[1])*t, z=a[2]+(b[2]-a[2])*t;
      const ex=p.x-x, ey=p.y-y, ez=p.z-z;
      const d=ex*ex+ey*ey+ez*ez;
      // Tie-break toward the later segment so the target progresses forward.
      if(d<bestD-1e-5 || (Math.abs(d-bestD)<=1e-5 && k>seg)) {
        bestD=d; seg=k; bestT=t; sx=x; sy=y; sz=z;
      }
    }

    let ax=sx, ay=sy, az=sz;
    let remaining=ld;
    // Consume the remainder of the projected segment, then continue forward.
    for(let k=seg+1;k<N;k++) {
      const bx=ROUTE[k][0], by=ROUTE[k][1], bz=ROUTE[k][2];
      const len=flatSeg(k-1)?Math.hypot(bx-ax,bz-az):Math.hypot(bx-ax,by-ay,bz-az);
      if(len>=remaining) {
        const f=remaining/Math.max(len,1e-9);
        return {x:ax+(bx-ax)*f,y:ay+(by-ay)*f,z:az+(bz-az)*f,index:k};
      }
      remaining-=len; ax=bx; ay=by; az=bz;
    }
    const last=ROUTE[N-1];
    return {x:last[0],y:last[1],z:last[2],index:N-1};
  }

  function crossTrack(p,i) {
    let best=Infinity;
    for(let k=Math.max(0,i-1);k<=Math.min(N-2,i);k++) {
      const ax=ROUTE[k][0], az=ROUTE[k][2];
      const bx=ROUTE[k+1][0], bz=ROUTE[k+1][2];
      const dx=bx-ax, dz=bz-az;
      let d;
      if(flatSeg(k)) {
        const l2=dx*dx+dz*dz || 1e-9;
        let t=((p.x-ax)*dx+(p.z-az)*dz)/l2;
        t=Math.max(0,Math.min(1,t));
        d=Math.hypot(p.x-(ax+dx*t),p.z-(az+dz*t));
      } else {
        const ay=ROUTE[k][1], dy=ROUTE[k+1][1]-ay;
        const l2=dx*dx+dy*dy+dz*dz || 1e-9;
        let t=((p.x-ax)*dx+(p.y-ay)*dy+(p.z-az)*dz)/l2;
        t=Math.max(0,Math.min(1,t));
        d=Math.hypot(p.x-(ax+dx*t),p.y-(ay+dy*t),p.z-(az+dz*t));
      }
      if(d<best) best=d;
    }
    return best===Infinity ? 0 : best;
  }

  let CAP=[];
  let SPD=[];
  let ROUTE_DIST=[];
  function computeDerived() {
  CAP=[];
  ROUTE_DIST=new Array(N).fill(0);
  for(let k=1;k<N;k++) {
    const a=ROUTE[k-1], b=ROUTE[k];
    const dx=b[0]-a[0], dy=b[1]-a[1], dz=b[2]-a[2];
    ROUTE_DIST[k]=ROUTE_DIST[k-1]+(flatSeg(k-1)?Math.hypot(dx,dz):Math.hypot(dx,dy,dz));
  }
  for(let k=0;k<N;k++) {
    let kmax=0;
    for(let m=Math.max(1,k-2);m<=Math.min(N-2,k+2);m++) {
      const ax=ROUTE[m][0]-ROUTE[m-1][0], az=ROUTE[m][2]-ROUTE[m-1][2];
      const bx=ROUTE[m+1][0]-ROUTE[m][0], bz=ROUTE[m+1][2]-ROUTE[m][2];
      let la=Math.hypot(ax,az), lb=Math.hypot(bx,bz);
      let dh=Math.abs(Math.atan2(ax*bz-az*bx,ax*bx+az*bz));
      if(ROUTE[m][5]!==undefined) {
        // road with a surface direction: only turning along the surface slows the car (going up a loop or a bank does not)
        const ay=ROUTE[m][1]-ROUTE[m-1][1], by=ROUTE[m+1][1]-ROUTE[m][1];
        la=Math.hypot(ax,ay,az); lb=Math.hypot(bx,by,bz);
        const ux=ax/(la||1),uy=ay/(la||1),uz=az/(la||1),vx=bx/(lb||1),vy=by/(lb||1),vz=bz/(lb||1);
        const cx=uy*vz-uz*vy, cy=uz*vx-ux*vz, cz=ux*vy-uy*vx;
        const turn=Math.abs(cx*ROUTE[m][4]+cy*ROUTE[m][5]+cz*ROUTE[m][6]);
        dh=Math.atan2(turn,ux*vx+uy*vy+uz*vz);
      }
      const curv=dh/Math.max((la+lb)/2,1e-6);
      if(curv>kmax) kmax=curv;
    }
    CAP.push(kmax>1e-6 ? Math.sqrt(LAT_ACCEL/kmax)*3.6 : 1000);
  }

  // The recorded lap lost speed on every landing. A smoother landing keeps that speed, and the bot
  // used to brake to match the slower recorded number. So after each sudden drop we keep the
  // speed from just before it for a few points (corners are still limited by CAP below).
  SPD=ROUTE.map(p=>p[3]);
  for(let k=1;k<N;k++) {
    if(ROUTE[k-1][3]-ROUTE[k][3]>12) {
      const keep=ROUTE[k-1][3];
      for(let m=k;m<Math.min(N,k+10);m++) SPD[m]=Math.max(SPD[m],keep);
    }
  }
  }
  computeDerived();

  function lateral(p,i,u) {
    const k=Math.max(0,Math.min(N-2,i));
    if(u && !flatSeg(k)) {
      const ax=ROUTE[k][0], ay=ROUTE[k][1], az=ROUTE[k][2];
      let dx=ROUTE[k+1][0]-ax, dy=ROUTE[k+1][1]-ay, dz=ROUTE[k+1][2]-az;
      const l=Math.hypot(dx,dy,dz)||1e-9;
      let t=((p.x-ax)*dx+(p.y-ay)*dy+(p.z-az)*dz)/(l*l);
      t=Math.max(0,Math.min(1,t));
      const ox=p.x-(ax+dx*t), oy=p.y-(ay+dy*t), oz=p.z-(az+dz*t);
      dx/=l; dy/=l; dz/=l;
      return -((dy*oz-dz*oy)*u.x+(dz*ox-dx*oz)*u.y+(dx*oy-dy*ox)*u.z);
    }
    const ax=ROUTE[k][0], az=ROUTE[k][2], bx=ROUTE[k+1][0], bz=ROUTE[k+1][2];
    const dx=bx-ax, dz=bz-az;
    const l=Math.hypot(dx,dz)||1e-9;
    let t=((p.x-ax)*dx+(p.z-az)*dz)/(l*l);
    t=Math.max(0,Math.min(1,t));
    const ox=p.x-(ax+dx*t), oz=p.z-(az+dz*t);
    return -(dz*ox-dx*oz)/l;
  }

  // ================= SELF-LEARNING =================
  const ch = (typeof BroadcastChannel !== "undefined") ? new BroadcastChannel("ptbot") : null;
  const L = bot.learn = {best:null,cur:null,run:null,runNo:0,pending:false,pendingFrame:0};
  function freshLearner() {
    L.best={cp:[],seg:[],dur:[],vexit:[],gt:[],gv:[],offs:new Array(N).fill(0),spd:new Array(N).fill(0)};
    L.cur={seg:[],offs:new Array(N).fill(0),spd:new Array(N).fill(0)};
    L.run=null; L.runNo=0; L.pending=false; L.pendingFrame=0;
  }
  freshLearner();
  const DEF = {sp:1, off:0, br:4.5, ab:0}; // lower value starts braking earlier
  function clampv(v,a,b) { return Math.max(a,Math.min(b,v)); }
  function rnd(a) { return (Math.random()*2-1)*a; }
  function post(m) { if(ch) { try { ch.postMessage(m); } catch(_) {} } }
  function saveBest() { post({type:"save", track:TRACK_ID, data:{n:N, best:L.best}}); }

  function segOf(i) {
    const cp=L.best.cp;
    let s=0;
    for(let j=0;j<cp.length;j++) {
      if(cp[j].idx<=i) s=j+1; else break;
    }
    return s;
  }

  function paramsAt(i) {
    if(!LEARN) return DEF;
    return L.cur.seg[segOf(i)] || DEF;
  }

  function offAt(k) {
    if(!LEARN) return 0;
    return L.cur.offs[Math.max(0,Math.min(N-1,k))] || 0;
  }

  function spdAt(k) {
    if(!LEARN) return 0;
    return L.cur.spd[Math.max(0,Math.min(N-1,k))] || 0;
  }

  function rangeOf(s) {
    const cp=L.best.cp;
    const lo=s>0 && cp[s-1] ? cp[s-1].idx : 0;
    const hi=cp[s] ? Math.max(cp[s].idx,lo+1) : N;
    return [lo,Math.min(hi,N)];
  }

  function requestRestart(delay,why,frames) {
    L.pending=true;
    L.pendingFrame=frames;
    console.log("PTBOT_LEARN restart ("+why+")");
    post({type:"restart", delay:delay});
  }

  function failRun(why,state) {
    if(!LEARN || L.pending) return;
    if(L.run) L.run.failed=true;
    console.log("PTBOT_LEARN fail: "+why+" (frame "+state.frames+", checkpoints done this run: "+(L.run ? L.run.cps.length : 0)+")");
    requestRestart(300,why,state.frames);
  }

  function startRun() {
    L.runNo++;
    L.pending=false;
    const B=L.best;
    const seg=[];
    for(let s=0;s<Math.max(B.cp.length,1);s++) {
      const p=B.seg[s] || DEF;
      seg.push({sp:p.sp, off:0, br:p.br, ab:p.ab||0});
    }
    const maxS=Math.min(B.gt.length,seg.length);
    const offs=B.offs.slice();
    const spd=B.spd.slice();
    const mutated=[];
    const desc=[];
    const scale=0.5+1.0*Math.exp(-L.runNo/EXPLORE_RUNS);

    function bump(arr,r,amp,lim) {
      const span=r[1]-r[0];
      const c=r[0]+Math.random()*span;
      const wd=3+Math.random()*(Math.random()<0.3 ? 22 : 10);
      for(let j=r[0];j<r[1];j++) {
        const edge=Math.min(1,(j-r[0])/6,(r[1]-1-j)/6);
        arr[j]=clampv(arr[j]+amp*Math.exp(-((j-c)*(j-c))/(2*wd*wd))*Math.max(0,edge),-lim,lim);
      }
      return Math.round(c);
    }

    if(LEARN && maxS>0) {
      for(let s=0;s<maxS;s++) { if(Math.random()<0.4) mutated.push(s); }
      if(!mutated.length) mutated.push(Math.floor(Math.random()*maxS));

      for(const s of mutated) {
        const g=seg[s];
        const r=rangeOf(s);
        const ok=(r[1]-r[0])>=8;
        const n=Math.random()<0.3 ? 2 : 1;

        for(let t=0;t<n;t++) {
          const w=Math.random();
          if(w<0.40 && ok) {
            const amp=rnd(1.0*scale);
            const c=bump(offs,r,amp,MAX_LINE_SHIFT);
            desc.push("line "+(amp>0?"right ":"left ")+Math.abs(amp).toFixed(1)+" m near point "+c);
          } else if(w<0.64 && ok) {
            const amp=rnd(0.06*scale);
            const c=bump(spd,r,amp,MAX_SPEED_SHIFT);
            desc.push("speed "+(amp>0?"+":"")+(amp*100).toFixed(0)+"% near point "+c);
          } else if(w<0.74) {
            g.sp=clampv(g.sp+rnd(0.03*scale),0.8,1.12);
            desc.push("speed x"+g.sp.toFixed(2)+" in stretch "+(s+1));
          } else if(w<0.84) {
            g.br=clampv(g.br+rnd(1*scale),3,10);
            desc.push("braking "+g.br.toFixed(1)+" in stretch "+(s+1));
          } else if(AIRBRAKE) {
            g.ab=clampv((g.ab||0)+rnd(0.06),-0.35,0.35);
            desc.push("landing tilt "+g.ab.toFixed(2)+" rad in stretch "+(s+1));
          }
        }
      }
    }

    L.cur={seg:seg,offs:offs,spd:spd};
    L.run={n:L.runNo,cps:[],mut:mutated,failed:false};
    console.log("PTBOT_LEARN run "+L.runNo+": "+B.gt.length+" checkpoints in the ghost, trying: "+(desc.length ? desc.join("; ") : "nothing (measuring baseline)"));
  }

  function onCheckpoint(frames,speed,idx,isFinish,state) {
    if(!LEARN || !L.run || L.run.failed || L.pending) return;

    const R=L.run, B=L.best, k=R.cps.length;
    const prevFrames=k>0 ? R.cps[k-1].frames : 0;
    const dur=frames-prevFrames;
    R.cps.push({frames:frames,speed:speed,idx:idx});
    const name=isFinish ? "finish" : "checkpoint "+(k+1);

    if(k>=B.gt.length) {
      B.cp[k]={idx:idx};
      B.gt[k]=frames; B.gv[k]=speed;
      B.dur[k]=dur; B.vexit[k]=speed;
      console.log("PTBOT_LEARN ghost set at "+name+": "+(frames/1000).toFixed(2)+" s, "+Math.round(speed)+" km/h");
      saveBest();
      return;
    }

    const dt=frames-B.gt[k];
    const dv=speed-B.gv[k];
    const last=B.gt.length-1;
    const remFrames=Math.max(0,B.gt[last]-B.gt[k]);
    const credit=SPEED_VALUE*clampv(dv,-20,20)/3.6*remFrames/AVG_MS;
    const dEff=dt-credit;

    // Never fail a run at a checkpoint if the bot is already ahead AND faster.
    // Still allow the faster stretch to be saved by the normal improvement logic below.
    


const aheadAndFaster = dt <= 0 && dv >= -2;
const worse = !aheadAndFaster && (dEff > 25 || dt > 250);

console.log("PTBOT_RESTART_CHECK", {
  checkpoint: name,
  dt,
  dv,
  dEff,
  aheadAndFaster,
  worse,
  shouldRestart: worse && !aheadAndFaster
});

const info = (dt > 0 ? "+" : "") +
  (dt / 1000).toFixed(3) + " s, " +
  (dv > 0 ? "+" : "") + Math.round(dv) + " km/h";

console.log("PTBOT_CHECKPOINT_DIAG", {
  checkpoint: name,
  botFrames: frames,
  ghostFrames: B.gt[k],
  dtSeconds: +(dt / 1000).toFixed(3),
  botSpeed: +speed.toFixed(1),
  ghostSpeed: +B.gv[k].toFixed(1),
  dv: +dv.toFixed(1),
  dEff: +dEff.toFixed(3),
  aheadAndFaster,
  worse
});


    if(worse && !aheadAndFaster) {
  console.log("PTBOT_LEARN "+name+" vs ghost: "+info+" -> not enough, restarting");
  failRun("behind the ghost at "+name,state);
  return;
}

    if(dEff>=-3) {
      console.log("PTBOT_LEARN "+name+" vs ghost: "+info+" -> "+(aheadAndFaster ? "ahead and faster; continuing" : "keeping up, carrying on"));
      return;
    }

    const sdt=dur-B.dur[k];
    const sdv=speed-B.vexit[k];
    const screds=SPEED_VALUE*clampv(sdv,-20,20)/3.6*remFrames/AVG_MS;
    const stretchBetter=(sdt-screds)<-3;

    if(stretchBetter) {
      const c=L.cur.seg[k] || DEF;
      B.seg[k]={sp:c.sp,off:0,br:c.br,ab:c.ab||0};
      const rg=rangeOf(k);
      for(let j=rg[0];j<rg[1];j++) {
        B.offs[j]=Math.round(L.cur.offs[j]*1000)/1000;
        B.spd[j]=Math.round(L.cur.spd[j]*1000)/1000;
      }
      B.dur[k]=dur;
      B.vexit[k]=speed;
      const gain=Math.max(0,B.gt[k]-frames);
      B.gt[k]=frames;
      B.gv[k]=speed;
      for(let j=k+1;j<B.gt.length;j++) B.gt[j]=Math.max(0,B.gt[j]-gain);
      console.log("PTBOT_LEARN "+name+" vs ghost: "+info+" -> AHEAD, changes kept, carrying on");
      saveBest();
      console.log("PTBOT_LEARN_STATE",JSON.stringify(B));
    } else {
      console.log("PTBOT_LEARN "+name+" vs ghost: "+info+" -> ahead, carrying on (this stretch itself was not better, so its changes are not kept)");
    }
  }

  if(ch) {
    ch.onmessage=(ev) => {
      const m=ev.data || {};
      if(m.type==="rec") { try { setRec(!!m.on); } catch(_) {} return; }
      if(m.type==="load" && (m.track||null)===(TRACK_ID||null) && m.data && m.data.n===N && m.data.best &&
         Array.isArray(m.data.best.gt) && Array.isArray(m.data.best.spd) &&
         Array.isArray(m.data.best.offs) && m.data.best.offs.length===N &&
         m.data.best.spd.length===N && L.best.cp.length===0 && L.runNo<=1) {
        L.best=m.data.best;
        console.log("PTBOT_LEARN loaded saved progress: "+L.best.gt.length+" checkpoints in the ghost");
        L.runNo=0;
        startRun();
      }
    };
    post({type:"hello",track:TRACK_ID});
  }

  if(LEARN) startRun();

  function groundPitch(i,speedKmh) {
    const D=Math.max(8,speedKmh/3.6*AIR_LOOK_SEC);
    let acc=0,j=i;
    while(j<N-1 && acc<D) {
      acc+=Math.hypot(ROUTE[j+1][0]-ROUTE[j][0],ROUTE[j+1][2]-ROUTE[j][2]);
      j++;
    }
    const k=Math.max(1,j);
    const dh=Math.hypot(ROUTE[k][0]-ROUTE[k-1][0],ROUTE[k][2]-ROUTE[k-1][2])||1;
    return Math.atan2(ROUTE[k][1]-ROUTE[k-1][1],dh);
  }

  // Estimate geometric curvature in full 3D. In a loop, the car must follow the
  // changing tangent even when that change is not a sideways corner. A long
  // look-ahead can point across the loop's chord and make the bot steer sharply
  // toward the ground, so cap look-ahead distance on tight 3D bends.
  function localPathCurvature(i) {
    let maxCurv=0;
    for(let k=Math.max(1,i-2);k<=Math.min(N-2,i+5);k++) {
      const a=ROUTE[k-1], b=ROUTE[k], c=ROUTE[k+1];
      const ax=b[0]-a[0], ay=b[1]-a[1], az=b[2]-a[2];
      const bx=c[0]-b[0], by=c[1]-b[1], bz=c[2]-b[2];
      const la=Math.hypot(ax,ay,az), lb=Math.hypot(bx,by,bz);
      if(la<1e-4 || lb<1e-4) continue;
      const dot=clampv((ax*bx+ay*by+az*bz)/(la*lb),-1,1);
      const bend=Math.acos(dot);
      maxCurv=Math.max(maxCurv,bend/Math.max(1e-4,(la+lb)*0.5));
    }
    return maxCurv;
  }

  function targetSpeed(i) {
    let best=Infinity;
    // Preview by physical distance, not a fixed waypoint count (the 3D route now
    // has denser points). This sees sharp corners early enough to start braking.
    let hi=i;
    while(hi<N-1 && hi-i<150 && ROUTE_DIST[hi]-ROUTE_DIST[i]<320) hi++;
    const Pi=paramsAt(i);

    for(let j=i;j<=hi;j++) {
      const Pj=paramsAt(j);
      let zc=1000;
      for(const z of SLOW_ZONES) { if(j>=z[0] && j<=z[1] && z[2]<zc) zc=z[2]; }
      const v=Math.min(SPD[j]*SPEED_FACTOR*Pj.sp*(1+spdAt(j)),CAP[j],zc)+Pi.br*(j-i);
      if(v<best) best=v;
    }
    return Math.max(best,25);
  }

  function rotateVec(q,v) {
    const qx=q.x,qy=q.y,qz=q.z,qw=q.w;
    const ix=qw*v.x+qy*v.z-qz*v.y;
    const iy=qw*v.y+qz*v.x-qx*v.z;
    const iz=qw*v.z+qx*v.y-qy*v.x;
    const iw=-qx*v.x-qy*v.y-qz*v.z;
    return {
      x:ix*qw+iw*-qx+iy*-qz-iz*-qy,
      y:iy*qw+iw*-qy+iz*-qx-ix*-qz,
      z:iz*qw+iw*-qz+ix*-qy-iy*-qx
    };
  }

  function decode(buf) {
    const e=new Uint8Array(buf);
    const d=new DataView(e.buffer,e.byteOffset,e.byteLength);
    if(e.length<48) return null;
    let o=DECODE_OFFSET;
    const frames=e[o]|(e[o+1]<<8)|(e[o+2]<<16);
    o+=3;
    const speed=d.getFloat32(o,true);
    o+=4;
    const flags=e[o++];
    let finish=null;
    if(flags&2) {
      finish=e[o]|(e[o+1]<<8)|(e[o+2]<<16);
      o+=3;
    }
    const checkpoint=d.getUint16(o,true);
    o+=2;
    const position={x:d.getFloat32(o,true),y:d.getFloat32(o+4,true),z:d.getFloat32(o+8,true)};
    o+=12;
    const quaternion={
      x:d.getFloat32(o,true),y:d.getFloat32(o+4,true),
      z:d.getFloat32(o+8,true),w:d.getFloat32(o+12,true)
    };

    if(![speed,position.x,position.y,position.z,quaternion.x,quaternion.y,quaternion.z,quaternion.w].every(Number.isFinite) ||
       Math.abs(speed)>1000 || Math.abs(position.x)>100000 ||
       Math.abs(position.y)>100000 || Math.abs(position.z)>100000) return null;

    return {
      frames,speedKmh:speed,hasStarted:!!(flags&1),wheels:(flags>>3)&15,
      finishFrames:finish,nextCheckpointIndex:checkpoint,
      hasCheckpointToRespawnAt:!!(flags&4),position,quaternion
    };
  }

  function choose(state,id) {
    if(!state) return {up:true,right:false,down:false,left:false,reset:false};
    // If a complete checkpoint-respecting route could not be built, stop safely
    // instead of blindly accelerating into a hole or wall.
    if(bot.noRoute) return {up:false,right:false,down:true,left:false,reset:false};

    const lf=bot.lastFrames[id];
    if(lf===undefined || state.frames<lf) {
      bot.idx[id]=0;
      bot.acc[id]=0;
      bot.stuck[id]=0;
      bot.lastPos[id]=undefined;
      bot.hist[id]=[];
      bot.lastCrash[id]=-100000;
      bot.lastOff[id]=-100000;
      bot.finLogged[id]=false;
      bot.lastCp[id]=undefined;
      bot.lastAirborne[id]=false;
      bot.keepSpeed[id]=0;
      bot.keepUntil[id]=0;
      bot.lastLand[id]=-100000;
      bot.landSteerUntil[id]=0;
      bot.airSince[id]=undefined;
      bot.airV0[id]=undefined;
      bot.lastPitch[id]=undefined;
      bot.airMatched[id]=false;
      if(LEARN && lf!==undefined) startRun();
    }
    bot.lastFrames[id]=state.frames;

    if(LEARN && L.pending && state.frames-L.pendingFrame>6000) {
      L.pendingFrame=state.frames;
      console.log("PTBOT_LEARN still waiting for a restart - sending it again (press T yourself if nothing happens)");
      post({type:"restart",delay:0});
    }

    if(!state.hasStarted) return {up:true,right:false,down:false,left:false,reset:false};

    if(state.finishFrames!==null) {
      if(!bot.finLogged[id]) {
        bot.finLogged[id]=true;
        console.log("PTBOT_FINISH","frames="+state.finishFrames);
        if(LEARN) {
          onCheckpoint(state.finishFrames,Math.abs(state.speedKmh),N-1,true,state);
          if(!L.pending) requestRestart(2500,"finished the track",state.frames);
        }
      }
      return {up:true,right:false,down:false,left:false,reset:false};
    }

    const previousPos=bot.lastPos[id];
    let respawned=false;
    if(previousPos) {
      const dx=state.position.x-previousPos.x;
      const dy=state.position.y-previousPos.y;
      const dz=state.position.z-previousPos.z;
      if(Math.hypot(dx,dy,dz)>5) {
        respawned=true;
        failRun("sudden position jump (respawn)",state);
        bot.idx[id]=0;
        bot.acc[id]=0;
        bot.stuck[id]=0;
        bot.hist[id]=[];
      }
    }

    const speed=Math.abs(state.speedKmh);
    const i=nearestIndex(state.position,id,respawned);

    if(LEARN) {
      const lc=bot.lastCp[id];
      if(lc!==undefined && state.nextCheckpointIndex>lc) onCheckpoint(state.frames,speed,i,false,state);
      bot.lastCp[id]=state.nextCheckpointIndex;
    }

    let ld=Math.max(LOOK_BASE,Math.min(LOOK_MAX,LOOK_BASE+speed*LOOK_SPEED));
    const pathCurvature=localPathCurvature(i);
    if(pathCurvature>0.025) ld=Math.min(ld,Math.max(8,Math.min(28,1.15/pathCurvature)));
    let target=lookAhead(state.position,ld,i);
    if(LEARN) {
      const toff=offAt(target.index);
      if(toff) {
        const k=Math.max(1,Math.min(N-1,target.index));
        const ddx=ROUTE[k][0]-ROUTE[k-1][0],ddz=ROUTE[k][2]-ROUTE[k-1][2];
        if(flatSeg(k-1)) {
          const ll=Math.hypot(ddx,ddz)||1;
          target={x:target.x+toff*(-ddz/ll),y:target.y,z:target.z+toff*(ddx/ll),index:target.index};
        } else {
          const ddy=ROUTE[k][1]-ROUTE[k-1][1], ll=Math.hypot(ddx,ddy,ddz)||1;
          const dx1=ddx/ll,dy1=ddy/ll,dz1=ddz/ll,nx=ROUTE[k][4],ny=ROUTE[k][5],nz=ROUTE[k][6];
          target={x:target.x+toff*(dy1*nz-dz1*ny),y:target.y+toff*(dz1*nx-dx1*nz),z:target.z+toff*(dx1*ny-dy1*nx),index:target.index};
        }
      }
    }

    const f=rotateVec(state.quaternion,{x:0,y:0,z:FORWARD_SIGN});
    // "up" for steering: the car's own up when it is on a steep bank, wall or loop, otherwise the world up (as before)
    let upv={x:0,y:1,z:0};
    if(state.wheels!==0) {
      const cu=rotateVec(state.quaternion,{x:0,y:1,z:0});
      if(cu.y<0.8) upv=cu;
    }
    const dx=target.x-state.position.x;
    const dy=target.y-state.position.y;
    const dz=target.z-state.position.z;
    const fu=f.x*upv.x+f.y*upv.y+f.z*upv.z, tu=dx*upv.x+dy*upv.y+dz*upv.z;
    let fx=f.x-fu*upv.x, fy=f.y-fu*upv.y, fz=f.z-fu*upv.z;
    let tx=dx-tu*upv.x, ty=dy-tu*upv.y, tz=dz-tu*upv.z;
    const fl=Math.hypot(fx,fy,fz)||1, tl=Math.hypot(tx,ty,tz)||1;
    fx/=fl; fy/=fl; fz/=fl; tx/=tl; ty/=tl; tz/=tl;
    const cross=(fy*tz-fz*ty)*upv.x+(fz*tx-fx*tz)*upv.y+(fx*ty-fy*tx)*upv.z;
    const dot=Math.max(-1,Math.min(1,fx*tx+fy*ty+fz*tz));
    const angle=Math.atan2(cross,dot);
    const abs=Math.abs(angle);

    let tSpeed=targetSpeed(i);
    if(state.frames<(bot.keepUntil[id]||0) && bot.keepSpeed[id]>tSpeed) tSpeed=bot.keepSpeed[id];
    let up=true,down=false;
    if(speed>tSpeed+8 && speed>40) { up=false;down=true; }
    else if(speed>tSpeed) up=false;
    if(abs>1.0 && speed>60) up=false;

    const lat=lateral(state.position,i,upv)-(LEARN ? offAt(i) : 0);

    // Detect landing, then briefly soften heading correction to reduce sharp swerves.
    const airborneNow=state.wheels===0;
    const wasAirborne=bot.lastAirborne[id]===true;
    if(wasAirborne && !airborneNow) {
      bot.landSteerUntil[id]=state.frames+18;
      if(bot.airSince[id]!==undefined && state.frames-bot.airSince[id]>60) {
        bot.lastLand[id]=state.frames;
        bot.keepSpeed[id]=bot.airV0[id]||0;
        bot.keepUntil[id]=state.frames+450;
      }
    }
    bot.lastAirborne[id]=airborneNow;

    const landing=state.frames<(bot.landSteerUntil[id]||0);
    const headingScale=landing ? 0.65 : 1;
    const steerAngle=angle*headingScale+
      LINE_PULL*Math.max(-8,Math.min(8,lat));

    const s=Math.max(-1,Math.min(1,
      steerAngle*STEER_GAIN*
      (1+LOW_SPEED_BOOST*Math.max(0,1-speed/150))*STEER_SIGN
    ));

    let e=(bot.acc[id]??0)+s;
    let right=false,left=false;
    if(e>=1) { right=true;e-=1; }
    else if(e<=-1) { left=true;e+=1; }
    bot.acc[id]=e;

    let reset=false;
    const lp=bot.lastPos[id];
    if(lp) {
      const mdx=state.position.x-lp.x;
      const mdy=state.position.y-lp.y;
      const mdz=state.position.z-lp.z;
      const moved=Math.sqrt(mdx*mdx+mdy*mdy+mdz*mdz);
      if(moved<0.18 && speed<5) bot.stuck[id]=(bot.stuck[id]??0)+1;
      else bot.stuck[id]=0;
    }

    if((bot.stuck[id]??0)>1500) {
      bot.stuck[id]=0;
      if(LEARN) failRun("stuck",state);
      else reset=true;
    }

    bot.lastPos[id]={x:state.position.x,y:state.position.y,z:state.position.z};

    const err=crossTrack(state.position,i);
    let hist=bot.hist[id];
    if(!hist) { hist=[];bot.hist[id]=hist; }
    if(state.frames%10===0 && (hist.length===0 || hist[hist.length-1][0]!==state.frames)) {
      hist.push([state.frames,speed]);
      if(hist.length>14) hist.shift();
    }

    let vmax=0;
    for(const h of hist) if(h[0]>=state.frames-120 && h[1]>vmax) vmax=h[1];

    if(vmax-speed>45 && state.frames-(bot.lastCrash[id]??-100000)>2000) {
      bot.lastCrash[id]=state.frames;
      if(vmax-speed>80) {
        if(state.frames-(bot.lastLand[id]??-100000)<400) console.log("PTBOT_CRASH ignored: the speed drop was right after a landing");
        else failRun("crash (big speed drop)",state);
      }
      console.log("PTBOT_CRASH","frame="+state.frames,"idx="+i+"/"+(N-1),
        "pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0),
        "speed="+Math.round(vmax)+"->"+Math.round(speed),
        "offLine="+err.toFixed(1)+"m","want="+Math.round(tSpeed),"ang="+angle.toFixed(2));
    }

    if(LEARN) {
      var OFFLINE_BASE = MAX_LINE_SHIFT + 8;
      var OFFLINE_AIR = MAX_LINE_SHIFT + 20;
      var OFFLINE_SPEED_FACTOR = speed > 140 ? 8 : 0;
      var offlineThreshold = (state.wheels === 0) ? OFFLINE_AIR : (OFFLINE_BASE + OFFLINE_SPEED_FACTOR);
      if (err > offlineThreshold) failRun("far off the line ("+err.toFixed(0)+" m)",state);
    }
    if(err>5 && state.frames-(bot.lastOff[id]??-100000)>150) {
      bot.lastOff[id]=state.frames;
      console.log("PTBOT_OFF","frame="+state.frames,"idx="+i+"/"+(N-1),
        "side="+(lat>0?"right":"left"),"off="+err.toFixed(1)+"m",
        "speed="+Math.round(speed),"pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0));
    }

    if(reset) console.log("PTBOT_RESET","frame="+state.frames,"idx="+i+"/"+(N-1),
      "pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0));

    bot.dbg={i,v:Math.round(speed),want:Math.round(tSpeed),ang:+angle.toFixed(2),
      steer:+s.toFixed(2),off:+err.toFixed(1),lat:+lat.toFixed(1)};

    // ---- AIRBORNE HANDLING ----
    const airborne=(state.wheels===0);
    const pitch=Math.asin(Math.max(-1,Math.min(1,f.y)));

    if(airborne) {
      if(bot.airSince[id]===undefined) {
        bot.airSince[id]=state.frames;
        bot.airV0[id]=speed;
        bot.airMatched[id]=false;
      }
    } else if(bot.airSince[id]!==undefined) {
      const t=state.frames-bot.airSince[id];
      if(t>60) {
        console.log("PTBOT_JUMP","airtime="+t,
          "speed="+Math.round(bot.airV0[id])+"->"+Math.round(speed),
          "idx="+i+"/"+(N-1),"angle="+angle.toFixed(2),"steer="+s.toFixed(2),
          "left="+left,"right="+right,"up="+up,"down="+down,
          "off="+err.toFixed(1),"lat="+lat.toFixed(1),
          "landing tilt="+(pitch*57.3).toFixed(0),
          "ground="+(groundPitch(i,speed)*57.3).toFixed(0));
      }
      bot.airSince[id]=undefined;
      bot.airMatched[id]=false;
    }

    const airFor=airborne ? state.frames-bot.airSince[id] : 0;
    const prevPitch=bot.lastPitch[id];
    bot.lastPitch[id]=pitch;

    if(airborne && airFor>AIR_DELAY && AIRBRAKE) {
      const rate=(prevPitch===undefined)?0:(pitch-prevPitch);
      const want=(AIR_MATCH_SLOPE?groundPitch(i,speed):0)+AIR_BIAS+(LEARN?(paramsAt(i).ab||0):0);
      const predicted=pitch+rate*AIR_LEAD;
      const eAir=want-predicted;
      up=false;down=false;
      const err2=want-pitch;

      if(bot.airMatched[id]) {
        if(Math.abs(err2)>AIR_DEADBAND*3) bot.airMatched[id]=false;
      } else if(Math.abs(err2)<AIR_DEADBAND) {
        bot.airMatched[id]=true;
      }

      if(!bot.airMatched[id]) {
        if(eAir>AIR_DEADBAND && err2>0.02) {
          if(AIR_DOWN_IS_NOSE_UP) down=true; else up=true;
        } else if(eAir<-AIR_DEADBAND && err2<-0.02) {
          if(AIR_DOWN_IS_NOSE_UP) up=true; else down=true;
        }
      }
      bot.dbg.air={t:airFor,pitch:+pitch.toFixed(2),want:+want.toFixed(2),level:!!bot.airMatched[id]};
    }

    if(down && !airborne && state.frames-(bot.lastLand[id]??-100000)<700 &&
       state.frames-(bot.lastBrakeLog[id]??-100000)>100) {
      bot.lastBrakeLog[id]=state.frames;
      console.log("PTBOT_BRAKE","after landing: frame="+state.frames,"idx="+i+"/"+(N-1),
        "speed="+Math.round(speed),"want="+Math.round(tSpeed),"ang="+angle.toFixed(2),"wheels="+state.wheels);
    }

    return {up,right,down,left,reset};
  }

  function record(state,id) {
    if(!state) return;
    if(bot.recLastFrames!==undefined && state.frames<bot.recLastFrames) {
      bot.recRun++;
      bot.recChunk=[];
      bot.recChunkIndex=0;
      bot.recDone=false;
      bot.recLastSample=-1;
      console.log("PTBOT_LAP_NEW_RUN",bot.recRun);
    }
    bot.recLastFrames=state.frames;
    if(bot.recDone) return;

    if(state.finishFrames!==null) {
      if(bot.recChunk.length>0) console.log("PTBOT_LAP","run="+bot.recRun,"chunk="+bot.recChunkIndex,JSON.stringify(bot.recChunk));
      console.log("PTBOT_LAP_DONE","run="+bot.recRun,"finishFrames="+state.finishFrames);
      bot.recChunk=[];
      bot.recDone=true;
      return;
    }

    if(!state.hasStarted) return;
    if(state.frames%100!==0 || state.frames===bot.recLastSample) return;
    bot.recLastSample=state.frames;
    bot.recChunk.push([+state.position.x.toFixed(1),+state.position.y.toFixed(1),
      +state.position.z.toFixed(1),Math.round(state.speedKmh)]);

    if(bot.recChunk.length>=100) {
      console.log("PTBOT_LAP","run="+bot.recRun,"chunk="+bot.recChunkIndex,JSON.stringify(bot.recChunk));
      bot.recChunkIndex++;
      bot.recChunk=[];
    }
  }

  // ---- DRIVE RECORDER: records what the human does, bot steps aside ----
  bot.recOn=false; bot.recS=[]; bot.recLast=-1;
  function sample(state,ctl,id) {
    if(!state || !state.hasStarted) return;
    if(state.frames<bot.recLast) bot.recS.push([-1]);
    bot.recLast=state.frames;
    if(state.frames%20!==0) return;
    if(bot.recS.length>40000) return;
    const q=state.quaternion, p=state.position;
    bot.recS.push([state.frames,+p.x.toFixed(2),+p.y.toFixed(2),+p.z.toFixed(2),
      +q.x.toFixed(4),+q.y.toFixed(4),+q.z.toFixed(4),+q.w.toFixed(4),
      Math.round(state.speedKmh*10)/10,state.wheels,
      (ctl&&ctl.up?1:0)|(ctl&&ctl.right?2:0)|(ctl&&ctl.down?4:0)|(ctl&&ctl.left?8:0),state.nextCheckpointIndex]);
  }
  function setRec(on) {
    if(on===bot.recOn) return;
    bot.recOn=on;
    if(on) { bot.recS=[]; bot.recLast=-1; bot.enabled=false; console.log("PTBOT_REC started - you drive now"); }
    else {
      bot.enabled=true;
      console.log("PTBOT_REC stopped, "+bot.recS.length+" samples");
      post({type:"drive",track:TRACK_ID,samples:bot.recS});
      bot.recS=[];
    }
  }

  ${generateRoute.toString()}
  ${generateRoute3D.toString()}
  const USE_3D = ${USE_3D};

  // ---- ROUTE SWITCHING ----
  const PER_CAR=["idx","acc","stuck","lastPos","lastFrames","hist","lastCrash","lastOff","lastCp","airSince","airV0",
    "lastAirborne","keepSpeed","keepUntil","lastLand","lastBrakeLog","landSteerUntil","lastPitch","airMatched","finLogged"];
  function applyRoute(route,trackId,kind) {
    ROUTE=route; N=route.length; TRACK_ID=trackId;
    SLOW_ZONES = kind==="recorded" ? SLOW_ZONES_REC.slice() : [];
    computeDerived();
    for(const k of PER_CAR) bot[k]=Object.create(null);
    bot.route=ROUTE; bot.noRoute=false; bot.routeKind=kind;
    if(LEARN) { freshLearner(); post({type:"hello",track:TRACK_ID}); startRun(); }
  }
  function hashStr(t) { let h=5381; for(let i=0;i<t.length;i++) h=((h*33)^t.charCodeAt(i))>>>0; return h.toString(16); }
  let lastTrackData=null;

  // ---- TRACK CAPTURE: reads the track the game gives the physics worker ----
  const TRACK_LIB = Object.create(null);
  function r3(v) { return Math.round(v*1000)/1000; }
  function captureTrack(m) {
    if(!m || typeof m!=="object") return;
    if(m.messageType===0 && Array.isArray(m.trackParts)) {
      for(const p of m.trackParts) TRACK_LIB[p.id]={v:p.vertices,detector:p.detector||null,startOffset:p.startOffset||null};
      return;
    }
    if(m.messageType===3 && typeof m.trackData==="string" && m.carRecording==null) {
      console.log("PTBOT_TRACK worker saw the track ("+m.trackData.length+" characters), reading it");
      const track=Ko.fromSaveString(m.trackData);
      if(!track) { console.log("PTBOT_TRACK could not read the track"); return; }
      const parts=[], used=Object.create(null);
      track.forEachPart((x,y,z,id,rot,axis,color,cpo,so)=>{
        const q=eo[axis][rot];
        parts.push([x,y,z,id,rot,axis,cpo==null?-1:cpo,so==null?-1:so,r3(q.x),r3(q.y),r3(q.z),r3(q.w)]);
        used[id]=true;
      });
      const lib={};
      for(const id of Object.keys(used)) {
        const e=TRACK_LIB[id];
        if(!e) continue;
        lib[id]={v:Array.from(e.v,r3),detector:e.detector,startOffset:e.startOffset};
      }
      let start=null, cps=null, fins=null;
      try { const st=track.getStartTransform(); start={p:[st.position.x,st.position.y,st.position.z],q:[st.quaternion.x,st.quaternion.y,st.quaternion.z,st.quaternion.w]}; } catch(_) {}
      try { cps=track.getCheckpoints(); } catch(_) {}
      try { fins=track.getFinishes(); } catch(_) {}
      const data={partSize:Lo.partSize,parts:parts,lib:lib,start:start,checkpoints:cps,finishes:fins,
        mountainOffset:m.mountainOffset||null};
      // choose the driving line for this track
      if(m.trackData!==lastTrackData) {
        lastTrackData=m.trackData;
        const tid=hashStr(m.trackData);
        let gen=null;
        if(ROUTE_SOURCE==="recorded") {
          // Static coordinates do not identify a track. Only use the embedded lap
          // when the user explicitly selects this mode for the exact matching track.
          console.log("PTBOT_ROUTE using the explicitly selected recorded lap");
          applyRoute(ROUTE_REC,null,"recorded");
        } else {
          const decIn={parts:parts,lib:TRACK_LIB,start:start};
          if(USE_3D) {
            let gen3=null;
            try { gen3=generateRoute3D(decIn); } catch(err) { gen3={ok:false,why:"error: "+String(err)}; }
            if(gen3 && gen3.ok) console.log("PTBOT_ROUTE 3D builder: "+gen3.route.length+" points, "+gen3.lengthM+" m, "+gen3.ms+" ms"+(gen3.partial?" (INCOMPLETE: "+gen3.partial+")":""));
            else console.log("PTBOT_ROUTE 3D builder failed: "+(gen3?gen3.why:"?"));

            // Do not fall back to the flat X-Z projection for a 3D track.
            // A partial or planar route can cut across a hole/wall or skip a gate.
            if(gen3 && gen3.ok && !gen3.partial) gen=gen3;
            else gen={ok:false,why:gen3 && gen3.ok ? "incomplete 3D checkpoint route: "+gen3.partial : (gen3?gen3.why:"3D route builder returned no result")};
          } else {
            try { gen=generateRoute(decIn); } catch(err) { gen={ok:false,why:"error: "+String(err)}; }
            if(gen && gen.ok && gen.partial) gen={ok:false,why:"incomplete checkpoint route: "+gen.partial};
          }
          if(gen && gen.ok) {
            console.log("PTBOT_ROUTE built a COMPLETE line from this track: "+gen.route.length+" points, "+gen.lengthM+" m, "+gen.jumps+" jump(s), "+gen.ms+" ms; ordered checkpoints and finish reached");
            applyRoute(gen.route,tid,"generated");
            try { if(ch) ch.postMessage({type:"route",info:{track:tid,points:gen.route.length,lengthM:gen.lengthM,jumps:gen.jumps,ms:gen.ms,waypoints:gen.waypoints},route:gen.route}); } catch(_) {}
          } else {
            console.log("PTBOT_ROUTE SAFETY STOP: no complete route through every checkpoint to the finish was built: "+(gen?gen.why:"?")+". Bot will brake instead of guessing a shortcut.");
            bot.noRoute=true;
          }
        }
      }
      let clean=null;
      try { clean=JSON.parse(JSON.stringify(data)); } catch(err) { console.log("PTBOT_TRACK could not copy: "+String(err)); }
      if(clean) {
        try { if(ch) ch.postMessage({type:"track",data:clean}); else console.log("PTBOT_TRACK no channel"); }
        catch(err) { console.log("PTBOT_TRACK send failed: "+String(err)); }
      }
      console.log("PTBOT_TRACK sent: "+parts.length+" placed parts, "+Object.keys(lib).length+" part shapes");
    }
  }
  try {
    const origOnMessage=onmessage;
    onmessage=function(ev) {
      try { captureTrack(ev.data); } catch(err) { console.log("PTBOT_TRACK capture failed: "+String(err)); }
      return origOnMessage.call(this,ev);
    };
  } catch(err) { console.log("PTBOT_TRACK hook failed: "+String(err)); }

  bot.record=record;
  bot.sample=sample;
  bot.decode=decode;
  bot.choose=choose;
  bot.route=ROUTE;
  globalThis.__ptTutorialBot=bot;
})();
`;

const BOT_BODY = `
  if (e.userControls && globalThis.__ptTutorialBot) {
    const __ptBot = globalThis.__ptTutorialBot;
    let previous = null;
    try {
      const previousBuffer = new Uint8Array(t.HEAPU8.buffer, i, 227).slice();
      previous = __ptBot.decode(previousBuffer.buffer);
    } catch (_) {}

    if (__ptBot.mode === "record") {
      try { __ptBot.record(previous,e.id); } catch (_) {}
    } else if (__ptBot.recOn) {
      try { __ptBot.sample(previous,r,e.id); } catch (_) {}
    } else if (__ptBot.enabled) {
      if(previous) r=__ptBot.choose(previous,e.id);
      else r={up:true,right:false,down:false,left:false,reset:false};

      try {
        globalThis.__ptDbgCount=(globalThis.__ptDbgCount||0)+1;
        if(globalThis.__ptDbgCount%120===1 && globalThis.__ptDbgCount<500) {
          console.log("PTBOT_STATE",globalThis.__ptDbgCount,"raw:",
            JSON.stringify(Array.from(new Uint8Array(t.HEAPU8.buffer,i,48))),
            "state:",previous?JSON.stringify({
              frames:previous.frames,speed:previous.speedKmh,pos:previous.position,q:previous.quaternion
            }):"decode returned null",
            "controls:",JSON.stringify(r),"dbg:",JSON.stringify(__ptBot.dbg));
        }
      } catch (_) {}
    }
  }
`;

function rlog(s) {
  try { (window.__ptReconLines=window.__ptReconLines||[]).push(s); } catch (_) {}
  console.log(s);
}

function ptDownload(name,text) {
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([text],{type:"text/plain"}));
  a.download=name;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>a.remove(),500);
}

// In the console: ptReconDump() saves all recon lines as a file; ptWorkerSource(0) saves the physics worker's code.
window.ptReconDump=()=>ptDownload("ptbot_recon.txt",(window.__ptReconLines||[]).join("\n"));
window.ptWorkerSource=(id)=>{
  const e=(window.__ptWorkers||[])[id||0];
  if(e && e.src) ptDownload("ptbot_worker_"+(id||0)+".js",e.src); else console.log("no source saved for that worker yet");
};

function reconSummary(v,d) {
  if(v===null || v===undefined) return String(v);
  const t=typeof v;
  if(t==="string") return JSON.stringify(v.length>300?v.slice(0,300)+"...("+v.length+" chars)":v);
  if(t==="number" || t==="boolean") return String(v);
  if(t==="function") return "fn";
  if(v instanceof ArrayBuffer) return "ArrayBuffer("+v.byteLength+")";
  if(ArrayBuffer.isView(v)) {
    let head="";
    try { head=Array.from(v.subarray?v.subarray(0,12):[]).join(","); } catch (_) {}
    return v.constructor.name+"("+v.length+")["+head+(v.length>12?",...":"")+"]";
  }
  if(Array.isArray(v)) {
    if(d>=5) return "Array("+v.length+")";
    return "Array("+v.length+")["+v.slice(0,3).map(x=>reconSummary(x,d+1)).join(", ")+(v.length>3?", ...":"")+"]";
  }
  if(t==="object") {
    if(d>=5) return "{...}";
    const ks=Object.keys(v);
    return "{"+ks.slice(0,30).map(k=>k+": "+reconSummary(v[k],d+1)).join(", ")+(ks.length>30?", ...("+ks.length+" keys)":"")+"}";
  }
  return t;
}

function installRecon() {
  const OrigWorker=window.Worker;
  if(!OrigWorker || window.__ptReconInstalled) return;
  window.__ptReconInstalled=true;
  window.__ptWorkers=[];
  window.Worker=function(url,opts) {
    const w=new OrigWorker(url,opts);
    const id=window.__ptWorkers.length;
    const entry={w,url:String(url),opts};
    window.__ptWorkers.push(entry);
    rlog("PTBOT_RECON worker #"+id+" created: "+String(url).slice(0,140)+" options="+JSON.stringify(opts||{}));
    try {
      if(String(url).indexOf("blob:")===0) {
        fetch(url).then(r=>r.text()).then(txt=>{
          entry.src=txt;
          rlog("PTBOT_RECON worker #"+id+" source is "+txt.length+" characters long");
        }).catch(()=>{});
      }
    } catch (_) {}
    const origPost=w.postMessage.bind(w);
    const rawPost=function(m) {
      try {
        if(m && m.messageType===0 && Array.isArray(m.trackParts) && !(window.__ptRaw && window.__ptRaw.parts)) {
          window.__ptRaw=window.__ptRaw||{};
          window.__ptRaw.version=m.version;
          window.__ptRaw.parts=m.trackParts.map(p=>({id:p.id,v:Array.from(p.vertices,x=>Math.round(x*1000)/1000),
            detector:p.detector||null,startOffset:p.startOffset||null}));
          rlog("PTBOT_RECON saved the "+m.trackParts.length+" road piece shapes");
        } else if(m && m.messageType===3 && typeof m.trackData==="string" && m.carRecording==null) {
          window.__ptRaw=window.__ptRaw||{};
          window.__ptRaw.trackData=m.trackData;
          window.__ptRaw.mountainOffset=m.mountainOffset||null;
          rlog("PTBOT_RECON saved the track code ("+m.trackData.length+" characters)");
        }
      } catch(err) { rlog("PTBOT_RECON raw save failed: "+String(err)); }
    };
    let nOut=0,nIn=0;
    w.postMessage=function(m,t) {
      rawPost(m);
      nOut++;
      if(nOut<=40 || nOut%500===0) rlog("PTBOT_RECON #"+id+" game -> worker, message "+nOut+": "+reconSummary(m,0));
      return origPost(m,t);
    };
    w.addEventListener("message",ev=>{
      nIn++;
      if(nIn<=40 || nIn%500===0) rlog("PTBOT_RECON #"+id+" worker -> game, message "+nIn+": "+reconSummary(ev.data,0));
    });
    return w;
  };
  window.Worker.prototype=OrigWorker.prototype;
  rlog("PTBOT_RECON installed (watching for physics workers)");
}

function setupMainThread() {
  if(RECON) { try { installRecon(); } catch(err) { console.log("PTBOT_RECON failed",err); } }
  if(typeof BroadcastChannel==="undefined") return;
  const ch=new BroadcastChannel("ptbot");
  const STORE_BASE="ptbot_learn_v6";
  const storeKey=(t)=>t?STORE_BASE+"_"+t:STORE_BASE;

  window.ptTrackDump=()=>{
    if(!window.__ptTrack && !(window.__ptRaw && window.__ptRaw.trackData)) {
      console.log("no track captured yet - start a race first (load the track, press start)");
      return;
    }
    ptDownload("ptbot_track.json",JSON.stringify({decoded:window.__ptTrack||null,raw:window.__ptRaw||null}));
    console.log("saved ptbot_track.json (decoded track: "+(window.__ptTrack?"yes":"no")+", raw track code: "+(window.__ptRaw&&window.__ptRaw.trackData?"yes":"no")+")");
  };

  window.ptRouteDump=()=>{
    if(!window.__ptRoute) { console.log("no generated line yet (it is only built when your recorded lap does not belong to the track, or ROUTE_SOURCE is generated)"); return; }
    ptDownload("ptbot_route.json",JSON.stringify(window.__ptRoute));
    console.log("saved ptbot_route.json");
  };

  let recOn=false, recToast=null;
  function toast(t) {
    try {
      if(!recToast) {
        recToast=document.createElement("div");
        recToast.style.cssText="position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:99999;padding:6px 14px;border-radius:8px;background:#c0262d;color:#fff;font:600 14px sans-serif;pointer-events:none";
        document.body.appendChild(recToast);
      }
      recToast.textContent=t; recToast.style.display=t?"block":"none";
    } catch (_) {}
  }
  window.ptRecord=(on)=>{
    recOn=(on===undefined)?!recOn:!!on;
    ch.postMessage({type:"rec",on:recOn});
    toast(recOn?"RECORDING your driving - press "+REC_KEY.toUpperCase()+" to stop":"");
    console.log(recOn?"PTBOT_REC on: drive the track yourself, press "+REC_KEY.toUpperCase()+" again when done":"PTBOT_REC off: saving...");
  };
  window.ptDriveDump=(withTrack)=>{
    if(!window.__ptDrive) { console.log("no driving recorded yet - press "+REC_KEY.toUpperCase()+", drive, press "+REC_KEY.toUpperCase()+" again"); return; }
    ptDownload("ptbot_drive.json",JSON.stringify({drive:window.__ptDrive,track:(withTrack===false)?null:(window.__ptTrack||null)}));
    console.log("saved ptbot_drive.json ("+window.__ptDrive.samples.length+" samples, with track: "+(withTrack!==false&&!!window.__ptTrack)+")");
  };
  try {
    window.addEventListener("keydown",(e)=>{ const tg=e.target, tn=tg&&tg.tagName; if(tn==="INPUT"||tn==="TEXTAREA"||(tg&&tg.isContentEditable)) return; if(e.key&&e.key.toLowerCase()===REC_KEY&&!e.repeat&&!e.ctrlKey&&!e.metaKey&&!e.altKey) { e.preventDefault(); window.ptRecord(); } },true);
  } catch (_) {}

  function fire(type,k) {
    const ev=new KeyboardEvent(type,{
      key:k.key,code:k.code,keyCode:k.keyCode,which:k.keyCode,bubbles:true,cancelable:true
    });
    (document.activeElement||document.body||document).dispatchEvent(ev);
  }

  function tap(k,ms) {
    fire("keydown",k);
    setTimeout(()=>fire("keyup",k),ms);
  }

  ch.onmessage=ev=>{
    const m=ev.data||{};
    if(m.type==="hello") {
      try {
        const d=localStorage.getItem(storeKey(m.track));
        ch.postMessage({type:"load",track:m.track||null,data:d?JSON.parse(d):null});
      } catch (_) {}
    } else if(m.type==="track") {
      window.__ptTrack=m.data;
      console.log("PTBOT_TRACK received on the page: "+m.data.parts.length+" parts, "+(m.data.checkpoints?m.data.checkpoints.length:0)+" checkpoints. Type ptTrackDump() to save it as a file.");
    } else if(m.type==="drive") {
      window.__ptDrive=m;
      console.log("PTBOT_REC saved on the page: "+m.samples.length+" samples. Downloading ptbot_drive.json (type ptDriveDump() to save it again).");
      window.ptDriveDump();
    } else if(m.type==="route") {
      window.__ptRoute=m;
      console.log("PTBOT_ROUTE (page) line built: "+m.info.points+" points, "+m.info.lengthM+" m, "+m.info.jumps+" jump(s). Type ptRouteDump() to save it as a file.");
    } else if(m.type==="save") {
      try { localStorage.setItem(storeKey(m.track),JSON.stringify(m.data)); } catch (_) {}
    } else if(m.type==="restart" && AUTO_RESTART) {
      setTimeout(()=>{
        tap(RESTART_KEY,60);
        if(AUTO_START) {
          setTimeout(()=>{
            tap({key:"ArrowUp",code:"ArrowUp",keyCode:38},AUTO_START_MS);
            tap({key:"w",code:"KeyW",keyCode:87},AUTO_START_MS);
          },AUTO_START_DELAY);
        }
      },m.delay||300);
    }
  };
}

class TutorialBot extends PolyMod {
  constructor() {
    super();
    this.modName="PolyTrack Tutorial Bot";
    this.modAuthor="Kn1ght-09";
    this.modID="polytrack-tutorial-bot";
    this.modVersion="0.7.8";
    this.touchingPhysics=true;
  }

  init=(pml)=>{
    try { setupMainThread(); } catch(err) { console.log("PTBOT main-thread setup failed",err); }
    pml.registerSimWorkerMixin({
      type:MixinType.INSERT,
      token:"function n(e, r) {",
      func:BOT_BODY
    });
    pml.registerSimWorkerMixin({
      type:MixinType.INSERT,
      token:"(($o.length = 0), (onmessage = r));",
      func:WORKER_HELPERS
    });
  };
}

export let polyMod=new TutorialBot();
