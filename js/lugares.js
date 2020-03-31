lugaresModulo = (function () {
  let servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

  // Completa las direcciones ingresadas por el usuario a y establece los límites
  // con un círculo cuyo radio es de 20000 metros.
  function autocompletar() {
    //Se seleccionan los 4 inputs de tipo "textbox"
    var inputs = document.querySelectorAll('input[type="textbox"]');
    //Se agrega circulo de radio 20000 y se oculta
    var circle = new google.maps.Circle({
      center: posicionCentral,
      radius: 20000,
      visible: false,
    });
    //Se Autocompleta para todos los inputs
    inputs.forEach(input => {
      autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.setBounds(circle.getBounds());
    });

  }

  // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar() {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }


  // Busca lugares con el tipo especificado en el campo de TipoDeLugar
  function buscarCerca(posicion) {
    //Se almacena en la variable radio y tipoDeLugar EL valor obtenido de su id 
    let radio = parseInt(document.getElementById("radio").value);
    let tipoDeLugar = document.getElementById("tipoDeLugar").value;

    let request = {
      location: posicion,
      radius: radio,
      type: tipoDeLugar
    };
    
    servicioLugares.nearbySearch(request, marcadorModulo.marcarLugares);

  }

  return {
    inicializar,
    buscarCerca
  }
})()
