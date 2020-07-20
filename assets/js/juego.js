/**
 * Patrón módulo, se mete dentro de una funcción anónima que se llama así misma, de esta forma no queda en el elemento global window
 * use strict, le pide a la máquina virtual de js que evalue de forma estrica el código
 */
const miModulo = (() => {
    'use strict'
    /**
     * 2C = two of Clubs (treboles)
     * 2D = two of Diamonds (treboles)
     * 2H = two of Hearts (corazones)
     * 2C = two of Spades (espadas)
     */

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //referencias html
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll("small"),
        divCartasJugadores = document.querySelectorAll('.divCartas');
    
    // Esta función inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        btnPedir.disabled = false;
        btnDetener.disabled = false;

        puntosHTML.forEach( elem => elem.innerHTML = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = "" );

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    /**
     * Función que crea una nueva baraja
     */
    const crearDeck = () => {
        deck = [];
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
        return _.shuffle(deck);;
    }
    
    /**
     * Función para elegir carta
     */
    const pedirCarta = () => {
        //la carta es de la baraja y después se quita de la baraja
        if(deck.length === 0) {
            throw  "No hay cartas en la baraja";
        } 
        
        return deck.pop();
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

    /**
     * turno 0 primer jugador
     * el último de la computadora
     */
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `./cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarJugador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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
        }, 100 );
    }

    //turno del ordenador
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length -1 )
            crearCarta(carta, puntosJugadores.length - 1);
        } while(( puntosComputadora <= puntosMinimos ) && ( puntosMinimos <= 21 ));
        determinarJugador();
    }

    /**
     * EVENTOS
     */
    //callback, función que se envía como argumento de otra
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(),
            puntosJugador = acumularPuntos(carta, 0);
        
        crearCarta(carta, 0);

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

        turnoComputadora(puntosJugadores[0]);
    });

    /* btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });*/

    return {
        nuevoJuego: inicializarJuego
    };

})();
