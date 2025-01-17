(function() {
    // 注入 CSS
    const style = document.createElement('style');
    style.textContent = `
        .loading-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(34, 34, 34, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.3s;
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

        @keyframes ringA {
            from, 4% {
                stroke-dasharray: 0 660;
                stroke-width: 20;
                stroke-dashoffset: -330;
            }

            12% {
                stroke-dasharray: 60 600;
                stroke-width: 30;
                stroke-dashoffset: -335;
            }

            32% {
                stroke-dasharray: 60 600;
                stroke-width: 30;
                stroke-dashoffset: -595;
            }

            40%, 54% {
                stroke-dasharray: 0 660;
                stroke-width: 20;
                stroke-dashoffset: -660;
            }

            62% {
                stroke-dasharray: 60 600;
                stroke-width: 30;
                stroke-dashoffset: -665;
            }

            82% {
                stroke-dasharray: 60 600;
                stroke-width: 30;
                stroke-dashoffset: -925;
            }

            90%, to {
                stroke-dasharray: 0 660;
                stroke-width: 20;
                stroke-dashoffset: -990;
            }
        }

        @keyframes ringB {
            from, 12% {
                stroke-dasharray: 0 220;
                stroke-width: 20;
                stroke-dashoffset: -110;
            }

            20% {
                stroke-dasharray: 20 200;
                stroke-width: 30;
                stroke-dashoffset: -115;
            }

            40% {
                stroke-dasharray: 20 200;
                stroke-width: 30;
                stroke-dashoffset: -195;
            }

            48%, 62% {
                stroke-dasharray: 0 220;
                stroke-width: 20;
                stroke-dashoffset: -220;
            }

            70% {
                stroke-dasharray: 20 200;
                stroke-width: 30;
                stroke-dashoffset: -225;
            }

            90% {
                stroke-dasharray: 20 200;
                stroke-width: 30;
                stroke-dashoffset: -305;
            }

            98%, to {
                stroke-dasharray: 0 220;
                stroke-width: 20;
                stroke-dashoffset: -330;
            }
        }

        @keyframes ringC {
            from {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: 0;
            }

            8% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -5;
            }

            28% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -175;
            }

            36%, 58% {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: -220;
            }

            66% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -225;
            }

            86% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -395;
            }

            94%, to {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: -440;
            }
        }

        @keyframes ringD {
            from, 8% {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: 0;
            }

            16% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -5;
            }

            36% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -175;
            }

            44%, 50% {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: -220;
            }

            58% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -225;
            }

            78% {
                stroke-dasharray: 40 400;
                stroke-width: 30;
                stroke-dashoffset: -395;
            }

            86%, to {
                stroke-dasharray: 0 440;
                stroke-width: 20;
                stroke-dashoffset: -440;
            }
        }

        .loading-wrapper.hidden {
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // 创建加载动画HTML
    const loaderHTML = `
        <div class="loading-wrapper" id="global-loader">
            <svg class="pl" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <circle class="pl__ring pl__ring--a" cx="100" cy="100" r="82" fill="none" stroke="#f42f25" stroke-width="4" stroke-dasharray="0 257" stroke-dashoffset="0" stroke-linecap="round"/>
                <circle class="pl__ring pl__ring--b" cx="100" cy="100" r="82" fill="none" stroke="#f49725" stroke-width="4" stroke-dasharray="0 257" stroke-dashoffset="0" stroke-linecap="round"/>
                <circle class="pl__ring pl__ring--c" cx="100" cy="100" r="82" fill="none" stroke="#255ff4" stroke-width="4" stroke-dasharray="0 257" stroke-dashoffset="0" stroke-linecap="round"/>
                <circle class="pl__ring pl__ring--d" cx="100" cy="100" r="82" fill="none" stroke="#f42582" stroke-width="4" stroke-dasharray="0 257" stroke-dashoffset="0" stroke-linecap="round"/>
            </svg>
        </div>
    `;

    // 插入加载动画
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    const loader = document.getElementById('global-loader');

    // 显示加载动画
    function showLoader() {
        loader.classList.remove('hidden');
    }

    // 隐藏加载动画
    function hideLoader() {
        loader.classList.add('hidden');
    }

    // 监听所有资源加载
    function handleResourceLoad() {
        // 监听图片加载
        document.querySelectorAll('img').forEach(img => {
            if (!img.complete) {
                showLoader();
                img.addEventListener('load', () => {
                    hideLoader();
                });
            }
        });

        // 监听音频加载
        document.querySelectorAll('audio').forEach(audio => {
            if (!audio.readyState >= 4) {
                showLoader();
                audio.addEventListener('canplaythrough', () => {
                    hideLoader();
                });
            }
        });

        // 监听视频加载
        document.querySelectorAll('video').forEach(video => {
            if (!video.readyState >= 4) {
                showLoader();
                video.addEventListener('canplaythrough', () => {
                    hideLoader();
                });
            }
        });
    }

    // 监听动态加载的内容
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                handleResourceLoad();
            }
        });
    });

    // 开始观察DOM变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初始页面加载
    document.addEventListener('DOMContentLoaded', () => {
        handleResourceLoad();
    });

    // 页面完全加载后
    window.addEventListener('load', () => {
        setTimeout(hideLoader, 500);
    });

    // 添加全局AJAX请求监听
    let originalXHR = window.XMLHttpRequest;
    function newXHR() {
        let xhr = new originalXHR();
        xhr.addEventListener('loadstart', () => showLoader());
        xhr.addEventListener('loadend', () => hideLoader());
        return xhr;
    }
    window.XMLHttpRequest = newXHR;

    // 添加Fetch请求监听
    let originalFetch = window.fetch;
    window.fetch = function() {
        showLoader();
        return originalFetch.apply(this, arguments)
            .then(response => {
                hideLoader();
                return response;
            })
            .catch(error => {
                hideLoader();
                throw error;
            });
    };
})();
