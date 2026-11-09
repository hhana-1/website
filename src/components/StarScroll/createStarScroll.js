// Glossy 3D star that turns as the page scrolls.
import {
  BackSide,
  BufferAttribute,
  CircleGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PMREMGenerator,
  PerspectiveCamera,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const DEFAULTS = {
  model: "/models/star.glb",
  turnsPerScreen: 0.5, // full turns per screen-height scrolled (negative = other direction)
  axis: "y", // "y" spins like a coin, "x" flips forward, "z" turns like a wheel
  smoothing: 6, // how quickly the star catches up with the scroll; higher = snappier
  float: true, // gentle idle bobbing
  pearl: true, // pale-to-plum pearl colour shift (false = plain lilac chrome)
  padding: 1.12, // empty space around the star inside its box
  scrollTarget: null, // element that scrolls, if not the window
};

// Replaces the material's flat colour with a pearl gradient: pale lilac where the
// surface faces the viewer, deep plum towards the edges.
const PEARL_SHADER = /* glsl */ `
  #include <color_fragment>
  float starFres = 1.0 - clamp( abs( dot( normalize( vNormal ), normalize( vViewPosition ) ) ), 0.0, 1.0 );
  vec3 starFacing = vec3( 0.791, 0.610, 0.831 );
  vec3 starMid = vec3( 0.456, 0.254, 0.578 );
  vec3 starEdge = vec3( 0.156, 0.069, 0.209 );
  diffuseColor.rgb = starFres < 0.5 ? mix( starFacing, starMid, starFres * 2.0 ) : mix( starMid, starEdge, ( starFres - 0.5 ) * 2.0 );
`;

// Builds a soft "photo studio" reflection map: a lilac gradient dome plus a few
// glowing round light panels. This is what makes the chrome look glossy.
function createStudioEnvironment(renderer) {
  const studio = new Scene();

  const dome = new SphereGeometry(40, 48, 24);
  const lightDirection = new Vector3(-0.55, 0.7, 0.45).normalize();
  const shadowColor = new Color("#8E6E90");
  const lightColor = new Color("#EBCDE2");
  const positions = dome.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const point = new Vector3();
  const color = new Color();
  for (let i = 0; i < positions.count; i++) {
    point.fromBufferAttribute(positions, i).normalize();
    color.copy(shadowColor).lerp(lightColor, point.dot(lightDirection) * 0.5 + 0.5);
    colors.set([color.r, color.g, color.b], i * 3);
  }
  dome.setAttribute("color", new BufferAttribute(colors, 3));
  studio.add(new Mesh(dome, new MeshBasicMaterial({ vertexColors: true, side: BackSide })));

  const addLightPanel = (x, y, z, radius, hex, intensity) => {
    const panel = new Mesh(
      new CircleGeometry(radius, 40),
      new MeshBasicMaterial({ color: new Color(hex).multiplyScalar(intensity), side: DoubleSide }),
    );
    panel.position.set(x, y, z);
    panel.lookAt(0, 0, 0);
    studio.add(panel);
  };
  addLightPanel(-9, 10, 12, 7, "#FFF1F8", 6);
  addLightPanel(12, -1, 10, 6, "#FFD3EA", 3);
  addLightPanel(3, -10, -8, 5, "#FFE0F2", 5);
  addLightPanel(0, 18, 6, 9, "#FFF6FB", 2);
  addLightPanel(0, 1, 28, 17, "#F3DCEB", 1.35);

  const pmrem = new PMREMGenerator(renderer);
  const texture = pmrem.fromScene(studio, 0.02).texture;
  pmrem.dispose();
  studio.traverse((obj) => {
    if (obj.isMesh) {
      obj.geometry.dispose();
      obj.material.dispose();
    }
  });
  return texture;
}

// Distance from the rotation centre to the model's farthest point, so the camera
// can frame the star tightly whichever way it is turned.
function measureRadius(model) {
  model.updateMatrixWorld(true);
  const point = new Vector3();
  let radius = 0;
  model.traverse((obj) => {
    if (!obj.isMesh) return;
    const positions = obj.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      point.fromBufferAttribute(positions, i).applyMatrix4(obj.matrixWorld);
      radius = Math.max(radius, point.length());
    }
  });
  return radius || 1;
}

