import Catched from "./modules/pokemoncatched.js";

Catched.other_function();

const grille_jeu = document.getElementById("grille_de_jeu");
const divs = grille_jeu.querySelectorAll("div");
const score = document.getElementById("stat_nombre_de_coups");
const captured = document.querySelector(".liste_pokemons_captures");
let premierChoix = null;
let deuxiemeChoix = null;
let listIndex = [];
let index1;
let index2;
let coup = 0;

let pokemonIds = [];
let pairShuffled = [];

captured.querySelector("img").remove();

fetch("http://127.0.0.1:5500/data/pokemon.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((i) => {
      const pokeData = i.sprite;
      pokemonIds.push(pokeData);
      console.log(pokeData);
    });
    const shuffle = melangerListe(pokemonIds);
    console.log(shuffle);

    pairShuffled = melangerListe(
      duplicatePairOfPokemon(getPairOfPokemon(shuffle)),
    );
    // console.log(pairShuffled);

    divs.forEach((div, index) => {
      div.addEventListener("click", () => {
        if (
          (premierChoix && deuxiemeChoix) ||
          grille_jeu.children[index].firstElementChild.classList ==
            "pokeball" ||
          grille_jeu.children[index].firstElementChild.classList == "pokemon"
        ) {
          return;
        }

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
              const image = document.createElement("img");
              image.src = premierChoix;
              captured.appendChild(image);
              premierChoix = null;
              coup += 1;
              score.textContent = coup;
              gameWon();
            }, 1000);
          } else {
            setTimeout(() => {
              displayBush(index1);
              displayBush(index2);
              premierChoix = null;
              coup += 1;
              score.textContent = coup;
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

function gameWon() {
  let counter = 0;
  const box = [...grille_jeu.children];
  box.forEach((element) => {
    if (!element.querySelector("img").classList.contains("pokeball")) {
      console.log("pas Victoire !");
      counter += 1;
    }

    if (counter == 0) {
      console.log("Victoire !");
    }
  });
}

console.log(grille_jeu.children);
