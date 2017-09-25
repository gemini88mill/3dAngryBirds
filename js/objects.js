/**
 * Created by raphael on 9/23/17.
 */

function createGroundPlane()
{
    var texture = THREE.ImageUtils.loadTexture('./assets/images/pinkplane.jpg');

    var planeMaterial = new Physijs.createMaterial(new THREE.MeshLambertMaterial({map:texture}), .4, .8 );
    var planeGeometry = new THREE.PlaneGeometry( 200, 230, 6 );
    groundPlane = new Physijs.BoxMesh( planeGeometry, planeMaterial, 0 );
    groundPlane.name = "GroundPlane";

    scene.add( groundPlane );
}

function background(){
    var texture = THREE.ImageUtils.loadTexture('./assets/images/cyberpunkbackdrop.jpg');

    var geometry = new THREE.BoxGeometry( 1060, 2, 200 );
    var material = new THREE.MeshBasicMaterial( {map:texture} );
    var plane = new THREE.Mesh( geometry, material );

    plane.position.x = -100;
    plane.position.y = 100;
    plane.position.z = 20;

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

    for( var i=0; i<9; i++ )
    {
        var geo = new THREE.BoxGeometry( 4, 4, 12 );
        var mat = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'lightgrey'}), .95, .95 );
        var msh = new Physijs.BoxMesh( geo, mat );
        switch( i )
        {
            case 0: msh.position.x = 80; break;
            case 1: msh.position.x = 85; msh.position.y = 5; break;
            case 2: msh.position.x = 90; break;
            case 3: msh.position.x = 85; msh.position.y = -5; break;
            case 4: msh.position.x = 85; msh.position.y = -25; break;
            case 5: msh.position.x = 85; msh.position.y = 25; break;
            case 6: msh.position.x = 85; msh.position.y = -45; break;
            case 7: msh.position.x = 85; msh.position.y = 45; break;
            case 8: msh.position.x = 85; msh.position.y = -75; break;

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





