const btnLogin = document.getElementById("IniciarSesion");
btnLogin.addEventListener("click",login)
function login(){
  console.log("login")
  let usuario = document.getElementById("usuario").value
  let pass = document.getElementById("password").value
  let data= {correo: usuario, contraseña: pass}
  fetch("http://localhost:9000/api/users/login", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then((data) => {
      console.log(data[0]._id)
      if(data.length > 0){
        sessionStorage.setItem("login", data[0]._id);
        window.location.href = "favoritos.html";
      }else{
        sessionStorage.setItem("login", "");
      }
  })
  .catch(error => console.error('Error:', error))
}

function intentarEnviar() {
  console.log("registro")

  let nombreValue = document.querySelector(".rNombre").value;
  let correoValue = document.querySelector(".rCorreo").value;
  let usuarioValue = document.querySelector(".rUsuario").value;
  let contraseñaValue = document.querySelector(".rContraseña").value;

  let data = { nombre: nombreValue, correo: correoValue, usuario: usuarioValue, contraseña: contraseñaValue }
  console.log(data);

  fetch("http://localhost:9000/api/users", {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then((data) => {
      if(data._id.length> 5){
        sessionStorage.setItem("login", data._id);
        window.location.href = "pokemones.html";
      }
      console.log(data._id)
    })
    .catch(error => console.error('Error:', error))
}

function deletePok(favoritePk) {
    //http://localhost:9000/api/users/favorites/63aa8c0d4760dd949eb213c6
    let data= {favorite: {name:favoritePk.name, peso: favoritePk.weight, altura: favoritePk.height, img: favoritePk.img}}
      fetch("http://localhost:9000/api/users/favorites/"+sessionStorage.login, {
        method: 'DELETE',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json',
      }),})
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          alert('pokemon eliminado')
      });
}

$("#imgContrasena").click(function () {

  let control = $(this);
  let estatus = control.data('activo');

  let icon = control.find('span');
  if (estatus == false) {

    control.data('activo', true);
    $(icon).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
    $("#txtPassword").attr('type', 'text');
  }
  else {

    control.data('activo', false);
    $(icon).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
    $("#txtPassword").attr('type', 'password');
  }
});
