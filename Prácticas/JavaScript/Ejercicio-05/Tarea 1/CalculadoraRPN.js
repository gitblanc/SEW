class CalculadoraRPN{
    //constructor
    constructor(stack){
        this.stack = stack;
    }
    //función que muestra la pila
    mostrar(){
        if(!this.stack.vacio()){
            document.querySelector('textarea[name=\"pantalla\"]').innerHTML = this.stack.printStack(this.stack);
        }
    }
    //función digito
    digito(x){
       document.querySelector('input[type=text][name=\"currentnum\"]').value += x;
    }
    //función suma
    suma(){
        if(this.stack.size() >= 2){
            this.stack.push(this.stack.pop()+this.stack.pop());
            this.mostrar();
        }
    }
    //función resta
    resta(){
        if(this.stack.size() >= 2){
            this.stack.push(this.stack.pop()-this.stack.pop());
            this.mostrar();
        }

    }
    //función multiplicación
    multiplicacion(){
        if(this.stack.size() >= 2){
            this.stack.push(this.stack.pop()*this.stack.pop());
            this.mostrar();
        }
    }
    //función división
    division(){
        if(this.stack.size() >= 2){
            this.stack.push(this.stack.pop()/this.stack.pop());
             this.mostrar();
        }
    }
    //función seno
    sin(){
        if(this.stack.size() >= 1){
            this.stack.push(Math.sin(this.stack.pop()));
            this.mostrar();
        }
    }
    //función coseno
    cos(){
        if(this.stack.size() >= 1){
            this.stack.push(Math.cos(this.stack.pop()));
            this.mostrar();
        }

    }
    //función tangente
    tan(){
        if(this.stack.size() >= 1){
            this.stack.push(Math.tan(this.stack.pop()));
            this.mostrar();
        }
    }
    //función arc seno
    arcsin(){
        if(this.stack.size() >= 1){
            this.stack.push(Math.asin(this.stack.pop()));
            this.mostrar();
        }
    }
    //función arc tangente
    arctan(){
        if(this.stack.size() >= 1){
            this.stack.push(Math.atan(this.stack.pop()));
            this.mostrar();
        }
    }
    //función arc coseno
    arccos(){
        if(this.stack.size() >= 1){
            this.stack.push(Math.acos(this.stack.pop()));
            this.mostrar();
        }

    }
    //función que cambia de signo
    changeSign(){
        if(this.stack.size() >= 1){
            this.stack.push(this.stack.pop() * (-1));
            this.mostrar();
        }
    }
    //función enter
    enter(){
        this.stack.push(Number(document.querySelector('input[type=text][name=\"currentnum\"]').value));
       document.querySelector('input[type=text][name=\"currentnum\"]').value = "";
        this.mostrar();
    }
    //función que vacía la pila
    empty(){
        this.stack.empty();
       document.querySelector('input[type=text][name=\"currentnum\"]').value = "";
        document.querySelector('textarea[name=\"pantalla\"]').innerHTML = "";
    }
}
var stack = new Pila();//creamos la pila
calculadora = new CalculadoraRPN(stack);//creamos la calculadora

document.addEventListener('keydown', function (event) {
    if (event.key === '+') {//suma
        calculadora.suma();
    }
    if (event.key === '-') {//resta
        calculadora.resta();
    }
    if (event.key === '*') {//multiplicación
        calculadora.multiplicacion();
    }
    if (event.key === '/') {//división
        calculadora.division();
    }
    if(event.key >= '0' && event.key <= '9'){//números
        calculadora.digito(Number(event.key));
    }
    if(event.key === 'Enter'){//Enter
        event.preventDefault();
        calculadora.enter();
    }
    if(event.key === 'Delete'){//Borrar todo
        event.preventDefault();
        calculadora.empty();
    }
  });