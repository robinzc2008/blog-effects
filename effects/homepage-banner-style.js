// 创建科技感banner效果
(function() {
    function initBanner() {
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .banners-title-big {
                font-size: 2.5rem;
                font-weight: 600;
                background: linear-gradient(120deg, #2196F3, #00BCD4);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 1rem;
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.8s ease forwards;
            }

            .banner-subtitle {
                font-size: 1.2rem;
                color: #666;
                margin-bottom: 2rem;
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.8s ease forwards 0.2s;
            }

            .banner-buttons {
                display: flex;
                gap: 1rem;
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.8s ease forwards 0.4s;
            }

            .banner-button {
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .banner-button.primary {
                background: linear-gradient(135deg, #2196F3, #00BCD4);
                color: white;
                box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
            }

            .banner-button.secondary {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                color: #333;
                border: 1px solid rgba(33, 150, 243, 0.3);
            }

            .banner-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
            }

            .banner-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    120deg,
                    transparent,
                    rgba(255, 255, 255, 0.2),
                    transparent
                );
                transition: 0.5s;
            }

            .banner-button:hover::before {
                left: 100%;
            }

            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .tech-icon {
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);

        // 修改现有元素
        const banner = document.querySelector('.banners-title-big');
        if (banner) {
            banner.innerHTML = `
                <div class="banner-content">
                    <h1 class="banners-title-big">还没想好</h1>
                    <h2 class="banner-subtitle">You Live Only Once</h2>
                    <div class="banner-buttons">
                        <button class="banner-button primary">
                            <i class="fas fa-star tech-icon"></i>
                            必看
                        </button>
                        <button class="banner-button secondary">
                            <i class="fas fa-fire tech-icon"></i>
                            热门
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initBanner();
    } else {
        document.addEventListener('DOMContentLoaded', initBanner);
    }
})();
