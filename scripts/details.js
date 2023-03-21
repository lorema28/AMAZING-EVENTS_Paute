 /// llamando a la api  y el archivo json con async await

const container = document.getElementById( 'detailmain' )
const querySearch = document.location.search
const id = new URLSearchParams(querySearch).get("_id")

const retornarDatos = async () => {
  try{
  const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    const data = await response.json();
    return data;
  }
  
  catch (error) {
    if(error){
      let response = await fetch("./json/amazing.json");
      return await response.json();
    }
  }
} ;

const cardsDetails= async()  => {
  try {
      const data = await retornarDatos();
      let eventsCards = data.events.find(eventsCards=> eventsCards._id==id)
      let contenido=`
      <div class="container mb-3" style=" background-color:rgba(2, 2, 2, 0.529);box-shadow:rgba(255, 255, 0, 0.429) 15px 15px; style="width: 18rem;"> 
      <div class="row g-3" style="align-items: center; justify-content: center; ">
        <div class="col-sm-6 text-center"  style="align-items: center;">
          <img src="${eventsCards.image}" class="img-fluid" alt="image" >
        </div>
        <div class="col-sm-6 " style="align-items: center; justify-content: center; ">
        <div class= "container p-3 justify-content: center;">
        <h5 class="card-title" style= "color: yellow; text-align:center; font-weight: bold;" >${eventsCards.name}</h5>  
        </div>
        <div class="card-body" style=text-align: center; ">
            <p class="card-text" style="color: antiquewhite;text-align: justify; font-size: 0.5 px "> ${eventsCards.description}</p> 
            <p class="card-text" style="color: antiquewhite;text-align: justify;"> <i class="fa-solid fa-calendar" style="antiquewhite"></i>  Date:  ${eventsCards.date}</p>
            <p class="card-text" style="color: antiquewhite;text-align: justify;"> <i class="fa-solid fa-location-dot" style="antiquewhite"></i>  Place:  ${eventsCards.place}</p>
            <p class="card-text" style="color: antiquewhite; text-align: justify;"> <i class="fa-solid fa-dollar-sign"></i> Price: $${eventsCards.price}</p>
          </div>
        </div>
      </div>
      </div>`
    container.innerHTML=contenido
  
  } catch (error) {
      console.log(error);
      
  }
}

cardsDetails();

//// código anterior
/*
const events= data.events
const currentDate=data.currentDate

const cardsDetails = events.map(events=>{
let aux = {}
aux.image=events.image
aux.name=events.name
aux.date=events.date
aux.description=events.description
aux.place=events.place
aux.price=events.price
aux._id=events._id
return aux
})

console.log(cardsDetails)


const querySearch = document.location.search

const id = new URLSearchParams(querySearch).get("_id") 


const eventsCards = cardsDetails.find(eventsCards => eventsCards._id == id)
console.log(eventsCards)


const contenedorCards= document.getElementById("detailmain")

contenedorCards.innerHTML=`  
<div class="container mb-3" style=" background-color:rgba(2, 2, 2, 0.529);box-shadow:rgba(255, 255, 0, 0.429) 15px 15px; style="width: 18rem;"> 
<div class="row g-3" style="align-items: center; justify-content: center; ">
  <div class="col-sm-6 text-center"  style="align-items: center;">
    <img src="${eventsCards.image}" class="img-fluid" alt="image" >
  </div>
  <div class="col-sm-6 " style="align-items: center; justify-content: center; ">
  <div class= "container p-3 justify-content: center;">
  <h5 class="card-title" style= "color: yellow; text-align:center; font-weight: bold;" >${eventsCards.name}</h5>  
  </div>
  <div class="card-body" style=text-align: center; ">
      <p class="card-text" style="color: antiquewhite;text-align: justify; font-size: 0.5 px ">${eventsCards.description}</p> 
      <p class="card-text" style="color: antiquewhite;text-align: justify;"><i class="fa-solid fa-calendar" style="antiquewhite"></i> Date: ${eventsCards.date}</p>
      <p class="card-text" style="color: antiquewhite;text-align: justify;"><i class="fa-solid fa-location-dot" style="antiquewhite"></i> Place: ${eventsCards.place}</p>
      <p class="card-text" style="color: antiquewhite; text-align: justify;"><i class="fa-solid fa-dollar-sign"></i> Price: $${eventsCards.price}</p>
    </div>
  </div>
</div>
</div>`*/

    