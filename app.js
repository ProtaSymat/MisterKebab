let recettes = [];
let commandes = [];

function ajouterRecette() {
    let nom = document.getElementById('recetteNom');
    let ingredients = document.getElementById('recetteIngredients');
    if (!nom.value.trim()) {
        alert('on a besoin du nom de la recette !');
        return;
    }
    if (!ingredients.value.trim()) {
        alert('Et les ingrédients alors ?');
        return;
    }
    recettes.push({ 
        nom: nom.value, 
        ingredients: ingredients.value 
    });

    nom.value = '';
    ingredients.value = '';
}
function supprimerRecette(index) {
    recettes.splice(index, 1);
    visualiserRecettes();
}


function visualiserRecettes() {
    let list = document.getElementById('recipeList');
    list.innerHTML = '';
    recettes.forEach((recette, i) => {
        list.innerHTML += `<div class="card mb-5" style="width: 18rem;">
        <div class="card-body">
            <h5>Recette n° ${i+1}</h5>
            <p class="card-title lead">Nom : ${recette.nom}</p>
            <p class="card-text">Ingrédients : ${recette.ingredients}</p>
            <input id="sauce${i}" placeholder="Quelle sauce chef ?">
            <div class="d-flex my-3">
            <button class="btn btn-danger me-2" onclick="supprimerRecette(${i})"><i class="fa fa-trash"></i></button>
            <button class="btn btn-primary" onclick="lancerCommande(${i})">Envoyer en cuisine</button>
            </div>
        </div>
        </div>`;
    });
}
function startChrono(index, start) {
    setInterval(() => {
        let now = Date.now();
        let diff = now - start;
        document.getElementById('chrono' + index).innerText = formaterTemps(diff);
    }, 1000);
}
function formaterTemps(tempsMs) {
    let minutes = Math.floor(tempsMs / 60000);
    let seconds = ((tempsMs % 60000) / 1000).toFixed(0);
    return minutes + "m" + (seconds < 10 ? '0' : '') + seconds + "s";
}
function visualiserCommandes() {
    let list = document.getElementById('orderList');
    list.innerHTML = '';
    commandes.forEach((commande, i) => {
        let dateCommande = commande.dateCommande.toLocaleString();
        list.innerHTML += 
            `<div class="card my-5" style="width: 25rem;">
            <div class="card-body">
                <h5>Commande :</h5>
                <p class="card-title lead">Nom : ${commande.recette.nom}</p>
                <p class="card-text">Ingrédients : ${commande.recette.ingredients}</p>
                <p class="card-text">Sauce : ${commande.sauce}</p>
                <p class="card-text">Heure : ${dateCommande}, <br> Commande réalisé il y a : <span id="chrono${i}"></span></p>
                <div class="d-flex my-3">
                <button class="btn btn-success" onclick="validerCommande(${i})">Terminer la commande</button>
                </div>
            </div>
            </div>`;
        startChrono(i, commande.startChrono);
    });
}


function lancerCommande(indexRecette) {
    let sauce = document.getElementById('sauce' + indexRecette).value;
    if (!sauce.trim()) {
        alert('Une commande ne part pas sans sauce(s)!!');
        return;
    }

    fetch('https://worldtimeapi.org/api/timezone/Europe/Paris')
        .then(response => response.json())
        .then(data => {
            let commande = {
                recette: recettes[indexRecette],
                sauce: sauce,
                dateCommande: new Date(),
                startChrono: Date.now()
            };
            commandes.push(commande);
            supprimerRecette(indexRecette);
        });
}

function validerCommande(index) {
    commandes.splice(index, 1);
    visualiserCommandes();
}

window.onload = () => {
    visualiserRecettes();
    visualiserCommandes();
}

