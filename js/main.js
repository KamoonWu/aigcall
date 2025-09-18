// 主要功能脚本

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initSearch();
    initCategoryNavigation();
    initToolCards();
    initScrollEffects();
    initResponsiveMenu();
});

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    let searchTimeout;
    
    // 实时搜索
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim().toLowerCase();
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // 按钮搜索
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim().toLowerCase();
        performSearch(query);
    });
    
    // 回车搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim().toLowerCase();
            performSearch(query);
        }
    });
}

// 执行搜索
function performSearch(query) {
    const toolCards = document.querySelectorAll('.tool-card');
    const categoryBlocks = document.querySelectorAll('.category-block');
    
    if (!query) {
        // 显示所有内容
        toolCards.forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease';
        });
        categoryBlocks.forEach(block => {
            block.style.display = 'block';
        });
        return;
    }
    
    let hasResults = false;
    
    toolCards.forEach(card => {
        const toolName = card.querySelector('.tool-name').textContent.toLowerCase();
        const toolDesc = card.querySelector('.tool-desc').textContent.toLowerCase();
        
        if (toolName.includes(query) || toolDesc.includes(query)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 隐藏没有结果的分类
    categoryBlocks.forEach(block => {
        const visibleCards = block.querySelectorAll('.tool-card[style*="block"], .tool-card:not([style*="none"])');
        if (visibleCards.length === 0) {
            block.style.display = 'none';
        } else {
            block.style.display = 'block';
        }
    });
    
    // 显示搜索结果提示
    showSearchResult(hasResults, query);
}

// 显示搜索结果提示
function showSearchResult(hasResults, query) {
    const existingMessage = document.querySelector('.search-result-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const searchSection = document.querySelector('.search-section');
    const message = document.createElement('div');
    message.className = 'search-result-message';
    message.style.cssText = `
        margin-top: 15px;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        text-align: center;
        background: ${hasResults ? '#e8f5e8' : '#ffeaea'};
        color: ${hasResults ? '#28a745' : '#dc3545'};
        border: 1px solid ${hasResults ? '#c3e6c3' : '#f5c6cb'};
        animation: fadeInUp 0.3s ease;
    `;
    
    message.textContent = hasResults 
        ? `找到 ${query} 相关的工具` 
        : `未找到与 "${query}" 相关的工具`;
    
    searchSection.appendChild(message);
    
    // 3秒后移除提示
    setTimeout(() => {
        if (message.parentNode) {
            message.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }
    }, 3000);
}

// 分类导航功能
function initCategoryNavigation() {
    const categoryLinks = document.querySelectorAll('.category-link');
    const categoryBlocks = document.querySelectorAll('.category-block');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活跃状态
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前活跃状态
            this.classList.add('active');
            
            // 获取目标分类ID
            const targetId = this.getAttribute('href').substring(1);
            const targetBlock = document.getElementById(targetId);
            
            if (targetBlock) {
                // 平滑滚动到目标分类
                targetBlock.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 高亮显示目标分类
                highlightCategory(targetBlock);
            }
        });
    });
}

// 高亮显示分类
function highlightCategory(block) {
    // 移除之前的高亮
    document.querySelectorAll('.category-block').forEach(b => {
        b.style.boxShadow = '';
        b.style.transform = '';
    });
    
    // 添加高亮效果
    block.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.3)';
    block.style.transform = 'scale(1.02)';
    
    // 3秒后移除高亮
    setTimeout(() => {
        block.style.boxShadow = '';
        block.style.transform = '';
    }, 3000);
}

// 工具卡片功能
function initToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        // 添加点击效果
        card.addEventListener('click', function(e) {
            // 如果点击的是链接，不触发卡片效果
            if (e.target.classList.contains('tool-link')) return;
            
            // 添加点击动画
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // 添加键盘导航
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = this.querySelector('.tool-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
}

// 滚动效果
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                
                // 为工具卡片添加延迟动画
                const toolCards = entry.target.querySelectorAll('.tool-card');
                toolCards.forEach((card, index) => {
                    card.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);
    
    // 观察所有分类块
    const categoryBlocks = document.querySelectorAll('.category-block');
    categoryBlocks.forEach(block => {
        observer.observe(block);
    });
}

// 响应式菜单
function initResponsiveMenu() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth <= 767) {
        // 创建移动端菜单按钮
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '☰';
        menuBtn.style.cssText = `
            display: block;
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 5px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        `;
        
        header.appendChild(menuBtn);
        
        const navList = document.querySelector('.nav-list');
        navList.style.cssText = `
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            flex-direction: column;
            padding: 20px;
            gap: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        `;
        
        menuBtn.addEventListener('click', function() {
            const isVisible = navList.style.display === 'flex';
            navList.style.display = isVisible ? 'none' : 'flex';
            this.innerHTML = isVisible ? '☰' : '✕';
        });
        
        // 点击导航项后关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.style.display = 'none';
                menuBtn.innerHTML = '☰';
            });
        });
    }
}

// 工具提示功能
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: #333;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
    
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    }, 2000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .tool-card:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    
    .category-link:focus {
        outline: 2px solid white;
        outline-offset: 2px;
    }
    
    .search-input:focus {
        outline: none;
    }
    
    .tool-link:focus {
        outline: 2px solid white;
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);