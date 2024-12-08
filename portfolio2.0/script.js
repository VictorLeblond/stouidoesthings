import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();

const scene = new THREE.Scene()

const aspectRatio = window.innerWidth / window.innerHeight;

const camera = new THREE.PerspectiveCamera(90, innerWidth / innerHeight, 0.25, 40)

const geometry = new THREE.BoxGeometry(1, 1, 1)

const texture = new THREE.TextureLoader().load('./public/DirtBlocTop.png')
const material = new THREE.MeshBasicMaterial({ map: texture })

const mesh = new THREE.Mesh(geometry, material)

const light = new THREE.PointLight(0xeeeeee)

scene.add(light)
scene.add(mesh)
scene.add( new THREE.AmbientLight( 0x757f8e, 3 ) );

camera.position.set(0, 0, 3)
light.position.set(0, 0, 3)

const renderer = new THREE.WebGLRenderer({ canvas })

init()
loop()

function init() {
    const aspectRatio = window.innerWidth / window.innerHeight

    window.onresize = function () {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    
        renderer.setSize( window.innerWidth, window.innerHeight );
    
    };
}

function loop() {
    requestAnimationFrame(loop)

    mesh.rotation.x += 0.005
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
}

function pixelTexture( texture ) {

    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;

}