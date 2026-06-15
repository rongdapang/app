/**
 * 用户交互事件处理
 */

import { CONFIG } from './config.js';
import { petState } from './pet-state.js';
import { uiManager } from './ui.js';
import { getInteractMessage } from './messages.js';

class InteractionManager {
  constructor(onInteraction) {
    this.onInteraction = onInteraction;
    this.lastShake = Date.now();
  }

  /**
   * 初始化所有交互事件监听
   */
  init(renderer) {
    this.setupClickInteraction(renderer);
    this.setupShakeInteraction();
    this.setupBatteryInteraction();
    this.setupNotificationRequest();
  }

  /**
   * 点击互动
   */
  setupClickInteraction(renderer) {
    renderer.domElement.addEventListener('click', (e) => {
      petState.addHappiness(CONFIG.PET.HAPPINESS_GAIN_CLICK);
      const msg = getInteractMessage('click');
      uiManager.updateMessage(msg);

      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      uiManager.showLovePopup(x, y, '+1 ❤');

      uiManager.updateHappiness(petState.state.happiness);
      this.onInteraction?.('click');
    });
  }

  /**
   * 摇晃手机交互
   */
  setupShakeInteraction() {
    window.addEventListener('devicemotion', (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const speed = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
      if (speed > 25 && Date.now() - this.lastShake > CONFIG.PET.INTERACTION_COOLDOWN) {
        this.lastShake = Date.now();
        petState.addHappiness(CONFIG.PET.HAPPINESS_GAIN_SHAKE);
        const msg = getInteractMessage('shake');
        uiManager.updateMessage(msg);
        uiManager.updateHappiness(petState.state.happiness);
        this.onInteraction?.('shake');
      }
    });
  }

  /**
   * 电池状态交互（充电检测）
   */
  setupBatteryInteraction() {
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        if (battery.charging) {
          petState.addHappiness(CONFIG.PET.HAPPINESS_GAIN_CHARGE);
          const msg = getInteractMessage('charge');
          uiManager.updateMessage(msg);
          uiManager.updateHappiness(petState.state.happiness);
        }

        battery.addEventListener('chargingchange', () => {
          if (battery.charging) {
            petState.addHappiness(CONFIG.PET.HAPPINESS_GAIN_CHARGE);
            const msg = getInteractMessage('charge');
            uiManager.updateMessage(msg);
            uiManager.updateHappiness(petState.state.happiness);
          }
        });
      });
    }
  }

  /**
   * 设置通知权限请求
   */
  setupNotificationRequest() {
    const btn = document.getElementById('request-permission-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if ('Notification' in window) {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              uiManager.hideNotificationGuide();
            }
          });
        }
      });
    }
  }

  /**
   * 检查是否应该显示通知提示
   */
  checkNotificationPrompt() {
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => {
        uiManager.showNotificationGuide();
      }, 3000);
    }
  }
}

export function createInteractionManager(onInteraction) {
  return new InteractionManager(onInteraction);
}
