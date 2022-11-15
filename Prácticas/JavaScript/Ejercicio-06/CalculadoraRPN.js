class CalculadoraRPN{
    //constructor
    constructor(pila){
        this.pila = pila;
    }
    //función que muestra la pila
    show(stack){
        if(!this.pila.isEmpty()){
            document.querySelector('textarea[name=\"pantalla\"]').innerHTML = stack.show(stack);
        }
    }
    //función digito
    digito(x){
       document.querySelector('input[type=text][name=\"currentnum\"]').value += x;
    }
    //función suma
    suma(){
        if(this.pila.size() >= 2){
            this.pila.pushMyPila(this.pila.popMyPila()+this.pila.popMyPila());
            this.show(this.pila);
        }
    }
    //función resta
    resta(){
        if(this.pila.size() >= 2){
            var v1 = this.pila.popMyPila();
            var v2 = this.pila.popMyPila();
            this.pila.pushMyPila(v2-v1);
            this.show(this.pila);
        }

    }
    //función multiplicación
    multiplicacion(){
        if(this.pila.size() >= 2){
            var v1 = this.pila.popMyPila();
            var v2 = this.pila.popMyPila();
            this.pila.pushMyPila(v2*v1);
            this.show(this.pila);
        }
    }
    //función división
    division(){
        if(this.pila.size() >= 2){
            var v1 = this.pila.popMyPila();
            var v2 = this.pila.popMyPila();
            this.pila.pushMyPila(v2/v1);
             this.show(this.pila);
        }
    }
    //función seno
    sin(){
        if(this.pila.size() >= 1){
            this.pila.pushMyPila(Math.sin(this.pila.popMyPila()));
            this.show(this.pila);
        }
    }
    //función coseno
    cos(){
        if(this.pila.size() >= 1){
            this.pila.pushMyPila(Math.cos(this.pila.popMyPila()));
            this.show(this.pila);
        }

    }
    //función tangente
    tan(){
        if(this.pila.size() >= 1){
            this.pila.pushMyPila(Math.tan(this.pila.popMyPila()));
            this.show(this.pila);
        }
    }
    //función arc seno
    arcsin(){
        if(this.pila.size() >= 1){
            this.pila.pushMyPila(Math.asin(this.pila.popMyPila()));
            this.show(this.pila);
        }
    }
    //función arc tangente
    arctan(){
        if(this.pila.size() >= 1){
            this.pila.pushMyPila(Math.atan(this.pila.popMyPila()));
            this.show(this.pila);
        }
    }
    //función arc coseno
    arccos(){
        if(this.pila.size() >= 1){
            this.pila.pushMyPila(Math.acos(this.pila.popMyPila()));
            this.show(this.pila);
        }

    }
    //función que cambia de signo
    changeSign(){
        if(this.pila.size() >= 1){
            this.pila.pushMyPila(this.pila.popMyPila() * (-1));
            this.show(this.pila);
        }
    }
}
var pila = new Pila();//creamos la pila
calculadora = new CalculadoraRPN(pila);//creamos la calculadora

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
  });