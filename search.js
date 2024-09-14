const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close');




//Function to get the Recipe

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML="<h5>Fetching Recipe...</h5>";
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML="";
    response.meals.forEach(meal =>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea} ${meal.strCategory}</p>
            `

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            //Adding event listener to recipe button
            button.addEventListener('click', () => {
                    openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });
    }
    catch(error){
        recipeContainer.innerHTML="<h3>Error: Please enter Valid meal Name..</h3>";
        
}
}

// Function to fetch ingredients and add purchase links
const fetchIngredients = (meal) => {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            // Adding links to buy the ingredient from both BigBasket and Blinkit
            const bigBasketLink = `https://www.bigbasket.com/ps/?q=${encodeURIComponent(ingredient)}`;
            const blinkitLink = `https://blinkit.com/s/?q=${encodeURIComponent(ingredient)}`;
            
            
            ingredientsList += `
                <li>${measure} ${ingredient} -
                <a href="${bigBasketLink}" target="_blank">Buy on BigBasket</a> |
                <a href="${blinkitLink}" target="_blank">Buy on Blinkit</a>
                </li>`;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <div class="recipeInst">
        <h3>Recipe Instructions:</h3><br>
        <p>${meal.strInstructions}</p>
    </div>
    <h3>Ingredients:</h3>
    <ul class="ingredientsList" >${fetchIngredients(meal)}</ul>
    `
    recipeCloseBtn.addEventListener('click' , () => {
    recipeDetailsContent.parentElement.style.display = 'none';
    });
    recipeDetailsContent.parentElement.style.display = "block";
}

searchBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    const searchQuery = searchInput.value.trim();
    if(!searchQuery){
        recipeContainer.innerHTML=`<h3>Type the meal you want to Search for...</h3>`
        return;
    }
    fetchRecipes(searchQuery);
});

// JavaScript for Result page

// Function to extract the query parameter from the URL
const getSearchQuery = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('search');
};


// Function to initialize the search from URL
const initSearch = () => {
    const searchQuery = getSearchQuery();
    if (searchQuery) {
        const searchInput = document.querySelector('.search-input');
        searchInput.value = searchQuery;  // Set the search input value
        fetchRecipes(searchQuery);  // Fetch recipes based on query
    }
};

// Initialize search when page loads
initSearch();

// Get the recipe ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('recipe');

// Now you can use this recipeId to display the relevant recipe details
console.log(`Recipe ID: ${recipeId}`);

// Initialize the recipe fetch when the page loads, based on the recipeId
if (recipeId) {
    fetchRecipes(recipeId);
}

