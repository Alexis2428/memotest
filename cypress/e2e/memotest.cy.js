const URL = '192.168.100.18:8080';
const CANTIDAD_CUADROS = 20;

context('Memotest', () => {
  it('Se asegura que el botón comenzar funcione', () => {
    accederMemotest();

    cy.get('#tablero').should('be.visible');
  })

  describe('Comprueba el Memotest', () => {
    it('Se asegura que el tablero tenga cuadros', () => {
      accederMemotest();
      
      cy.get('.cuadro').should('have.length', CANTIDAD_CUADROS);
    })

    it('Se asegura que los cuadros sean aleatorios', () => {
      accederMemotest();

      cy.get('.cuadro').then(cuadros => {
        let coloresCuadros = [];
        cuadros.each(function(indice, cuadro) {
          coloresCuadros.push(cuadro.className);
        })

        accederMemotest();

        let coloresNuevos = [];
        cy.get('.cuadro').then(nuevosCuadros => {
          nuevosCuadros.each(function(indice, cuadro) {
            coloresNuevos.push(cuadro.className);
          })
        })
        cy.wrap(coloresCuadros).should('not.deep.equal', coloresNuevos);
      })
    })
  })

  describe('Juega al Memotest', () => {
    it('Elige una combinación erronea', () => {
      let mapaDePares, listaDePares;

      accederMemotest();
      cy.get('.cuadro').then(cuadros => {
        mapaDePares = obtenerParesDeCuadros(cuadros);
        listaDePares = Object.values(mapaDePares);

        cy.get(listaDePares[0][0]).click();
        cy.get(listaDePares[1][0]).click();
      })

      cy.get('.cuadro').should('have.length', CANTIDAD_CUADROS);
    })

    it('Resuelve el juego', () => {
      const COMPLETO = 0;

      accederMemotest();
      completarJuego();

      cy.get('.cuadro').should('have.length', COMPLETO);
      cy.get('#tablero').should('not.be.visible');

      const cantidadTurnos = CANTIDAD_CUADROS / 2;
      cy.get('#texto-fin-juego').should('be.visible').contains(`Finalizaste en ${cantidadTurnos} turnos`);
    })
  })

  describe('Reinicia el juego', () => {
    it('Se asegura que al reiniciar el tablero tenga cuadros', () => {
      accederMemotest();
      completarJuego();
  
      cy.get('#reiniciar').click();
      cy.get('#comenzar').click();

      cy.get('.cuadro').should('have.length', CANTIDAD_CUADROS);
    })
  })
})

function accederMemotest() {
  cy.visit(URL);
  cy.get('#comenzar').click();
}

function obtenerParesDeCuadros(cuadros) {
  let pares = {};

  cuadros.each((indice, cuadro) => {
    const color = cuadro.className.replace('h-100 cuadro ', '');

    if (pares[color]) {
      pares[color].push(cuadro);
    } else {
      pares[color] = [cuadro];
    }
  })

  return pares;
}

function completarJuego() {
  let mapaDePares, listaDePares;
  
  cy.get('.cuadro').then(cuadros => {
    mapaDePares = obtenerParesDeCuadros(cuadros);
    listaDePares = Object.values(mapaDePares).forEach(par => {
      cy.get(par[0]).click();
      cy.get(par[1]).click();
    })
  })
}
