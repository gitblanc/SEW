class CalculadoraBasica{
    //constructor
    constructor() {
        this.memory = "";
    }
    //función que imprime los dígitos
    digitos(x) {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += Number(x);
    }
    //función que imprime el punto de los decimales
    punto() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += ".";

    }
    //función suma
    suma() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "+";
    }
    //función resta
    resta() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "-";
    }
    //función multiplicación
    multiplicacion() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "*";
    }
    //función división
    division() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "/";
    }
    //función mrc
    mrc() {
        this.memory = document.querySelector('input[type=text][name=\"pantalla\"]').value;
    }
    //función mMenos
    mMenos() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value = document.querySelector('input[type=text][name=\"pantalla\"]').value +  "-" + this.memory;
    }
    //función mMas
    mMas() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value = document.querySelector('input[type=text][name=\"pantalla\"]').value +  "+" + this.memory;
    }
    //función de borrado
    borrar() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
    }
    //función igual que evalúa un resultado
    igual() {
        try {
            var res = document.querySelector('input[type=text][name=\"pantalla\"]').value;
            document.querySelector('input[type=text][name=\"pantalla\"]').value = eval(res);
        } catch (err) {
            document.querySelector('input[type=text][name=\"pantalla\"]').value = "Not valid";
        }
    }
    //función mod
    mod(){
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "%";
    }
    //función raíz cuadrada
    sqrt(){
        document.querySelector('input[type=text][name=\"pantalla\"]').value = Math.sqrt(new Number(document.querySelector('input[type=text][name=\"pantalla\"]').value));
    }
    //función +/-
    masmenos(){
        document.querySelector('input[type=text][name=\"pantalla\"]').value = - document.querySelector('input[type=text][name=\"pantalla\"]').value;
    }
}
//creamos la calculadora
calculadora = new CalculadoraBasica();
//Añadimos los eventos por teclado
document.addEventListener('keydown', function (event) {
    if (event.key === '+') {//tecla +
      calculadora.suma();
    }
    if (event.key === '-') {//tecla -
      calculadora.resta();
    }
    if (event.key === '/') {//tecla /
        calculadora.division();
    }
    if(event.key === '%'){//tecla %
        calculadora.mod();
    }
    if (event.key === '*') {//tecla *
        calculadora.multiplicacion();
    }
    if(event.key >= '0' && event.key <= '9'){//teclas de números

        calculadora.digitos(Number(event.key));
    }
    if(event.key === 'Enter'){//tecla enter
        event.preventDefault();
        calculadora.igual();
    }
    if(event.key === 'Delete'){//tecla delete
        event.preventDefault();
        calculadora.borrar();
    }
  });