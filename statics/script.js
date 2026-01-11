// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved user preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// --- Internationalization (i18n) ---
const langToggleBtn = document.getElementById('lang-toggle');
const i18nData = {
    'en': {
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.tools': 'Tools',
        'hero.greeting': 'Hello, World',
        'hero.iam': 'I am',
        'hero.desc': 'A high school student. Watch anime, light novels, code. Very sleepy. (っ °Д °;)っ',
        'hero.viewWork': 'View Work',
        'about.title': 'About Me',
        'about.text': "I'm a student developer passionate about development. My projects often involve a lot of AI. (●'◡'●)",
        'about.philosophyTitle': 'My Philosophy',
        'about.philosophyText': '"Do what you like"',
        'projects.title': 'Featured Projects',
        'projects.p1.desc': 'A Minecraft mod that expands the Note Block system with 128 instruments, full pitch range, and 20s sustain control.',
        'tools.title': 'My Tools',
        'tools.desc': 'Practical little tools I built for myself and others.'
    },
    'zh': {
        'nav.about': '关于我',
        'nav.projects': '项目',
        'nav.tools': '工具',
        'hero.greeting': '你好，世界',
        'hero.iam': '我是',
        'hero.desc': '某高中生。看动漫、轻小说、写代码。很困。(っ °Д °;)っ',
        'hero.viewWork': '查看作品',
        'about.title': '关于我',
        'about.text': '我是对开发充满兴趣的学生开发者。我的项目通常使用大量 AI。(●\'◡\'●)',
        'about.philosophyTitle': '我的信条',
        'about.philosophyText': '“做你喜欢的”',
        'projects.title': '精选项目',
        'projects.p1.desc': '一个 Minecraft 模组，将音符盒系统扩展到 128 种乐器、全音域和 20 秒延音控制。',
        'tools.title': '我的工具',
        'tools.desc': '为自己和他人构建的实用小工具。'
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

const updateLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nData[lang] && i18nData[lang][key]) {
            el.innerText = i18nData[lang][key];
        }
    });
    langToggleBtn.innerText = lang === 'en' ? 'EN' : '中';
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
};

// Initial Load
updateLanguage(currentLang);

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('lang', currentLang);
    updateLanguage(currentLang);
});


// --- Dynamic Tools Loader ---
const toolsContainer = document.getElementById('tools-container');

if (toolsContainer) {
    fetch('./statics/tools.json')
        .then(response => response.json())
        .then(tools => {
            toolsContainer.innerHTML = ''; // Clear loading
            tools.forEach(tool => {
                const toolCard = document.createElement('div');
                toolCard.className = 'glass p-6 rounded-2xl hover:shadow-lg transition-all transform hover:-translate-y-1 reveal active';
                toolCard.innerHTML = `
                    <div class="flex items-center gap-4 mb-4">
                        <div class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                            <i class="${tool.icon}"></i>
                        </div>
                        <h3 class="text-xl font-bold">${tool.name}</h3>
                    </div>
                    <p class="text-slate-600 dark:text-slate-400 mb-4 h-15">${tool.description}</p>
                    <a href="${tool.path}" class="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center gap-2">
                        Open Tool <i class="fas fa-arrow-right"></i>
                    </a>
                `;
                toolsContainer.appendChild(toolCard);
            });
        })
        .catch(err => {
            console.error('Failed to load tools:', err);
            toolsContainer.innerHTML = '<div class="col-span-full text-center text-red-500">Failed to load tools.</div>';
        });
}

// --- Hitokoto (One Word) ---
const hitokotoEl = document.getElementById('hitokoto');
if (hitokotoEl) {
    fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            hitokotoEl.innerText = `${data.hitokoto}  —— ${data.from}`;
        })
        .catch(err => {
            console.error('Failed to load Hitokoto:', err);
            hitokotoEl.innerText = 'Meow...'; // Fallback
        });
}
