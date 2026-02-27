const Catched = {
  add_catched_pokemon() {
    const list_catched = document.querySelector(".liste_pokemons_captures");

    if (premierChoix.querySelector(".pokemon").src === pokemon.src) {
      const capture = document.createElement("img");
      capture.src = pokemon.src;
      list_catched.appendChild(capture);
      premierChoix = null;
    }
  },
  other_function() {
    console.log("J'ai pas de problèmes");
  },
};

export default Catched;
