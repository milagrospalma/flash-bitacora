// Cormprobando que el navegador es compatible con el API
// if (window.File && window.FileReader && window.FileList && window.Blob) {
//   console.log('Great success! All the File APIs are supported.');
// } else {
//   alert('The File APIs are not fully supported in this browser.');
// }

// //
// function handleFileSelect(evt) {
//   var files = evt.target.files; // FileList object

//   // files is a FileList of File objects. List some properties.
//   var output = [];
//   for (var i = 0, f; f = files[i]; i++) {
//     // output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//     //   f.size, ' bytes, last modified: ',
//     //   f.lastModifiedDate.toLocaleDateString(), '</li>');
//   }
//   document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
// }

// document.getElementById('files').addEventListener('change', handleFileSelect, false);

$(document).ready(function () {
  var $container= $('#container');
  var $submit = $('#submit');
  $('.modal').modal();
  
  // Personalizando la estructura del modal
  
  $('#message').on('click', function() {
    $('.title').text('Título del mensaje');
    $('.content').text('Escribe tu mensaje');
  });

  $('#photo').on('click', function() {
    $('.title').text('Título de la foto');
    $('#texts').addClass('hide');
    $('#files').removeClass('hide');
  });

  $('#date').on('click', function () {
    $('.title').text('Título del evento');
    // $('#texts').attr('type', 'date');
    $('.content').text('¿En qué fecha es el evento?');
  });

  $('#music').on('click', function () {
    $('.title').text('Título del vídeo o audio');
    $('#texts').addClass('hide');
    $('#files').removeClass('hide');
  });

  $submit.on('click', function() {
    var template =
      '<div class="row"><div class="col s12 m8 offset-m2"><div class="card horizontal"><div class="card-stacked"><div class="card-action"><h5>'+ title +'</h5><p>'+ content +'</p></div></div></div></div></div >';
      $container.append(template);
  });

});