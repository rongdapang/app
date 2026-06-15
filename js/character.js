/**
 * 3D角色构建
 * 创建阳光帅气的男生3D形象
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';

export class CharacterBuilder {
  /**
   * 创建完整的角色模型
   */
  static createCharacter() {
    const character = new THREE.Group();
    const bodyGroup = new THREE.Group();

    // 材质定义
    const materials = this.createMaterials();

    // 创建身体各部分
    this.createTorso(bodyGroup, materials);
    this.createHead(bodyGroup, materials);
    this.createArms(bodyGroup, materials);
    this.createLegs(bodyGroup, materials);

    character.add(bodyGroup);
    return { character, bodyGroup };
  }

  /**
   * 创建材质
   */
  static createMaterials() {
    return {
      skin: new THREE.MeshStandardMaterial({
        color: CONFIG.CHARACTER.SKIN_COLOR,
        roughness: CONFIG.CHARACTER.SKIN_ROUGHNESS,
        metalness: CONFIG.CHARACTER.SKIN_METALNESS,
      }),
      clothes: new THREE.MeshStandardMaterial({
        color: CONFIG.CHARACTER.CLOTHES_COLOR,
        roughness: CONFIG.CHARACTER.CLOTHES_ROUGHNESS,
        metalness: CONFIG.CHARACTER.CLOTHES_METALNESS,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: CONFIG.CHARACTER.HAIR_COLOR,
        roughness: CONFIG.CHARACTER.HAIR_ROUGHNESS,
        metalness: CONFIG.CHARACTER.HAIR_METALNESS,
      }),
      pants: new THREE.MeshStandardMaterial({
        color: CONFIG.CHARACTER.PANTS_COLOR,
        roughness: CONFIG.CHARACTER.PANTS_ROUGHNESS,
      }),
      shoes: new THREE.MeshStandardMaterial({
        color: CONFIG.CHARACTER.SHOE_COLOR,
      }),
      dark: new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        roughness: 0.3,
      }),
      white: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
      }),
      mouth: new THREE.MeshStandardMaterial({
        color: 0xc08080,
      }),
    };
  }

  /**
   * 创建躯干
   */
  static createTorso(bodyGroup, materials) {
    const torsoGeo = new THREE.CylinderGeometry(
      CONFIG.CHARACTER.BODY_RADIUS,
      CONFIG.CHARACTER.BODY_RADIUS,
      CONFIG.CHARACTER.BODY_HEIGHT,
      16
    );
    const torso = new THREE.Mesh(torsoGeo, materials.clothes);
    torso.position.y = 0.65;
    torso.castShadow = true;
    bodyGroup.add(torso);

    const torsoTopGeo = new THREE.SphereGeometry(
      CONFIG.CHARACTER.BODY_RADIUS,
      16,
      8,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );
    const torsoTop = new THREE.Mesh(torsoTopGeo, materials.clothes);
    torsoTop.position.y = 1.3;
    bodyGroup.add(torsoTop);

    const torsoBottomGeo = new THREE.SphereGeometry(
      CONFIG.CHARACTER.BODY_RADIUS,
      16,
      8,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 2
    );
    const torsoBottom = new THREE.Mesh(torsoBottomGeo, materials.clothes);
    torsoBottom.position.y = 0;
    bodyGroup.add(torsoBottom);
  }

  /**
   * 创建头部和五官
   */
  static createHead(bodyGroup, materials) {
    const headGroup = new THREE.Group();
    headGroup.position.y = 1.75;

    const headGeo = new THREE.SphereGeometry(0.48, 32, 32);
    headGeo.scale(0.95, 1.05, 0.95);
    const head = new THREE.Mesh(headGeo, materials.skin);
    head.castShadow = true;
    headGroup.add(head);

    this.createHair(headGroup, materials);
    this.createFacialFeatures(headGroup, materials);

    bodyGroup.add(headGroup);
  }

  /**
   * 创建头发
   */
  static createHair(headGroup, materials) {
    const hairTopGeo = new THREE.SphereGeometry(
      0.49,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2.5
    );
    const hairTop = new THREE.Mesh(hairTopGeo, materials.hair);
    hairTop.position.y = 0.1;
    hairTop.scale.set(1.02, 0.85, 1.02);
    headGroup.add(hairTop);

    const hairSideGeo = new THREE.CapsuleGeometry(0.08, 0.3, 4, 8);

    for (let i = -1; i <= 1; i++) {
      const leftHair = new THREE.Mesh(hairSideGeo, materials.hair);
      leftHair.position.set(-0.45, 0.25 - i * 0.1, 0.2);
      leftHair.rotation.z = 0.3 - i * 0.1;
      leftHair.rotation.x = 0.2;
      headGroup.add(leftHair);

      const rightHair = new THREE.Mesh(hairSideGeo, materials.hair);
      rightHair.position.set(0.45, 0.25 - i * 0.1, 0.2);
      rightHair.rotation.z = -0.3 + i * 0.1;
      rightHair.rotation.x = 0.2;
      headGroup.add(rightHair);
    }

    const bangGeo = new THREE.CapsuleGeometry(0.06, 0.25, 4, 8);
    for (let i = -1; i <= 1; i++) {
      const bang = new THREE.Mesh(bangGeo, materials.hair);
      bang.position.set(i * 0.15, 0.35, 0.45);
      bang.rotation.x = -0.3;
      bang.rotation.z = i * 0.1;
      headGroup.add(bang);
    }

    const backHairGeo = new THREE.SphereGeometry(
      0.47,
      16,
      16,
      0,
      Math.PI * 2,
      Math.PI / 2,
      Math.PI / 3
    );
    const backHair = new THREE.Mesh(backHairGeo, materials.hair);
    backHair.position.y = 0.05;
    backHair.position.z = -0.05;
    headGroup.add(backHair);
  }

  /**
   * 创建五官
   */
  static createFacialFeatures(headGroup, materials) {
    const eyeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeo, materials.dark);
    leftEye.position.set(-0.15, 0.05, 0.4);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, materials.dark);
    rightEye.position.set(0.15, 0.05, 0.4);
    headGroup.add(rightEye);

    const highlightGeo = new THREE.SphereGeometry(0.022, 8, 8);
    const leftHighlight = new THREE.Mesh(highlightGeo, materials.white);
    leftHighlight.position.set(-0.17, 0.08, 0.45);
    headGroup.add(leftHighlight);

    const rightHighlight = new THREE.Mesh(highlightGeo, materials.white);
    rightHighlight.position.set(0.13, 0.08, 0.45);
    headGroup.add(rightHighlight);

    const browGeo = new THREE.CapsuleGeometry(0.03, 0.18, 4, 8);
    const leftBrow = new THREE.Mesh(browGeo, materials.hair);
    leftBrow.position.set(-0.15, 0.18, 0.42);
    leftBrow.rotation.z = 0.08;
    leftBrow.rotation.x = 0.15;
    headGroup.add(leftBrow);

    const rightBrow = new THREE.Mesh(browGeo, materials.hair);
    rightBrow.position.set(0.15, 0.18, 0.42);
    rightBrow.rotation.z = -0.08;
    rightBrow.rotation.x = 0.15;
    headGroup.add(rightBrow);

    const mouthCurve = new THREE.TorusGeometry(0.07, 0.02, 8, 16, Math.PI);
    const mouth = new THREE.Mesh(mouthCurve, materials.mouth);
    mouth.position.set(0, -0.16, 0.44);
    mouth.rotation.z = Math.PI;
    headGroup.add(mouth);
  }

  /**
   * 创建手臂
   */
  static createArms(bodyGroup, materials) {
    const createArm = (isLeft) => {
      const armGroup = new THREE.Group();
      const m = isLeft ? 1 : -1;

      const shoulderGeo = new THREE.SphereGeometry(0.17, 16, 16);
      const shoulder = new THREE.Mesh(shoulderGeo, materials.clothes);
      armGroup.add(shoulder);

      const upperArmGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.5, 12);
      const upperArm = new THREE.Mesh(upperArmGeo, materials.clothes);
      upperArm.position.y = -0.25;
      upperArm.castShadow = true;
      armGroup.add(upperArm);

      const elbowGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const elbow = new THREE.Mesh(elbowGeo, materials.skin);
      elbow.position.y = -0.52;
      armGroup.add(elbow);

      const forearmGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.45, 12);
      const forearm = new THREE.Mesh(forearmGeo, materials.skin);
      forearm.position.y = -0.75;
      forearm.castShadow = true;
      armGroup.add(forearm);

      const handGeo = new THREE.SphereGeometry(0.12, 12, 12);
      handGeo.scale(1, 0.7, 0.8);
      const hand = new THREE.Mesh(handGeo, materials.skin);
      hand.position.y = -1.0;
      armGroup.add(hand);

      armGroup.position.set(m * 0.7, 1.15, 0);
      armGroup.rotation.z = m * 0.12;

      return armGroup;
    };

    bodyGroup.add(createArm(true));
    bodyGroup.add(createArm(false));
  }

  /**
   * 创建腿部
   */
  static createLegs(bodyGroup, materials) {
    const createLeg = (isLeft) => {
      const legGroup = new THREE.Group();
      const m = isLeft ? 1 : -1;

      const thighGeo = new THREE.CylinderGeometry(0.16, 0.14, 0.65, 12);
      const thigh = new THREE.Mesh(thighGeo, materials.pants);
      thigh.position.y = -0.32;
      thigh.castShadow = true;
      legGroup.add(thigh);

      const kneeGeo = new THREE.SphereGeometry(0.13, 12, 12);
      const knee = new THREE.Mesh(kneeGeo, materials.pants);
      knee.position.y = -0.68;
      legGroup.add(knee);

      const calfGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.65, 12);
      const calf = new THREE.Mesh(calfGeo, materials.pants);
      calf.position.y = -1.05;
      calf.castShadow = true;
      legGroup.add(calf);

      const shoeGeo = new THREE.BoxGeometry(0.18, 0.1, 0.32);
      const shoe = new THREE.Mesh(shoeGeo, materials.shoes);
      shoe.position.set(0, -1.42, 0.05);
      legGroup.add(shoe);

      legGroup.position.set(m * 0.28, 0.2, 0);

      return legGroup;
    };

    bodyGroup.add(createLeg(true));
    bodyGroup.add(createLeg(false));
  }
}
