import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
// import styles from './css/planet.module.css';
// import useResize from '../hooks/useResize';
import { createRange, createOneStep, getRandomPointsBetween } from '../utils/rangeUtils';
import { getAppStateContext } from '../context/AppContext';
import { throttle } from './../utils/timingUtils'

const planetCanvasStyles = {
  position: 'fixed',
  left: '0',
  top: '0',
  display: 'inline-block',
  width: '100%',
  height: '100%',
  // zIndex: '-1',
  // backgroundImage: "url('./../../../images/galaxy.jpg')",
  // backgroundImage: "url('./../../../images/space.webp')",

  // backgroundSize: 'contain',
};

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

function getStars(width, height, idealAspectRatio, numberOfPlanets) {
  const aspectRatio = width / height,
    particlesCount = 1000,
    noOfParticlesByScreenSize = Math.floor(particlesCount * (aspectRatio / idealAspectRatio)),
    positions = new Float32Array(noOfParticlesByScreenSize * 3),
    cameraDistance = 900;

  const farDistance = -numberOfPlanets * 3 * cameraDistance - cameraDistance;

  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 0] = getRandomPointsBetween(4.5 * width);
    positions[i + 1] = getRandomPointsBetween(4.5 * height);
    positions[i + 2] = getRandomPointsBetween(farDistance, 0);
  }

  const particlesGeometry = new THREE.BufferGeometry()
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // Material
  const particlesMaterial = new THREE.PointsMaterial({
    color: '#ffeded',
    sizeAttenuation: true,
    size: 0.002, // getRandomPointsBetween(0.001, 0.01)
  })

  return new THREE.Points(particlesGeometry, particlesMaterial)
}

