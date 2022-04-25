const imagenes = document.getElementById("sect");
const carro = document.getElementById("carrito");
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');
let final = document.createElement("th");
table.setAttribute("id","tabla1");
var nuevoArray;
let carrito = {};
var acumulado = {};


/*
//Para que no se pierda la info se guarda en el LocalStorage
document.addEventListener('DOMContentLoaded',() =>{
    fetch("")
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintarCarro();
    }
})
*/

const pintarImagenes = async () => {

    const request = await fetch(`http://localhost:19991/consultarRepos`, {
        method: "get",
    });
    nuevoArray = new Array(1);
    nuevoArray = await request.json();

    imagenes.innerHTML = "";
    imagenes.style =  "clear: both;";

    //Se agregan todos los productos con el DOM
    for (let i = 0; i < nuevoArray.length; i++) {

        //div para cada producto
        const div1 = document.createElement("div");
        div1.id = nuevoArray[i].id;
        div1.style = "width: 340px;  height:420px; float: left; background:#FFFFFF; margin: 10px;  padding: 5px; text-align: center;" 
        //div1.class = "card";

        //titulo
        const tit = document.createElement("h2");
        tit.innerText = nuevoArray[i].nombre;
        
        //imagen
        const imga = document.createElement("img");
        imga.src = nuevoArray[i].ruta;
        imga.style = " height: 250px; width: 250px;";
    
        //precio
        const price = document.createElement("h4");
        price.innerText = "$ "+nuevoArray[i].precio;
        
        //boton de comprar
        const button = document.createElement("button");
        button.innerText = "Comprar";
        button.id = nuevoArray[i].id;
        button.setAttribute("onclick","agregar(this)");
  
        imagenes.appendChild(div1); 
        div1.appendChild(tit);
        div1.appendChild(imga);
        div1.appendChild(price);
        div1.appendChild(button);
    
       
    }
  

    //TABLA DEL CARRITO DE COMPRAS
    table.appendChild(thead);
    table.appendChild(tbody);
    
    let fila = document.createElement("tr");   
    let indices = document.createElement('th');
    indices.scope = "col";
    indices.innerHTML = "#";
    let indices1 = document.createElement('th');
    indices1.scope = "col";
    indices1.innerHTML= "Item";
    let indices2 = document.createElement('th');
    indices2.scope = "col";
    indices2.innerHTML = "Cantidad";
    let indices3 = document.createElement('th');
    indices3.scope = "col";
    indices3.innerHTML = "Accion";
    let indices4 = document.createElement('th');
    indices4.scope = "col";
    indices4.innerHTML = "Total";
     
    
    fila.appendChild(indices);    
    fila.appendChild(indices1);    
    fila.appendChild(indices2);    
    fila.appendChild(indices3);    
    fila.appendChild(indices4);    
    thead.appendChild(fila);
    /*
    fila = document.createElement("tr");
    indices = document.createElement("th");
    indices.scope = "row";
    indices.colspan = "5";
    indices.innerHTML = "Carrito vacio - compra ahora!";
    
    fila.appendChild(indices); 
    thead.appendChild(fila);  
*/

    var tablaFront = document.getElementById('tablita');
    tablaFront.innerHTML = "";
    tablaFront.style = "clear: both; background:#FFFFFF;";

    document.getElementById('tablita').appendChild(table);
};

function agregar(button){
  const producto = {
      id: nuevoArray[(button.id-1)].id,
      nombre: nuevoArray[(button.id-1)].nombre,
      precio: nuevoArray[(button.id-1)].precio,
      cantidad: 1
  }
  //Se valida si el Id ya existe para modificar la cantidad y el sub total
  if(carrito.hasOwnProperty(producto.id)){
      producto.cantidad = carrito[producto.id].cantidad + 1;
      producto.precio = (producto.precio) * producto.cantidad;
    }

    carrito[producto.id] = producto;

    //console.log(carrito);
    pintarCarro();    
}

