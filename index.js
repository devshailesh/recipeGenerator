function showRecipes() {
    const form = document.getElementById("ingredientForm");
    const selectedIngredients = Array.from(form.elements["ingredient"])
                                      .filter(ingredient => ingredient.checked)
                                      .map(ingredient => ingredient.value);
    
    fetchRecipes(selectedIngredients);
  }
  
  function fetchRecipes(ingredients) {
    const apiKey = '22fb9cc715fe464a8c7bd59645f6d0e7'; // Replace 'YOUR_API_KEY' with your actual API key
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&number=5&apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(recipes => {
        displayRecipes(recipes);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }
  
  function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipeList");
    recipeList.innerHTML = "";
  
    recipes.forEach(recipe => {
      const li = document.createElement("li");
      li.textContent = `${recipe.title}`; // Display title and calories
      recipeList.appendChild(li);
      fetchCalories(recipe.id, li); // Fetch calories for each recipe
    });
  }
  
  function fetchCalories(recipeId, listItem) {
    const apiKey = '22fb9cc715fe464a8c7bd59645f6d0e7'; // Replace 'YOUR_API_KEY' with your actual API key
    const url = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const calories = data.calories;
        listItem.textContent += ` - Calories: ${calories}`;
      })
      .catch(error => {
        console.error(`Error fetching calories for recipe ${recipeId}:`, error);
    });
}
