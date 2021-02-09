
//....connection with search button....


const searchButton = document.getElementById('searchBtn');

searchButton.addEventListener("click", function(){

    document.getElementById('foodDetails').innerHTML = '';
    const foodName = document.getElementById('inputField').value;
    if(foodName ==""){
        return
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then(res => res.json())
    .then(data => {
        

        //....no food found connection with js...

        const foodItems = data.meals;
        if(foodItems === null){
            document.getElementById("noFoodFound").style.display = "block";
            document.getElementById("foodItems").innerHTML = "";

            return;
        }else{
            document.getElementById("noFoodFound").style.display = "none";
        }
            
        const foodsDiv = document.getElementById('foodItems');
        foodsDiv.innerHTML = "";
        foodItems.forEach(food => {
            
            
            //... showing main meanu with food name...

            const foodTitle = food.strMeal;
            
            const foodId = food.idMeal;
            const foodImg = food.strMealThumb;
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<img onclick="itemDetails('${foodId}')" src="${foodImg}">
                                <h5 onclick="itemDetails('${foodId}')">${foodTitle}</h5>`;
            foodsDiv.appendChild(itemDiv);
            
        });
    
    });
});

//...showing food details...

const itemDetails = (foodId)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
    .then(res => res.json())
    .then(data => {

        const name = data.meals[0].strMeal;
        const img = data.meals[0].strMealThumb;
        const incredient  = data.meals[0].strIngredient1;
        const incredient1 = data.meals[0].strIngredient2;
        const incredient2 = data.meals[0].strIngredient3;
        const incredient3 = data.meals[0].strIngredient4;
        const incredient4 = data.meals[0].strIngredient5;

        const incredientDiv = document.getElementById('foodDetails');
        incredientDiv.innerHTML = `<img src="${img}">
                                    <h5>${name}</h5>
                                    <p>Ingredients</p>
                                    <ul>
                                        <li>${incredient}</li>
                                        <li>${incredient1}</li>
                                        <li>${incredient2}</li>
                                        <li>${incredient3}</li>
                                        <li>${incredient4}</li>
                                    </ul>
        `;
    });
    
}


