import * as catched from "./modules/pokemoncatched.js";

const grille_jeu = document.getElementById("grille_de_jeu");
const divs = grille_jeu.querySelectorAll("div");
let premierChoix = null;
let deuxiemeChoix = null;
let listIndex = [];
let index1;
let index2;

let pokemonIds = [];
let pairShuffled = [];

fetch("http://127.0.0.1:5500/data/pokemon.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (var i = 0; i < Object.keys(data).length; i++) {
      const pokeData = data[i].sprite;
      pokemonIds.push(pokeData);
    }
    const shuffle = melangerListe(pokemonIds);
    console.log(shuffle);

    pairShuffled = melangerListe(
      duplicatePairOfPokemon(getPairOfPokemon(shuffle)),
    );
    console.log(pairShuffled);

    divs.forEach((div, index) => {
      div.addEventListener("click", () => {
        displayPokemon(index, pairShuffled[index]);
        listIndex.push(index);

        if (!premierChoix || (premierChoix && deuxiemeChoix)) {
          premierChoix = pairShuffled[index];
          deuxiemeChoix = null;
          console.log("premier choix");
          index1 = index;
        } else {
          deuxiemeChoix = pairShuffled[index];
          index2 = index;
          console.log("deuxieme Choix");

          if (comparePath(premierChoix, deuxiemeChoix)) {
            setTimeout(() => {
              displayPokeball(index1);
              displayPokeball(index2);
              premierChoix = null;
            }, 1000);
          } else {
            setTimeout(() => {
              displayBush(index1);
              displayBush(index2);
              premierChoix = null;
            }, 1000);
          }
        }
      });
    });
  });

function melangerListe(liste) {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [liste[i], liste[j]] = [liste[j], liste[i]];
  }
  return liste;
}

function getPairOfPokemon(liste) {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [liste[i], liste[j]] = [liste[j], liste[i]];
  }
  return liste.slice(0, 6);
}

function duplicatePairOfPokemon(liste) {
  return liste.concat(liste);
}

// document.

//const nombre = Math.floor(Math.random() * 11); // 0 à 10
// const fruits = ['pomme', 'banane', 'cerise'];
// const fruit = fruits[Math.floor(Math.random() * fruits.length)];
// console.log(fruit);

// Click sur bouton*

// grille_jeu.addEventListener("click", (event) => {
//   const box = event.target.closest(".col.box");
//   if (!box) return;

//   const bush = box.querySelector(".bush");
//   if (!bush) return;
//   bush.style.display = "none";

//   const pokemon = document.createElement("img");
//   pokemon.src = pairShuffled[0]; // TODO : A changer pour avoir un pokemon de la liste ?
//   pokemon.classList.add("pokemon");
//   box.appendChild(pokemon);

//   if (!premierChoix) {
//     premierChoix = box;
//     return;
//   }

//   if (premierChoix.querySelector(".pokemon").src === pokemon.src) {
//     premierChoix = null;
//   } else {
//     const deuxiemeChoix = box;
//     setTimeout(() => {
//       premierChoix.querySelector(".pokemon").remove();
//       premierChoix.querySelector(".bush").style.display = "block";
//       deuxiemeChoix.querySelector(".pokemon").remove();
//       deuxiemeChoix.querySelector(".bush").style.display = "block";
//       premierChoix = null;
//     }, 1000);
//   }
// });

function displayPokeball(box_num) {
  const box = grille_jeu.children[box_num];
  console.log(box);
  const image = box.firstElementChild;

  image.src = "assets/pokeball.png";
  image.classList.add("pokeball");
  image.classList.remove("bush", "pokemon");
}

function displayBush(box_num) {
  const box = grille_jeu.children[box_num];
  console.log(box);
  const image = box.firstElementChild;

  image.src = "assets/bush.webp";
  image.classList.add("bush");
  image.classList.remove("pokeball", "pokemon");
}

function displayPokemon(box_num, listPath) {
  const box = grille_jeu.children[box_num];
  console.log(box);
  const image = box.firstElementChild;

  image.src = listPath;
  image.classList.add("pokemon");
  image.classList.remove("bush", "pokeball");
}

function comparePath(path1, path2) {
  if (path1 == path2) {
    console.log("chemin identique");
    return true;
  } else {
    console.log("choix différent");
    return false;
  }
}
