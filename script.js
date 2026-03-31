/*
  Warp Starfield Animation Script
  First-person deep-space warp effect for the Accompany10000 homepage.
*/

(() => {
  const canvas = document.getElementById('stars-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, centerX, centerY;
  const starCount = 600;
  const depth = 1000;
  let speed = 20;
  const stars = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;
    initStars();
  }

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * depth,
        pz: 0
      });
    }
  }

  function update() {
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.pz = star.z;
      star.z -= speed;
      if (star.z <= 0.5) {
        star.z = depth;
        star.pz = star.z;
        star.x = (Math.random() - 0.5) * width * 2;
        star.y = (Math.random() - 0.5) * height * 2;
      }
    }
  }

  function draw() {
    ctx.fillStyle = '#020d1f';
    ctx.fillRect(0, 0, width, height);

    const f = 0.5 * Math.min(width, height);

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      const px = centerX + (star.x / star.pz) * f;
      const py = centerY + (star.y / star.pz) * f;
      const sx = centerX + (star.x / star.z) * f;
      const sy = centerY + (star.y / star.z) * f;

      let intensity = 1 - star.z / depth;
      if (intensity < 0) intensity = 0;
      if (intensity > 1) intensity = 1;

      const lineWidth = 0.5 + intensity * 2.5;
      ctx.strokeStyle = `rgba(255,255,255,${0.5 + intensity * 0.5})`;
      ctx.lineWidth = lineWidth;

      if (
        px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50 &&
        sx >= -50 && sx <= width + 50 && sy >= -50 && sy <= height + 50
      ) {
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    }
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();
