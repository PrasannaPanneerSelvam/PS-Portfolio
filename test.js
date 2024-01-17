import * as THREE from 'three';

const container = document.getElementById("container");
const width = container.clientWidth;
const height = container.clientHeight;
const aspect = width / height;
const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
camera.position.z = 500

const system = new THREE.Group(); // planetary system

scene.add(
    new THREE.AmbientLight(0xFFFFFF, 0.2)
);

const light = new THREE.DirectionalLight(0xFFFFFF, 2.5);
light.position.set(1500, 2500, 0);
scene.add(light);

const material = new THREE.MeshLambertMaterial({
    color: 0x0C2D4D
});

const planet = new THREE.Mesh(
    new THREE.IcosahedronGeometry(100, 3),
    material
);

for (let i = 0; i < planet.geometry.vertices.length; i++)
    planet.geometry.vertices[i].multiplyScalar(
        Math.random() * 0.05 + 0.95
    );

planet.geometry.computeFlatVertexNormals();
system.add(planet);

const asteroids = new THREE.Group();

for (let p = 0; p < Math.PI * 2; p = p + Math.random() * 0.15) {
    const asteroid = new THREE.Mesh(
        new THREE.IcosahedronGeometry(8, 0),
        material
    );

    const size = Math.random() * 0.5;
    for (let i = 0; i < asteroid.geometry.vertices.length; i++)
        asteroid.geometry.vertices[i].multiplyScalar(
            Math.random() * 0.5 + size
        );

    const rand = Math.random() * 60 - 30;
    asteroid.position.set(200 * Math.sin(p) + rand, rand, 200 * Math.cos(p) + rand);

    asteroid.geometry.computeFlatVertexNormals();
    asteroids.add(asteroid);
}

system.add(asteroids);

system.rotation.x = 0.1;
system.rotation.y = -.3;
system.rotation.z = -0.4;

scene.add(system);


function render() {
    requestAnimationFrame(render);

    planet.rotation.y += 0.001;
    planet.rotation.z -= 0.0005;

    asteroids.rotation.y += 0.003;

    renderer.render(scene, camera);
}

render();