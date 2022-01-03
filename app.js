

const mapBoxToken="pk.eyJ1IjoibmtuaXR0aW4iLCJhIjoiY2t4eWtyYXJkMjFyZDJub3ozamV5YXgyaSJ9.j201f1JeFB5rOndcxpd8Mg";

mapboxgl.accessToken = mapBoxToken;
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom:1.5,
    center:[0,0]
    });

 const getColorFromInfeCount=count =>{
     if(count > 10000){
         return "red";
     }
     if(count > 5000){
         return "orange";
     }
     if(count > 1000){
         return "yellow";
     }

      if(count > 10){
          return "blue";
      }
      else{
          return "green";
      }
 }

fetch(
  "/get-latest.json"
)
  .then((response) => response.json())
  .then((data) => {
    const places=data.places;

places.forEach(place => {
    const {infected,name}=place;
   new mapboxgl.Marker({
        draggable: true,
        color:getColorFromInfeCount(infected)
        })
        .setLngLat([place.longitude,place.latitude])
        .addTo(map);

});


  });
