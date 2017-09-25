/**
 * Created by raphael on 9/23/17.
 */

function createGroundPlane()
{
    var texture = THREE.ImageUtils.loadTexture('./assets/images/pinkplane.jpg');

    var planeMaterial = new Physijs.createMaterial(new THREE.MeshLambertMaterial({map:texture}), .4, .8 );
    var planeGeometry = new THREE.PlaneGeometry( 200, 200, 6 );
    groundPlane = new Physijs.BoxMesh( planeGeometry, planeMaterial, 0 );
    groundPlane.name = "GroundPlane";

    scene.add( groundPlane );
}

function background(){
    var texture = THREE.ImageUtils.loadTexture('./assets/images/cyberpunkbackdrop.jpg');

    var geometry = new THREE.BoxGeometry( 2060, 2, 200 );
    var material = new THREE.MeshBasicMaterial( {map:texture} );
    var plane = new THREE.Mesh( geometry, material );

    plane.position.x = -100;
    plane.position.y = 100;
    plane.position.z = 50;

    scene.add( plane );
}

function createCannon()
{
    var cylinderGeometry = new THREE.CylinderGeometry( 2, 2, 20 );
    var cylinderMaterial = new THREE.MeshLambertMaterial({color:'#ff69b4'});
    var cannonBarrel = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cannonBarrel.position.y = -15;

    <!-- 8. Create Object3D wrapper that will allow use to correctly rotate -->
    cannon = new THREE.Object3D();
    cannon.add( cannonBarrel );

    cannon.rotation.z = Math.PI / 2;
    cannon.position.x -= 140;
    cannon.position.z += 10;
    cannon.name = "CannonBall";
    scene.add( cannon );
}



function createBall()
{
    var ballGeometry = new THREE.SphereGeometry( 2.05 );
    var ballMaterial = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'#32cd32'}), .95, .95 );
    ball = new Physijs.SphereMesh( ballGeometry, ballMaterial );

    ball.position.x = cannon.position.x + Math.cos((Math.PI/2)-cannon.rotation.z) * 10;
    ball.position.y = cannon.position.y - Math.cos(cannon.rotation.z) * 10;
    ball.position.z = cannon.position.z - Math.sin(cannon.rotation.y) * 10;

    ball.name = 'CannonBall';

    ball.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity )
    {
        if( other_object.name !== "GroundPlane" )
        {
            totalScore++;
            document.getElementById('score').innerHTML = 'Score: ' + getScore();
            //console.log('hit');
        }
    });
}

var targetList;
function createTarget()
{
    targetList = [];

    for( var i=0; i<4; i++ )
    {
        var geo = new THREE.BoxGeometry( 4, 4, 12 );
        var mat = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'blue'}), .95, .95 );
        var msh = new Physijs.BoxMesh( geo, mat );
        switch( i )
        {
            case 0: msh.position.x = 80; break;
            case 1: msh.position.x = 85; msh.position.y = 5; break;
            case 2: msh.position.x = 90; break;
            case 3: msh.position.x = 85; msh.position.y = -5; break;
        }
        msh.position.z = 6;
        targetList.push( msh );
        scene.add( msh );
    }

    var sg = new THREE.SphereGeometry( 5 );
    var sm = new Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'red'}), .95, .95 );
    smsh = new Physijs.SphereMesh( sg, sm );
    smsh.position.x = 85;
    smsh.position.y = 0;
    smsh.position.z = 16;
    smsh.name = "TargetBall";

    scene.add( smsh );
}

function backgroundTexture(backgroundScene, backgroundCamera) {
    var texture = THREE.ImageUtils.loadTexture( './assets/images/neonbackdrop.jpg' );
    var backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 10),
        new THREE.MeshBasicMaterial({
            map: texture
        }));

    backgroundMesh .material.depthTest = false;
    backgroundMesh .material.depthWrite = false;

    // Create your background scene
    backgroundScene = new THREE.Scene();
    backgroundCamera = new THREE.Camera();
    backgroundScene .add(backgroundCamera );
    backgroundScene .add(backgroundMesh );
}

function board(){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
}


var scoreObject = null;
var scoreValue = 0;
function createScoreBoard(){

    if( scoreObject !== null )
    {
        scene.remove( scoreObject );
    }

    var scoreString = "" + scoreValue;
    var scoreObjectGeometry = new THREE.TextGeometry( scoreString,
        {
            size: 2,
            height: 0.4,
            curveSegments: 10,
            bevelEnabled: false
        });

    var scoreObjectMaterial = new THREE.MeshLambertMaterial({color:0xFF0022});

    scoreObject = new THREE.Mesh( scoreObjectGeometry, scoreObjectMaterial );
    scoreObject.position.x = 0;
    scoreObject.position.y = 0;
    scoreObject.position.z = 0;
    scoreObject.rotation.x = 25 * Math.PI / 180;
    scene.add( scoreObject );
}
