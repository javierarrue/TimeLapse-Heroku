

 //SCRIPT PARA PREVISUALIZAR EL LOGO SELECCIONADO EN AGREGAR CURSO     
        $("#logo").change(function () {
            // Código a ejecutar cuando se detecta un cambio de archivO
            readImage(this);
          });
  
          function readImage (input) {
            if (input.files && input.files[0]) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  $('#preview').attr('src', e.target.result); // Renderizamos la imagen
              }
              reader.readAsDataURL(input.files[0]);
            }
          }


//SCRIPT PARA PREVISUALIZAR EL LOGO SELECCIONADO EN EDITAR CURSO   
        $("#logoEditar").change(function () {
            // Código a ejecutar cuando se detecta un cambio de archivO
            readImageEdit(this);
        });

        function readImageEdit (input) {
            if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewEdit').attr('src', e.target.result); // Renderizamos la imagen
            }
            reader.readAsDataURL(input.files[0]);
            }
        }


//SCRIPT PARA PREVISUALIZAR LA FOTO SELECIONADA DEL USUARIO AL EDITAR PERFIL 
        $("#photo").change(function () {
          // Código a ejecutar cuando se detecta un cambio de archivO
          readImageEditProfile(this);
        });

        function readImageEditProfile (input) {
          if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
              $('#fotoPerfil').attr('src', e.target.result); // Renderizamos la imagen
          }
          reader.readAsDataURL(input.files[0]);
          }
        }
