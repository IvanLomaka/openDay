
/* MORO */
import * as THREE from '../three/build/three.module.js';
import { OrbitControls } from '../three/controls/OrbitControls.js'; //from '../../../../three/build/three.module.js'
//https://jaxry.github.io/panorama-to-cubemap/


/*Scene*/
const backgrounds = {
    classroom: "",
    labChem1: "",
    // labChem2: "",
    // labBio: "",
    labRocks: "",
    // labInfo: "",
    // labRob: "",
    // gym: "",
}

for (const i in backgrounds) {
    backgrounds[i] = new THREE.CubeTextureLoader().load([
        `../three/cubemap/${i}/nx.png`,
        `../three/cubemap/${i}/px.png`,
        `../three/cubemap/${i}/py.png`,
        `../three/cubemap/${i}/ny.png`,
        `../three/cubemap/${i}/nz.png`,
        `../three/cubemap/${i}/pz.png`
    ])
}

const scene = new THREE.Scene();

/*Camera*/
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

/*Render*/
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("three-js-wrapper").appendChild(renderer.domElement);

/*Controls*/
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0, 0);
// controls.update();
controls.enableZoom = false;
controls.enablePan = false
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.rotateSpeed = -0.2;

let resizeRenderListener
let rendering = false

function animate() {
    if (!rendering) return
    controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

function WindowResizeHome() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function changeRoom(to) {
    if (!rendering) throw new Error("You can't change rooms if render is off")
    if (!to) throw new Error("The room you required is undefined")

    renderer.domElement.classList.add("blur")

    setTimeout(() => {
        scene.background = to
        camera.position.set(0, 0, 10);
        renderer.domElement.classList.remove("blur")
    }, 1000)
}

function startRender(from) {
    if (!from) throw new Error("The room you required is undefined")

    scene.background = from;

    resizeRenderListener = window.addEventListener('resize', WindowResizeHome)
    WindowResizeHome()

    rendering = true
    animate()
}

startRender(backgrounds.classroom)

function stopRender() {
    window.removeEventListener('resize', resizeRenderListener)
    
    rendering = false
}

const nextRoomButton = document.getElementById('next-room')
let currentRoom = 0

const allRooms = Object.keys(backgrounds)

nextRoomButton.addEventListener('click', () => {
    currentRoom ++

    if(!backgrounds[allRooms[currentRoom + 1]]) nextRoomButton.textContent = 'Fine tour'

    if(!backgrounds[allRooms[currentRoom]]) {

        deactivateVirtualOpenDay()
        setTimeout(() => nextRoomButton.innerHTML = 'Prossima stanza <i class="ri-arrow-right-line" style="margin-left: 10px; font-size: 20px"></i>', 500);
        
        return
    } // aggiungere qua codice rine tour

    changeRoom(backgrounds[allRooms[currentRoom]])
})



























/* IVAN */

// animate the navbar

const navButton = document.getElementById('navActivation')
const navWrapper = document.getElementById('navWrapper')
const navUl = document.getElementById('navUl')
const navUlList = document.querySelectorAll('[data-nav-a]')

navButton.addEventListener('click', clickFuncFornavButton)

function clickFuncFornavButton() {
    navWrapper.classList.toggle('nav-wrapper-active')
    navUlList.forEach(a => {
        a.classList.toggle('nav-wrapper-ul-active')
    });
}

// activate the nav

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 40) {
        wrapperNav.classList.add('active')
    } else {
        wrapperNav.classList.remove('active')
    }
})

// activate the nav on load

window.addEventListener('onload', () => {
    if (document.documentElement.scrollTop > 40) {
        wrapperNav.classList.add('active')
    } else {
        wrapperNav.classList.remove('active')
    }
})

// landing squares buttons

const openDayVirtuale = document.getElementById('openday-virtuale')
const openDayPresenza = document.getElementById('openday-presenza')

openDayVirtuale.addEventListener('click', () => activeVirtualOpenDay())
openDayPresenza.addEventListener('click', () => changeNavColors(navUlList[1]))

// navbar colors and change section

const dataSections = document.querySelectorAll('[data-section]')
const burgerMenu = [...document.getElementsByClassName('burger-menu')]

let color = 'white'

for(let i = 1; i < navUlList.length; i++)  navUlList[i].classList.add(`color-class-${color}`)

navUlList.forEach(button => {
    button.addEventListener('click', () => changeNavColors(button))
})

function changeNavColors(button) {
    if(!button) return

    console.log('hi')

    navUlList.forEach(e => {
        e.classList.remove(`color-class-${color}`)
        e.classList.remove(`active-black`)
    })

    if(parseInt(button.getAttribute('index')) == 0) {
        burgerMenu.forEach(e => e.classList.add('background-white'))

        color = 'white'
    } else {
        burgerMenu.forEach(e => e.classList.remove('background-white'))

        color = 'black'
        button.classList.add(`active-black`)
    }

    navUlList.forEach(e => e.classList.add(`color-class-${color}`))

    button.classList.remove(`color-class-${color}`)

    addRemoveSections(parseInt(button.getAttribute('index')))

    clickFuncFornavButton()
    nav.checked = false
}

function addRemoveSections(i) {
    dataSections.forEach(e => e.classList.add('hide'))
    if(i == -1) return
    dataSections[i].classList.remove('hide')
}

// activate overlay in virtual tour

const activateOverlayButton = document.getElementById('activate-overlay')
const virtualOverlay = document.getElementById('virtual-openday-overlay')
const virtualWrapper = document.getElementById('open-day-virtuale-wrapper')
const deactivateOverlayButton = document.getElementById('fullscreen-wrap')

const superOverlay = document.getElementById('super-overlay')

// use this when switching to this page

// activate open day virtuale

function activeVirtualOpenDay() {
    superOverlay.classList.add('active')
    virtualOverlay.classList.add('active')

    setTimeout(() => {
        addRemoveSections(-1)
        deactivateNav()
        virtualWrapper.classList.remove('hide')
        superOverlay.classList.remove('active')
    }, 250);
}

function deactivateVirtualOpenDay() {
    superOverlay.classList.add('active')

    setTimeout(() => {
        addRemoveSections(0)
        activateNav()
        virtualWrapper.classList.add('hide')
        superOverlay.classList.remove('active')
    }, 250);
}

function deactivateNav() {
    wrapperNav.classList.add('deactivateNav')
    navActivation.classList.add('deactivateNav')
}

function activateNav() {
    wrapperNav.classList.remove('deactivateNav')
    navActivation.classList.remove('deactivateNav')
}

activateOverlayButton.addEventListener('click', () => {
    virtualOverlay.classList.add('active')
})

deactivateOverlayButton.addEventListener('click', () => {
    virtualOverlay.classList.remove('active')
})