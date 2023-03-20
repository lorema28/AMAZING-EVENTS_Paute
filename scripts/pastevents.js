const container=document.getElementById("container")

fetch('https://mindhub-xj03.onrender.com/api/amazing')
.then(response =>response.json())
.then(datos =>{
  console.log(datos)
  cardsPastevents = datos.events.filter(events => events.date< datos.currentDate)
  verTarjetasUno(cardsPastevents)
})
.catch(error=>{
  console.log(error);
  })


function verTarjetasUno(cardsPastevents){


  if (cardsPastevents.length==0){
    container.innerHTML=
    `
    <div class="container text-center">
  <div class="row">
    <div class="col">
    </div>
    <div class="col">
    <div>
    <img src="./assets/img/no-results.png" alt="no no-results" class="image" style=" width: 100px; height: 100px; color: aliceblue;">
  </div>
    <p class= fw-bolder style= "color: aliceblue; text-decoration: none; align-items: center;"> No Found<p>
    </div>
    <div class="col">
     
    </div>
  </div>
</div>`
  return
  }

  let tarjetas=""
  cardsPastevents.forEach(elemento =>{
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
      <a href="./details.html?_id=${elemento._id}" class="btn btn-light" style="background-color: yellow; border-color: transparent;" >Details</a>
    </div>
    </div> 
    </div>
    </div>`
    

  })

  container.innerHTML=tarjetas

}


const mostraCheckbox = document.getElementById("checks_boxs")
const mostraSearch = document.getElementById("id_search")
console.log(mostraSearch)
const input = document.querySelector('input')



//aqui se cruzan los datos cuando selecciono check y search 
input.addEventListener("input",()=>{
 /*let arrayFiltrado = filtrarPorTexto(events,input.value)
 mostrarTarjetas(arrayFiltrado)*/
let filtroUno = filtrarPorTexto(cardsPastevents,input.value)
let filtroDos = filtrarPorCategorias(filtroUno)
verTarjetasUno(filtroDos)

})

//
mostraCheckbox.addEventListener("change",()=>{
 /* let arrayFiltrado = filtrarPorCategorias(events)
  mostrarTarjetas(arrayFiltrado)*/
  let filtroUno = filtrarPorTexto(cardsPastevents,input.value)
  let filtroDos = filtrarPorCategorias(filtroUno)
  verTarjetasUno(filtroDos)

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

// esta funcion me sirve para que funcione el search ...lo coloco dentro de input.addEventListener como q si fuera console.log
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

/*
const events= data.events
const currentDate=data.currentDate

const cardsPastevents = data.events.filter(data => data.date<currentDate)


const cardsNews = cardsPastevents.map(events=>{
  let aux = {}
  aux.image=events.image
  aux.name=events.name
  aux.description=events.description
  aux.price=events.price
  aux.id=events._id
  return aux
  })
  
  const cardsCategorys= cardsNews.reduce((acc,act)=>{
    return acc +`<div class="card" style="width: 18rem; background-color:transparent; border-color: transparent;" id="container">
    <img src=" ${act.image}" class="card-img-top" alt="marathon">
    <div class="card-body">
    <h5 class="card-title" style="text-align: center; color: yellow;">${act.name}</h5>
      <h5 class="card-title" style="text-align: center; color: yellow;"> </h5>
      <p class="card-text" style="text-align:justify; color: aliceblue;">${act.description} </p>
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
    
    }," ")
    
    const container=document.getElementById("container")
    container.innerHTML=cardsCategorys*/