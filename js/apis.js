var mapa;// Mapa que vamos a modificar

/* Se crea el objeto posicionCentral con las coordenas de Lozada(Donde vivo :D) */
var posicionCentral = { lat: -31.6488205, lng: -64.08860779999999 };
//Se setea un zoom alto, el pueblo es chico
var zoom = 15;

// Inicializa el mapa con un valor de zoom y una locación en el medio
function inicializarMapa() {
  //Se crea el objeto mapa con su posicion central
  mapa = new google.maps.Map(document.getElementById("map"), {
    center: posicionCentral,
    zoom: zoom,
  });

  geocodificadorModulo.inicializar()
  marcadorModulo.inicializar()
  direccionesModulo.inicializar()
  lugaresModulo.inicializar()
  streetViewModulo.inicializar()
}
