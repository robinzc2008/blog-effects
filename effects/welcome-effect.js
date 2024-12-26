<script>
document.addEventListener('DOMContentLoaded', function() {
    // 创建 canvas
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    // 设置尺寸
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    
    var ctx = canvas.getContext('2d');
    var particles = [];
    var colors = [
        {r: 255, g: 107, b: 107}, // #ff6b6b
        {r: 72, g: 219, b: 251},  // #48dbfb
        {r: 29, g: 209, b: 161},  // #1dd1a1
        {r: 255, g: 217, b: 61},  // #ffd93d
        {r: 255, g: 159, b: 243}, // #ff9ff3
        {r: 0, g: 210, b: 211}    // #00d2d3
    ];
    var lastMoveTime = 0;
    
    // 创建粒子的函数
    function createParticles(x, y, count, speed, size) {
        for (var i = 0; i < count; i++) {
            // 随机角度
            var angle = Math.random() * Math.PI * 2;
            var color = colors[Math.floor(Math.random() * colors.length)];
            particles.push({
                x: x,
                y: y,
                size: Math.random() * size + 2,
                speedX: Math.cos(angle) * speed * (Math.random() + 0.5),
                speedY: Math.sin(angle) * speed * (Math.random() + 0.5),
                life: 1,
                color: color,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }
    }
    
    // 鼠标移动效果
    document.addEventListener('mousemove', function(e) {
        var currentTime = Date.now();
        if (currentTime - lastMoveTime > 16) {
            createParticles(e.clientX, e.clientY, 4, 1.5, 3);
            lastMoveTime = currentTime;
        }
    });
    
    // 点击效果
    document.addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY, 35, 4, 4);
    });
    
    // 动画循环
    function animate() {
        // 完全清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            
            // 更新位置
            p.x += p.speedX;
            p.y += p.speedY;
            // 缓慢减速
            p.speedX *= 0.99;
            p.speedY *= 0.99;
            p.rotation += p.rotationSpeed;
            p.life -= 0.01;
            
            // 绘制粒子
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            
            // 绘制星形
            ctx.beginPath();
            for (var j = 0; j < 5; j++) {
                var angle = (Math.PI * 2 * j) / 5;
                var radius = p.size * (j % 2 ? 0.5 : 1);
                if (j === 0) {
                    ctx.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                } else {
                    ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                }
            }
            ctx.closePath();
            
            // 使用 rgba 设置颜色
            ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life})`;
            ctx.fill();
            ctx.restore();
            
            // 移除消失的粒子
            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // 开始动画
    animate();
    
    // 监听窗口大小变化
    window.addEventListener('resize', setCanvasSize);
});
</script>