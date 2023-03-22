//use la misma función solo llame la api con fetch

const container=document.getElementById("container")

let CardsEventos

 fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response =>response.json())
  .then(datos =>{
    console.log(datos)
    CardsEventos = datos.events
    mostrarTarjetas(CardsEventos)
  })

  .catch(error=>{
    if(error){
      let response = fetch("./json/amazing.json");
      return  response.json();
    }
  });

  /*.catch(error=>{
    console.log(error);
    })*/
 
    function mostrarTarjetas (CardsEventos){
      if (CardsEventos.length==0){
        container.innerHTML= `
        <div class="container text-center">
      <div class="row">
        <div class="col">
          
        </div>
        <div class="col">
        <div>
        <img src="./assets/img/no-results.png" alt="no no-results" class="image" style=" width: 100px; height: 100px; color: aliceblue;">
      </div>
        <p class=fw-bolder style= "color: aliceblue; text-decoration: none; align-items: center;"> OOPS!! No Found,
        try again.<p>
        </div>
        <div class="col">
         
        </div>
      </div>
    </div>`
    
      return
      }

      let tarjetas=""
      CardsEventos.forEach(elemento =>{
        tarjetas+= `<div class="card" style="width: 18rem; background-color:transparent; border-color: transparent;" id="container">
        <img src=" ${elemento.image}" class="card-img-top"  alt="marathon">
        <div class="card-body ">
        <h5 class="card-card title" style="text-align: center; color: yellow;">${elemento.name}</h5>
          <p class="card-text" style="text-align:justify; color: aliceblue; height: 100px; ">${elemento.description} </p>
          <div class="row d-flex">
            <div class=" col">
          <p class="card-text" style="color: aliceblue;"> Price: $${elemento.price}</p>
          </div>  
          <div class="col ">
          <a href="./details.html?_id=${elemento._id}" class="btn btn-light" style="background-color: yellow; border-color: transparent;"color:blanchedalmond; " >Details</a>
        </div>
        </div> 
        </div>
        </div>`
    
      })
    
      container.innerHTML=tarjetas
    
    }

   /* try{
const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
console.log(response)
const datos = await response.json()
console.log(datos,events);
}

catch(error){
  console.log(error);
}

  }

traerDatos()*/



////checksbox and search


const mostraCheckbox = document.getElementById("checks_boxs")
const mostraSearch = document.getElementById("id_search")
console.log(mostraSearch)
const input = document.querySelector('input')



//aqui se cruzan los datos cuando selecciono check y search 
input.addEventListener("input",()=>{
 /*let arrayFiltrado = filtrarPorTexto(events,input.value)
 mostrarTarjetas(arrayFiltrado)*/
let filtroUno = filtrarPorTexto(CardsEventos,input.value)
let filtroDos = filtrarPorCategorias(filtroUno)
mostrarTarjetas(filtroDos)

})

//
mostraCheckbox.addEventListener("change",()=>{
 /* let arrayFiltrado = filtrarPorCategorias(events)
  mostrarTarjetas(arrayFiltrado)*/
  let filtroUno = filtrarPorTexto(CardsEventos,input.value)
  let filtroDos = filtrarPorCategorias(filtroUno)
  mostrarTarjetas(filtroDos)

})


//funciones de checkboxes y del search

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response =>response.json())
  .then(datos =>{
    console.log(datos)
    CardsEventos = datos.events
    verCheckboxes(CardsEventos)
  })
  .catch(error=>{
    console.log(error);
    })

function verCheckboxes(array){
   let arrayCategorys = array.map(events=> events.category)
   console.log(arrayCategorys)
   let setCategory = new Set(arrayCategorys)
   console.log(setCategory)
let arrayChecks = Array.from(setCategory)

   let checkboxes = ""
   arrayChecks.forEach(category => {
    checkboxes += `<div class="form-check form-check-inline" >
    <input class="form-check-input" type="checkbox" name="inlineRadioOptions" id="${category}" value="${category}">
        <label class="form-check-label" style = "color: yellow;" for="${category}">${category}</label>
      </div>`

   })

   mostraCheckbox.innerHTML=checkboxes
}

// esta funcion me sirve para que funcione el search ...lo coloco dentro de input.addEventListener como que si fuera console.log
function filtrarPorTexto(arrayDatos, texto){
  let arrayFiltrado = arrayDatos.filter(elemento => elemento.name.toLowerCase().includes(texto.toLowerCase()))
  return arrayFiltrado
}


