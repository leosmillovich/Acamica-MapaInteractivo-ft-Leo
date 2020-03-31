direccionesModulo = (function () {
  var servicioDirecciones // Servicio que calcula las direcciones
  var mostradorDirecciones // Servicio muestra las direcciones

  // Calcula las rutas cuando se cambian los lugares de desde, hasta o algun punto intermedio
  function calcularRutasConClic() {
    document.getElementById('comoIr').addEventListener('change', function () {
      direccionesModulo.calcularYMostrarRutas()
    })

    document.getElementById('calcularMuchos').addEventListener('click', function () {
      direccionesModulo.calcularYMostrarRutas()
    })

    var listasLugares = document.getElementsByClassName('lugares')
    for (var j = 0; j < listasLugares.length; j++) {
      listasLugares[j].addEventListener('change', function () {
        if (document.getElementById('desde').value != '' && document.getElementById('desde').value != '') {
          direccionesModulo.calcularYMostrarRutas()
        }
      })
    }
  }

  // Agrega la dirección en las lista de Lugares Intermedios en caso de que no estén
  function agregarDireccionEnLista(direccion, coord) {
    var lugaresIntermedios = document.getElementById('puntosIntermedios')

    var haceFaltaAgregar = true
    for (i = 0; i < lugaresIntermedios.length; ++i) {
      if (lugaresIntermedios.options[i].text.replace(/\r?\n|\r/g, ' ') === direccion.replace(/\r?\n|\r/g, ' ')) {
        haceFaltaAgregar = false
      }
    }
    if (haceFaltaAgregar) {
      var opt = document.createElement('option')
      opt.value = coord
      opt.innerHTML = direccion
      lugaresIntermedios.appendChild(opt)
    }
  }

  // Agrega la dirección en las listas de puntos intermedios y lo muestra con el street view
  function agregarDireccionYMostrarEnMapa(direccion, ubicacion) {
    that = this
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    agregarDireccionEnLista(direccion, ubicacionTexto)
    mapa.setCenter(ubicacion)
    streetViewModulo.fijarStreetView(ubicacion)
    marcadorModulo.mostrarMiMarcador(ubicacion)
  }

  function agregarDireccion(direccion, ubicacion) {
    that = this
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    agregarDireccionEnLista(direccion, ubicacionTexto)
    mapa.setCenter(ubicacion)
  }

  // Inicializo las variables que muestra el panel y el que calcula las rutas//
  function inicializar() {
    calcularRutasConClic()
    // Agrega la direccion cuando se presioná enter en el campo agregar
    $('#agregar').keypress(function (e) {
      if (e.keyCode == 13) {
        var direccion = document.getElementById('agregar').value
        geocodificadorModulo.usaDireccion(direccion, direccionesModulo.agregarDireccion)
      }
    })
    // Calcula las rutas cuando se presioná enter en el campo desde y hay un valor disitnto a vacío en 'hasta'
    $('#desde').keypress(function (e) {
      if (e.keyCode == 13 && document.getElementById('hasta').value != '') {
        direccionesModulo.calcularYMostrarRutas()
      }
    })

    // Calcula las rutas cuando se presioná enter en el campo hasta y hay un valor disitnto a vacío en 'desde'
    $('#hasta').keypress(function (e) {
      if (e.keyCode == 13 && document.getElementById('desde').value != '') {
        direccionesModulo.calcularYMostrarRutas()
      }
    })
    servicioDirecciones = new google.maps.DirectionsService()
    mostradorDirecciones = new google.maps.DirectionsRenderer({
      draggable: true,
      map: mapa,
      panel: document.getElementById('directions-panel-summary'),
      suppressMarkers: true
    })

  }

  // Calcula la ruta entre los puntos Desde y Hasta con los puntosIntermedios
  // dependiendo de la formaDeIr que puede ser Caminando, Auto o Bus/Subterraneo/Tren
  function calcularYMostrarRutas() {
    /* Se almacenan los inputs de entrada */
    let desde = document.getElementById("desde").value;
    let hasta = document.getElementById("hasta").value;
    let travelMode = document.getElementById("comoIr").value;
    let puntoIntermedio = document.getElementById("agregar").value;

    marcadorModulo.agregarMarcadorRuta(desde);
    marcadorModulo.agregarMarcadorRuta(hasta);

    //Se filtra el caso de travel mode segun input
    switch (travelMode) {
      case "Caminando":
        travelMode = google.maps.TravelMode.WALKING;
        break;
      case "Bus":
        travelMode = google.maps.TravelMode.TRANSIT;
        break
      case "Bicicleta":
        travelMode = google.maps.TravelMode.BICYCLING;
        break
      default:
        travelMode = google.maps.TravelMode.DRIVING;
        break;
    };

    //(Esto lo tuve que sacar de google) Pushea puntos intermedios a medida que se agregan
    var waypoints = [];
    var checkboxArray = document.getElementById('puntosIntermedios');
    for (var i = 0; i < checkboxArray.length; i++) {
      if (checkboxArray.options[i].selected) {
        waypoints.push({
          location: checkboxArray[i].value,
          stopover: true
        });
      }
    }

    //objeto de la solicitud de indicaciones
    let directionRequest = {
      origin: desde,
      destination: hasta,
      travelMode: travelMode,
      waypoints: waypoints
    };

    //Representacion de las indicaciones.
    servicioDirecciones.route(directionRequest, (DirectionsResult, DirectionsStatus) => {
      if (DirectionsStatus == 'OK') {
        mostradorDirecciones.setDirections(DirectionsResult);
        let instrucciones = document.getElementById('directions-panel');
        instrucciones.innerHTML = " ";
      }
    });

  }

  return {
    inicializar,
    agregarDireccion,
    agregarDireccionEnLista,
    agregarDireccionYMostrarEnMapa,
    calcularYMostrarRutas
  }
}())
