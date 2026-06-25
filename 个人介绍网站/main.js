 /* ============================================================
    main.js — 交互功能
    包含：导航栏滚动效果 / 渐入动画 / 平滑滚动 / 回到顶部 / 表单
    ============================================================ */
 
 // ============================================================
 // [功能] 导航栏滚动效果
 // 页面滚动超过 100px 时，为导航栏添加 .scrolled 类，触发背景模糊
 // ============================================================
 function handleNavbarScroll() {
     var navbar = document.getElementById('navbar');
     if (!navbar) return;
 
     // 节流函数：限制滚动事件触发频率，提升性能
     var ticking = false;
 
     window.addEventListener('scroll', function () {
         if (!ticking) {
             window.requestAnimationFrame(function () {
                 if (window.scrollY > 100) {
                     navbar.classList.add('scrolled');
                 } else {
                     navbar.classList.remove('scrolled');
                 }
                 ticking = false;
             });
             ticking = true;
         }
     });
 }
 
 // ============================================================
 // [功能] 页面元素渐入动画（IntersectionObserver）
 // 监听带有 .fade-in 类的元素，进入视口时添加 .visible 类
 // 触发后取消对该元素的观察，避免重复判断
 // ============================================================
 function initFadeInAnimation() {
     var elements = document.querySelectorAll('.fade-in');
     if (elements.length === 0) return;
 
     var observer = new IntersectionObserver(function (entries) {
         entries.forEach(function (entry) {
             if (entry.isIntersecting) {
                 entry.target.classList.add('visible');
                 // 动画只触发一次，之后不再观察该元素
                 observer.unobserve(entry.target);
             }
         });
     }, {
         threshold: 0.15 // 元素露出 15% 即触发
     });
 
     elements.forEach(function (el) {
         observer.observe(el);
     });
 }
 
 // ============================================================
 // [功能] 导航锚点平滑滚动
 // 拦截所有 # 开头的链接点击，使用 scrollIntoView 平滑滚动
 // ============================================================
 function initSmoothScroll() {
     var anchors = document.querySelectorAll('a[href^="#"]');
 
     anchors.forEach(function (anchor) {
         anchor.addEventListener('click', function (e) {
             var href = anchor.getAttribute('href');
             // 跳过纯 "#" 或空链接
             if (href === '#' || !href) return;
 
             var targetEl = document.querySelector(href);
             if (targetEl) {
                 e.preventDefault();
                 targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
         });
     });
 }
 
 // ============================================================
 // [功能] 回到顶部按钮
 // 页面滚动超过 500px 时显示按钮，点击平滑回到顶部
 // ============================================================
 function initBackToTop() {
     var btn = document.getElementById('back-to-top');
     if (!btn) return;
 
     var ticking = false;
 
     window.addEventListener('scroll', function () {
         if (!ticking) {
             window.requestAnimationFrame(function () {
                 if (window.scrollY > 500) {
                     btn.classList.remove('opacity-0', 'invisible');
                     btn.classList.add('opacity-100', 'visible');
                 } else {
                     btn.classList.add('opacity-0', 'invisible');
                     btn.classList.remove('opacity-100', 'visible');
                 }
                 ticking = false;
             });
             ticking = true;
         }
     });
 
     btn.addEventListener('click', function () {
         window.scrollTo({ top: 0, behavior: 'smooth' });
     });
 }
 
 // ============================================================
 // [功能] 表单提交占位提示
 // 联系表单仅为前端演示，点击提交时弹出提示
 // ============================================================
 function initFormHandler() {
     var form = document.getElementById('contact-form');
     if (!form) return;
 
     form.addEventListener('submit', function (e) {
         e.preventDefault();
         alert('【表单提交功能待接入后端服务】');
     });
 }
 
 // ============================================================
 // 页面 DOM 加载完成后，初始化所有交互功能
 // ============================================================
 document.addEventListener('DOMContentLoaded', function () {
     handleNavbarScroll();
     initFadeInAnimation();
     initSmoothScroll();
     initBackToTop();
     initFormHandler();
 });