//aqui en esta funcion se filtran los checks que quiero seleccionar de los que no
function filtrarPorCategorias(array){
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
let arrayChecks = Array.from (checkboxes)
let arrayCheckeado = arrayChecks.filter(check => check.checked)
let arrayDeCategorias = arrayCheckeado.map(checkChecked => checkChecked.value)

let arrayFiltrado = array.filter(elemento => arrayDeCategorias.includes(elemento.category))

if(arrayCheckeado.length > 0) {
  return arrayFiltrado
} 

return array

}





///////////////////////////////////////////////////////////////////////////
////primera entrega con for of ///

/*const contenedorElementos=document.getElementById("container")

const events=data.events
const currentDate=data.currentDate

mostrarTarjetas(events, contenedorElementos)


function mostrarTarjetas(arrayDatos, contenedor) {
  let tarjetas=""
  for (let event of arrayDatos){
   
        tarjetas+= `<div class="card" style="width: 18rem; background-color:transparent; border-color: transparent;" id="container">
        <img src=" ${event.image}" class="card-img-top" alt="marathon">
        <div class="card-body">
        <h5 class="card-title" style="text-align: center; color: yellow;">${event.name}</h5>
          <h5 class="card-title" style="text-align: center; color: yellow;"> </h5>
          <p class="card-text" style="text-align:justify; color: aliceblue;">${event.description} </p>
          <div class="row d-flex">
            <div class=" col">
          <p class="card-text" style="color: aliceblue;"> Price: ${event.price}</p>
          </div>  
          <div class="col ">
          <a href="./details.html" class="btn btn-light" style="background-color: yellow; border-color: transparent;" >Details</a>
        </div>
        </div> 
        </div>
      </div>`

    
    
}
contenedor.innerHTML=tarjetas
}

/////metodo  reduce

/*const events= data.events
const currentDate=data.currentDate

const cardsNews = events.map(events=>{
let aux = {}
aux.image=events.image
aux.name=events.name
aux.description=events.description
aux.price=events.price
aux.id=events._id
aux.category=events.category
return aux
})

const cardsCategorys = cardsNews.reduce((acc, act) => {
  return (
    acc +
    `<div class="card" style="width: 18rem; background-color:transparent; border-color: transparent;" id="container">
<img src=" ${act.image}" class="card-img-top"  alt="marathon">
<div class="card-body">
<h5 class="card-title" style="text-align: center; color: yellow;">${act.name}</h5>
  <h5 class="card-title" style="text-align: center; color: yellow;"> </h5>
  <p class="card-text" style="text-align:justify; color: aliceblue; font-size:0.9rem">${act.description} </p>
  <div class="row d-flex">
    <div class=" col">
  <p class="card-text" style="color: aliceblue;"> Price: ${act.price}</p>
  </div>  
  <div class="col ">
  <a href="./details.html?_id=${act.id}" class="btn btn-light" style="background-color: yellow; border-color: transparent;" >Details</a>
</div>
</div> 
</div>
</div>`
  );
}, " ");


container.innerHTML=cardsCategorys*/



////////////////////////con data de js.

/*const events=data.events
const currentDate=data.currentDate*/

 //

/*mostrarTarjetas(events)

function mostrarTarjetas (arrayDatos){

  if (arrayDatos.length==0){
    container.innerHTML= `
    <div class="container text-center">
  <div class="row">
    <div class="col">
      
    </div>
    <div class="col">
    <div>
    <img src="./assets/img/no-results.png" alt="no no-results" class="image" style=" width: 100px; height: 100px; color: aliceblue;">
  </div>
    <p class=fw-bolder style= "color: aliceblue; text-decoration: none; align-items: center;"> No Found<p>
    </div>
    <div class="col">
     
    </div>
  </div>
</div>`

  return
  }

  let tarjetas=""
  arrayDatos.forEach(elemento =>{
    tarjetas+= `<div class="card" style="width: 18rem; background-color:transparent; border-color: transparent;" id="container">
    <img src=" ${elemento.image}" class="card-img-top"  alt="marathon">
    <div class="card-body">
    <h5 class="card-title" style="text-align: center; color: yellow;">${elemento.name}</h5>
      <h5 class="card-title" style="text-align: center; color: yellow;"> </h5>
      <p class="card-text" style="text-align:justify; color: aliceblue; font-size:0.9rem">${elemento.description} </p>
      <div class="row d-flex">
        <div class=" col">
      <p class="card-text" style="color: aliceblue;"> Price: $${elemento.price}</p>
      </div>  
      <div class="col ">
      <a href="./details.html?_id=${elemento._id}" class="btn btn-light" style="background-color: yellow; border-color: transparent;"color:blanchedalmond; " >Details</a>
    </div>
    </div> 
    </div>
    </div>`

  })

  container.innerHTML=tarjetas

}*/






































