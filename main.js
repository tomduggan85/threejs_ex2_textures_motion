
/* Image URLs */

const earthImageUrl = 'https://res.cloudinary.com/tomduggan/image/upload/v1535219098/earth.jpg';
const moonImageUrl = 'https://res.cloudinary.com/tomduggan/image/upload/v1535219207/moon.jpg';
const marsImageUrl = 'https://res.cloudinary.com/tomduggan/image/upload/v1535219359/mars.jpg';

/* Start setup */

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const aspectRatio = screenWidth/screenHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40, //Field of view (like zoom)
  aspectRatio, //Aspect ratio of camera
  0.1, //Near plane
  1000 //Far plane
);

camera.position.y = 0.5; //Move slightly up
camera.position.z = 2; //and a little bit back
camera.lookAt(0, 0, 0); //Look to center of scene

const renderer = new THREE.WebGLRenderer();
renderer.setSize(screenWidth, screenHeight);
document.body.appendChild(renderer.domElement);

/* End setup */

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 30, 30), 
  new THREE.MeshBasicMaterial({color: 0xcc9900})
);
scene.add(sun);

const earthTexture = new THREE.TextureLoader().load(earthImageUrl);
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 30, 30), 
  new THREE.MeshLambertMaterial({map: earthTexture})
);
earth.position.x = 1.5;
const earthOrbit = new THREE.Group();
earthOrbit.add(earth);
scene.add(earthOrbit);

const moonTexture = new THREE.TextureLoader().load(moonImageUrl);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 30, 30), 
  new THREE.MeshLambertMaterial({map: moonTexture})
);
moon.position.x = 0.5;
earth.add(moon);

const marsTexture = new THREE.TextureLoader().load(marsImageUrl);
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 30, 30), 
  new THREE.MeshLambertMaterial({map: marsTexture})
);
mars.position.x = 2.5;
const marsOrbit = new THREE.Group();
marsOrbit.add(mars);
scene.add(marsOrbit);

const light = new THREE.PointLight(0xffffff, 1, 5000);
scene.add(light);


/* Draw loop */
function draw() {
  requestAnimationFrame(draw);
  
  earthOrbit.rotation.y += 0.0015;
  earth.rotation.y += 0.01;
  mars.rotation.y += 0.005;
  marsOrbit.rotation.y += 0.001;
  
  renderer.render(scene, camera);
};

draw();