function createAsteroidCluster(options = {}) {
  const color = new THREE.Color(options?.color ?? '#0c2d4d');
  const radiusOfOrbit = options.orbitRadius ?? 200;

  const asteroidCluster = new THREE.Group();

  // const material = new THREE.MeshLambertMaterial({
  //   color,
  // });

  const planetTexture = createPlanetTextureFromImage('moon.jpg');
  const material = new THREE.MeshStandardMaterial({
    map: planetTexture,
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

function createPlanetSystem(imageName, planetRadius = 100, addAsteroid = true) {
  planetRadius = Math.max(planetRadius, 60);

  const orbitRadius = planetRadius + planetRadius;

  const planetSystem = new THREE.Group();

  // const viewerLight = createAmbientLight('#ffffff');
  // planetSystem.add(viewerLight);

  // const startLight = createPointLight('#ffffff');
  // planetSystem.add(startLight);

  const planet = createPlanet({ radius: planetRadius, imageName });
  planetSystem.add(planet);

  let asteroidCluster = createAsteroidCluster({ orbitRadius });
  if (imageName === 'earth.jpg') {
    const moonGroup = new THREE.Group();
    const earthRadius = 6371, moonRadius = 1737, distance = 4e5;
    const moon = createPlanet({ radius: planetRadius * (moonRadius / earthRadius), imageName: 'moon.jpg' });
    moon.position.x = planetRadius * 3;// * (distance / earthRadius);
    moonGroup.add(moon);

    asteroidCluster = moonGroup;
  }

  if (addAsteroid) planetSystem.add(asteroidCluster);

  return [planetSystem, planet, asteroidCluster];
}

function addPlanetAnimation(canvasNode, animationFrameIdRef, initialPageIndex) {
  initialPageIndex = imageNames.length - initialPageIndex - 1;

  const extractPixelValue = (value) => parseInt(value.slice(0, -2));

  const idealWidth = 1792,
    idealHeight = 923,
    idealAspectRatio = idealWidth / idealHeight;

  const calculatedStyles = getComputedStyle(canvasNode),
    width = extractPixelValue(calculatedStyles.width),
    height = extractPixelValue(calculatedStyles.height),
    aspectRatio = width / height,
    oneFourthWidth = width * 0.25,
    cameraDistance = 900;

  const planetRadius = 100 * (aspectRatio / idealAspectRatio);

  // console.log(width, height);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvasNode,
  });
  renderer.setSize(width, height);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, aspectRatio, 0.1, 10000);
  // camera.position.z = cameraDistance;

  camera.position.x = -initialPageIndex * 2 * oneFourthWidth;
  // camera.position.y += 20;
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

  // But why?
  // for (const [idx, imageName] of Object.entries(imageNames)) {
  for (let idx = 0; idx < imageNames.length; idx++) {
    const imageName = imageNames[idx];
    let addAsteroid = true;
    if (idx === 1 || idx === 2) {
      addAsteroid = false;
    }
    // console.log(idx, imageName, addAsteroid);
    const [planetSystem, planet, asteroidCluster] = createPlanetSystem(
      imageName,
      planetRadius,
      addAsteroid
    );

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
      y: 0, //(imageNames.length - idx - 1) * 200,
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

  const stars = getStars(width, height, idealAspectRatio, planets.length + 1);
  scene.add(stars);

  scene.position.x += oneFourthWidth;

  const planetYSpeeds = [0.001, 0.002, -0.001, -0.002],
    planetZSpeeds = [-0.0005, 0.00075, 0.0005, -0.00075];

  const asteroidClusterYSpeed = [0.003, -0.003, 0.005, -0.0008];

  /******************************************************************************************************************/

  const numberOfStep = 50;

  let currentPlanetIdx = initialPageIndex,
    targetPlanetIdx = currentPlanetIdx;

  let targetX = camera.position.x,
    targetY = camera.position.y,
    targetZ = camera.position.z;

  let xStep = 0,
    yStep = 0,
    zStep = 0;

  let changeHappened = false;

  function animationLoop() {
    if (currentPlanetIdx !== targetPlanetIdx) {
      const yetToReachDestiation =
        (currentPlanetIdx < targetPlanetIdx && targetZ < camera.position.z) ||
        (currentPlanetIdx > targetPlanetIdx && targetZ > camera.position.z);

      if (yetToReachDestiation) {
        camera.position.x += xStep;
        camera.position.y += yStep;
        camera.position.z += zStep;
      } else {
        currentPlanetIdx = targetPlanetIdx;
        changeHappened = false;
      }
    } else if (changeHappened) {
      const yetToReachDestiation = targetZ < camera.position.z;
      if (yetToReachDestiation) {
        camera.position.x += xStep;
        camera.position.y += yStep;
        camera.position.z += zStep;
      } else {
        currentPlanetIdx = targetPlanetIdx;
        changeHappened = false;
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

  const gotoPlanet = function (idx1) {
    const idx = imageNames.length - idx1 - 1;

    // console.log('Changing =>', idx);

    // if (currentPlanetIdx === idx || targetPlanetIdx === idx) return;

    // console.log('Changing =>', idx);

    targetPlanetIdx = idx;
    // console.log('Moving from', currentPlanetIdx, 'to', targetPlanetIdx);

    targetX = -targetPlanetIdx * 2 * oneFourthWidth;
    targetZ = -targetPlanetIdx * 2 * cameraDistance + cameraDistance;
    targetY = -idx1 * 100;

    xStep = createOneStep(camera.position.x, targetX, numberOfStep);
    yStep = createOneStep(camera.position.y, targetY, numberOfStep);
    zStep = createOneStep(camera.position.z, targetZ, numberOfStep);

    changeHappened = true;
  };

  const cursorMoveAnimation = (function () {
    const cursor = { x: 0, y: 0 };
    return throttle((event) => {
      const prevX = cursor.x,
        prevY = cursor.y;

      // console.log("Prasanna")
      cursor.x = event.clientX / width - 0.5;
      cursor.y = event.clientY / height - 0.5;

      const deltaX = cursor.x - prevX,
        deltaY = cursor.y - prevY;

      camera.position.x += deltaX * 50;
      camera.position.y -= deltaY * 50;
    });

  })();

  return [gotoPlanet, cursorMoveAnimation]
}

const imageNames = ['earth.jpg', 'mars.jpg', 'moon.jpg', 'saturn.png'];
imageNames.reverse();

function Planet() {
  const { currentPageIndex } = getAppStateContext();
  const canvasRef = useRef();
  const animationFrameIdRef = useRef(null);
  const [gotoFn, setGotoFn] = useState(() => () => { });

  useEffect(() => {
    const [gotoPlanetFn, cursorMoveAnimation] = addPlanetAnimation(
      canvasRef.current,
      animationFrameIdRef,
      currentPageIndex
    );

    window.addEventListener('mousemove', cursorMoveAnimation)


    setGotoFn(() => gotoPlanetFn);

    return () => {
      window.removeEventListener('mousemove', cursorMoveAnimation)
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, []);

  useEffect(() => {
    // console.log('Changing ', currentPageIndex);
    gotoFn(currentPageIndex);
  }, [gotoFn, currentPageIndex]);

  return <canvas style={planetCanvasStyles} ref={canvasRef}></canvas>;
}

export default Planet;