export function createStarScroll(container, options = {}) {
  if (!container) throw new Error("createStarScroll: container element not found");
  const opts = { ...DEFAULTS, ...options };
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearAlpha(0); // transparent background
  const canvas = renderer.domElement;
  Object.assign(canvas.style, { display: "block", width: "100%", height: "100%" });
  container.appendChild(canvas);

  const scene = new Scene();
  scene.environment = createStudioEnvironment(renderer);
  const camera = new PerspectiveCamera(26, 1, 0.1, 100);
  const pivot = new Group(); // the star is rotated by turning this
  scene.add(pivot);

  let modelRadius = 2.2; // replaced with the real size once the model has loaded
  let disposed = false;

  function resize() {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const halfFov = (camera.fov * Math.PI) / 360;
    const distance = (modelRadius * opts.padding) / Math.tan(halfFov);
    camera.position.set(0, 0, distance / Math.min(1, camera.aspect)); // step back further in tall boxes
    camera.updateProjectionMatrix();
  }

  new GLTFLoader().load(
    opts.model,
    (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      const seenMaterials = new Set();
      model.traverse((obj) => {
        if (!obj.isMesh || seenMaterials.has(obj.material)) return;
        const material = obj.material;
        seenMaterials.add(material);
        material.envMapIntensity = 1;
        if (opts.pearl) {
          material.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace("#include <color_fragment>", PEARL_SHADER);
          };
          material.customProgramCacheKey = () => "star-pearl";
        }
      });
      modelRadius = measureRadius(model);
      pivot.add(model);
      resize();
      container.dispatchEvent(new CustomEvent("star:ready"));
    },
    undefined,
    (error) => console.error("StarScroll: could not load", opts.model, error),
  );

  // --- scroll → rotation
  const scrollPosition = () => (opts.scrollTarget ? opts.scrollTarget.scrollTop : window.scrollY);
  const targetAngle = () =>
    (scrollPosition() / Math.max(1, window.innerHeight)) * opts.turnsPerScreen * Math.PI * 2;

  let angle = targetAngle();
  let isOnScreen = true;
  let frame = 0;
  const startTime = performance.now();
  let lastTime = startTime;

  function renderFrame(now) {
    frame = 0;
    if (disposed) return;
    const elapsed = (now - startTime) / 1000;
    const delta = Math.min(0.25, Math.max(0, (now - lastTime) / 1000));
    lastTime = now;

    // ease towards the scroll-based angle, so it glides into place when scrolling stops
    angle += (targetAngle() - angle) * (1 - Math.exp(-opts.smoothing * delta));
    pivot.rotation.set(0, 0, 0);
    pivot.rotation[opts.axis] = angle;

    if (opts.float && !reducedMotion) {
      pivot.position.y = Math.sin(elapsed * 1.1) * 0.05;
      if (opts.axis !== "x") pivot.rotation.x = Math.sin(elapsed * 0.8) * 0.04;
    }

    renderer.render(scene, camera);
    requestRender();
  }

  // only animate while the star is on screen and the tab is visible
  function requestRender() {
    if (!frame && isOnScreen && !document.hidden && !disposed) frame = requestAnimationFrame(renderFrame);
  }

  const resizeObserver = new ResizeObserver(() => {
    resize();
    requestRender();
  });
  resizeObserver.observe(container);

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isOnScreen = entry.isIntersecting;
    requestRender();
  });
  visibilityObserver.observe(container);

  const onVisibilityChange = () => requestRender();
  document.addEventListener("visibilitychange", onVisibilityChange);

  resize();
  requestRender();

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      scene.environment?.dispose();
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss(); // free the WebGL context right away
      canvas.remove();
    },
  };
}
