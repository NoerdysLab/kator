import * as THREE from 'three';
import { GlobeEvent, MARKER_COLORS } from '../types';
import { latLngToVector3 } from '../geo/coordinates';

interface MarkerEntry {
  group: THREE.Group;
  event: GlobeEvent;
  ring: THREE.Mesh;
  beam: THREE.Mesh;
  dot: THREE.Mesh;
  offset: number;
  fadeOut: number; // 0 = not fading, counts up to 60 then remove
}

export class MarkerManager {
  private markers = new Map<string, MarkerEntry>();
  private markerGroup: THREE.Group;
  private maxMarkers = 100;

  constructor(markerGroup: THREE.Group) {
    this.markerGroup = markerGroup;
  }

  updateMarkers(events: GlobeEvent[]) {
    const incomingIds = new Set(events.map((e) => e.id));

    // Mark stale markers for fade-out
    this.markers.forEach((entry, id) => {
      if (!incomingIds.has(id) && entry.fadeOut === 0) {
        entry.fadeOut = 1;
      }
    });

    // Add new markers (respect cap)
    let count = this.markers.size;
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      if (this.markers.has(event.id)) continue;
      if (count >= this.maxMarkers) break;

      const entry = this.createMarker(event);
      this.markers.set(event.id, entry);
      this.markerGroup.add(entry.group);
      count++;
    }
  }

  animate(time: number) {
    const toRemove: string[] = [];

    this.markers.forEach((entry, id) => {
      if (entry.fadeOut > 0) {
        entry.fadeOut++;
        const opacity = Math.max(0, 1 - entry.fadeOut / 60);
        (entry.dot.material as THREE.MeshBasicMaterial).opacity = opacity;
        (entry.ring.material as THREE.MeshBasicMaterial).opacity = opacity;
        (entry.beam.material as THREE.MeshBasicMaterial).opacity = opacity;
        if (entry.fadeOut >= 60) {
          toRemove.push(id);
        }
        return;
      }

      // Pulse ring
      const scale = 1 + Math.sin(time * 2 + entry.offset) * 0.3;
      entry.ring.scale.set(scale, scale, scale);
      const ringOpacity = (0.4 + Math.sin(time * 2) * 0.3) * entry.event.intensity;
      (entry.ring.material as THREE.MeshBasicMaterial).opacity = ringOpacity;
    });

    for (let i = 0; i < toRemove.length; i++) {
      const id = toRemove[i];
      const entry = this.markers.get(id);
      if (entry) {
        this.markerGroup.remove(entry.group);
        this.disposeMarker(entry);
        this.markers.delete(id);
      }
    }
  }

  getMarkerMeshes(): THREE.Object3D[] {
    const meshes: THREE.Object3D[] = [];
    this.markers.forEach((entry) => {
      if (entry.fadeOut === 0) {
        meshes.push(entry.dot);
      }
    });
    return meshes;
  }

  getEventForMesh(mesh: THREE.Object3D): GlobeEvent | null {
    let found: GlobeEvent | null = null;
    this.markers.forEach((entry) => {
      if (entry.dot === mesh) found = entry.event;
    });
    return found;
  }

  dispose() {
    this.markers.forEach((entry) => {
      this.disposeMarker(entry);
    });
    this.markers.clear();
  }

  private createMarker(event: GlobeEvent): MarkerEntry {
    const group = new THREE.Group();
    const color = MARKER_COLORS[event.type] ?? MARKER_COLORS.general;
    const pos = latLngToVector3(event.lat, event.lng, 2.02);

    // Dot
    const dotGeo = new THREE.SphereGeometry(0.02, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.copy(pos);
    group.add(dot);

    // Pulse ring
    const ringGeo = new THREE.RingGeometry(0.03, 0.06, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.4 * event.intensity,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.copy(pos);
    ring.lookAt(0, 0, 0);
    group.add(ring);

    // Beam
    const beamHeight = 0.15 + event.intensity * 0.2;
    const beamGeo = new THREE.CylinderGeometry(0.003, 0.003, beamHeight, 8);
    const beamMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.3,
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);

    // Position beam radially outward
    const dir = pos.clone().normalize();
    beam.position.copy(pos.clone().add(dir.clone().multiplyScalar(beamHeight / 2)));
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    group.add(beam);

    return {
      group,
      event,
      ring,
      beam,
      dot,
      offset: Math.random() * Math.PI * 2,
      fadeOut: 0,
    };
  }

  private disposeMarker(entry: MarkerEntry) {
    entry.dot.geometry.dispose();
    (entry.dot.material as THREE.Material).dispose();
    entry.ring.geometry.dispose();
    (entry.ring.material as THREE.Material).dispose();
    entry.beam.geometry.dispose();
    (entry.beam.material as THREE.Material).dispose();
  }
}
