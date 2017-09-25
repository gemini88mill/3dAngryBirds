/**
 * Created by raphael on 9/23/17.
 */

function maintainCannonElevationControls()
{
    if( Key.isDown(Key.W))
    {
        playSound('assets/music/sounds/lighthum.mp3');
        cannon.rotation.y -= 0.01;
        if( cannon.rotation.y < -( Math.PI / 3 ) )
        {
            cannon.rotation.y = -( Math.PI / 3 );
        }
    }
    if( Key.isDown(Key.S))
    {
        playSound('assets/music/sounds/lighthum.mp3');
        cannon.rotation.y += 0.01;
        if( cannon.rotation.y > 0 )
        {
            cannon.rotation.y = 0;
        }
    }
}

function maintainCannonRightLeft()
{
    if( Key.isDown(Key.A))
    {
        playSound('assets/music/sounds/lighthum.mp3');
        cannon.rotation.z += 0.01;
    }
    if( Key.isDown(Key.D))
    {
        playSound('assets/music/sounds/lighthum.mp3');
        cannon.rotation.z -= 0.01;
    }
}

var ballLaunched = false;
function maintainBallKeypresses()
{
    if( !ballLaunched && Key.isDown(Key.F) )
    {
        playSound('assets/music/sounds/cannonfire.mp3');
        createBall();
        ballLaunched = true;
        scene.add( ball );
        ball.applyCentralImpulse( new THREE.Vector3( 8000, -( Math.PI / 2 - cannon.rotation.z ) * 4000, -cannon.rotation.y * 10000 ) );
    }
    if( ballLaunched && Key.isDown(Key.L) )
    {
        ballLaunched = false;
        scene.remove( ball );
    }
}

function hintMenu(){
    var x = document.getElementById('hintMenu');
    if(x.style.display === 'none'){
        x.style.display = 'block';
    } else{
        x.style.display = 'none';
    }
}
