(function () {
    var skills = [["React.js", 92], ["Next.js", 90], ["JavaScript", 94], ["Tailwind CSS", 95], ["HTML & CSS", 97], ["Backend", 85]];
    var bars = document.getElementById('bars');
    skills.forEach(function (s) { var d = document.createElement('div'); d.className = 'bar'; d.style.setProperty('--w', s[1] + '%'); d.innerHTML = '<div><span>' + s[0] + '</span><span>' + s[1] + '%</span></div><i></i>'; bars.appendChild(d) });
    var tr = document.getElementById('track'), names = ["React", "Next.js", "Tailwind", "JavaScript", "HTML", "CSS", "Node"], h = '';
    for (var k = 0; k < 4; k++)names.forEach(function (n) { h += '<span>' + n + '</span>' }); tr.innerHTML = h; tr.parentNode.appendChild(tr.cloneNode(true));

    var words = ["fast websites", "React apps", "Next.js products", "clean backends"], wi = 0, ci = 0, del = false, tw = document.getElementById('tw');
    function tick() {
        var w = words[wi]; ci += del ? -1 : 1; tw.textContent = w.slice(0, ci); var t = del ? 40 : 85;
        if (!del && ci === w.length) { del = true; t = 1400 } else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; t = 300 } setTimeout(tick, t)
    }
    tick();

    var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('on');
                e.target.querySelectorAll && e.target.querySelectorAll('[data-n]').forEach(count); io.unobserve(e.target)
            }
        })
    }, { threshold: .15 });
    document.querySelectorAll('.rv,.bar').forEach(function (el) { io.observe(el) });
    function count(el) { var n = +el.dataset.n, s = null; function f(t) { if (!s) s = t; var p = Math.min((t - s) / 1400, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f) } requestAnimationFrame(f) }

    var src = 'const dev = {\n  name: "Zyro",\n  stack: ["React", "Next.js"],\n  passion: "animation",\n  available: true\n};\n\ndev.build("something great");', ce = document.getElementById('codeout'), cn = 0;
    function hl(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/(".*?")/g, '<span class="s">$1</span>').replace(/\b(const|true)\b/g, '<span class="k">$1</span>').replace(/\b(build)\b/g, '<span class="f">$1</span>') }
    function typeCode() { ce.innerHTML = hl(src.slice(0, cn)) + '<span class="caret"></span>'; if (cn < src.length) { cn++; setTimeout(typeCode, 55) } else setTimeout(function () { cn = 0; typeCode() }, 3500) }
    setTimeout(typeCode, 4500);
    addEventListener('scroll', function () { var h = document.documentElement; document.getElementById('prog').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%' }, { passive: true });
    var t0 = Date.now(), pc = document.getElementById('pct'), ld = document.getElementById('loader');
    var pt = setInterval(function () {
        var p = Math.min((Date.now() - t0) / 3000, 1); pc.textContent = Math.round(p * 100) + '%';
        if (p >= 1) { clearInterval(pt); document.body.classList.add('go'); ld.classList.add('done'); setTimeout(function () { ld.remove() }, 1000) }
    }, 40);
    var g = document.getElementById('glow');
    addEventListener('pointermove', function (e) { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px' });
    document.querySelectorAll('.card').forEach(function (c) {
        c.addEventListener('pointermove', function (e) {
            var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
            c.style.setProperty('--x', x + 'px'); c.style.setProperty('--y', y + 'px');
            c.style.transform = 'perspective(800px) rotateX(' + ((y / r.height - .5) * -7) + 'deg) rotateY(' + ((x / r.width - .5) * 7) + 'deg)'
        });
        c.addEventListener('pointerleave', function () { c.style.transform = '' })
    });

    var cv = document.getElementById('net'), cx = cv.getContext('2d'), W, H, pts = [], m = { x: -999, y: -999 }, dpr = Math.min(devicePixelRatio || 1, 2);
    function size() {
        W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var n = Math.min(110, Math.floor(W * H / 12000)); pts = []; for (var i = 0; i < n; i++)pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45 })
    }
    size(); addEventListener('resize', size);
    addEventListener('pointermove', function (e) { m.x = e.clientX; m.y = e.clientY });
    var still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    function draw() {
        cx.clearRect(0, 0, W, H);
        for (var i = 0; i < pts.length; i++) {
            var p = pts[i]; if (!still) { p.x += p.vx; p.y += p.vy }
            if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
            var dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy); if (d < 130 && d > 0) { p.x += dx / d * 1.6; p.y += dy / d * 1.6 }
            cx.fillStyle = '#7b6cff'; cx.beginPath(); cx.arc(p.x, p.y, 1.6, 0, 6.3); cx.fill();
            for (var j = i + 1; j < pts.length; j++) {
                var q = pts[j], l = Math.hypot(p.x - q.x, p.y - q.y);
                if (l < 120) { cx.strokeStyle = 'rgba(123,108,255,' + (1 - l / 120) * .45 + ')'; cx.lineWidth = .7; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke() }
            }
            var md = Math.hypot(p.x - m.x, p.y - m.y); if (md < 170) { cx.strokeStyle = 'rgba(39,225,255,' + (1 - md / 170) * .7 + ')'; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(m.x, m.y); cx.stroke() }
        }
        requestAnimationFrame(draw)
    }
    draw();
})();