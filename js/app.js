/**
 * 主应用入口
 * 整合所有模块并启动应用
 */

import * as THREE from 'three';
import { CONFIG } from './config.js';
import { petState } from './pet-state.js';
import { uiManager } from './ui.js';
import { sceneSetup } from './scene-setup.js';
import { CharacterBuilder } from './character.js';
import { animationManager } from './animation.js';
import { createInteractionManager } from './interactions.js';
import { getLoveMessage } from './messages.js';

class WeatherPetApp {
  constructor() {
    this.sceneData = null;
    this.character = null;
    this.bodyGroup = null;
    this.headGroup = null;
    this.leftArm = null;
    this.rightArm = null;
    this.interactionManager = null;
  }

  async init() {
    this.sceneData = sceneSetup.init('canvas-container');

    const charData = CharacterBuilder.createCharacter();
    this.character = charData.character;
    this.bodyGroup = charData.bodyGroup;

    this.headGroup = this.bodyGroup.children.find(
      (child) => child.position.y === 1.75
    );
    const arms = this.bodyGroup.children.filter(
      (child) => child.position.x !== 0 && child.position.y === 1.15
    );
    this.leftArm = arms[0];
    this.rightArm = arms[1];

    this.sceneData.scene.add(this.character);

    animationManager.createStars(this.sceneData.scene);

    uiManager.updateHappiness(petState.state.happiness);
    this.updateWeatherAndMessage();

    this.interactionManager = createInteractionManager(
      (type) => this.onInteraction(type)
    );
    this.interactionManager.init(this.sceneData.renderer);
    this.interactionManager.checkNotificationPrompt();

    this.setupTimers();

    this.startAnimationLoop();

    setTimeout(() => {
      uiManager.hideLoading();
    }, 500);
  }

  updateWeatherAndMessage() {
    const hour = new Date().getHours();
    let weather = '晴';

    if (hour >= 19 || hour < 6) weather = '夜';
    else {
      const rand = Math.random();
      if (rand < 0.4) weather = '晴';
      else if (rand < 0.7) weather = '多云';
      else weather = '雨';
    }

    petState.setWeather(weather);
    uiManager.updateWeather(weather);

    const msg = getLoveMessage(
      petState.state.happiness,
      petState.state.messageCount
    );
    petState.incrementMessageCount();
    uiManager.updateMessage(msg);

    const isNight = hour >= 19 || hour < 6;
    uiManager.updateNightMode(isNight);
    animationManager.updateNightMode(this.sceneData.scene, isNight);
  }

  onInteraction(type) {
    if (type === 'click') {
      animationManager.triggerBounce();
    } else if (type === 'shake') {
      animationManager.triggerShake(this.character);
    }
  }

  setupTimers() {
    setInterval(() => {
      if (petState.autoDecayHappiness()) {
        uiManager.updateHappiness(petState.state.happiness);
        if (petState.state.happiness < 30 && petState.state.happiness > 0) {
          uiManager.updateMessage('嘿，好久不见，我想你了...');
        }
      }
    }, CONFIG.UI.HAPPINESS_CHECK_INTERVAL);

    setInterval(() => {
      this.updateWeatherAndMessage();
    }, 3600000);
  }

  startAnimationLoop() {
    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      animationManager.update(
        time,
        this.character,
        this.bodyGroup,
        this.headGroup,
        this.leftArm,
        this.rightArm
      );

      this.sceneData.renderer.render(
        this.sceneData.scene,
        this.sceneData.camera
      );
    };

    animate();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new WeatherPetApp();
    app.init();
  });
} else {
  const app = new WeatherPetApp();
  app.init();
}
