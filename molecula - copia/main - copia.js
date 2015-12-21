var container, stats;

var camera, scene, renderer;
var pointLight, ambientLight;

// ********************************************* OBJETOS

var cube, cubeBig, sphereBig, sphere, group;
var cubes=[];

// ********************************************* OBJETOS

var targetRotationX = 0;
var targetRotationY = 0;
var targetRotationOnMouseDownX = 0;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	container.appendChild( info );

	

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 0;
	camera.position.z = 700;

	scene = new THREE.Scene();
	group = new THREE.Object3D();  // El grupo general

	// scene.fog=new THREE.Fog( 0xffffff, 0.015, 100 );
	scene.fog=new THREE.FogExp2( 0xffffff, 0.002 );
	// scene.fog.color.setHSL( 0.51, 0.6, 0.6 );


/* ******************************************************************* OBJECTOS */

	// ------------------------------------------ CUBO CENTRAL

	var geometry = new THREE.BoxGeometry( 60, 60, 60 );
	// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	var material = new THREE.MeshLambertMaterial( { color: 0xFF2A2A,} );
	cubeBig = new THREE.Mesh( geometry, material );
	scene.add( cubeBig );

	// ------------------------------------------ ESFERA GRANDE

	var geometry = new THREE.SphereGeometry( 80, 26, 36);

	var material = new THREE.MeshLambertMaterial( { color: 0xcc66ff} );

	sphereBig = new THREE.Mesh( geometry, material );
	sphereBig.position.y = 120;
	sphereBig.position.z = 320;

	//group.add( sphereBig );
	


	var geometry = new THREE.SphereGeometry( 50, 26, 36);

	var material = new THREE.MeshLambertMaterial( { color: 0xff6600 } );

	sphere = new THREE.Mesh( geometry, material );
	sphere.position.y = -75;

	//group.add( sphere );

	var colours = [0xCD853F, 0x191970, 0xDAA520];
	function addCubes () {
		// var cube2 = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colours[Math.floor(Math.random() * colours.length)], opacity: 0.4 } ) );
		// var geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
		var geometry2 = new THREE.CylinderGeometry( 40, 40, 10, 6 );
		// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
		var material2 = new THREE.MeshLambertMaterial( { color: 0xFFFFFF,} );
		var cube2 = new THREE.Mesh( geometry2, material2 );
		//console.log( "added" );
		
		cube2.position.x=Math.abs(Math.random()*600)-300;
		cube2.position.y=Math.abs(Math.random()*600)-300;
		cube2.position.z=Math.abs(Math.random()*600)-300;
		group.add( cube2 );
		console.log(cube2.rotation.x);
		// cube2.rotation.y=Math.abs(Math.random()*300);
		// cube2.rotation.x=Math.abs(Math.random()*300);
		cube2.rotation.x= 1.5300000000000012;

		cube2.mas=true;

		cubes.push(cube2);
	}

	for (var i = 0; i <= 50; i++) {
		addCubes ();
	};


	// ------------------------------------------ LUCES
	
	scene.add( group );

	// var pointLight = new THREE.PointLight(0x404040);
	// pointLight.position.x = 120;
	// pointLight.position.y = 120;
	// pointLight.position.z = 121;
	// scene.add( pointLight );

	pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.x = -520;
	pointLight.position.y = 520;
	pointLight.position.z = 721;
	scene.add( pointLight );

	ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( ambientLight );


/* ******************************************************************* OBJECTOS */

	// ------------------------------------------ RENDER
	

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0xFFFFFF );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );


	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );


	// ------------------------------------------ LISTENER


	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	mouseYOnMouseDown = event.clientY - windowHalfY;
	targetRotationOnMouseDownX = targetRotationX;
	targetRotationOnMouseDownY = targetRotationY;

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

	targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.02;
	targetRotationY = targetRotationOnMouseDownY + ( mouseY - mouseYOnMouseDown ) * 0.02;

}

function onDocumentMouseUp( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
		targetRotationOnMouseDownX = targetRotationX;
		targetRotationOnMouseDownY = targetRotationY;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;

		mouseY = event.touches[ 0 ].pageX - windowHalfY;
		targetRotationY = targetRotationOnMouseDownY + ( mouseY - mouseYOnMouseDown ) * 0.05;

	}

}

//

function animate() {

	requestAnimationFrame( animate );

	// for(var i in cubes){
	// 	var mas=true;
	// 	if (cubes[i].position.z<-300) {
	// 		cubes[i].mas=false;
	// 	}
	// 	if(cubes[i].position.z>500){
	// 		cubes[i].mas=true;
	// 	}
	// 	if (cubes[i].mas) {
	// 		cubes[i].position.z-=1;
	// 		// console.log(1);
	// 	}else{
	// 		cubes[i].position.z+=.05;
	// 		// console.log(2);
	// 	}
	// 	cubes[i].rotation.x+=.05;
	// 	//cubes[i].rotation.y+=.05;

	// }
	cubeBig.rotation.x += 0.05;
	cubeBig.rotation.y += 0.05;
	render();
	stats.update();

}

function render() {

	group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.05;
	group.rotation.x += ( targetRotationY - group.rotation.x ) * 0.05;
	renderer.render( scene, camera );

}
