function getPokemonListPage() {
    let indexCounter = 0;
    fetch("https://pokeapi.co/api/v2/generation/1/", {})
        .then((response) => response.json())
        .then((data) => {
            const pokemons = data.pokemon_species;
            fetchNPokemons(20);
            function fetchNPokemons(nPokemons) {
                for (indexCounter = 0; indexCounter < nPokemons; indexCounter++) {
                    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemons[indexCounter].name, {})
                        .then((response) => response.json())
                        .then((data) => {
                            createCard(data);
                        });
                };
            };
            listenToBtn();
            function listenToBtn() {


                btnMorePokemons.textContent = 'CARGAR MÁS POKEMONES';
                btnMorePokemons.addEventListener('click', () => {
                    // alert(indexCounter)

                    // si hay 120 cards, el btn sigue funcionando, cuando hayan140 cards, el btn se desaparece y aparece uno de volver arriba
                    let allCards = document.querySelectorAll('.card');
                    if (151 - allCards.length < 20) {
                        // btnMorePokemons.style.pointerEvents = 'none'
                        btnMorePokemons.disabled = 'true'
                        btnMorePokemons.style.display = 'none'

                        let newBtn = document.createElement('a')
                        newBtn.className = 'form-control'
                        newBtn.href = '#'
                        newBtn.textContent = 'VOLVER ARRIBA';
                        root.append(newBtn);

                    }

                    for (indexCounter = allCards.length; indexCounter < allCards.length + 20; indexCounter++) {

                        //en indexcounter de 140 elbtn desaparece

                        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemons[indexCounter].name, {})
                            .then((response) => response.json())
                            .then((data) => {

                                console.log(data.name) // 151
                                createCard(data);

                            });
                        // console.log({ indexCounter })
                    };
                });
            };
        });

    root.append(main, btnMorePokemons);

}

/**
 * Crear un compomente card para mostrar un pokemon
 * @param {*} data
 */
function createCard(data) {
    let card = document.createElement('article');
    card.className = 'card';
    card.classList.add(data.types[0].type.name);
    card.id = data.name;

    let imgContainer = document.createElement('figure');
    imgContainer.className = 'imgContainer';

    let img = document.createElement("img");
    img.loading = 'lazy';
    img.width = "200"
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    card.addEventListener('click', () => {
        console.log(data.types[0].type.name)
    })
    let textContainer = document.createElement("figcaption");
    textContainer.className = ('textContainer');

    let text = document.createElement('h3');
    text.textContent = data.name
    text.textContent = (text.textContent);

    let btn = document.createElement('button')
    btn.innerHTML = '<button class="btn btn-primary">Agregar a favoritos</button>'
    btn.className = 'btnStar p-3'
    btn.addEventListener('click', (e) => {
        console.log(e.currentTarget.parentElement) //al hacer click en la estrella obtienes el .card o <article> con su id (nombre del pokemon)
        const cardElement = e.currentTarget.parentElement;
        cardElement.classList.toggle('fav');
        const favorite = { favorite: { name: data.name, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png` } };
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(favorite),
            headers: ({
                'Content-Type': 'application/json'
            })
        }
        fetch("http://localhost:9000/api/users/favorites/" + sessionStorage.login, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                cardElement.classList.toggle('fav');
                alert('agregado a favoritos')
            });
    })// final de eventlistener

    imgContainer.append(img);
    textContainer.append(text);
    card.append(imgContainer, textContainer, btn);
    main.append(card); //main enlugar de root
}
