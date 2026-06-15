/**
 * 全局配置文件
 * 集中管理所有魔法数字和配置项
 */

export const CONFIG = {
  // 宠物状态配置
  PET: {
    INITIAL_HAPPINESS: 60,
    MAX_HAPPINESS: 100,
    MIN_HAPPINESS: 0,
    HAPPINESS_DECAY_PER_HOUR: 5,
    HAPPINESS_GAIN_CLICK: 1,
    HAPPINESS_GAIN_SHAKE: 3,
    HAPPINESS_GAIN_CHARGE: 2,
    INTERACTION_COOLDOWN: 2000, // 毫秒
  },

  // Three.js 相机配置
  CAMERA: {
    FOV: 50,
    NEAR: 0.1,
    FAR: 100,
    POSITION: { x: 0, y: 2.2, z: 5.5 },
    LOOK_AT: { x: 0, y: 1.2, z: 0 },
  },

  // 渲染器配置
  RENDERER: {
    ANTIALIAS: true,
    ALPHA: false,
    SHADOW_MAP_SIZE: 1024,
  },

  // 灯光配置
  LIGHTS: {
    AMBIENT: { color: 0xffffff, intensity: 0.6 },
    DIRECTIONAL: { color: 0xfff8e7, intensity: 1.0 },
    FILL: { color: 0xd4e9f0, intensity: 0.4 },
  },

  // 动画配置
  ANIMATION: {
    BREATH_SPEED: 1.5,
    SWAY_SPEED: 0.4,
    ARM_WAVE_SPEED: 1.2,
    BOUNCE_DURATION: 0.6, // 秒
    BOUNCE_HEIGHT: 0.15,
    SHAKE_DURATION: 450, // 毫秒
  },

  // 星星配置
  STARS: {
    COUNT: 8,
    RADIUS_BASE: 1.8,
    RADIUS_VARIANCE: 0.5,
    HEIGHT_BASE: 1.2,
    HEIGHT_VARIANCE: 1.5,
  },

  // UI 时间戳
  UI: {
    LOVE_POPUP_DURATION: 1500, // 毫秒
    HAPPINESS_CHECK_INTERVAL: 60000, // 毫秒
  },

  // 夜间模式时间
  NIGHT_MODE: {
    START_HOUR: 19, // 19:00
    END_HOUR: 6,    // 06:00
  },

  // LocalStorage 键名
  STORAGE: {
    PET_STATE: 'weatherPet3d_v2',
  },

  // 三维模型配置
  CHARACTER: {
    // 皮肤颜色
    SKIN_COLOR: 0xf5d0b0,
    SKIN_ROUGHNESS: 0.4,
    SKIN_METALNESS: 0.1,

    // 衣服颜色
    CLOTHES_COLOR: 0x5a9bd5,
    CLOTHES_ROUGHNESS: 0.6,
    CLOTHES_METALNESS: 0.1,

    // 头发颜色
    HAIR_COLOR: 0x2d1f16,
    HAIR_ROUGHNESS: 0.5,
    HAIR_METALNESS: 0.1,

    // 裤子颜色
    PANTS_COLOR: 0x4a5a6a,
    PANTS_ROUGHNESS: 0.7,

    // 鞋子颜色
    SHOE_COLOR: 0x3d3d3d,

    // 尺寸比例
    BODY_RADIUS: 0.5,
    BODY_HEIGHT: 1.3,
    HEAD_RADIUS: 0.48,
    ARM_LENGTH: 0.5,
    LEG_LENGTH: 0.65,
  },

  // 地面配置
  GROUND: {
    RADIUS: 4,
    COLOR: 0xe8f4f8,
    ROUGHNESS: 0.8,
    METALNESS: 0.1,
  },

  // 背景配置
  BACKGROUND: {
    DAY_COLOR: 0xf0f8ff,
    DAY_FOG_FAR: 30,
    NIGHT_OVERLAY_OPACITY: 0.4,
    NIGHT_COLOR: 0x141e2d,
  },
};

export const WEATHER_TYPES = {
  SUNNY: '晴',
  CLOUDY: '多云',
  RAINY: '雨',
  SNOWY: '雪',
  FOGGY: '雾',
  NIGHT: '夜',
};

export const HAPPINESS_LEVELS = {
  LEVEL_60: { min: 60, name: '温柔守护', color: '#7ab8e0' },
  LEVEL_70: { min: 70, name: '深情专一', color: '#5a9bd5' },
  LEVEL_80: { min: 80, name: '浪漫直球', color: '#4a8bc5' },
  LEVEL_90: { min: 90, name: '暖心可靠', color: '#3d7ab8' },
  LEVEL_100: { min: 100, name: '余生承诺', color: '#2d6aa8' },
};
