streetViewModulo = (function () {
  let panorama // 'Visor' de StreetView

  function inicializar() {
    /* La función inicializar() crea un panorama
    en una posición y lo muestra en la página. */
    // panorama = new google.maps.StreetViewPanorama(
    //   document.getElementById('pano'), {
    //   position: mapa.getCenter(),
    // });

    //Correccion de acamica hasta linea 31.
    if (marcadorModulo.existeMiMarcador()) {
      miPosicion = marcadorModulo.damePosicion();
    } else {
      miPosicion = marcadorModulo.posicionCentral;
    }

    panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"), {
      position: miPosicion,
      pov: {
        heading: 34,
        pitch: 10
      },
    });
    mapa.setStreetView(panorama);

    panorama.addListener("position_changed", function () {
      mapa.setCenter(panorama.getPosition())
    });
  }

  // Actualiza la ubicación del Panorama
  function fijarStreetView(ubicacion) {

    mapa.setStreetView(panorama);
    panorama.setPosition(ubicacion);
    panorama.setPov({
      heading: 10,
      pitch: -5
    });
  }

  return {
    inicializar,
    fijarStreetView
  }

})()
