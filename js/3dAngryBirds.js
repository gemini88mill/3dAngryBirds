/**
 * Created by raphael on 9/23/17.
 */


var renderer;
var scene;
var camera;
var spotLight;
var smsh;


<!-- add objects in the scope so all methods can access -->
var groundPlane;
var ball;

<!-- 3. Add the following two lines. -->
Physijs.scripts.worker = 'libs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

function init()
{
    <!-- 4. Edit the scene creation -->
    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3( 0, 0, -30 ));

    setupCamera();
    setupRenderer();
    addSpotLight();

    <!-- 5. Ground plane -->
    createGroundPlane();
    background();

    <!-- 7. Create and add cannon -->
    createCannon();

    <!-- 11. Create ball -->
    createBall();

    <!-- 14. Create target -->
    createTarget();

    loadBackgroundMusic();

    // Output to the stream
    document.body.appendChild( renderer.domElement );

    // Call render
    render();
}

function render()
{
    <!-- 6. Physics simulation -->
    scene.simulate();

    <!-- 9. Maintain cannon elevation controls -->
    maintainCannonElevationControls();

    <!-- 10. Maintain cannon right/left -->
    maintainCannonRightLeft();

    <!-- 12. Look for ball keypresses -->
    maintainBallKeypresses();

    <!-- 15. Check for ball off the plane -->
    checkBallPosition();




    // Request animation frame
    requestAnimationFrame( render );

    // Call render()
    //renderer.render(backgroundScene , backgroundCamera );
    renderer.render( scene, camera );
}

function checkBallPosition()
{
    if( smsh.position.y > 5 )
    {
        scene( smsh );
    }
}

function setupCamera()
{
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.x = 0;
    camera.position.y = -150;
    camera.position.z = 20;
    camera.lookAt( scene.position );
}

function setupRenderer()
{
    renderer = new THREE.WebGLRenderer();
    //						color     alpha
    renderer.setClearColor( 0x000000, 1.0 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMapEnabled = true;
}

function addSpotLight()
{
    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 0, 0, 100 );
    spotLight.shadowCameraNear = 10;
    spotLight.shadowCameraFar = 100;
    spotLight.castShadow = true;
    spotLight.intensity = 2;
    scene.add(spotLight);
}

function loadBackgroundMusic(){
    //Create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add( listener );

// create a global audio source
    var sound = new THREE.Audio( listener );

    var audioLoader = new THREE.AudioLoader();

//Load a sound and set it as the Audio object's buffer
    audioLoader.load( 'assets/music/background_music/StarFighter.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop(false);
        sound.setVolume(0.2);
        sound.play();
    });
}

function playSound(soundEffectPath){
    //Create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    camera.add( listener );

// create a global audio source
    var sound = new THREE.Audio( listener );

    var audioLoader = new THREE.AudioLoader();

//Load a sound and set it as the Audio object's buffer
    audioLoader.load( soundEffectPath, function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop(false);
        sound.setVolume(0.2);
        sound.play();
    });

}

window.onload = init;