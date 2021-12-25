/*--------------------
Settings
--------------------*/
let container, camera, scene, artwork, renderer;
let windowHalfX = $('.cart-page-inside').width() / 2;
let windowHalfY = $('.cart-page-inside').height() / 2;


/*--------------------
Map
--------------------*/
const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;


/*--------------------
Resize
--------------------*/
const onWindowResize = () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
};


/*--------------------
Init
--------------------*/
init = () => {
  container = document.querySelector("#tree_canvas");
  scene = new THREE.Scene();
  createCamera();
  createControls();
  createLights();
  createMeshes();
  createRenderer();
  document.addEventListener("mousemove", mouseMove, false);
  window.addEventListener("resize", onWindowResize);
  renderer.setAnimationLoop(() => {
    render();
  });
};


/*--------------------
Camera
--------------------*/
createCamera = () => {
  camera = new THREE.PerspectiveCamera(
  40,
  $('.cart-page-inside').width() / $('.cart-page-inside').height(),
  0.1,
  10000);

  camera.position.set(-25, 5, 20);
};


/*--------------------
Controls
--------------------*/
function createControls() {
  controls = new THREE.OrbitControls(camera, container);
}


/*--------------------
Lights
--------------------*/
const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 5);
  scene.add(ambientLight);
};


/*--------------------
Geometry
--------------------*/
const extraGeometry = () => {
  let geometry = new THREE.Geometry();
  const particlesLength = 2000;

  for (var i = 0; i < particlesLength; i++) {
    var vertex = new THREE.Vector3();
    var color = new THREE.Vector3();
    const d = map(i, 0, particlesLength, 0, Math.PI * 20);
    vertex.x = i * 0.003 * Math.sin(d);
    vertex.y = -i * 0.008 + Math.sin(i * 3 + i * 0.5) * 0.2;
    vertex.z = i * 0.003 * Math.cos(d);
    geometry.vertices.push(vertex);
    geometry.colors.push(
    new THREE.Color('#952300'),
    new THREE.Color('#dc1c27'),
    new THREE.Color('#135c13'),
    new THREE.Color('#fca12e'));

  }

  let particles = new THREE.Points(geometry, new THREE.PointsMaterial({ vertexColors: THREE.VertexColors, size: 0.1 }));
  let extraGroup = new THREE.Group();
  extraGroup.add(particles);
  return extraGroup;
};


/*--------------------
Mesh
--------------------*/
const createMeshes = () => {
  const sparklyBall = extraGeometry();
  artwork = new THREE.Group();
  artwork.position.y = 9;
  artwork.add(
  sparklyBall);

  scene.add(artwork);
};


/*--------------------
Animate
--------------------*/
const animate = () => {
  requestAnimationFrame(animate);
};
animate();


/*--------------------
Renderer
--------------------*/
const createRenderer = () => {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize($('.cart-page-inside').width(), $('.cart-page-inside').height());
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  renderer.physicallyCorrectLights = true;
  container.appendChild(renderer.domElement);
};


/*--------------------
Mousemove
--------------------*/
let mouseX = mouseY = 1;
const mouseMove = event => {
  isMouseMoved = true;
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
};


/*--------------------
Render
--------------------*/
const render = () => {
  if (artwork) {
    artwork.rotation.y += 0.001;
  }
  renderer.render(scene, camera);
};
init();