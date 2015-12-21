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

var colours = [0xCD853F, 0x191970, 0xDAA520];
var matriz = { x: 800, y: 800, z: 800};
var counter = 0;

var photosObjArr=[];

var maxLine=30;
var colCount=0;
var rowCount=0;
var hexaRythm=1;

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

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1500 );
	camera.position.y = 0;
	camera.position.z = 700;

	scene = new THREE.Scene();
	group = new THREE.Object3D();  // El grupo general

	scene.fog=new THREE.FogExp2( 0xffffff, 0.001 );


/* ******************************************************************* OBJECTOS */

	// ------------------------------------------ CUBO CENTRAL

	var geometry = new THREE.BoxGeometry( 60, 60, 60 );
	// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
	var material = new THREE.MeshLambertMaterial( { color: 0xFF2A2A,} );
	cubeBig = new THREE.Mesh( geometry, material );
	// scene.add( cubeBig );

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

	for (var i = 0; i <= 590; i++) {
		// counter ++;
		// addCubes ();
		addCubesOrdenados (i);
	};

	//addAllPhotos();

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

function addAllPhotos () {
	for (var i = 0; i <= 100; i++) {
		// counter ++;
		addPhotos ();
	};
}

function addCubes () {
	var material2; 
	var geometry2 = new THREE.CylinderGeometry( 20, 20, 2, 6 );
	material2 = new THREE.MeshLambertMaterial( { color: 0xffffff } );

	var cube2 = new THREE.Mesh( geometry2, material2 );
	
	cube2.position.x=Math.abs(Math.random()*matriz.x)-(matriz.x/2);
	cube2.position.y=Math.abs(Math.random()*matriz.y)-(matriz.y/2);
	cube2.position.z=Math.abs(Math.random()*matriz.z)-(matriz.z/2);
	group.add( cube2 );
	// cube2.rotation.y=Math.abs(Math.random()*300);
	// cube2.rotation.x=Math.abs(Math.random()*300);
	cube2.rotation.x= 1.5300000000000012;

	cube2.mas=true;

	cubes.push(cube2);
}



function addCubesOrdenados (pos) {
	var material2; 
	var geometry2 = new THREE.CylinderGeometry( 30, 30, 3, 6 );
	material2 = new THREE.MeshLambertMaterial( { color: 0xff0000 } );

	var cube2 = new THREE.Mesh( geometry2, material2 );
	
	cube2.rotation.x= 1.5300000000000012;

	if (hexaRythm==1) {
		spaceInit=-400;
	}else{
		spaceInit=-428
	}
	console.log("spaceInit",spaceInit);
	cube2.position.x=(-250)+spaceInit+(55*colCount);
	// console.log("colCount",colCount);
	console.log(maxLine);
	var spaceInit;
	cube2.position.y=450-(47*rowCount);

	cube2.origenX=cube2.position.x;
	cube2.origenY=cube2.position.y;
	cube2.origenZ=cube2.position.z;


	if (colCount<28) {
		colCount++;
	}else{
		colCount=0;
		rowCount++;
		if (hexaRythm==1) {
			hexaRythm=2;
		}else{
			hexaRythm=1;
		}
	}

	/**/
	cube2.position.z=0;
	cube2.rotation.z= 0.005*pos;
	group.add( cube2 );
	// cube2.rotation.y=Math.abs(Math.random()*300);
	// cube2.rotation.x=Math.abs(Math.random()*300);

	cube2.mas=true;

	cubes.push(cube2);
}

function addPhotos () {
	var material2; 
	var geometry2 = new THREE.BoxGeometry(40, 40, 1);
	// material2 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('../materials/clouds.jpg') } );
	material2 = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture('../materials/girl.jpg') } );
	counter = 0;
	
	var cube2 = new THREE.Mesh( geometry2, material2 );
	
	cube2.position.x=Math.abs(Math.random()*matriz.x)-(matriz.x/2);
	cube2.position.y=Math.abs(Math.random()*matriz.y)-(matriz.y/2);
	cube2.position.z=Math.abs(Math.random()*matriz.z)-(matriz.z/2);
	group.add( cube2 );
	// cube2.rotation.y=Math.abs(Math.random()*300);
	// cube2.rotation.x=Math.abs(Math.random()*300);
	// cube2.rotation.x= 1.5300000000000012;

	// cube2.mas=true;

	photosObjArr.push(cube2);
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
var allNormal=true;
function animate() {

	requestAnimationFrame( animate );
	if (allNormal) {

		for(var i in cubes){
			/*var mas=true;
			if (cubes[i].position.z<-110) {
				cubes[i].mas=false;
			}
			if(cubes[i].position.z>200){
				cubes[i].mas=true;
			}
			if (cubes[i].mas) {
				cubes[i].position.z-=.5;
				// console.log(1);
			}else{
				cubes[i].position.z+=.05;
				// console.log(2);
			}*/
			// cubes[i].scale.y+=.01;
			//cubes[i].rotation.y+=.05;
			cubes[i].rotation.z+=.008/* + (i/10000)*/;

		}
	};
	cubeBig.rotation.x += 0.1;
	cubeBig.rotation.y += 0.1;
	render();
	stats.update();

}

function render() {

	group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.05;
	group.rotation.x += ( targetRotationY - group.rotation.x ) * 0.05;
	renderer.render( scene, camera );

}

function tweenCamera (x,y,z) {
	TweenMax.to(camera.position,2,{x:x,y:y,z:z,onUpdate:function(){
	                        camera.updateProjectionMatrix();
	                        camera.lookAt(scene.position);
	                    }});
}
// tweenCamera(0,0,700) // normal




