nuevoArray = new Array(1);
   
   const loginFinal = async() => {
    const id = document.getElementById("email").value;
    console.log(id);
    const request = await fetch(`http://localhost:19991/login/${id}`,{
      method: "GET",
    });

    nuevoArray = await request.json();
    validarSesion();
  };

  function validarSesion(){
    const correo = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    if(nuevoArray.length == 0){
        window.alert("Ingresa los datos correctos");
    }else{

        if(correo == nuevoArray[0].correo && pass == nuevoArray[0].contrasena){
            if(nuevoArray[0].rol == "administrador"){
                window.location.href ="/html/admin.html";
            }else if(nuevoArray[0].rol == "cliente"){
                window.location.href ="/html/inicio.html";
            }
        }
        else{
            window.alert("Ingresa los datos correctos");
        }

    }
}
  