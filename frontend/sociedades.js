async function getAllSociedades() {
    const url = `http://localhost:8000/api/v1/sociedades`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    // const pokemones = data.results;

    // const listaPokemones = document.getElementById("pokemon-list");
    // pokemones.forEach(pokemon => {
    //     const unLi = document.createElement("li");

    //     const pokemonLink = document.createElement("a");

    //     pokemonLink.href = pokemon.url;
    //     pokemonLink.textContent = pokemon.name;

    //     unLi.appendChild(pokemonLink);
    //     listaPokemones.appendChild(unLi);
    // });
}

getAllSociedades();
