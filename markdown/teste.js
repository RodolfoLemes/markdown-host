const caneta = {
  quebrado: false,
  cor: "azul",
  parametros: {
    comprimento: 15,
    largura: 1
  },
  escrever: (x, y) => console.log('Escrevi em ' + x + ',' + y),
  borar: function() {
    return console.log('borar')
  },
  quebrar: () => {
    this.quebrado = true
  }
}