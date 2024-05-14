// declaracion de variables
const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonLargo = document.querySelector('.app__card-button--largo')
const enfoque = document.querySelector('.app__card-button--enfoque')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio("./sonidos/luna-rise-part-one.mp3");
const alarma = new Audio("./sonidos/alarm-clock.mp3");
musica.loop = true;
const botonTemporizador = document.querySelector('#start-pause');
const textoInciarPausar = document.querySelector("#start-pause span")
const tiempoPantalla = document.querySelector('#timer')

let tiempoTranscurrido = 1500;
let idIntervalo = null;
inputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})
// eventos
botonCorto.addEventListener('click', ()=>{
    tiempoTranscurrido = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
})

enfoque.addEventListener('click', ()=>{
    tiempoTranscurrido = 1500;
    cambiarContexto('enfoque');
    enfoque.classList.add('active');
})

botonLargo.addEventListener('click', ()=>{
    tiempoTranscurrido = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
})


botonTemporizador.addEventListener('click', iniciarCuentaRegresiva)

// funciones
function cambiarContexto(contexto){
    mostrarTiempo();
    botones.forEach(boton=>{
        boton.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
                titulo.innerHTML = `
                Optimiza tu productividad <br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `
            break;
        case "descanso-corto":
                titulo.innerHTML = `
                ¿Que tal un respiro? <br>
                <strong class="app__title-strong">¡Haz una pausa!.</strong>
        `
            break;
        case "descanso-largo":
                titulo.innerHTML = `
                Hora de volver a la superficie <br>
                <strong class="app__title-strong">Haz una pausa larga.</strong>
        `
            break;
        default:
            break;
    }
}

function cuentaRegresiva(){
    if(tiempoTranscurrido <= 0){
        reiniciar();
        alertaTiempoCero();
        return;
    }
    textoInciarPausar.textContent = "pausar";
    tiempoTranscurrido -=1;
    mostrarTiempo();
}
function iniciarCuentaRegresiva(){
    if(idIntervalo){
        reiniciar();
        return;
    }
   idIntervalo = setInterval(cuentaRegresiva, 1000);
}
function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoInciarPausar.textContent = "Comenzar";
}
function mostrarTiempo(){
    const tiempo =new Date(tiempoTranscurrido *1000);
    const tiempoFormateado = tiempo.toLocaleString('es-MX', {minute: '2-digit', second: '2-digit'});
    tiempoPantalla.innerHTML = `${tiempoFormateado}`;

}
mostrarTiempo();
function alertaTiempoCero(){
    musica.pause();
    alarma.play();
}