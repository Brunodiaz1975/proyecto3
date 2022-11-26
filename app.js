

var nombre = '';

const contenedor = document.querySelector('#contenedor');

document.addEventListener('DOMcontentLoader', info);

const cargarImagenes = async () => {
    const respuesta = await fetch(`https://dragon-ball-super-api.herokuapp.com/api/characters?offset=0?limit=20`);

    try {   

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            var personaje = '';
            for (var i = 0; i < datos.length; i++) {
                const element = datos[i];
                personaje += `
                <div class="personaje">
                <img class="imagen"  src="${datos[i].imageUrl}">
                <h3 class="titulo">${datos[i].name}</h3>
                <button class="boton" type="button" onclick="info(event)">Informacion</button>
                </div>`
            }
    
            document.getElementById('contenedor').innerHTML = personaje;
           
        }else if(respuesta.status === 401){
            console.log('Algun dato esta mal ingresado');
        }else if (respuesta.status === 404) {
            console.log('Personaje  buscado no existe');
        }else{
            console.log('Error desconocido');
        }
        
    } catch (error) {
        console.log(error);
    }
}

cargarImagenes();

async function info(event){
    
    console.log(event.path[1].childNodes[3].innerHTML);

    let buscarNombre = event.path[1].childNodes[3].innerHTML;

    const respuesta = await fetch(`https://dragon-ball-super-api.herokuapp.com/api/characters/${buscarNombre}`)

    const resultado = await respuesta.json();

    console.log(resultado);

    divNuevo = document.createElement('div');
    divNuevo.className = 'modal';
    divNuevo.innerHTML = `<img class="imagen2" height="300px" src= ${resultado.imageUrl}><p>Nombre : ${[resultado.name]}</p>
    <p>Especie : ${[resultado.specie]}</p><p>Rol : ${[resultado.role]}</p>
    </p><p>Universo : ${[resultado.universe]}</p></p><p>Transformaciones : ${[resultado.transform]}</p>
    </p><p>Planeta de origen : ${[resultado.originplanet]}</p>`
    contenedor.appendChild(divNuevo);
    setTimeout(() => {
        divNuevo.remove();
    }, 3000)

}



