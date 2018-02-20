$(document).ready(function () {
  $('.modal').modal();
  var $container= $('#container');
  var $submit = $('#submit');
  var title, content, url, image;

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

  $('#date').on('click', function () {
    $('.title').text('Título del evento');
    $('#texts').attr('type', 'date');
    // TO DO: traer la fecha actual
    $('#texts').attr('min', '2018-02-20');
    // $('.content').text('¿En qué fecha es el evento?');
    $submit.removeClass('red');
    $submit.removeClass('blue');
    $submit.removeClass('green');
    $submit.addClass('yellow darken-1');
  });

  $('#music').on('click', function () {
    $('.title').text('Título del vídeo o audio');
    $('#texts').addClass('hide');
    $('#files').removeClass('hide');
    $submit.removeClass('blue');
    $submit.removeClass('green');
    $submit.removeClass('yellow darken-1');
    $submit.addClass('red');
  });

  $('#title').on('input', function() {
    title = $(this).val();
  });

  $('#texts').on('input', function() {
    content = $(this).val();
  });

  $('')
  
  // Evento botón Publicar
  $submit.on('click', function() {
    var template;
    if ($submit.hasClass('yellow')) {
      initMap();  
      template =
        '<div class="row"><div class="col s12 m8 offset-m2"><div class="card horizontal"><div class="card-stacked"><div class="card-action"><h5>' + title + '</h5><p>' + content + '</p><div id="map"></div></div></div></div></div></div >';
    } else if ($submit.hasClass('green')) {
      // TO DO: capturar ruta de imagen
      handleFileSelect();
      template =
      '<div class="row"><div class="col s12 m8 offset-m2"><div class="card horizontal"><div class="card-stacked"><div class="card-action"><h5>' + title + '</h5><p>' + content + '</p></div></div></div></div></div >';
      $('#image').attr('src', url);
      
    } else if ($submit.hasClass('red')) {
      // TO DO: capturar dirección del video
      template =
        '<div class="row"><div class="col s12 m8 offset-m2"><div class="card horizontal"><div class="card-stacked"><div class="card-action"><h5>' + title + '</h5><video src="" controls>Tu navegador no implementa el elemento <code>video</code></video></div></div></div></div></div>';
      // TO DO: capturar dirección del audio
        template =
        '<div class="row"><div class="col s12 m8 offset-m2"><div class="card horizontal"><div class="card-stacked"><div class="card-action"><h5>' + title + '</h5><audio src=""><p> Tu navegador no implementa el elemento audio.</p></audio></div></div></div></div></div>';
      } else {
      template =
        '<div class="row"><div class="col s12 m8 offset-m2"><div class="card horizontal"><div class="card-stacked"><div class="card-action"><h5>' + title + '</h5><p>' + content + '</p></div></div></div></div></div >';
    }

    $container.append(template);
    console.log($('#image'));
    $('#title').val('');
    $('#texts').val('');
  });

  // Google Maps API
  function initMap() {
    var center = {
      lat: -34.397,
      lng: 150.644
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 20
    });

    var marker = new google.maps.Marker({
      map: map,
      position: center
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
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

  // Multimedia
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          var span = document.createElement('span');
          url = e.target.result;
          console.log(url);
          span.innerHTML = ['<img class="thumb" src="', url,
            '" title="', escape(theFile.name), '"/>'].join('');
          $('#list').append(span);
        };
      })(f);
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
  $('#files').on('change', handleFileSelect);
});