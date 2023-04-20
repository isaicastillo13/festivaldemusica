document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});


function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if( sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else {
            barra.classList.remove('fijo'); 
            body.classList.add('body-scroll'); 
        }
    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach(enlace =>{
        enlace.addEventListener('click',function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i<=12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML =`
            <source srcset="build/img/grande/${i}.avif" type="Image/webp">
            <source srcset="build/img/thumb/${i}.webp" type="Image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/${i}.jpg" alt="imagen_galeria">
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }

    
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML =`
        <source srcset="build/img/grande/${id}.avif" type="Image/webp">
        <source srcset="build/img/grande/${id}.webp" type="Image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen_galeria">
    `;
    // Crear un overlay para la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //Botton para cerrra la imagen
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent='X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
    
        
    }
    overlay.appendChild(cerrarModal);

    //Añade al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

}

