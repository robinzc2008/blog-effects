/**
 * Global Cyber Holo-Sparks Mouse Effect
 *
 * This script creates vibrant, multi-colored, glowing particles that appear
 * when the mouse moves across the entire document body.
 * Particles float upwards and fade out, giving a techy, cybernetic feel.
 *
 * Designed for easy integration into web projects, especially with Pjax compatibility.
 *
 * Usage: Link this JS file in your global site footer or head via a <script> tag.
 * Ensure it runs after the DOM is ready for best results.
 *
 * Author: Your Name (optional)
 * Version: 1.0.0
 * Date: 2023-11-20
 */
(function() { // IIFE (Immediately Invoked Function Expression) to prevent global variable pollution
    'use strict';

    // --- Configuration ---
    const config = {
        maxSparks: 70,      // 屏幕上同时存在的最大火花数量
        sparkMinSize: 4,    // 火花最小尺寸（像素），增加随机性
        sparkMaxSize: 8,    // 火花最大尺寸（像素）
        // 鲜艳且和谐的颜色数组，可以根据喜好调整
        sparkColors: [
            '#00FFFF', // 青色 (Cyan)
            '#FF00FF', // 品红色 (Magenta)
            '#00FF00', // 亮绿色 (Lime Green)
            '#FFFF00', // 黄色 (Yellow)
            '#ADFF2F', // 绿黄色 (GreenYellow)
            '#FF69B4', // 热门粉 (HotPink)
            '#8A2BE2', // 蓝紫罗兰 (BlueViolet)
            '#00BFFF'  // 深空蓝 (Deep Sky Blue)
        ],
        glowEffect: true,   // 是否启用发光效果
        fadingTime: 1600,   // 火花从创建到完全消失的时间（毫秒），略微延长拖尾感
        sparkFrequency: 25, // 两次生成火花之间最小时间间隔（毫秒），值越小火花越密集
        movementRange: 40,  // 火花从鼠标位置散开的距离（像素），增加扩散范围
        initialScale: 0.2,  // 火花初始缩放比例，让它从小点渐显
        floatDistance: 30   // 火花向上浮动的最大距离（像素）
    };

    // --- Internal Variables ---
    let lastSparkTime = 0;
    const activeSparks = new Set(); // 存储当前活动的火花DOM元素，方便管理和清理
    let mouseMoveHandler = null; // 用于存储鼠标移动事件处理函数的引用，方便移除

    // --- Helper Functions ---

    /**
     * 从配置的颜色数组中随机选择一个颜色。
     * @returns {string} 随机的十六进制颜色字符串。
     */
    function getRandomSparkColor() {
        return config.sparkColors[Math.floor(Math.random() * config.sparkColors.length)];
    }

    /**
     * 生成一个随机的火花尺寸。
     * @returns {number} 随机尺寸（像素）。
     */
    function getRandomSparkSize() {
        return Math.floor(Math.random() * (config.sparkMaxSize - config.sparkMinSize + 1)) + config.sparkMinSize;
    }

    /**
     * 创建并添加一个火花到页面。
     * @param {number} x - 鼠标的 viewport X 坐标。
     * @param {number} y - 鼠标的 viewport Y 坐标。
     */
    function createSpark(x, y) {
        const now = Date.now();
        // 限制火花的生成频率
        if (now - lastSparkTime < config.sparkFrequency) {
            return;
        }
        lastSparkTime = now;

        // 如果火花数量超过限制，移除最老的火花以优化性能
        if (activeSparks.size >= config.maxSparks) {
            const oldestSpark = activeSparks.values().next().value;
            if (oldestSpark && oldestSpark.parentNode) {
                oldestSpark.parentNode.removeChild(oldestSpark);
                activeSparks.delete(oldestSpark);
            }
        }

        const spark = document.createElement('div');
        spark.classList.add('global-cyber-spark'); // 添加统一的类名

        // 随机偏移，让火花从鼠标中心向外散开一点
        const offsetX = (Math.random() - 0.5) * config.movementRange;
        const offsetY = (Math.random() - 0.5) * config.movementRange;

        const sparkColor = getRandomSparkColor();
        const sparkSize = getRandomSparkSize();

        // 直接设置火花样式，确保高优先级
        spark.style.cssText = `
            left: ${x + offsetX}px;
            top: ${y + offsetY}px;
            width: ${sparkSize}px;
            height: ${sparkSize}px;
            background-color: ${sparkColor};
            box-shadow: ${config.glowEffect ? `0 0 ${sparkSize * 1.5}px ${sparkColor}` : 'none'};
            /* 使用 CSS 变量传递动画时间和尺寸，方便 keyframes 使用 */
            --fading-time: ${config.fadingTime}ms;
            --initial-scale: ${config.initialScale};
            --float-distance: ${config.floatDistance}px;
        `;

        // 将火花添加到 body
        document.body.appendChild(spark);
        activeSparks.add(spark); // 加入 Set 进行管理

        // 动画结束后移除元素，清理DOM
        spark.addEventListener('animationend', () => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
                activeSparks.delete(spark);
            }
        }, { once: true });
    }

    // --- Event Handlers ---

    /**
     * 鼠标移动事件处理函数。
     * @param {MouseEvent} e - 鼠标事件对象。
     */
    function handleMouseMove(e) {
        // 对于全站效果，直接使用 clientX/Y 作为 viewport 坐标
        createSpark(e.clientX, e.clientY);
    }

    // --- Style Injection ---

    /**
     * 动态注入 CSS 样式。
     */
    function injectStyles() {
        if (document.getElementById('global-cyber-spark-styles')) {
            return; // 避免重复注入样式
        }

        const styles = `
            .global-cyber-spark {
                position: fixed; /* 保持在视口中，不随页面滚动 */
                border-radius: 2px; /* 科技感方块效果 */
                opacity: 1; /* 初始完全不透明 */
                pointer-events: none; /* 确保火花不会阻挡鼠标事件或点击 */
                z-index: 9999; /* 确保火花显示在页面最上层 */
                /* 动画通过 CSS 变量来控制时间、起始和浮动距离 */
                animation: globalCyberSparkAnimation var(--fading-time) ease-out forwards;
            }

            @keyframes globalCyberSparkAnimation {
                0% {
                    transform: scale(var(--initial-scale)) translateY(0); /* 从小点开始，不浮动 */
                    opacity: 1;
                }
                25% {
                    transform: scale(1) translateY(calc(var(--float-distance) * -0.2)); /* 浮动一点并放大到正常大小 */
                    opacity: 0.9;
                }
                100% {
                    transform: scale(0.5) translateY(calc(var(--float-distance) * -1)); /* 继续缩小和向上浮动 */
                    opacity: 0;
                }
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.id = "global-cyber-spark-styles";
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet); // 将样式注入到 <head>
        console.log("Global Cyber Spark Effect: Injected styles.");
    }

    // --- Plugin Lifecycle Management ---

    /**
     * 启动鼠标粒子特效。
     */
    function startEffect() {
