class CalculadoraBases extends CalculadoraRPN{
    //constructor
    constructor(pila, pilaB){
        super(pila);
        this.pilaBases = pilaB;
        this.binary = false;
        this.decimal = true;
        this.octal = false;
        this.hexadecimal = false;
    }

    //método auxiliar que convierte a decimal
    toDecimal(num){
        return num.toString(10);
    }

    //método auxiliar que convierte a binario
    toBinary(num){
        return num.toString(2);
    }

    //método auxiliar que convierte a octal
    toOctal(num){
        return num.toString(8);
    }

    //método auxiliar que convierte a hexadecimal
    toHex(num){
        return num.toString(16);
    }

    //función que convierte a base 2 (ha de haber sólo un número en la pila)
    base2(){
        if(this.pila.size() >= 1){
            this.pilaBases.empty();
            for(let i = 0; i<this.pila.size();i++){
                var elem = this.pila.get(i);
                this.pilaBases.pushMyPila(this.toBinary(elem));
            }
            this.binary = true;
            this.decimal = false;
            this.octal = false;
            this.hexadecimal = false;
    
            this.show(pilaBases);
            this.deshabilitarBotonesParaBases();
        }
    }

    //función que convierte a base 8 (ha de haber sólo un número en la pila)
    base8(){
        if(this.pila.size() >= 1){
            this.pilaBases.empty();
            for(let i = 0; i<this.pila.size();i++){
                var elem = this.pila.get(i);
                this.pilaBases.pushMyPila(this.toOctal(elem));
            }
            
            this.binary = false;
            this.decimal = false;
            this.octal = true;
            this.hexadecimal = false;
    
            this.show(pilaBases);
            this.deshabilitarBotonesParaBases();
        }
    }

    //función que convierte a base 16 (ha de haber sólo un número en la pila)
    base16(){
        if(this.pila.size() >= 1){
            this.pilaBases.empty();
            for(let i = 0; i<this.pila.size();i++){
                var elem = this.pila.get(i);
                this.pilaBases.pushMyPila(this.toHex(elem));
            }
            
            this.binary = false;
            this.decimal = false;
            this.octal = false;
            this.hexadecimal = true;
    
            this.show(pilaBases);
            this.deshabilitarBotonesParaBases();
        }
    }

    //función que convierte a base 10 (ha de haber sólo un número en la pila)
    baseDecimal(){
        if(this.pila.size() >= 1){
            this.pilaBases.empty();
            for(let i = 0; i<this.pila.size();i++){
                var elem = this.pila.get(i);
                this.pilaBases.pushMyPila(this.toDecimal(elem));
            }
            
            this.binary = false;
            this.decimal = true;
            this.octal = false;
            this.hexadecimal = false;
    
            this.show(pilaBases);
            this.habilitarBotones();
        }
    }

    //cuando trabajamos en base 2,8,16, se desabilitan los botones de ángulos
    deshabilitarBotonesParaBases(){
        document.getElementsByName("sin")[0].disabled = true;
        document.getElementsByName("cos")[0].disabled = true;
        document.getElementsByName("tan")[0].disabled = true;
        document.getElementsByName("arcsin")[0].disabled = true;
        document.getElementsByName("arccos")[0].disabled = true;
        document.getElementsByName("arctan")[0].disabled = true;
    }

    //función que rehabilita todos los botones
    habilitarBotones(){
        document.getElementsByName("sin")[0].disabled = false;
        document.getElementsByName("cos")[0].disabled = false;
        document.getElementsByName("tan")[0].disabled = false;
        document.getElementsByName("mas")[0].disabled = false;
        document.getElementsByName("arcsin")[0].disabled = false;
        document.getElementsByName("arccos")[0].disabled = false;
        document.getElementsByName("arctan")[0].disabled = false;
        document.getElementsByName("menos")[0].disabled = false;
        document.getElementsByName("1")[0].disabled = false;
        document.getElementsByName("2")[0].disabled = false;
        document.getElementsByName("3")[0].disabled = false;
        document.getElementsByName("entre")[0].disabled = false;
        document.getElementsByName("4")[0].disabled = false;
        document.getElementsByName("5")[0].disabled = false;
        document.getElementsByName("6")[0].disabled = false;
        document.getElementsByName("por")[0].disabled = false;
        document.getElementsByName("7")[0].disabled = false;
        document.getElementsByName("8")[0].disabled = false;
        document.getElementsByName("9")[0].disabled = false;
        document.getElementsByName("0")[0].disabled = false;
        document.getElementsByName("ENTER")[0].disabled = false;
    }

    //función que vacía la pila y habilita los botones
    vaciar(){
        this.binary = false;
        this.decimal = true;
        this.octal = false;
        this.hexadecimal = false;
        this.pila.empty();
        this.pilaBases.empty();
        document.querySelector('input[type=text][name=\"currentnum\"]').value = "";
        document.querySelector('textarea[name=\"pantalla\"]').innerHTML = "";
        this.comprobarBotonesBases();
        this.habilitarBotones();
    }
    //función que habilita o deshabilita botones
    deshabilitarOHabilitaBotonesBases(cond){
        document.getElementsByName("base2")[0].disabled = cond;
        document.getElementsByName("base8")[0].disabled = cond;
        document.getElementsByName("base16")[0].disabled = cond;
        document.getElementsByName("base10")[0].disabled = cond;
    }
    //función que comprueba si las bases se pueden volver a habilitar
    comprobarBotonesBases(){
        if(this.pila.size() > 0){
            this.deshabilitarOHabilitaBotonesBases(false);
        }else{
            this.deshabilitarOHabilitaBotonesBases(true);
        }
    }

