/**
 * 动画管理和更新逻辑
 * 处理角色的所有动画效果
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';

export class AnimationManager {
  constructor() {
    this.time = 0;
    this.isBouncing = false;
    this.bounceStartTime = 0;
    this.stars = [];
  }

  /**
   * 创建漂浮的星星
   */
  createStars(scene) {
    const starGeo = new THREE.OctahedronGeometry(0.08, 0);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0x5a9bd5,
      emissive: 0x5a9bd5,
      emissiveIntensity: 0.4,
    });

    for (let i = 0; i < CONFIG.STARS.COUNT; i++) {
      const star = new THREE.Mesh(starGeo, starMat);
      const angle = (i / CONFIG.STARS.COUNT) * Math.PI * 2;
      const radius = CONFIG.STARS.RADIUS_BASE + Math.random() * CONFIG.STARS.RADIUS_VARIANCE;
      star.position.set(
        Math.cos(angle) * radius,
        CONFIG.STARS.HEIGHT_BASE + Math.random() * CONFIG.STARS.HEIGHT_VARIANCE,
        Math.sin(angle) * radius
      );
      star.userData = {
        initialY: star.position.y,
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        rotSpeed: 0.02 + Math.random() * 0.02,
      };
      scene.add(star);
      this.stars.push(star);
    }
  }

  /**
   * 更新动画帧
   */
  update(time, character, bodyGroup, headGroup, leftArm, rightArm) {
    this.time = time;

    const breath = Math.sin(this.time * CONFIG.ANIMATION.BREATH_SPEED) * 0.015;
    bodyGroup.scale.y = 1 + breath * 0.5;
    bodyGroup.scale.x = 1 - breath * 0.2;
    bodyGroup.scale.z = 1 - breath * 0.2;

    character.rotation.y = Math.sin(this.time * CONFIG.ANIMATION.SWAY_SPEED) * 0.08;

    leftArm.rotation.z = 0.12 + Math.sin(this.time * CONFIG.ANIMATION.ARM_WAVE_SPEED) * 0.04;
    rightArm.rotation.z =
      -0.12 - Math.sin(this.time * CONFIG.ANIMATION.ARM_WAVE_SPEED + Math.PI) * 0.04;

    headGroup.rotation.y = Math.sin(this.time * 0.25) * 0.06;
    headGroup.rotation.x = Math.sin(this.time * 0.8) * 0.015;

    this.stars.forEach((star) => {
      star.position.y = star.userData.initialY + Math.sin(this.time * star.userData.speed + star.userData.offset) * 0.2;
      star.rotation.y += star.userData.rotSpeed;
      star.rotation.x += star.userData.rotSpeed * 0.5;
      const scale = 1 + Math.sin(this.time * 3 + star.userData.offset) * 0.2;
      star.scale.setScalar(scale);
    });

    if (this.isBouncing) {
      const bounceProgress = (this.time - this.bounceStartTime) / CONFIG.ANIMATION.BOUNCE_DURATION;
      if (bounceProgress <= 1) {
        const bounceHeight = Math.sin(bounceProgress * Math.PI) * CONFIG.ANIMATION.BOUNCE_HEIGHT;
        character.position.y = bounceHeight;
      } else {
        this.isBouncing = false;
        character.position.y = 0;
      }
    } else {
      character.position.y = 0;
    }
  }

  /**
   * 触发跳跃动画
   */
  triggerBounce() {
    if (!this.isBouncing) {
      this.isBouncing = true;
      this.bounceStartTime = this.time;
    }
  }

  /**
   * 触发摇晃动画
   */
  triggerShake(character) {
    const shakeAmount = 0.15;
    character.rotation.z = shakeAmount;
    setTimeout(() => (character.rotation.z = -shakeAmount * 0.5), 150);
    setTimeout(() => (character.rotation.z = shakeAmount * 0.3), 300);
    setTimeout(() => (character.rotation.z = 0), 450);
  }

  /**
   * 更新夜间模式
   */
  updateNightMode(scene, isNight) {
    if (isNight) {
      scene.background.setHex(0x1a1f2e);
      scene.fog.color.setHex(0x1a1f2e);
    } else {
      scene.background.setHex(CONFIG.BACKGROUND.DAY_COLOR);
      scene.fog.color.setHex(CONFIG.BACKGROUND.DAY_COLOR);
    }
  }
}

export const animationManager = new AnimationManager();
