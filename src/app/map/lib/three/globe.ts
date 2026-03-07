import * as THREE from 'three';

export interface GlobeObjects {
  globeGroup: THREE.Group;
  markerGroup: THREE.Group;
  atmosphereOuter: THREE.Mesh;
}

export function createGlobe(scene: THREE.Scene): GlobeObjects {
  const globeGroup = new THREE.Group();
  const markerGroup = new THREE.Group();

  // Earth sphere
  const earthGeo = new THREE.SphereGeometry(2, 64, 64);
  const textureLoader = new THREE.TextureLoader();

  const earthMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.8,
    metalness: 0.1,
    emissive: new THREE.Color(0x0a1f2e),
    emissiveIntensity: 0.3,
  });

  const earth = new THREE.Mesh(earthGeo, earthMat);

  textureLoader.load(
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    (texture) => {
      earthMat.map = texture;
      earthMat.needsUpdate = true;
    },
    undefined,
    () => {
      // Fallback: dark blue with wireframe
      earthMat.color.set(0x0a2a4a);
      const wireGeo = new THREE.SphereGeometry(2.005, 32, 32);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      globeGroup.add(new THREE.Mesh(wireGeo, wireMat));
    }
  );

  globeGroup.add(earth);

  // Atmosphere outer
  const atmoOuterGeo = new THREE.SphereGeometry(2.15, 64, 64);
  const atmoOuterMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
  });
  const atmosphereOuter = new THREE.Mesh(atmoOuterGeo, atmoOuterMat);
  globeGroup.add(atmosphereOuter);

  // Atmosphere inner
  const atmoInnerGeo = new THREE.SphereGeometry(2.08, 64, 64);
  const atmoInnerMat = new THREE.MeshBasicMaterial({
    color: 0x00a8cc,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide,
  });
  globeGroup.add(new THREE.Mesh(atmoInnerGeo, atmoInnerMat));

  // Marker group is child of globe group
  globeGroup.add(markerGroup);

  scene.add(globeGroup);

  // Grid lines (static, not part of globe group)
  createGridLines(scene);

  return { globeGroup, markerGroup, atmosphereOuter };
}

function createGridLines(scene: THREE.Scene) {
  const gridMat = new THREE.LineBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.12,
  });
  const radius = 2.03;

  // Latitude lines every 30° from -60 to 60
  for (let lat = -60; lat <= 60; lat += 30) {
    const phi = (90 - lat) * (Math.PI / 180);
    const r = radius * Math.sin(phi);
    const y = radius * Math.cos(phi);
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.Line(geo, gridMat));
  }

  // Longitude lines every 30°
  for (let lng = 0; lng < 360; lng += 30) {
    const theta = (lng * Math.PI) / 180;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const phi = (i / 64) * Math.PI;
      points.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.Line(geo, gridMat));
  }
}
