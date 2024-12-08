import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
const loaderGlb = new GLTFLoader()
const loaderTexture = new THREE.TextureLoader();

export default {
  loadGeometry: function loadGeometry(path) {
    return new Promise((resolve, reject) => {
      loaderGlb.load(path,
        function(gltf) {
          const geometries = gltf.scene.children
            .filter(child => child.type === 'Mesh')
            .map(mesh => mesh.geometry)
          if (geometries.length > 1) {
            resolve(geometries)
          } else {
            resolve(geometries[0])
          }
        }, undefined, function(e) {
          console.error(e)
          reject(e)
        })
    })
  },
  loadObject: function loadObject(path,name) {
    return new Promise((resolve, reject) => {
      loaderGlb.load(path,
        function(gltf) {
          const mesh = gltf.scene.getObjectByName(name)
          mesh.animations = gltf.animations
          resolve(mesh)
        }, undefined, function(e) {
          console.error(e)
          reject(e)
        })
    })
  },

  loadAnimations: function loadAnimations(path) {
    return new Promise((resolve, reject) => {
      loaderGlb.load(path,
        function(gltf) {
          resolve(gltf.animations)
        },
        undefined, function(e) {
          console.error(e)
          reject(e)
        })
    })
  },
  loadScene: function loadScene(path) {
    return new Promise((resolve, reject) => {
      loaderGlb.load(path,
        function(gltf) {
          resolve(gltf.scene)
        },
        undefined, function(e) {
          console.error(e)
          reject(e)
        })
    })
  },
  loadTexture: function loadTexture(path) {
    return new Promise((resolve, reject) => {
      loaderTexture.load(path,
        function(texture) {
          resolve(texture)
        },
        undefined, function(e) {
          console.error(e)
          reject(e)
        })
    })
  }
}


