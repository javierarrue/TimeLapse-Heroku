/*======================================
	JS Franklin - Cursos (Prueba 1)
========================================*/

// imágenes del modal para paso 1
const img1 = document.getElementById('p1_i1');
const img2 = document.getElementById('p1_i2');
// Respuesta en el modal para errores
const res1 = document.getElementById('p1_res');

img1.addEventListener('click',()=>{
    res1.innerHTML = 'Incorrecto, esta opción es para enviar un documento que esté en tu celular/laptop.';
    res1.classList.add('text-danger');
});

img2.addEventListener('click',()=>{
    res1.innerHTML = 'Incorrecto, esta opción es para enviar un contacto que esté registrado en tu celular.';
    res1.classList.add('text-danger');
});



// imagenes del modal para paso 2
const img4 = document.getElementById('p2_i1');
const img6 = document.getElementById('p2_i3');
// Respuesta en el modal para errores
const res2 = document.getElementById('p2_res');

img4.addEventListener('click',()=>{
    res2.innerHTML = 'Incorrecto, esta opción es para buscar archivos/contactos/etc con filtros.';
    res2.classList.add('text-danger');
});

img6.addEventListener('click',()=>{
    res2.innerHTML = 'Incorrecto, esta opción es para tomar una foto.';
    res2.classList.add('text-danger');
});



// imagenes del modal para paso 3
const img7 = document.getElementById('p3_i1');
const img8 = document.getElementById('p3_i2');
// Respuesta en el modal para errores
const res3 = document.getElementById('p3_res');

img7.addEventListener('click',()=>{
    res3.innerHTML = 'Incorrecto, esta opción es para enviar un documento que esté en tu celular/laptop.';
    res3.classList.add('text-danger');
});

img8.addEventListener('click',()=>{
    res3.innerHTML = 'Incorrecto, esta opción es para enviar una ubicación a través de google maps.';
    res3.classList.add('text-danger');
});