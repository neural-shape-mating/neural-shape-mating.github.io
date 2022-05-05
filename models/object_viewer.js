import * as THREE from 'https://cdn.skypack.dev/three@v0.135.0-pjGUcRG9Xt70OdXl97VF';

import {
  OrbitControls
} from 'https://cdn.skypack.dev/three@v0.135.0-pjGUcRG9Xt70OdXl97VF/examples/jsm/controls/OrbitControls.js';

const colors = {
  bowl: {
    a: 15576145,
    b: 0x34b7eb
  },
  box: {
    a: 15576145,
    b: 0x34b7eb
  },
  table: {
    a: 15576145,
    b: 0x34b7eb
  },
  plate: {
    a: 15576145,
    b: 0x34b7eb
  },
  bag: {
    a: 0x2760e6,
    b: 0xf2aa6b
  },
  mug: {
    a: 0x2760e6,
    b: 0xf2aa6b
  },
  sofa: {
    a: 0x2760e6,
    b: 0xf2aa6b
  },
  jar: {
    a: 0xc45851,
    b: 0x74c272
  },
  hat: {
    a: 0xc45851,
    b: 0x74c272
  },
  shoe: {
    a: 0xc45851,
    b: 0x74c272
  },
  toy: {
    a: 0xc45851,
    b: 0x74c272
  }
}

const translate = {
  inputA: "Input Pointcloud A",
  inputB: "Input Pointcloud B",
  gt: "Grouth Truth",
  "ours-no-adv": "NSM w/o <b><i>L<sub>adv</sub></i></b> and <b><i>L<sub>G</sub></i></b>",
  "ours-no-sdf": "NSM w/o <b><i>L<sub>SDF</sub></i></b>",
  "ours": "<b>NSM</b>",
  gnn: "GNN Assembly",
  pred: "PREDATOR",

}

let canvas, renderer;
const scenes = [];

const all_data = [...document.querySelectorAll(".data")].map(dom => JSON.parse(dom.innerText));

function init(data) {

  canvas = document.getElementById( "c" );
  const content = document.getElementById('content');
  for ( let i = 0; i < data.length; i ++ ) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const perspectiveCamera = new THREE.PerspectiveCamera(30, 1.333333, 1, 1000);
    perspectiveCamera.position.z = 3;
    scene.userData.camera = perspectiveCamera;

    // lights
    for (let i = 0; i < 3; i++) {
      let light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.set(+(i == 3), +(i == 2), +(i == 1));
      scene.add(light);

      light = new THREE.DirectionalLight(0xffffff, 0.2);
      light.position.set(-(i == 3), -(i == 2), -(i == 1));
      scene.add(light);
    }
    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add(ambientLight);

    // make a list item
    const element = document.createElement( 'div' );
    element.className = 'list-item';

    const sceneElement = document.createElement( 'div' );
    element.appendChild( sceneElement );

    if (data[i].name) {
      const descriptionElement = document.createElement( 'div' );
      descriptionElement.classList.add("text-center");
      descriptionElement.innerHTML = translate[data[i].name];
      element.appendChild( descriptionElement );
    }


    // the element that represents the area we want to render the scene
    scene.userData.element = sceneElement;
    content.appendChild( element );

    const controls = new OrbitControls( scene.userData.camera, scene.userData.element );
    scene.userData.controls = controls;

    get_geometry(data[i], scene);
    scenes.push( scene );

  }

  renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
  renderer.setClearColor( 0xffffff, 1 );
  renderer.setPixelRatio( window.devicePixelRatio );
}

function get_geometry(data, scene) {
  if (!data.cls) data.cls = "box";
  if (data.a) {
    if (data.a.v) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(data.a.v), 3));
      geometry.setIndex(data.a.f);
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial({
        color: colors[data.cls]['a'],
        flatShading: true,
        metalness: 0.
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = "a"
      scene.add(mesh);
    }


    if (data.a.pc) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(data.a.pc), 3));
      const material = new THREE.PointsMaterial({
        size: 0.02,
        color: colors[data.cls]['a']
      });
      const points = new THREE.Points(geometry, material);
      points.name = "pca";
      scene.add(points);
    }
  }

  if (data.b) {
    if (data.b.v) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(data.b.v), 3));
      geometry.setIndex(data.b.f);
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial({
        color: colors[data.cls]['b'],
        flatShading: true,
        metalness: 0.
      });
      const mesh = new THREE.Mesh(geometry, material)
      mesh.name = "b"
      scene.add(mesh);
    }

    if (data.b.pc) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(data.b.pc), 3));
      const material = new THREE.PointsMaterial({
        size: 0.02,
        color: colors[data.cls]['b']
      });
      const points = new THREE.Points(geometry, material);
      points.name = "pcb";
      scene.add(points);
    }
  }
}


function updateSize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  if ( canvas.width !== width || canvas.height !== height ) {

    renderer.setSize( width, height, false );

  }

}

export function animate() {

  render();
  requestAnimationFrame( animate );

}

function render() {

  updateSize();

  canvas.style.transform = `translateY(${window.scrollY}px)`;

  renderer.setClearColor( 0xffffff );
  renderer.setScissorTest( false );
  renderer.clear();

  renderer.setClearColor( 0xe0e0e0 );
  renderer.setScissorTest( true );

  scenes.forEach( function ( scene ) {

    // get the element that is a place holder for where we want to
    // draw the scene
    const element = scene.userData.element;

    // get its position relative to the page's viewport
    const rect = element.getBoundingClientRect();

    // check if it's offscreen. If so skip it
    if ( rect.bottom < 0 || rect.top > renderer.domElement.clientHeight ||
       rect.right < 0 || rect.left > renderer.domElement.clientWidth ) {

      return; // it's off screen

    }

    // set the viewport
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const left = rect.left;
    const bottom = renderer.domElement.clientHeight - rect.bottom;

    renderer.setViewport( left, bottom, width, height );
    renderer.setScissor( left, bottom, width, height );

    const camera = scene.userData.camera;
    renderer.render( scene, camera );
  } );

}

init(all_data);
animate();
if (document.getElementById("control-vis")) {
  [...document.querySelectorAll(".visibility-toggle")].forEach(dom => dom.addEventListener("click", visibilitySet));
  function visibilitySet(e) {
    const name = e.target.dataset.name;
    const cls = e.target.classList;
    const visibility = cls.contains('btn-primary');
    scenes.forEach((scene) => {
      scene.getObjectByName(name).visible = ! visibility;
    })
    cls.toggle("btn-primary");
    cls.toggle("btn-secondary");
  }
  scenes.forEach((scene) => {
    scene.getObjectByName("pca").visible = false;
  })
  scenes.forEach((scene) => {
    scene.getObjectByName("pcb").visible = false;
  })
}
