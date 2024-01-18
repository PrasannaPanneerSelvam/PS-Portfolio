import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import styles from './css/planet.module.css';
// import useResize from '../hooks/useResize';
import { createRange, createOneStep } from '../utils/rangeUtils';
import { getAppStateContext } from '../context/AppContext';

function createPlanetTextureFromImage(imageName) {
  const textureLoader = new THREE.TextureLoader();

  // const jupiterTexture = textureLoader.load('/images/jupiter.jpg');
  const planetTexture = textureLoader.load('/images/' + imageName);

  return planetTexture;
}

function createPointLight(color, coordinates = [-1500, 500, 10]) {
  const pointLight = new THREE.DirectionalLight(new THREE.Color(color), 4.5);
  pointLight.position.set(...coordinates);

  return pointLight;
}

function createAmbientLight(color) {
  const ambientLight = new THREE.AmbientLight(new THREE.Color(color), 0.1);
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
  const imageName = options.imageName ?? '';
  const planetRadius = options.radius ?? 100;

  // const material = new THREE.MeshLambertMaterial({
  //   color,
  // });

  const planetTexture = createPlanetTextureFromImage(imageName);
  const material = new THREE.MeshStandardMaterial({
    map: planetTexture,
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

function createPlanetSystem(imageName) {
  const planetRadius = 100,
    orbitRadius = planetRadius + 100;

  const planetSystem = new THREE.Group();

  // const viewerLight = createAmbientLight('#ffffff');
  // planetSystem.add(viewerLight);

  // const startLight = createPointLight('#ffffff');
  // planetSystem.add(startLight);

  const planet = createPlanet({ radius: planetRadius, imageName });
  planetSystem.add(planet);

  const asteroidCluster = createAsteroidCluster({ orbitRadius });
  planetSystem.add(asteroidCluster);

  return [planetSystem, planet, asteroidCluster];
}

function addPlanetAnimation(canvasNode, animationFrameIdRef, initialPageIndex) {
  initialPageIndex = imageNames.length - initialPageIndex - 1;

  const extractPixelValue = (value) => parseInt(value.slice(0, -2));

  const calculatedStyles = getComputedStyle(canvasNode),
    width = extractPixelValue(calculatedStyles.width),
    height = extractPixelValue(calculatedStyles.height),
    aspectRatio = width / height,
    oneFourthWidth = width * 0.25;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvasNode,
  });
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const cameraDistance = 900;

  const camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 10000);
  // camera.position.z = cameraDistance;

  camera.position.x = -initialPageIndex * 2 * oneFourthWidth;
  camera.position.z = -initialPageIndex * 2 * cameraDistance + cameraDistance;

  // const planetIdx = 1;
  // camera.position.z -= planetIdx * 2 * cameraDistance;
  // camera.position.x -= planetIdx * 2 * oneFourthWidth;

  const startLight = createPointLight('#ffffff', [-1500, 500, 10]);
  scene.add(startLight);

  const viewerLight = createAmbientLight('#ffffff');
  scene.add(viewerLight);

  const planetSystems = [],
    planets = [],
    asteroidClusters = [];

  for (const imageName of imageNames) {
    const [planetSystem, planet, asteroidCluster] =
      createPlanetSystem(imageName);

    planetSystems.push(planetSystem);
    planets.push(planet);
    asteroidClusters.push(asteroidCluster);
  }

  const planetSystemRotations = [
    { x: 0.1, y: -0.3, z: -0.4 },
    { x: 0.1, y: -0.3, z: -0.4 },
    { x: 0.1, y: -0.3, z: 0.4 },
    { x: 0.1, y: 0.3, z: -0.4 },
  ];

  for (let idx = 0; idx < imageNames.length; idx++) {
    const planetCoordinates = {
      x: -idx * 2 * oneFourthWidth,
      y: 0,
      z: -idx * 2 * cameraDistance,
    };

    const planetSystem = planetSystems[idx],
      planetSystemRotation = planetSystemRotations[idx];

    planetSystem.position.x = planetCoordinates.x;
    planetSystem.position.y = planetCoordinates.y;
    planetSystem.position.z = planetCoordinates.z;

    planetSystem.rotation.x = planetSystemRotation.x;
    planetSystem.rotation.y = planetSystemRotation.y;
    planetSystem.rotation.z = planetSystemRotation.z;

    scene.add(planetSystem);
  }

  scene.position.x += oneFourthWidth;

  const planetYSpeeds = [0.001, 0.002, -0.001, -0.002],
    planetZSpeeds = [-0.0005, 0.00075, 0.0005, -0.00075];

  const asteroidClusterYSpeed = [0.003, -0.003, 0.005, -0.004];

  /******************************************************************************************************************/

  const numberOfStep = 50;

  let currentPlanetIdx = initialPageIndex,
    targetPlanetIdx = currentPlanetIdx;

  let targetX = camera.position.x,
    targetZ = camera.position.z;

  let xStep = 0,
    zStep = 0;

  function animationLoop() {
    if (currentPlanetIdx !== targetPlanetIdx) {
      const yetToReachDestiation =
        (currentPlanetIdx < targetPlanetIdx && targetX < camera.position.x) ||
        (currentPlanetIdx > targetPlanetIdx && targetX > camera.position.x);

      if (yetToReachDestiation) {
        camera.position.x += xStep;
        camera.position.z += zStep;
      } else {
        currentPlanetIdx = targetPlanetIdx;
      }
    }

    for (let idx = 0; idx < imageNames.length; idx++) {
      planets[idx].rotation.y += planetYSpeeds[idx];
      planets[idx].rotation.z += planetZSpeeds[idx];

      asteroidClusters[idx].rotation.y += asteroidClusterYSpeed[idx];
    }

    renderer.render(scene, camera);
    animationFrameIdRef.current = requestAnimationFrame(animationLoop);
  }

  animationLoop();

  return function (idx) {
    idx = imageNames.length - idx - 1;

    if (currentPlanetIdx === idx || targetPlanetIdx === idx) return;

    targetPlanetIdx = idx;
    console.log('Moving from', currentPlanetIdx, 'to', targetPlanetIdx);

    targetX = -targetPlanetIdx * 2 * oneFourthWidth;
    targetZ = -targetPlanetIdx * 2 * cameraDistance + cameraDistance;

    xStep = createOneStep(camera.position.x, targetX, numberOfStep);
    zStep = createOneStep(camera.position.z, targetZ, numberOfStep);
  };
}

const imageNames = ['earth.jpg', 'mars.jpg', 'moon.jpg', 'saturn.png'];
imageNames.reverse();

function Planet() {
  const { currentPageIndex } = getAppStateContext();
  const canvasRef = useRef();
  const animationFrameIdRef = useRef(null);
  const [gotoFn, setGotoFn] = useState(() => () => {});

  useEffect(() => {
    const gotoPlanetFn = addPlanetAnimation(
      canvasRef.current,
      animationFrameIdRef,
      currentPageIndex
    );

    setGotoFn(() => gotoPlanetFn);

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  useEffect(() => {
    gotoFn(currentPageIndex);
  }, [gotoFn, currentPageIndex]);

  return <canvas className={styles.planetCanvas} ref={canvasRef}></canvas>;
}

export default Planet;