    //función enter
    enter(){
        this.pila.pushMyPila(Number(document.querySelector('input[type=text][name=\"currentnum\"]').value));
        if(this.binary){
            this.pilaBases.pushMyPila(this.toBinary(Number(document.querySelector('input[type=text][name=\"currentnum\"]').value)));
        }else if(this.octal){
            this.pilaBases.pushMyPila(this.toOctal(Number(document.querySelector('input[type=text][name=\"currentnum\"]').value)));
        }else if(this.decimal){
            this.pilaBases.pushMyPila(this.toDecimal(Number(document.querySelector('input[type=text][name=\"currentnum\"]').value)));
        }else{
            this.pilaBases.pushMyPila(this.toHex(Number(document.querySelector('input[type=text][name=\"currentnum\"]').value)));
        }
        document.querySelector('input[type=text][name=\"currentnum\"]').value = "";
        this.show(this.pilaBases);
        this.comprobarBotonesBases();
    }

    //función suma
    suma(){
        if(this.pila.size() >= 2){
            var e1 = this.pila.popMyPila();
            var e2 = this.pila.popMyPila();
            this.pilaBases.popMyPila();
            this.pilaBases.popMyPila();
            if(this.binary){
                this.pilaBases.pushMyPila(this.toBinary(e1+e2));
            }else if(this.octal){
                this.pilaBases.pushMyPila(this.toOctal(e1+e2));
            }else if(this.decimal){
                this.pilaBases.pushMyPila(e1+e2);
            }else{
                this.pilaBases.pushMyPila(this.toHex(e1+e2));
            }
            this.pila.pushMyPila(e1+e2);
            this.show(this.pilaBases);
            this.comprobarBotonesBases();
        }
    }
    //función resta
    resta(){
        if(this.pila.size() >= 2){
            var e1 = this.pila.popMyPila();
            var e2 = this.pila.popMyPila();
            this.pilaBases.popMyPila();
            this.pilaBases.popMyPila();
            if(this.binary){
                this.pilaBases.pushMyPila(this.toBinary(e2-e1));
            }else if(this.octal){
                this.pilaBases.pushMyPila(this.toOctal(e2-e1));
            }else if(this.decimal){
                this.pilaBases.pushMyPila(e2-e1);
            }else{
                this.pilaBases.pushMyPila(this.toHex(e2-e1));
            }
            this.pila.pushMyPila(e2-e1);
            this.show(this.pilaBases);
            this.comprobarBotonesBases();
        }
    }
    //función multiplicación
    multiplicacion(){
        if(this.pila.size() >= 2){
            var e1 = this.pila.popMyPila();
            var e2 = this.pila.popMyPila();
            this.pilaBases.popMyPila();
            this.pilaBases.popMyPila();
            if(this.binary){
                this.pilaBases.pushMyPila(this.toBinary(e2*e1));
            }else if(this.octal){
                this.pilaBases.pushMyPila(this.toOctal(e2*e1));
            }else if(this.decimal){
                this.pilaBases.pushMyPila(e2*e1);
            }else{
                this.pilaBases.pushMyPila(this.toHex(e2*e1));
            }
            this.pila.pushMyPila(e2*e1);
            this.show(this.pilaBases);
            this.comprobarBotonesBases();
        }
    }
    //función división
    division(){
        if(this.pila.size() >= 2){
            var e1 = this.pila.popMyPila();
            var e2 = this.pila.popMyPila();
            this.pilaBases.popMyPila();
            this.pilaBases.popMyPila();
            if(this.binary){
                this.pilaBases.pushMyPila(this.toBinary(e2/e1));
            }else if(this.octal){
                this.pilaBases.pushMyPila(this.toOctal(e2/e1));
            }else if(this.decimal){
                this.pilaBases.pushMyPila(e2/e1);
            }else{
                this.pilaBases.pushMyPila(this.toHex(e2/e1));
            }
            this.pila.pushMyPila(e2/e1);
            this.show(this.pilaBases);
            this.comprobarBotonesBases();
        }
    }
}
var pila = new Pila();//creamos la pila
var pilaBases = new Pila();//creamos la pila de bases (la que se ve)
calculadora = new CalculadoraBases(pila, pilaBases);//creamos la calculadora

document.addEventListener('keydown', function (event) {
    if(event.key === 'Delete'){//Borrar todo
        event.preventDefault();
        calculadora.vaciar();
        this.comprobarBotonesBases();
    }
    if(event.key === 'Enter'){//Enter
        event.preventDefault();
        calculadora.enter();
        this.comprobarBotonesBases();
    }
    if (event.key === '+') {//suma
        calculadora.suma();
        this.comprobarBotonesBases();
    }
    if (event.key === '-') {//resta
        calculadora.resta();
        this.comprobarBotonesBases();
    }
    if (event.key === '*') {//multiplicación
        calculadora.multiplicacion();
        this.comprobarBotonesBases();
    }
    if (event.key === '/') {//división
        calculadora.division();
        this.comprobarBotonesBases();
    }
});