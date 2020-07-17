/**
 * 2C = two of Clubs (treboles)
 * 2D = two of Diamonds (treboles)
 * 2H = two of Hearts (corazones)
 * 2C = two of Spades (espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0;
    puntosComputadora = 0;

//referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll("small");
const divCartaJugador = document.querySelector("#jugador-cartas");
const divCartaComputadora = document.querySelector("#computadora-cartas");

/**
 * Función que crea una nueva baraja
 */
const crearDeck = () => {
   for(let i = 2; i <= 10; i++) {
      for(let tipo of tipos) {
          deck.push(i + tipo);
      }
   }
   for(let tipo of tipos) {
      for(let esp of especiales) {
          deck.push( esp + tipo );
      }
   }
   //console.log( deck );
   deck = _.shuffle(deck);
   return deck;
}

crearDeck();

/**
 * Función para elegir carta
 */
const pedirCarta = () => {
    //la carta es de la baraja y después se quita de la baraja
    if(deck.length === 0) {
        throw  "No hay cartas en la baraja";
    } else {
        return deck.pop();
    }
}

/**
 * función evalúa el valor de la carta
 */
const valorCarta = (carta) => {
    //en js todos los string se pueden trabajar como arreglos, en este caso el 10 dá problemas
    //const valor = carta[0];
    //const valor = carta.substring(0, carta.length - 1);
    //if(isNaN(valor)) {
        //si no es un número
    //    puntos = (valor === 'A') ? 11 : 10;
    //} else {
        //es un número
    //    puntos = valor * 1; // '* 1' para pasar a número
    //}

    //Código reducido
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?  
                (valor === "A") ? 11 : 10
                : valor * 1;
}

//turno del ordenador
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `./cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartaComputadora.append(imgCarta);
        if(puntosMinimos > 21) {
            break;
        }
    } while(puntosComputadora <= puntosMinimos && puntosMinimos <= 21 );

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos) {
            alert("Nadie gana :(");
        } else if (puntosMinimos > 21) {
            alert("Computadora gana");
        } else if (puntosComputadora > 21) {
            alert ("Jugador gana");
        } else {
            alert ("Computadora gana");
        }
    }, 10);
}

/**
 * EVENTOS
 */
//callback, función que se envía como argumento de otra
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `./cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartaJugador.append(imgCarta);

    if(puntosJugador > 21 ) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    puntosComputadora = 0;
    puntosJugador = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartaJugador.innerHTML = '';
    divCartaComputadora.innerHTML = '';

    console.clear();
});
