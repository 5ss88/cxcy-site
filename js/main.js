(function () {
  'use strict';
  // 首页轮播：定时切换、索引边界处理、圆点点击、鼠标移入暂停
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dots i');
  if (slides.length) {
    var idx = 0, timer = null;
    function show(n) {
      if (n >= slides.length) n = 0;
      if (n < 0) n = slides.length - 1;
      idx = n;
      for (var i = 0; i < slides.length; i++) {
        slides[i].className = i === idx ? 'slide on' : 'slide';
        if (dots[i]) dots[i].className = i === idx ? 'on' : '';
      }
    }
    function play() { timer = setInterval(function () { show(idx + 1); }, 5000); }
    function stop() { clearInterval(timer); }
    for (var d = 0; d < dots.length; d++) {
      (function (k) { dots[k].onclick = function () { show(k); }; })(d);
    }
    var banner = document.querySelector('.banner');
    if (banner) { banner.onmouseenter = stop; banner.onmouseleave = play; }
    show(0); play();
  }

  // 成果列表页：按类别筛选
  var fbtns = document.querySelectorAll('.filters button');
  if (fbtns.length) {
    fbtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        fbtns.forEach(function (b) { b.className = ''; });
        btn.className = 'on';
        var key = btn.getAttribute('data-key');
        document.querySelectorAll('.card').forEach(function (card) {
          card.style.display = (key === 'all' || card.getAttribute('data-kind') === key) ? '' : 'none';
        });
      });
    });
  }

  // 申报表单：必填项与格式校验
  var form = document.getElementById('applyForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var miss = [];
      form.querySelectorAll('[required]').forEach(function (el) {
        if (!el.value.trim()) miss.push(el.getAttribute('data-label') || '必填项');
      });
      var phone = form.querySelector('#contact');
      if (phone && phone.value.trim() && !/^1[3-9]\d{9}$/.test(phone.value.trim())) miss.push('联系电话格式');
      if (miss.length) { alert('请检查：' + miss.join('、')); return; }
      alert('提交成功，材料将由学院管理员审核。');
      form.reset();
    });
  }
})();