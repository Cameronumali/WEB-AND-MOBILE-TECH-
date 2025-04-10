document.addEventListener('DOMContentLoaded', function() {
    const feedSelector = document.getElementById('feed-selector');
    const contentDiv = document.getElementById('content');
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');

    // Load initial feed
    loadFeed(feedSelector.value);

    // Add event listener for feed selection
    feedSelector.addEventListener('change', function() {
        loadFeed(this.value);
    });

    function loadFeed(feedUrl) {
        // Show loading state
        showLoading(true);
        hideError();

        // Use RSS2JSON API to convert RSS to JSON
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok') {
                    displayArticles(data.items);
                } else {
                    throw new Error(data.message || 'Failed to load feed');
                }
            })
            .catch(error => {
                showError('Unable to load the feed. Please try again later. ' + error.message);
                contentDiv.innerHTML = '';
            })
            .finally(() => {
                showLoading(false);
            });
    }

    function displayArticles(articles) {
        if (!articles || articles.length === 0) {
            contentDiv.innerHTML = '<p>No articles found.</p>';
            return;
        }

        const articlesHTML = articles.map(article => {
            // Clean and truncate the description
            const description = cleanAndTruncateHTML(article.description, 150);
            
            return `
                <article>
                    <h3>
                        <a href="${article.link}" target="_blank" rel="noopener noreferrer">
                            ${article.title}
                        </a>
                    </h3>
                    <div class="meta">
                        <time datetime="${new Date(article.pubDate).toISOString()}">
                            ${formatDate(article.pubDate)}
                        </time>
                    </div>
                    <p>${description}</p>
                </article>
            `;
        }).join('');

        contentDiv.innerHTML = articlesHTML;
    }

    function cleanAndTruncateHTML(html, maxLength) {
        // Create a temporary div to handle HTML content
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Get text content
        let text = temp.textContent || temp.innerText;
        
        // Truncate if necessary
        if (text.length > maxLength) {
            text = text.substring(0, maxLength) + '...';
        }
        
        return text;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function showLoading(show) {
        loadingDiv.hidden = !show;
    }

    function showError(message) {
        errorDiv.hidden = false;
        errorDiv.textContent = message;
    }

    function hideError() {
        errorDiv.hidden = true;
        errorDiv.textContent = '';
    }
}); 