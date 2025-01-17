(function() {
    // 注入 CSS
    const style = document.createElement('style');
    style.textContent = `
        .loading-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #222;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s;
        }

        .pl {
            width: 6em;
            height: 6em;
        }

        .pl__ring {
            animation: ringA 2s linear infinite;
        }

        .pl__ring--a {
            stroke: #f42f25;
        }

        .pl__ring--b {
            animation-name: ringB;
            stroke: #f49725;
        }

        .pl__ring--c {
            animation-name: ringC;
            stroke: #255ff4;
        }

        .pl__ring--d {
            animation-name: ringD;
            stroke: #f42582;
        }

        /* 您提供的所有 @keyframes 动画代码 */
        @keyframes ringA {
            from, 4% {
                stroke-dasharray: 0 660;
                stroke-width: 20;
                stroke-dashoffset: -330;
            }
            /* ... 其他动画关键帧 ... */
        }

        @keyframes ringB {
            /* ringB 动画代码 */
        }

        @keyframes ringC {
            /* ringC 动画代码 */
        }

        @keyframes ringD {
            /* ringD 动画代码 */
        }
    `;
    document.head.appendChild(style);

    // 创建加载动画 DOM
    const loadingHtml = `
        <div class="loading-container" id="page-loading">
            <svg class="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <circle class="pl__ring pl__ring--a" cx="100" cy="100" r="82" fill="none" stroke="#f42f25" stroke-width="4" stroke-dasharray="0 257" stroke-dashoffset="0" stroke-linecap="round" />
                <circle class="pl__ring pl__ring--b" cx="100" cy="100" r="82" fill="none" stroke="#f49725" stroke-width="4" stroke-dasharray="0 257" stroke-dashoffset="0" stroke-linecap="round" />
                <circle class="pl__ring pl__ring--c" cx="100" cy="100" r="82" fill="none" stroke="#255ff4" stroke-width="4" stroke-dasharray="0 257" stroke-dashoffset="0" stroke-linecap="round" />
                <circle class="pl__ring pl__ring--d" cx="100" cy="100" r="82" fill="none" stroke="#f42582" stroke-width="4" stroke-dasharray="0 257" stroke-dashoffset="0" stroke-linecap="round" />
            </svg>
        </div>
    `;

    // 插入 DOM
    document.body.insertAdjacentHTML('afterbegin', loadingHtml);

    // 页面加载完成后移除加载动画
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.getElementById('page-loading');
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
})();
