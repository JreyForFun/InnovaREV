/**
 * InnovaREV - Portfolio Filtering and Load More Logic
 */

let itemsToShow = 6; // Start with 6 items
let currentFilter = 'all';
let currentSearch = '';

document.addEventListener('DOMContentLoaded', () => {
  initPortfolioFilter();
  initSearch();
  initLoadMore();
});

function initSearch() {
  const searchInput = document.getElementById('portfolioSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    itemsToShow = 6; // Reset pagination on search
    updatePortfolioDisplay();
  });
}

function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      currentFilter = btn.getAttribute('data-filter');
      itemsToShow = 6; // Reset to 6 when filtering
      updatePortfolioDisplay();
    });
  });
}

function initLoadMore() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener('click', () => {
    if (itemsToShow === 6) {
      itemsToShow = 16; // Show 10 more (6 + 10 = 16)
    } else if (itemsToShow === 16) {
      itemsToShow = 999; // Show all
    }
    updatePortfolioDisplay();
  });

  // Initial display
  updatePortfolioDisplay();
}

function updatePortfolioDisplay() {
  const items = document.querySelectorAll('.portfolio-item');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  let visibleCount = 0;
  let totalMatchingItems = 0;

  items.forEach((item, index) => {
    const category = item.getAttribute('data-category');
    const matchesFilter = currentFilter === 'all' || category === currentFilter;

    // Search logic
    const title = item.querySelector('h3') ? item.querySelector('h3').textContent.toLowerCase() : '';
    const desc = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : '';
    const tags = item.querySelector('.tag') ? item.querySelector('.tag').textContent.toLowerCase() : '';
    const searchText = currentSearch.toLowerCase().trim();

    const matchesSearch = searchText === '' ||
      title.includes(searchText) ||
      desc.includes(searchText) ||
      tags.includes(searchText);

    if (matchesFilter && matchesSearch) {
      totalMatchingItems++;
      if (visibleCount < itemsToShow) {
        item.style.display = 'block';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    } else {
      item.style.display = 'none';
    }
  });

  // Update button text and visibility
  if (loadMoreBtn) {
    if (visibleCount >= totalMatchingItems) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
      if (itemsToShow === 6) {
        loadMoreBtn.textContent = 'Load More (10 more)';
      } else if (itemsToShow === 16) {
        loadMoreBtn.textContent = 'Show All Projects';
      }
    }
  }
}


