/**
 * InnovaREV - Blog Search & Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const articles = document.querySelectorAll('.blog-card');
  const catLinks = document.querySelectorAll('.cat-link');

  // Search Functionality
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      const term = e.target.value.toLowerCase();

      articles.forEach(article => {
        const title = article.querySelector('.blog-title').textContent.toLowerCase();
        const excerpt = article.querySelector('p').textContent.toLowerCase();

        if (title.includes(term) || excerpt.includes(term)) {
          article.style.display = 'block';
        } else {
          article.style.display = 'none';
        }
      });
    });
  }

  // Category Filtering
  if (catLinks.length > 0) {
    catLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-cat');

        // Active state
        catLinks.forEach(l => l.style.fontWeight = 'normal');
        link.style.fontWeight = 'bold';

        articles.forEach(article => {
          if (category === 'all' || article.getAttribute('data-category') === category) {
            article.style.display = 'block';
          } else {
            article.style.display = 'none';
          }
        });
      });
    });
  }
});
