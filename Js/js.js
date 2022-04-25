var registro1={}; 
var login1={};

const registro = ()=>{

    const name = document.getElementById("nombre");
    const lastName = document.getElementById("apellidos");
    const phone = document.getElementById("telefono");
    const email = document.getElementById("correo");
    const password = document.getElementById("contrasena"); 
    const rol = document.getElementById("rol").value;

    
    if(name.value == '' || lastName.value== '' || phone.value== '' || email.value == '' || password.value == ''){
      window.alert("Por favor rellene todos los campos");
    }else{
        registro1 = {
          name : name.value,
          lastName : lastName.value,
          phone : phone.value,
          email : email.value,
          password : password.value,
          rol: rol
        };

    console.log(registro1);
    var respuesta;
    if(registro1.name == '' && registro1.lastName == '' && registro1.phone == '' && registro1.email == '' && registro1.password == ''){
      window.alert("Por favor rellene todos los campos");
    }
    else{

      fetch('http://localhost:19991/register',{ 
        method: 'POST',  
        headers: { 
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(registro1) 
      }) 
      .then(response =>  
      respuesta =  response.json(), 
    
      ) 
      .then(data => {  
          console.log(data),
          console.log("HOLa x2") 
      }) 
   
      }
   
    }
   
    
}




//obtiene las llaves para buscar
function login1() {

  const email = document.getElementById("email");
  const password = document.getElementById("password"); 



if(email.value == '' || password.value== ''){
    window.alert("Por favor rellene todos los campos");
}else{
      
    login1 = {
      correo : email.value,
      contrasena : password.value
    };

    console.log(login1);
    
    fetch('http://localhost:19991/login',{ 
      method: 'POST',  
      headers: { 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(login1) 
    }) 
    .then(response =>  
    respuesta =  response.json(), 

    ) 
    .then(data => {  
        console.log(data)
    }) 

}

}


