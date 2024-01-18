let recettes = [];
let commandes = [];

function ajouterRecette() {
    let nom = document.getElementById('recetteNom').value;
    let ingredients = document.getElementById('recetteIngredients').value;
    recettes.push({ nom, ingredients });
    displayRecettes();
}

function supprimerRecette(index) {
    recettes.splice(index, 1);
    displayRecettes();
}

function lancerCommande(indexRecette) {
    let sauce = document.getElementById('sauce').value;
    fetch('https://worldtimeapi.org/api/timezone/Europe/paris')
        .then(response => response.json())
        .then(data => {
            let commande = { recette: recettes[indexRecette], sauce: sauce, temps: data.datetime };
            commandes.push(commande);
            displayCommandes();
        });
}

function validerCommande(index) {
    commandes.splice(index, 1);
    displayCommandes();
}

function displayRecettes() {
    let list = document.getElementById('recipeList');
    list.innerHTML = ''; 
    recettes.forEach((recette, i) => {
        list.innerHTML += `<div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${recette.nom}</h5>
            <p class="card-text">${recette.ingredients}</p>
            <button class="btn btn-primary" onclick="supprimerRecette(${i})">Supprimer</button>
            <button class="btn btn-primary" onclick="lancerCommande(${i})">Lancer la Commande</button>
        </div>
    </div>`;
    });
}

function displayCommandes() {
    let list = document.getElementById('orderList');
    list.innerHTML = '';
    commandes.forEach((commande, i) => {
        list.innerHTML += `<li>Recipe: ${commande.recette.nom}, Sauce: ${commande.sauce}, Time; ${commande.temps} 
                           <button onclick="validerCommande(${i})">Complete Order</button>
                          </li>`;
    });
}

window.onload = () => {
    displayRecettes();
    displayCommandes();
}