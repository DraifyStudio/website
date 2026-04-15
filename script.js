/**
 * 云上绘梦官网 - 交互脚本
 * draify.com
 */

document.addEventListener('DOMContentLoaded', function () {

    // 导航菜单切换（移动端）
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function () {
            navList.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });

        // 点击导航链接后自动关闭菜单（移动端）
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', function () {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // 滚动时头部样式变化
    const header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // 初始化检查

    // 平滑滚动锚点链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单提交处理 - 唤起邮箱
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // 获取表单数据
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // 简单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段');
                return;
            }

            if (!isValidEmail(email)) {
                alert('请输入有效的邮箱地址');
                return;
            }

            // 构造 mailto 链接
            const recipient = 'contact@draify.com';
            const subject = encodeURIComponent(`新咨询 - ${name}`);
            const body = encodeURIComponent(
                `您好，云上绘梦团队：\n\n` +
                `我希望对以下需求进行咨询：\n` +
                `--------------------------------\n` +
                `姓名：${name}\n` +
                `邮箱：${email}\n` +
                `需求简述：\n${message}\n` +
                `--------------------------------\n\n` +
                `（此邮件由 draify.com 官网表单自动生成）`
            );

            const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

            // 唤起邮箱客户端
            window.location.href = mailtoLink;

            // 可选：给用户提示
            alert('即将打开您的邮箱客户端，如未跳转请检查默认邮件应用设置。');

            // 可选：重置表单
            // contactForm.reset();
        });
    }

    // 邮箱格式验证（保留原函数）
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 作品卡片悬停增强（可选）
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function () {
            this.style.zIndex = '';
        });
    });

    // 滚动动画触发（简化版，生产环境建议使用Intersection Observer）
    function checkScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .work-card, .service-item');

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.9;

            if (elementTop < triggerPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // 初始化动画状态
    document.querySelectorAll('.feature-card, .work-card, .service-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', checkScrollAnimations, { passive: true });
    checkScrollAnimations(); // 初始化检查

    // 控制台品牌信息
    console.log('%c 云上绘梦创意设计工作室 ', 'background: #6366F1; color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold;');
    console.log('官网：https://draify.com');
    console.log('让创意，在云端绽放 ✦');

});