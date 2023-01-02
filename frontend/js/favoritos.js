
function eliminar(){
    const rpta = confirm("Desea quitar de favoritos?")
    if (rpta) {
        fetch("http://localhost:9000/api/users/"+sessionStorage.login, {method: 'DELETE',
        headers: new Headers({'Content-Type': 'application/json'}),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.deletedCount == 1) {
                    alert('Usuario eliminado');
                    window.location.href = "sign.html";
                }else{
                    alert("No se pudo eliminar usuario")
                }
            });
    }
}

function getFavoritos(idUsuario) {
      fetch("http://localhost:9000/api/users/favorites/"+sessionStorage.login, {method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),})
        .then((response) => response.json())
        .then((data) => {
          const favorites = data.favorites;
        if (favorites.length>0) {
          for (const index in favorites) {
            createCard(favorites[index])
          }
        }else{
          document.querySelector(".card-container").innerHTML = '<h3 style="padding-top: 2rem;">No tienes pokemones favoritos</h3>';
        }
    });
}

function createCard(data) {
    let card = document.createElement('article');
    card.className = 'card col';
    card.classList.add(data.name);
    card.id = data.name;
    let imgContainer = document.createElement('figure');
    imgContainer.className = 'imgContainer';
    let img = document.createElement("img");
    img.loading = 'lazy';
    img.width = "200"
    img.src = data.img;
    let textContainer = document.createElement("figcaption");
    textContainer.className = ('textContainer');
    const btnEliminar = document.createElement('button');
    btnEliminar.innerText = "Eliminar";
    btnEliminar.classList.add("btn");
    btnEliminar.classList.add("btn-danger");
    btnEliminar.addEventListener('click', (e) => {
        let obj= {favorite: {name:data.name, peso: data.peso, altura: data.altura, img: data.img}}
        fetch("http://localhost:9000/api/users/favorites/"+sessionStorage.login, {
        method: 'DELETE',
        body: JSON.stringify(obj),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),})
        .then((response) => response.json())
        .then((data) => {
            if(data.modifiedCount == 1){
              alert('pokemon eliminado')
              location.reload();
            }
        });
    })
    let text = document.createElement('h3');
    text.textContent = data.name
    text.textContent = (text.textContent).toUpperCase();
    imgContainer.append(img);
    textContainer.append(text);
    card.append(imgContainer, textContainer,btnEliminar);
    document.querySelector("main").append(card);
  }
