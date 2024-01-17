import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import styles from './css/planet.module.css';
// import useResize from '../hooks/useResize';
import { oscillateBetween, createRange } from '../utils/rangeUtils';

function createPointLight(color, coordinates = [-1500, 500, 10]) {
  const pointLight = new THREE.DirectionalLight(new THREE.Color(color), 8.5);
  pointLight.position.set(...coordinates);

  return pointLight;
}

function createAmbientLight(color) {
  const ambientLight = new THREE.AmbientLight(new THREE.Color(color), 0.2);
  return ambientLight;
}

function getVertices(mesh) {
  const position = mesh.geometry.getAttribute('position');

  // console.log(
  //   'position',
  //   position,
  //   position.count / position.itemSize,
  //   position.count,
  //   position.itemSize
  // );

  const vertices = [];

  for (let i = 0; i < position.array.length; i += 3) {
    const vertex = new THREE.Vector3(
      position.array[i],
      position.array[i + 1],
      position.array[i + 2]
    );

    vertices.push(vertex);
  }

  // console.log('Got Vertices', vertices.length, vertices[0]);

  return vertices;
}

function setVertices(mesh, vertices) {
  const position = mesh.geometry.getAttribute('position');

  const newVertices = [];

  for (const i of vertices) {
    newVertices.push(i.x);
    newVertices.push(i.y);
    newVertices.push(i.z);
  }

  const updatedPosition = new THREE.Float32BufferAttribute(
    newVertices,
    position.itemSize
  );
  // console.log(
  //   'updated position',
  //   updatedPosition,
  //   updatedPosition.count / updatedPosition.itemSize,
  //   updatedPosition.count,
  //   updatedPosition.itemSize
  // );
  mesh.geometry.setAttribute('position', updatedPosition);
}

function createPlanet(options = {}) {
  const color = new THREE.Color(options.color ?? '#0c2d4d');
  const planetRadius = options.radius ?? 100;

  const material = new THREE.MeshLambertMaterial({
    color,
  });

  const planet = new THREE.Mesh(
    // new THREE.IcosahedronGeometry(100, 10),
    new THREE.SphereGeometry(planetRadius, 80, 80),
    // new THREE.DodecahedronGeometry(100, 3),
    material
  );

  const maxElevation = 0.0095,
    minimumElevation = 1 - maxElevation;

  const newVertices = getVertices(planet).map((vertice) => {
    return vertice.multiplyScalar(
      Math.random() * maxElevation + minimumElevation
    );
  });

  setVertices(planet, newVertices);

  planet.geometry.normalizeNormals();
  planet.geometry.computeVertexNormals();
  //   planet.geometry.computeFlatVertexNormals();

  return planet;
}

function createAsteroidCluster(options = {}) {
  const color = new THREE.Color(options?.color ?? '#0c2d4d');
  const radiusOfOrbit = options.orbitRadius ?? 200;

  const asteroidCluster = new THREE.Group();

  const material = new THREE.MeshLambertMaterial({
    color,
  });

  const [minDeviation, maxDeviation] = createRange(10),
    deviationDiff = maxDeviation - minDeviation;

  for (let p = 0; p < Math.PI * 2; p = p + Math.random() * 0.15) {
    const asteroid = new THREE.Mesh(
      new THREE.IcosahedronGeometry(8, 0),
      material
    );

    const minimumSize = Math.random() * 0.5;

    const newVertices = getVertices(asteroid).map((vertice) => {
      return vertice.multiplyScalar(Math.random() * 0.5 + minimumSize);
    });

    setVertices(asteroid, newVertices);

    const rand = Math.random() * deviationDiff + minDeviation;
    asteroid.position.set(
      radiusOfOrbit * Math.sin(p) + rand,
      rand,
      radiusOfOrbit * Math.cos(p) + rand
    );

    // asteroid.geometry.computeFlatVertexNormals();
    asteroid.geometry.normalizeNormals();
    asteroid.geometry.computeVertexNormals();
    asteroidCluster.add(asteroid);
  }

  return asteroidCluster;
}

function addPlanetAnimation(canvasNode, animationFrameIdRef) {
  const extractPixelValue = (value) => parseInt(value.slice(0, -2));

  const calculatedStyles = getComputedStyle(canvasNode),
    width = extractPixelValue(calculatedStyles.width),
    height = extractPixelValue(calculatedStyles.height),
    aspectRatio = width / height;

  const oneFourthWidth = width * 0.25;

  const planetRadius = 100,
    orbitRadius = planetRadius + 100;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvasNode,
  });
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 10000);
  camera.position.z = 900;

  const system = new THREE.Group();
  system.position.x += 400;

  const viewerLight = createAmbientLight('#ffffff');
  scene.add(viewerLight);

  const startLight = createPointLight('#ffffff');
  scene.add(startLight);

  const planet = createPlanet({ radius: planetRadius });
  system.add(planet);

  const asteroidCluster = createAsteroidCluster({ orbitRadius });
  system.add(asteroidCluster);

  system.position.x = oneFourthWidth;

  system.rotation.x = 0.1;
  system.rotation.y = -0.3;
  system.rotation.z = -0.4;

  scene.add(system);

  const cameraOscillator = oscillateBetween(200, 1000, 5);

  function animationLoop() {
    planet.rotation.y += 0.001;
    planet.rotation.z -= 0.0005;

    asteroidCluster.rotation.y -= 0.003;
    // asteroidCluster.rotation.x -= 0.0005;

    // camera.position.z += counter;
    // camera.position.z = cameraOscillator(camera.position.z);

    renderer.render(scene, camera);
    // renderer.setAnimationLoop(animation);
    animationFrameIdRef.current = requestAnimationFrame(animationLoop);
  }
  animationLoop();
}

function Planet() {
  const canvasRef = useRef();
  const animationFrameIdRef = useRef(null);
  // const size = useResize();

  useEffect(() => {
    // console.clear();
    addPlanetAnimation(canvasRef.current, animationFrameIdRef);
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  return <canvas className={styles.planetCanvas} ref={canvasRef}></canvas>;
}

export default Planet;
