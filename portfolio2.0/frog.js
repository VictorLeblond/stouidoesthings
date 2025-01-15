import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { Sky } from 'three/addons/objects/Sky.js'
import { Water } from 'three/addons/objects/Water.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import Ocean from './ocean.js';
let inMainMenu = true;

let mixer, INTERSECTED
let camera, scene, raycaster, renderer, controls, ocean;
const pointer = new THREE.Vector2();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('jsm/libs/draco/gltf/');

let model

const loader = new GLTFLoader();

const clock = new THREE.Clock()

//ocean
const oceanTexturePath = './public/ocean_tile.png'
const oceanRepeat = 20;

const playAnims = {
    Idle: "Breathe",
    LeftButton: "LeftButton",
    RightButton: "RightButton",
    Blink: "Blink",
    Sleep: "Sleep"
}

let group;
let actions, activeAction, previousAction;

let homeTween, deskTween, platTween, phoneTween;

const navigationState = {
    Outside: 0,
    inHouse: 1,
    onPlat: 2,
    onDesk: 3,
    onPhone: 4
}
let curNavState = navigationState.Outside;


init();
loop();

function init() {
    const aspectRatio = window.innerWidth / window.innerHeight

    camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.25, 300)
    scene = new THREE.Scene()
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas, outputEncoding: THREE.sRPGEncoding })
    raycaster = new THREE.Raycaster();

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);

    loader.setDRACOLoader(dracoLoader);
    loader.load('./public/Scene.glb', function (gltf) {

        model = gltf;
        model.scene.castShadow = true
        model.scene.position.set(2, 0, 0);
        model.scene.scale.set(1, 1, 1);
        model.scene.receiveShadow = false;
        model.scene.traverse((o) => {
            if (o.isMesh) {
                var material;
                material = new THREE.MeshBasicMaterial({ color: o.material.color })
                o.material = material;
            }
        });

        scene.add(model.scene);
        const clips = gltf.animations;

        mixer = new THREE.AnimationMixer(model.scene);

        actions = {}

        for (let i = 0; i < clips.length; i++) {
            const clip = clips[i];
            const action = mixer.clipAction(clip);
            if (Object.values(playAnims).includes(clip.name)) {
                actions[clip.name] = action;
                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;
            }
        }
        console.log(actions);

        const bigPotAnim = gltf.animations.find((clip) => clip.name === 'BigGlider');
        const bigPotAnim2 = gltf.animations.find((clip) => clip.name === 'BigUpDown');
        const smallPotAnim = gltf.animations.find((clip) => clip.name === 'SmallGlider');
        const smallPotAnim2 = gltf.animations.find((clip) => clip.name === 'SmallUpDown');

        activeAction = actions[playAnims.Idle];
        activeAction.play();

        mixer.clipAction(bigPotAnim).play();
        mixer.clipAction(bigPotAnim2).play();
        mixer.clipAction(smallPotAnim).play();
        mixer.clipAction(smallPotAnim2).play();

        mixer.addEventListener('finished', function (e) {

            let randomInt = Math.round(Math.random() * 4)
            console.log("Fading to animation : " + playAnims[Object.keys(playAnims)[randomInt]] + " Int = " + randomInt)
            fadeToAction(playAnims[Object.keys(playAnims)[randomInt]], .5)
        });

    }, undefined, function (e) {

        console.error(e);

    });

    //Element Declaration

    const light = new THREE.PointLight(0xffffff)
    const speh = new THREE.Mesh(new THREE.SphereGeometry(1, 5, 5), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff) }));

    group = new THREE.Group();

    ocean = new Ocean()
  Promise.all([
    ocean.init()
  ]).then((meshes) => {
    meshes[0].rotation.x = -Math.PI/2
    meshes[0].position.y = -3.5
    meshes.map((x) => scene.add(x))
  })
  

    //Add Elements
    group.add(camera)

    scene.add(group)
    scene.add(light, new THREE.AmbientLight(0xffffff, .1));
    scene.add(light)
    scene.add(new THREE.AmbientLight(0xffffff, .1));



    //Set Positions
    camera.position.set(0, 15, 40)
    camera.lookAt(0, 0, 0)
    light.position.set(1, 40, 40)
    speh.position.set(-10, 5, 12)

    //EVENT LISTENERS
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('click', onClick);
    window.addEventListener('resize', onWindowResize, false);
}

function onKeyDown(event) {
    if (event.which == 32) {
        console.log(camera.position)
        console.log(camera.rotation)
    }
}

function onPointerMove(event) {

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

}

function loop() {

    TWEEN.update()

    requestAnimationFrame(loop)

    const dt = clock.getDelta()
    const t = clock.getElapsedTime();

    if (mixer) mixer.update(dt);

    if (inMainMenu) {
        group.rotation.y += .0025
    }

    if (controls) {
        controls.update(dt)
    }

    ocean.update(dt)

    camera.updateMatrixWorld();

    //raycasting();

    renderer.render(scene, camera)

}

function onClick() {
    if (inMainMenu && curNavState == navigationState.Outside) {
        inMainMenu = false;

        let div = document.getElementById("start")
        div.style.animation = "fade-out 2s forwards"

        const curRotX = group.rotation.y;
        const idealRotX = Math.PI - .05
        const finalRotX = (idealRotX) * (1 + (2 * Math.floor(curRotX / (idealRotX))))

        const tween = new TWEEN.Tween({ xRotation: curRotX })
            .to({ xRotation: finalRotX }, 1000).
            onUpdate((coords) => {
                group.rotation.y = coords.xRotation;
            })
            .easing(TWEEN.Easing.Sinusoidal.InOut).onComplete(function () {

                const startRotation = camera.quaternion.clone()

                camera.lookAt(-35, 10, 25)
                const endRotation = camera.quaternion.clone();

                camera.quaternion.copy(startRotation)

                const lookAtTween = new TWEEN.Tween(camera.quaternion).to(endRotation, 2000).easing(TWEEN.Easing.Quadratic.In).start();
            });

        const tween2 = new TWEEN.Tween({ x: camera.position.x, y: camera.position.y, z: camera.position.z }).
            to({ x: -1.8, y: 3.5, z: 1 }, 2000)
            .onUpdate((coords) => {
                camera.position.x = coords.x;
                camera.position.y = coords.y;
                camera.position.z = coords.z;
            })
            .easing(TWEEN.Easing.Sinusoidal.InOut).onComplete(onEnterHouseDone);

        tween.chain(tween2);

        tween.start();
    }
    if (INTERSECTED) {
        INTERSECTED.currentHex = (Math.random() * 0xffffff);
        console.log(INTERSECTED.scale)
    }
}

function onEnterHouseDone() {
    curNavState = navigationState.inHouse;
    console.log(camera.quaternion.clone())
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    if (controls)
        controls.handleResize()

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function raycasting() {

    raycaster.setFromCamera(pointer, camera);

    var intersects = raycaster.intersectObject(scene, true)
    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0x0000ff);
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;
    }
}

function setOrbitControls(target) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.minDistance = 1;
    controls.maxDistance = 1;
    controls.update();
    return controls;
}

function fadeToAction(name, duration) {

    previousAction = activeAction;
    activeAction = actions[name];

    if (previousAction !== activeAction) {
        previousAction.fadeOut(duration);
    }

    activeAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();

}