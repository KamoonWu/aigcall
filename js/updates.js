/**
 * AI产品重大更新功能
 */

// 加载更新数据
async function loadUpdatesData() {
    try {
        const response = await fetch('data/updates.json');
        const data = await response.json();
        
        // 更新最后更新时间
        document.getElementById('update-time').textContent = data.lastUpdated;
        
        // 渲染重大更新
        renderMajorUpdates(data.majorUpdates);
        
        // 渲染最近更新
        renderRecentUpdates(data.recentUpdates);
    } catch (error) {
        console.error('加载更新数据失败:', error);
        document.getElementById('major-updates-container').innerHTML = 
            '<div class="error-message">更新数据加载失败，请稍后重试</div>';
        document.getElementById('recent-updates-container').innerHTML = 
            '<div class="error-message">更新数据加载失败，请稍后重试</div>';
    }
}

// 渲染重大更新
function renderMajorUpdates(updates) {
    const container = document.getElementById('major-updates-container');
    
    updates.forEach(update => {
        const updateItem = document.createElement('div');
        updateItem.className = `update-item update-${update.importance}`;
        
        updateItem.innerHTML = `
            <div class="update-header">
                <div class="update-icon">
                    <img src="${update.icon}" alt="${update.toolName}" onerror="this.src='icons/default.png'">
                </div>
                <div class="update-info">
                    <h4 class="update-title">${update.title}</h4>
                    <div class="update-meta">
                        <span class="update-date">${update.date}</span>
                        <span class="update-category">${update.category}</span>
                        <span class="importance-badge importance-${update.importance}">
                            ${getImportanceText(update.importance)}
                        </span>
                    </div>
                </div>
            </div>
            <p class="update-description">${update.description}</p>
            <div class="update-footer">
                <a href="${update.toolUrl}" target="_blank" class="tool-link">
                    访问 ${update.toolName} →
                </a>
            </div>
        `;
        
        container.appendChild(updateItem);
    });
}

// 渲染最近更新
function renderRecentUpdates(updates) {
    const container = document.getElementById('recent-updates-container');
    
    updates.forEach(update => {
        const updateItem = document.createElement('div');
        updateItem.className = 'update-item update-recent';
        
        updateItem.innerHTML = `
            <div class="update-header">
                <div class="update-info">
                    <h4 class="update-title">${update.title}</h4>
                    <div class="update-meta">
                        <span class="update-date">${update.date}</span>
                        <span class="update-category">${update.category}</span>
                    </div>
                </div>
            </div>
            <p class="update-description">${update.description}</p>
            <div class="update-footer">
                <a href="${update.toolUrl}" target="_blank" class="tool-link">
                    访问 ${update.toolName} →
                </a>
            </div>
        `;
        
        container.appendChild(updateItem);
    });
}

// 获取重要性文本
function getImportanceText(importance) {
    const texts = {
        'high': '高',
        'medium': '中',
        'low': '低'
    };
    return texts[importance] || '中';
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadUpdatesData();
});

// 添加一些CSS样式（可以移到单独的CSS文件中）
const updatesStyles = `
.updates-header {
    text-align: center;
    margin-bottom: 40px;
}

.updates-subtitle {
    color: #666;
    font-size: 16px;
    margin-top: 10px;
}

.updates-update-time {
    color: #999;
    font-size: 14px;
    margin-top: 20px;
}

.section-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #1890ff;
}

.update-item {
    background: #fff;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.update-item:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    transform: translateY(-2px);
}

.update-high {
    border-left: 4px solid #ff4d4f;
}

.update-medium {
    border-left: 4px solid #faad14;
}

.update-low {
    border-left: 4px solid #52c41a;
}

.update-recent {
    border-left: 4px solid #1890ff;
}

.update-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.update-icon {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    border-radius: 10px;
    overflow: hidden;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.update-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.update-info {
    flex: 1;
}

.update-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
}

.update-meta {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

.update-date {
    color: #999;
    font-size: 14px;
}

.update-category {
    background: #f0f5ff;
    color: #1890ff;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
}

.importance-badge {
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 600;
}

.importance-high {
    background: #fff1f0;
    color: #ff4d4f;
}

.importance-medium {
    background: #fffbe6;
    color: #faad14;
}

.importance-low {
    background: #f6ffed;
    color: #52c41a;
}

.update-description {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 15px;
}

.update-footer {
    display: flex;
    justify-content: flex-end;
}

.tool-link {
    color: #1890ff;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    transition: color 0.3s ease;
}

.tool-link:hover {
    color: #40a9ff;
}

.error-message {
    text-align: center;
    color: #ff4d4f;
    font-size: 16px;
    padding: 40px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .update-header {
        flex-direction: column;
        text-align: center;
    }
    
    .update-icon {
        margin-right: 0;
        margin-bottom: 15px;
    }
    
    .update-meta {
        justify-content: center;
    }
    
    .update-footer {
        justify-content: center;
    }
}
`;

// 动态添加样式
const styleSheet = document.createElement('style');
styleSheet.textContent = updatesStyles;
document.head.appendChild(styleSheet);