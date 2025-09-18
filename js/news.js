// 新闻页面专用脚本

document.addEventListener('DOMContentLoaded', function() {
    initNewsSearch();
    initNewsPagination();
    initNewsFilters();
    loadMoreNews();
});

// 新闻搜索功能
function initNewsSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    let searchTimeout;
    
    // 实时搜索
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim().toLowerCase();
        
        searchTimeout = setTimeout(() => {
            filterNews(query);
        }, 300);
    });
    
    // 按钮搜索
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim().toLowerCase();
        filterNews(query);
    });
    
    // 回车搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim().toLowerCase();
            filterNews(query);
        }
    });
}

// 过滤新闻
function filterNews(query) {
    const newsItems = document.querySelectorAll('.news-item');
    let visibleCount = 0;
    
    newsItems.forEach(item => {
        const title = item.querySelector('.news-title').textContent.toLowerCase();
        const summary = item.querySelector('.news-summary').textContent.toLowerCase();
        const date = item.querySelector('.news-date').textContent.toLowerCase();
        
        if (title.includes(query) || summary.includes(query) || date.includes(query)) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.3s ease';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // 显示搜索结果提示
    showNewsSearchResult(query, visibleCount);
}

// 显示新闻搜索结果
function showNewsSearchResult(query, count) {
    const existingMessage = document.querySelector('.news-search-result');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (!query) return;
    
    const searchSection = document.querySelector('.search-section');
    const message = document.createElement('div');
    message.className = 'news-search-result';
    message.style.cssText = `
        margin-top: 15px;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
        text-align: center;
        background: ${count > 0 ? '#e8f5e8' : '#ffeaea'};
        color: ${count > 0 ? '#28a745' : '#dc3545'};
        border: 1px solid ${count > 0 ? '#c3e6c3' : '#f5c6cb'};
        animation: fadeInUp 0.3s ease;
    `;
    
    message.textContent = count > 0 
        ? `找到 ${count} 条与 "${query}" 相关的资讯` 
        : `未找到与 "${query}" 相关的资讯`;
    
    searchSection.appendChild(message);
    
    // 3秒后移除提示
    setTimeout(() => {
        if (message.parentNode) {
            message.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }
    }, 3000);
}

// 新闻分页功能
function initNewsPagination() {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;
    
    // 创建加载更多按钮
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'load-more-btn';
    loadMoreBtn.textContent = '加载更多';
    loadMoreBtn.style.cssText = `
        display: block;
        margin: 30px auto;
        padding: 12px 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    newsContainer.parentNode.appendChild(loadMoreBtn);
    
    loadMoreBtn.addEventListener('click', function() {
        loadMoreNews();
        
        // 添加加载动画
        this.style.transform = 'scale(0.95)';
        this.textContent = '加载中...';
        this.disabled = true;
        
        setTimeout(() => {
            this.style.transform = '';
            this.textContent = '加载更多';
            this.disabled = false;
        }, 1000);
    });
}

// 加载更多新闻
function loadMoreNews() {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;
    
    // 模拟更多新闻数据
    const moreNews = [
        {
            date: '2024-09-12',
            title: '腾讯混元大模型正式开放内测',
            summary: '腾讯宣布其混元大模型正式开放内测申请，该模型在中文理解和生成方面表现突出，支持多种应用场景...',
            link: '#'
        },
        {
            date: '2024-09-11',
            title: '商汤科技发布日日新大模型5.0版本',
            summary: '商汤科技正式发布了日日新大模型5.0版本，在图像识别、视频分析等能力上有显著提升，支持更多行业应用...',
            link: '#'
        },
        {
            date: '2024-09-10',
            title: '华为盘古大模型3.0版本发布',
            summary: '华为发布了盘古大模型3.0版本，该版本在工业应用、科学计算等领域有重大突破，为行业数字化转型提供支持...',
            link: '#'
        }
    ];
    
    moreNews.forEach((news, index) => {
        setTimeout(() => {
            const newsItem = createNewsItem(news);
            newsContainer.appendChild(newsItem);
            
            // 添加淡入动画
            newsItem.style.opacity = '0';
            newsItem.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                newsItem.style.transition = 'all 0.3s ease';
                newsItem.style.opacity = '1';
                newsItem.style.transform = 'translateY(0)';
            }, 50);
        }, index * 200);
    });
}

// 创建新闻项
function createNewsItem(news) {
    const item = document.createElement('article');
    item.className = 'news-item';
    item.innerHTML = `
        <div class="news-date">${news.date}</div>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-summary">${news.summary}</p>
        <a href="${news.link}" class="news-link">阅读全文</a>
    `;
    
    // 添加样式
    item.style.cssText = `
        background: white;
        border-radius: 15px;
        padding: 25px;
        margin-bottom: 20px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
        border-left: 4px solid #667eea;
    `;
    
    // 添加悬停效果
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
    });
    
    return item;
}

// 新闻筛选功能
function initNewsFilters() {
    const newsContainer = document.querySelector('.news-container');
    if (!newsContainer) return;
    
    // 创建筛选器
    const filterContainer = document.createElement('div');
    filterContainer.className = 'news-filters';
    filterContainer.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
        flex-wrap: wrap;
    `;
    
    const filters = [
        { name: '全部', value: 'all' },
        { name: '今日', value: 'today' },
        { name: '本周', value: 'week' },
        { name: '本月', value: 'month' }
    ];
    
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = filter.name;
        button.dataset.filter = filter.value;
        button.style.cssText = `
            padding: 8px 16px;
            border: 1px solid #667eea;
            background: white;
            color: #667eea;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
        `;
        
        if (filter.value === 'all') {
            button.style.background = '#667eea';
            button.style.color = 'white';
        }
        
        button.addEventListener('click', function() {
            // 更新按钮样式
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#667eea';
            });
            this.style.background = '#667eea';
            this.style.color = 'white';
            
            // 筛选新闻
            filterNewsByDate(filter.value);
        });
        
        filterContainer.appendChild(button);
    });
    
    newsContainer.parentNode.insertBefore(filterContainer, newsContainer);
}

