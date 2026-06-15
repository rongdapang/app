/**
 * UI 更新和显示逻辑
 */

import { CONFIG, HAPPINESS_LEVELS } from './config.js';
import { getLoveMessage, getInteractMessage } from './messages.js';

class UIManager {
  constructor() {
    this.msgDiv = document.getElementById('message-bubble');
    this.weatherDiv = document.getElementById('weather-tag');
    this.happinessFill = document.getElementById('happiness-fill');
    this.happinessVal = document.getElementById('happiness-value');
    this.nightOverlay = document.getElementById('night-overlay');
    this.loadingDiv = document.getElementById('loading');
  }

  /**
   * 更新好感度显示
   */
  updateHappiness(happiness) {
    happiness = Math.max(0, Math.min(100, happiness));
    this.happinessFill.style.width = happiness + '%';
    this.happinessVal.innerText = Math.floor(happiness);

    // 根据好感度改变进度条颜色
    if (happiness >= 80) {
      this.happinessFill.style.background = 'linear-gradient(90deg, #5a9bd5, #3d7ab8)';
    } else if (happiness >= 50) {
      this.happinessFill.style.background = 'linear-gradient(90deg, #7ab8e0, #5a9bd5)';
    } else {
      this.happinessFill.style.background = 'linear-gradient(90deg, #a0c0d0, #7ab8e0)';
    }
  }

  /**
   * 显示爱心浮窗
   */
  showLovePopup(x, y, text) {
    const popup = document.createElement('div');
    popup.className = 'love-popup';
    popup.innerText = text;
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), CONFIG.UI.LOVE_POPUP_DURATION);
  }

  /**
   * 更新消息气泡
   */
  updateMessage(text) {
    this.msgDiv.innerText = text;
  }

  /**
   * 更新天气显示
   */
  updateWeather(weather) {
    const iconMap = {
      '晴': 'sun',
      '多云': 'cloud-sun',
      '雨': 'cloud-rain',
      '雪': 'snowflake',
      '雾': 'smog',
      '夜': 'moon',
    };
    this.weatherDiv.innerHTML = `<i class="fas fa-${iconMap[weather] || 'sun'}"></i> 今天 ${weather}`;
  }

  /**
   * 更新夜间模式
   */
  updateNightMode(isNight) {
    this.nightOverlay.style.opacity = isNight ? '1' : '0';
  }

  /**
   * 隐藏加载动画
   */
  hideLoading() {
    this.loadingDiv.style.display = 'none';
  }

  /**
   * 显示通知权限提示
   */
  showNotificationGuide() {
    const guide = document.getElementById('permission-guide');
    if (guide) guide.style.display = 'block';
  }

  /**
   * 隐藏通知权限提示
   */
  hideNotificationGuide() {
    const guide = document.getElementById('permission-guide');
    if (guide) guide.style.display = 'none';
  }
}

export const uiManager = new UIManager();
