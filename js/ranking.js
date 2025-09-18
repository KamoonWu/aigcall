/**
 * AI产品排行榜功能
 */

// 加载排行榜数据
async function loadRankingData() {
    try {
        const response = await fetch('data/ranking.json');
        const data = await response.json();
        
        // 更新最后更新时间
        document.getElementById('update-time').textContent = data.lastUpdated;
        
        // 渲染排行榜
        renderRanking(data.categories);
    } catch (error) {
        console.error('加载排行榜数据失败:', error);
        document.getElementById('ranking-container').innerHTML = 
            '<div class="error-message">排行榜数据加载失败，请稍后重试</div>';
    }
}

// 渲染排行榜
function renderRanking(categories) {
    const container = document.getElementById('ranking-container');
    
    categories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'ranking-category';
        
        categorySection.innerHTML = `
            <h3 class="category-title">${category.name}</h3>
            <div class="ranking-list">
                ${category.tools.map(tool => `
                    <div class="ranking-item">
                        <div class="rank-number">${tool.rank}</div>
                        <div class="tool-info">
                            <div class="tool-icon">
                                <img src="${tool.icon}" alt="${tool.name}" onerror="this.src='icons/default.png'">
                            </div>
                            <div class="tool-details">
                                <h4 class="tool-name">${tool.name}</h4>
                                <p class="tool-desc">${tool.description}</p>
                                <div class="tool-meta">
                                    <span class="score">评分: ${tool.score}/10</span>
                                    <span class="trend trend-${tool.trend}">
                                        ${getTrendIcon(tool.trend)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(categorySection);
    });
}

// 获取趋势图标
function getTrendIcon(trend) {
    const icons = {
        'up': '↗️ 上升',
        'down': '↘️ 下降',
        'stable': '➡️ 稳定'
    };
    return icons[trend] || '➡️ 稳定';
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadRankingData();
});

// 添加一些CSS样式（可以移到单独的CSS文件中）
const rankingStyles = `
.ranking-header {
    text-align: center;
    margin-bottom: 40px;
}

.ranking-subtitle {
    color: #666;
    font-size: 16px;
    margin-top: 10px;
}

.ranking-update-time {
    color: #999;
    font-size: 14px;
    margin-top: 20px;
}

.ranking-category {
    margin-bottom: 50px;
}

.category-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #1890ff;
}

.ranking-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.ranking-item {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.ranking-item:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    transform: translateY(-2px);
}

.rank-number {
    font-size: 28px;
    font-weight: bold;
    color: #1890ff;
    margin-right: 20px;
    min-width: 40px;
    text-align: center;
}

.tool-info {
    display: flex;
    align-items: center;
    flex: 1;
}

.tool-icon {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 12px;
    overflow: hidden;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tool-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.tool-details {
    flex: 1;
}

.tool-name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
}

.tool-desc {
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
}

.tool-meta {
    display: flex;
    align-items: center;
    gap: 15px;
}

.score {
    font-weight: 600;
    color: #1890ff;
}

.trend {
    font-size: 14px;
}

.trend-up {
    color: #52c41a;
}

.trend-down {
    color: #ff4d4f;
}

.trend-stable {
    color: #999;
}

.error-message {
    text-align: center;
    color: #ff4d4f;
    font-size: 16px;
    padding: 40px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .ranking-item {
        flex-direction: column;
        text-align: center;
    }
    
    .rank-number {
        margin-right: 0;
        margin-bottom: 15px;
    }
    
    .tool-info {
        flex-direction: column;
    }
    
    .tool-icon {
        margin-right: 0;
        margin-bottom: 15px;
    }
    
    .tool-meta {
        justify-content: center;
    }
}
`;

// 动态添加样式
const styleSheet = document.createElement('style');
styleSheet.textContent = rankingStyles;
document.head.appendChild(styleSheet);