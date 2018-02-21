$(document).ready(function() {
  $('.modal').modal();
  var $container = $('#container');
  var $submit = $('#submit');
  var title, content;

  // Personalizando la estructura y estilos del modal
  
  $('#message').on('click', function() {
    $('.title').text('Título del mensaje');
    $('.content').text('Escribe tu mensaje');
    $submit.removeClass('yellow darken-1');
    $submit.removeClass('red');
    $submit.removeClass('green');
    $submit.addClass('blue');
  });

  $('#photo').on('click', function() {
    $('.title').text('Título de la foto');
    $('#texts').addClass('hide');
    $('#files').removeClass('hide');
    $submit.removeClass('yellow darken-1');
    $submit.removeClass('red');
    $submit.removeClass('blue');
    $submit.addClass('green');
  });

  $('#date').on('click', function() {
    $('.title').text('Título del evento');
    $('#texts').attr('type', 'date');
    $('#texts').attr('min', '2018-02-20');
    // $('.content').text('¿En qué fecha es el evento?');
    $submit.removeClass('red');
    $submit.removeClass('blue');
    $submit.removeClass('green');
    $submit.addClass('yellow darken-1');
  });

  $('#music').on('click', function() {
    $('.title').text('Título del vídeo o audio');
    $('#texts').addClass('hide');
    $('#files').removeClass('hide');
    $submit.removeClass('blue');
    $submit.removeClass('green');
    $submit.removeClass('yellow darken-1');
    $submit.addClass('red');
  });

  // Eventos para los capturar valores de los inputs

  $('#title').on('input', function() {
    title = $(this).val();
  });

  $('#texts').on('input', function() {
    content = $(this).val();
  });

  $('#files').change(function(result) {
    var file = result.target.files[0],
      imageType = /image.*/,
      audioType = /audio.*/,
      videoType = /video.*/,
      type;
    if (file.type.match(imageType)) {
      render(file);
    } else if (file.type.match(audioType)) {
      type = 'audio';
      multimedia(file, type);
    } else if (file.type.match(videoType)) {
      type = 'video';
      multimedia(file, type);
    }
  });
  
  // Evento botón Publicar
  $submit.on('click', function() {
    var template;
    if ($submit.hasClass('yellow')) { 
      template = `
        <div class="row">
          <div class="col s12 m8 offset-m2">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-action">
                  <h5>${title}</h5>
                  <p>${content}</p>
                  <div id="map"></div>
                </div>
              </div>
            </div>
          </div>
        </div >`;
    } else if ($submit.hasClass('green')) {
      template = `
        <div class="row">
          <div class="col s12 m8 offset-m2">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-action">
                  <h5>${title}</h5>
                  <img src="${localStorage.url}" class="responsive-img">
                </div>
              </div>
            </div>
          </div>
        </div >`;
    } else if ($submit.hasClass('red')) {
      if (localStorage.type === 'audio') {
        template = `
            <div class="row">
              <div class="col s12 m8 offset-m2">
                <div class="card horizontal">
                  <div class="card-stacked">
                    <div class="card-action">
                      <h5>${title}</h5>
                      <audio src="${localStorage.url}" controls></audio>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
      } else if (localStorage.type === 'video') {
        template = `
            <div class="row">
              <div class="col s12 m8 offset-m2">
                <div class="card horizontal">
                  <div class="card-stacked">
                    <div class="card-action">
                      <h5>${title}</h5>
                      <video src="${localStorage.url}" controls></video>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
      }
    } else {
      template = `
        <div class="row">
          <div class="col s12 m8 offset-m2">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-action">
                  <h5>${title}</h5>
                  <p>${content}</p>
                </div>
              </div>
            </div>
          </div>
        </div >`;
    }
    $container.prepend(template);
    // Invoca la función para mostrar el mapa con la ubicación
    // initMap(); // -> reubicarlo
    $('#title').val('');
    $('#texts').val('');
    $('#files').val('');
  });

  // Imagen
  function render(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var result = e.target.result;
      localStorage.url = result;
    };
    reader.readAsDataURL(file);
  };

  // Google Maps API
  function initMap() {
    var center = {
      lat: -34.397,
      lng: 150.644
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 15
    });

    var marker = new google.maps.Marker({
      map: map,
      position: center
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        marker.setPosition(pos);
        map.setCenter(pos);
      });
    } else {
      console.log('error');
    }
  }

  // Audio y video
  function multimedia(file, type) {
    url = URL.createObjectURL(file);
    localStorage.url = url;
    localStorage.type = type;
  }
});