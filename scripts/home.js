
const contenedorElementos=document.getElementById("container")

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


/*const events=data.events
const currentDate=data.currentDate

mostrarTarjetas(events, cardElement)



function mostrarTarjetas(arrayDatos, contenedor) {

  let tarjetas = " "

for (data of arrayDatos) {

  tarjetas+= 
}
contenedor.innerHTML=tarjetas
}*/