// 按日期筛选新闻
function filterNewsByDate(filter) {
    const newsItems = document.querySelectorAll('.news-item');
    const today = new Date();
    
    newsItems.forEach(item => {
        const dateText = item.querySelector('.news-date').textContent;
        const itemDate = new Date(dateText);
        let shouldShow = false;
        
        switch (filter) {
            case 'all':
                shouldShow = true;
                break;
            case 'today':
                shouldShow = isToday(itemDate, today);
                break;
            case 'week':
                shouldShow = isThisWeek(itemDate, today);
                break;
            case 'month':
                shouldShow = isThisMonth(itemDate, today);
                break;
        }
        
        if (shouldShow) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

// 判断是否为今天
function isToday(date, today) {
    return date.toDateString() === today.toDateString();
}

// 判断是否为本周
function isThisWeek(date, today) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    return date >= weekStart && date <= weekEnd;
}

// 判断是否为本月
function isThisMonth(date, today) {
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

// 添加CSS样式
const newsStyles = `
    .news-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }
    
    .news-date {
        color: #667eea;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 10px;
    }
    
    .news-title {
        font-size: 18px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 10px;
        line-height: 1.4;
    }
    
    .news-summary {
        color: #666;
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 15px;
    }
    
    .news-link {
        color: #667eea;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }
    
    .news-link::after {
        content: '→';
        transition: transform 0.3s ease;
    }
    
    .news-link:hover::after {
        transform: translateX(5px);
    }
    
    .load-more-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102,126,234,0.4);
    }
    
    .load-more-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .filter-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 3px 10px rgba(102,126,234,0.2);
    }
`;

// 添加样式到页面
const newsStyleSheet = document.createElement('style');
newsStyleSheet.textContent = newsStyles;
document.head.appendChild(newsStyleSheet);