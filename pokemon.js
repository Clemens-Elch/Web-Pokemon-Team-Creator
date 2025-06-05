window.onload = () =>{

    const inputIds = [
        document.getElementById("pokemon1"),
        document.getElementById("pokemon2"),
        document.getElementById("pokemon3"),
        document.getElementById("pokemon4"),
        document.getElementById("pokemon5"),
        document.getElementById("pokemon6")
    ];

    inputIds.forEach(input => {
        input.value = "";
    });

    const addButtons = [
        document.getElementById("addPokemon1"),
        document.getElementById("addPokemon2"),
        document.getElementById("addPokemon3"),
        document.getElementById("addPokemon4"),
        document.getElementById("addPokemon5"),
        document.getElementById("addPokemon6")
    ];

    const pokemonLists = [
        document.getElementById("pokemonList1"),
        document.getElementById("pokemonList2"),
        document.getElementById("pokemonList3"),
        document.getElementById("pokemonList4"),
        document.getElementById("pokemonList5"),
        document.getElementById("pokemonList6")
    ];

// Get entered numbers
    addButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const enteredId = inputIds[index].value;
            if (isNaN(enteredId)) {
                alert("Please enter a valid Pokemon ID.");
                return;
            }
            loadPokemon(enteredId, pokemonLists[index]);
        });
    });
};

// render pokemon list
function renderPokemonList(data, pokemonList) {
    pokemonList.innerHTML = "";
// div structure used for every list
    data.forEach(pokemon => {
        pokemonList.innerHTML = `          
                <div class="text-center p-1 border-bottom">
                    ${pokemon.name}
                </div>            
                <div class="text-center p-1 border-bottom">
                    <img src="${pokemon.sprites.front_default}">
                </div>            
                <div class="text-center p-1 border-bottom">
                    ${pokemon.types[0].type.name}
                </div>
                <div class="text-center p-1 border-bottom">
                    ${pokemon.weight + "kg"}
                </div>
        `;
    });
}
// fetch api
function loadPokemon(enteredId, pokemonList) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${enteredId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data, pokemonList);
            renderPokemonList([data], pokemonList);
        })
        .catch(error => {
            console.error("Error fetching Pokémon:", error);
            alert("Pokemon not found. Please try a different ID.");
        });
}
