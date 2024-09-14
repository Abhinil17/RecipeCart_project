function scrollToSection(sectionClass) {
    const section = document.querySelector(`.${sectionClass}`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// JavaScript for RecipeCart page
const searchForm = document.getElementById('searchForm');
const searchInput = document.querySelector('.search-input');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
        // Redirect to the result.html page, passing the search query as a URL parameter
        window.location.href = `search.html?search=${searchQuery}`;
    } else {
        // If the search input is empty, alert the user (optional)
        alert('Please enter a recipe to search.');
    }
});

// Get all the "View Recipe" buttons
const viewRecipeButtons = document.querySelectorAll('.view-recipe-btn');

// Add click event listeners to each button
viewRecipeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        const recipeId = this.getAttribute('data-id'); // Get the data-id attribute value

        // Redirect to the result page with the recipe ID as a query parameter
        window.location.href = `search.html?recipe=${recipeId}`;
    });
});
