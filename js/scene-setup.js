/**
 * Three.js 场景初始化
 * 设置场景、相机、渲染器等基础环境
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';

export class SceneSetup {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.container = null;
  }

  /**
   * 初始化整个Three.js场景
   */
  init(containerId) {
    this.container = document.getElementById(containerId);

    // 创建场景
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(CONFIG.BACKGROUND.DAY_COLOR);
    this.scene.fog = new THREE.Fog(
      CONFIG.BACKGROUND.DAY_COLOR,
      10,
      CONFIG.BACKGROUND.DAY_FOG_FAR
    );

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      CONFIG.CAMERA.FOV,
      window.innerWidth / window.innerHeight,
      CONFIG.CAMERA.NEAR,
      CONFIG.CAMERA.FAR
    );
    this.camera.position.set(
      CONFIG.CAMERA.POSITION.x,
      CONFIG.CAMERA.POSITION.y,
      CONFIG.CAMERA.POSITION.z
    );
    this.camera.lookAt(
      CONFIG.CAMERA.LOOK_AT.x,
      CONFIG.CAMERA.LOOK_AT.y,
      CONFIG.CAMERA.LOOK_AT.z
    );

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: CONFIG.RENDERER.ANTIALIAS,
      alpha: CONFIG.RENDERER.ALPHA,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 设置灯光
    this.setupLights();

    // 创建地面
    this.createGround();

    // 监听窗口变化
    this.setupResizeListener();

    return {
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
    };
  }

  /**
   * 设置灯光系统
   */
  setupLights() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(
      CONFIG.LIGHTS.AMBIENT.color,
      CONFIG.LIGHTS.AMBIENT.intensity
    );
    this.scene.add(ambientLight);

    // 方向光
    const dirLight = new THREE.DirectionalLight(
      CONFIG.LIGHTS.DIRECTIONAL.color,
      CONFIG.LIGHTS.DIRECTIONAL.intensity
    );
    dirLight.position.set(3, 5, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = CONFIG.RENDERER.SHADOW_MAP_SIZE;
    dirLight.shadow.mapSize.height = CONFIG.RENDERER.SHADOW_MAP_SIZE;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 20;
    dirLight.shadow.bias = -0.001;
    this.scene.add(dirLight);

    // 补光
    const fillLight = new THREE.DirectionalLight(
      CONFIG.LIGHTS.FILL.color,
      CONFIG.LIGHTS.FILL.intensity
    );
    fillLight.position.set(-3, 2, -2);
    this.scene.add(fillLight);
  }

  /**
   * 创建地面
   */
  createGround() {
    const planeGeometry = new THREE.CircleGeometry(CONFIG.GROUND.RADIUS, 64);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: CONFIG.GROUND.COLOR,
      roughness: CONFIG.GROUND.ROUGHNESS,
      metalness: CONFIG.GROUND.METALNESS,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  /**
   * 窗口变化监听
   */
  setupResizeListener() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}

export const sceneSetup = new SceneSetup();
