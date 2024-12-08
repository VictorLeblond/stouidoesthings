## GLTF Loder

To import geometries/scene from a GLTF file  
Warning : the project must contain ThreeJS 0.140

## Installation
```sh
$ npm install https://github.com/codeurdenuit/GLTFLoader.git#main
```

## How to use it
```sh
$ import GLTFLoader from 'gltfloader'

const geometry = await GLTFLoader.loadGeometry('mesh.glb')
const scene = await GLTFLoader.loadScene('mesh.glb')
const textre = await GLTFLoader.loadTexture('texture.png')

```