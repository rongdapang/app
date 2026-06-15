/**
 * 宠物状态管理
 * 负责宠物数据的存储、读取和更新
 */

import { CONFIG } from './config.js';

class PetState {
  constructor() {
    this.state = {
      happiness: CONFIG.PET.INITIAL_HAPPINESS,
      lastVisit: Date.now(),
      lastInteraction: Date.now(),
      messageCount: 0,
      weather: '晴',
    };

    this.load();
  }

  /**
   * 从 LocalStorage 加载宠物状态
   */
  load() {
    try {
      const saved = localStorage.getItem(CONFIG.STORAGE.PET_STATE);
      if (saved) {
        const loaded = JSON.parse(saved);
        const lastTime = loaded.lastVisit || Date.now();
        const hoursPassed = Math.floor((Date.now() - lastTime) / (1000 * 60 * 60));

        // 根据离线时间计算好感度衰减
        this.state.happiness = Math.max(
          CONFIG.PET.MIN_HAPPINESS,
          Math.min(
            CONFIG.PET.INITIAL_HAPPINESS,
            (loaded.happiness || CONFIG.PET.INITIAL_HAPPINESS) - hoursPassed * CONFIG.PET.HAPPINESS_DECAY_PER_HOUR
          )
        );
        this.state.lastVisit = lastTime;
        this.state.lastInteraction = loaded.lastInteraction || Date.now();
        this.state.messageCount = loaded.messageCount || 0;
        this.state.weather = loaded.weather || '晴';
      }
    } catch (e) {
      console.warn('Failed to load pet state:', e);
    }
  }

  /**
   * 保存宠物状态到 LocalStorage
   */
  save() {
    try {
      localStorage.setItem(CONFIG.STORAGE.PET_STATE, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save pet state:', e);
    }
  }

  /**
   * 增加好感度
   * @param {number} amount - 增加的数值
   */
  addHappiness(amount) {
    this.state.happiness = Math.min(
      CONFIG.PET.MAX_HAPPINESS,
      this.state.happiness + amount
    );
    this.state.lastInteraction = Date.now();
    this.save();
  }

  /**
   * 减少好感度
   * @param {number} amount - 减少的数值
   */
  reduceHappiness(amount) {
    this.state.happiness = Math.max(
      CONFIG.PET.MIN_HAPPINESS,
      this.state.happiness - amount
    );
    this.save();
  }

  /**
   * 自动衰减好感度（基于时间）
   */
  autoDecayHappiness() {
    const now = Date.now();
    const lastInteraction = this.state.lastInteraction || now;
    const hoursSinceInteraction = (now - lastInteraction) / (1000 * 60 * 60);

    if (hoursSinceInteraction >= 1) {
      const hoursPassed = Math.floor(hoursSinceInteraction);
      const decrease = hoursPassed * CONFIG.PET.HAPPINESS_DECAY_PER_HOUR;
      this.reduceHappiness(decrease);
      // 更新交互时间，保留小数部分的小时差
      this.state.lastInteraction = now - (hoursSinceInteraction % 1) * (1000 * 60 * 60);
      this.save();
      return true;
    }
    return false;
  }

  /**
   * 获取当前好感度等级
   * @returns {string} 好感度等级名称
   */
  getHappinessLevel() {
    const happiness = this.state.happiness;
    if (happiness >= 100) return '余生承诺';
    if (happiness >= 90) return '暖心可靠';
    if (happiness >= 80) return '浪漫直球';
    if (happiness >= 70) return '深情专一';
    return '温柔守护';
  }

  /**
   * 设置天气
   * @param {string} weather - 天气类型
   */
  setWeather(weather) {
    this.state.weather = weather;
    this.save();
  }

  /**
   * 增加消息计数
   */
  incrementMessageCount() {
    this.state.messageCount++;
    return this.state.messageCount;
  }

  /**
   * 获取当前状态副本
   * @returns {object} 宠物状态对象
   */
  getState() {
    return { ...this.state };
  }
}

export const petState = new PetState();
