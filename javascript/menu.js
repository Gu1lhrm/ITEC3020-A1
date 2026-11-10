const search = document.getElementById("search");
const category = document.getElementById("category");
const dishes = document.querySelectorAll(".menu-item");
const results = document.getElementById("results");

//Function para search and filter o menu
function filterMenu() {
    let searchText = search.value.toLowerCase();
    let selectedCategory = category.value;
    let count = 0;

    dishes.forEach(function(dish) {
        let name = dish.dataset.name.toLowerCase();
        let dishCategory = dish.dataset.category;

        if (name.includes(searchText) &&
            (selectedCategory === "all" || selectedCategory === dishCategory)) {
            dish.style.display = "";
            count++;
        } else {
            dish.style.display = "none";
        }
    });

    results.textContent = count + " dishes found.";
}

// run o codigo quando o user types ou seleciona uma categoria
search.addEventListener("input", filterMenu);
category.addEventListener("change", filterMenu);

filterMenu();
