// r.js

// Include the necessary libraries
import * as THREE from 'three';
import * as CANNON from 'cannon';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up physics world using Cannon.js
const physicsWorld = new CANNON.World();
physicsWorld.gravity.set(0, -9.82, 0); // Set gravity

// Player controls
let player;  
const keys = {};
window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

const createPlayer = () => {
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    scene.add(player);

    const playerBody = new CANNON.Body({ mass: 1 });
    playerBody.position.set(0, 5, 0);
    physicsWorld.addBody(playerBody);
}

// Control player movement
const controlPlayer = () => {
    if (keys['w']) player.position.z -= 0.1;
    if (keys['s']) player.position.z += 0.1;
    if (keys['a']) player.position.x -= 0.1;
    if (keys['d']) player.position.x += 0.1;
    
    // Update Cannon.js player position
    playerBody.position.copy(player.position);
};

// Create terrain and objects
const createTerrain = () => {
    const terrainGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    const terrainMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = - Math.PI / 2;
    scene.add(terrain);
};

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    controlPlayer();
    renderer.render(scene, camera);
};

createPlayer();
createTerrain();
animate();