const pintarCarro = () =>{

   // console.log("En el pintar");
   // console.log(carrito);

   tbody.innerHTML = "";
  //
    let contenido;
      
    Object.values(carrito).forEach(producto => {

        let fila = document.createElement("tr");   

        contenido = document.createElement('td');
        contenido.innerHTML = producto.id;
        contenido.style = "text-align: center;";
        tbody.appendChild(fila);
        fila.appendChild(contenido);
        
        
        contenido = document.createElement('td');
        contenido.innerHTML = producto.nombre;
        contenido.style = "text-align: center;";
        tbody.appendChild(fila);
        fila.appendChild(contenido);
        
        
        contenido = document.createElement('td');
        contenido.innerHTML = producto.cantidad;
        contenido.style = "text-align: center;";
        tbody.appendChild(fila);
        fila.appendChild(contenido);
        
        
        let mas = document.createElement("button");
        mas.innerHTML = "+";
        mas.id= producto.id;
        mas.setAttribute("onclick","sumar(this)");
        tbody.appendChild(fila);
        fila.appendChild(mas);
        
        let menos = document.createElement("button");
        menos.innerHTML = "-";
        menos.id= producto.id;
        menos.setAttribute("onclick","restar(this)");
        tbody.appendChild(fila);
        fila.appendChild(menos);
        

        contenido = document.createElement('td');
        contenido.innerHTML = producto.precio;
        contenido.style = "text-align: center;";
        tbody.appendChild(fila);
        fila.appendChild(contenido);

    })
    pintarTotal();
   
    /*
   localStorage.setItem('carrito',JSON.stringify(carrito));
   */
}

const pintarTotal = () =>{

    var tablaFront = document.getElementById('tabla1');
    
    const cantidadTotal = Object.values(carrito).reduce((acc,{ cantidad }) => acc + cantidad,0);
    const precioTotal = Object.values(carrito).reduce((acc,{ precio }) => acc + precio,0);

    final.innerHTML="";
    final.scope = "row";
    final.colspan = "2";
    final.innerHTML = "Total productos";

    let totales = document.createElement('td');
    totales.innerHTML = "Cantidades totales: "+cantidadTotal;
    final.appendChild(totales);
 
    let precios = document.createElement('td');
    precios.innerHTML = "Precio total: "+precioTotal;
    final.appendChild(precios);

    tablaFront.appendChild(final);
    //console.log(tablaFront);

}

function sumar(id){

    const producto1 = carrito[id.id];
    producto1.cantidad = carrito[id.id].cantidad + 1;
    producto1.precio = (nuevoArray[(id.id)-1].precio) * (producto1.cantidad);
    carrito[id.id] = {...producto1};

    console.log("Actualizado");
    console.log(carrito);
    pintarCarro();
}

function restar(id){

    const producto1 = carrito[id.id];
    producto1.cantidad = carrito[id.id].cantidad - 1;
    producto1.precio = carrito[id.id].precio - (nuevoArray[(id.id)-1].precio);
    carrito[id.id] = {...producto1};
    pintarCarro();
}
		
const pintarCarro2 = () =>{
     
    Object.values(carrito).forEach(producto => {
        
        let mas = document.createElement("button");
        mas.innerHTML = "+";
        fila.appendChild(mas);
   
        let menos = document.createElement("button");
        menos.innerHTML = "-";
        fila.appendChild(menos);
     
  
    var fila="<tr><td>"+ producto.id +"</td><td>"+ producto.nombre +"</td><td>"+ producto.cantidad + "</td><td>"+ fila.appendChild(mas) +"</td><td>"+ fila.appendChild(menos) +"</td><td>"+ producto.precio +"</td></tr>";
    var btn = document.createElement("tr");
    btn.innerHTML=fila;
    document.getElementById("tablita").appendChild(btn);
    })
}

function generarPDF(){
    
  
    var cant, prec, prod;

    var resume_table = document.getElementById("tabla1");

    for (var i = 0, row; row = resume_table.rows[i]; i++) {
      //alert(cell[i].innerText);
      for (var j = 0, col; col = row.cells[j]; j++) {
        //alert(col[j].innerText);
        //console.log(`Txt: ${col.innerText} \tFila: ${i} \t Celda: ${j}`);
        //ingresar datos al JSON
        if(i >=1 && j == 1){
            prod =col.innerText;
        }
        if(i>=1 && j ==2){
            cant = col.innerText;
        }
        if(i>=1 && j ==3){
            prec= col.innerText;
        }
        if(i>=1 && j==3){
            acumulado [i] = {
                producto: prod,
                cantidad: cant,
                precio: prec
            }
         
        }
      }
    }
    pdf();
} 


const pdf = async () => {

    console.log(acumulado);
    
    fetch('http://localhost:19991/pdf',{ 
        method: 'POST',  
        headers: { 
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(acumulado) 
      }) 
      .then(response =>  
      respuesta =  response.json(), 
      )
        enviarEmail();
}

const enviarEmail = async () => {

    const request = await fetch(`http://localhost:19991/enviarCorreo`, {
        method: "get"
    });
  
}