function ordenaObjects (obj3D, zToGo, zActual,xToGo, xActual,yToGo, yActual) {
    var obj = {x:xActual,y:yActual,z:zActual};
    // TweenLite.to(obj, 2, {z:84, ease:Expo.easeOut, onUpdate:drawCanvas});
    TweenLite.to(obj, 1, {x:xToGo, y:yToGo, z:zToGo, ease:Expo.easeOut, onUpdate:update/*, onComplete:fadeExteriorToA2*/,ease:Expo.easeOut});
    function update() {
        // console.log("z is now " + Math.round(obj.z),externalImgNames[Math.round(obj.z)]);
        obj3D.position.z=obj.z;
        obj3D.position.x=obj.x;
        obj3D.position.y=obj.y;
        // frameActualExt=framToGo;
    }
}

function desordenaObjects (obj3D, zToGo, zActual,xToGo, xActual,yToGo, yActual) {
    var obj = {x:xActual,y:yActual,z:zActual};
    // TweenLite.to(obj, 2, {z:84, ease:Expo.easeOut, onUpdate:drawCanvas});
    TweenLite.to(obj, 4, {x:xToGo, y:yToGo, z:zToGo, ease:Expo.easeOut, onUpdate:update/*, onComplete:fadeExteriorToA2*/,ease:Elastic.easeOut});
    function update() {
        // console.log("z is now " + Math.round(obj.z),externalImgNames[Math.round(obj.z)]);
        obj3D.position.z=obj.z;
        obj3D.position.x=obj.x;
        obj3D.position.y=obj.y;
        // frameActualExt=framToGo;
    }
}

function juntaObjects (obj3D, zToGo, zActual,xToGo, xActual,yToGo, yActual) {
    var obj = {x:xActual,y:yActual,z:zActual};
    // TweenLite.to(obj, 2, {z:84, ease:Expo.easeOut, onUpdate:drawCanvas});
    TweenLite.to(obj, 1, {x:xToGo, y:yToGo, z:zToGo, ease:Expo.easeOut, onUpdate:update/*, onComplete:fadeExteriorToA2*/,ease:Expo.easeOut});
    function update() {
        // console.log("z is now " + Math.round(obj.z),externalImgNames[Math.round(obj.z)]);
        obj3D.position.z=obj.z;
        obj3D.position.x=obj.x;
        obj3D.position.y=obj.y;
        // frameActualExt=framToGo;
    }
}



function desordena () {
	for(var i in cubes){
		var randomZ=Math.round((Math.random()*1500)-800);
		var randomX=Math.round((Math.random()*1500)-800);
		var randomY=Math.round((Math.random()*1500)-800);
		desordenaObjects(cubes[i],randomZ,cubes[i].position.z,randomX,cubes[i].position.x,randomY,cubes[i].position.y)
		
	}
}

function ordena () {	
	for(var i in cubes){
		ordenaObjects(cubes[i],0,cubes[i].position.z,cubes[i].origenX,cubes[i].position.x,cubes[i].origenY,cubes[i].position.y);
	}
}
function junta () {
	for(var i in cubes){
		var randomZ=0;
		var randomX=0;
		var randomY=0;
		juntaObjects(cubes[i],randomZ,cubes[i].position.z,randomX,cubes[i].position.x,randomY,cubes[i].position.y)
		
	}
	/*for(var i in cubes){
		cubes[i].rotation.z=0
		cubes[i].position.x=0
		cubes[i].position.y=0
		cubes[i].position.z=0
	}*/
}
function cambiaColor (from,color,cual) {
	 TweenLite.fromTo($("body"), 4,{backgroundColor:from}, {backgroundColor:color, ease:Expo.easeOut, onUpdate:update/*, onComplete:fadeExteriorToA2*/});
	     function update() {
	 		//var rgb="rgb(0, 255, 0)";
	 		var rgb=$("body").get()[0].style.backgroundColor;
	 		var desde=rgb.indexOf("(")+1;
	 		var hasta=(rgb.indexOf(")"));
	 		var rgbArr=rgb.substring(desde,hasta).split(",")
	 		var rgbToSend=rgbArr[0]+rgbArr[1]+rgbArr[2];
	 		console.log(rgbToSend,desde,hasta)
	 /*		var r=rgbArr[0]
	 		var g=
	 		var b=*/
	 		cual.material.color.r=rgbArr[0]/100;
	 		cual.material.color.g=rgbArr[1]/100;
	 		cual.material.color.b=rgbArr[2]/100;
	         //console.log(rgb,rgb,rgbArr[0],rgbArr[1],rgbArr[2]);
	     }
}
// cambiaColor(0xffffff);

function resetGroupRotation () {
	targetRotationY=0;
	targetRotationX=0;
}

function toWhite () {
	renderer.setClearColor( 0xffffff );
	scene.fog.color={r:1,g:1,b:1}
	pointLight.intensity=1;
}
function toBlack () {
	renderer.setClearColor( 0x000000 );
	scene.fog.color={r:0,g:0,b:0}
	pointLight.intensity=.7;

}


/*Viaja a Foto*/
function viajaToFoto () {
	targetRotationX=0;
	targetRotationY=0;
	tweenCamera(0,0,80);
	desordena();
}

function viajaAfuera () {
	targetRotationX=.5;
	targetRotationY=0;
	tweenCamera(800,-400,0);
	ordena()	
}


