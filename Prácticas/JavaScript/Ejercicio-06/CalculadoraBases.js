class CalculadoraBases extends CalculadoraRPN{
    //constructor
    constructor(pila){
        super(pila);
        this.binary = false;
        this.decimal = true;
        this.octal = false;
        this.hexadecimal = false;
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
        if(this.pila.size() == 1){
            this.binary = true;
            this.decimal = false;
            this.octal = false;
            this.hexadecimal = false;
            var v1 = this.pila.popMyPila();
            this.pila.pushMyPila(this.toBinary(v1));
            this.show();
            this.deshabilitarBotonesBase2();
        }
    }

    //función que convierte a base 8 (ha de haber sólo un número en la pila)
    base8(){
        if(this.pila.size() == 1){
            this.binary = false;
            this.decimal = false;
            this.octal = true;
            this.hexadecimal = false;
            var v1 = this.pila.popMyPila();
            this.pila.pushMyPila(this.toOctal(v1));
            this.show();
            this.deshabilitarBotonesBase8();
        }
    }

    //función que convierte a base 16 (ha de haber sólo un número en la pila)
    base16(){
        if(this.pila.size() == 1){
            this.binary = false;
            this.decimal = false;
            this.octal = false;
            this.hexadecimal = true;
            var v1 = this.pila.popMyPila();
            this.pila.pushMyPila(this.toHex(v1));
            this.show();
            this.deshabilitarBotones();
        }
    }

    //cuando trabajamos en base 2, se desabilitan x botones
    deshabilitarBotonesBase2(){
        document.getElementsByName("sin")[0].disabled = true;
        document.getElementsByName("cos")[0].disabled = true;
        document.getElementsByName("tan")[0].disabled = true;
        //document.getElementsByName("+")[0].disabled = true;
        document.getElementsByName("arcsin")[0].disabled = true;
        document.getElementsByName("arccos")[0].disabled = true;
        document.getElementsByName("arctan")[0].disabled = true;
        //document.getElementsByName("-")[0].disabled = true;
        //document.getElementsByName("1")[0].disabled = true;
        document.getElementsByName("2")[0].disabled = true;
        document.getElementsByName("3")[0].disabled = true;
        //document.getElementsByName("/")[0].disabled = true;
        document.getElementsByName("4")[0].disabled = true;
        document.getElementsByName("5")[0].disabled = true;
        document.getElementsByName("6")[0].disabled = true;
        //document.getElementsByName("*")[0].disabled = true;
        document.getElementsByName("7")[0].disabled = true;
        document.getElementsByName("8")[0].disabled = true;
        document.getElementsByName("9")[0].disabled = true;
        //document.getElementsByName("0")[0].disabled = true;
    }

    //cuando trabajamos en base 8, se desabilitan x botones
    deshabilitarBotonesBase8(){
        document.getElementsByName("sin")[0].disabled = true;
        document.getElementsByName("cos")[0].disabled = true;
        document.getElementsByName("tan")[0].disabled = true;
        //document.getElementsByName("+")[0].disabled = true;
        document.getElementsByName("arcsin")[0].disabled = true;
        document.getElementsByName("arccos")[0].disabled = true;
        document.getElementsByName("arctan")[0].disabled = true;
        //document.getElementsByName("-")[0].disabled = true;
        //document.getElementsByName("1")[0].disabled = true;
        // document.getElementsByName("2")[0].disabled = true;
        // document.getElementsByName("3")[0].disabled = true;
        //document.getElementsByName("/")[0].disabled = true;
        //document.getElementsByName("4")[0].disabled = true;
        // document.getElementsByName("5")[0].disabled = true;
        // document.getElementsByName("6")[0].disabled = true;
        //document.getElementsByName("*")[0].disabled = true;
        // document.getElementsByName("7")[0].disabled = true;
        // document.getElementsByName("8")[0].disabled = true;
        // document.getElementsByName("9")[0].disabled = true;
        //document.getElementsByName("0")[0].disabled = true;
    }

    //función que rehabilita todos los botones
    habilitarBotones(){
        document.getElementsByName("sin")[0].disabled = false;
        document.getElementsByName("cos")[0].disabled = false;
        document.getElementsByName("tan")[0].disabled = false;
        document.getElementsByName("+")[0].disabled = false;
        document.getElementsByName("arcsin")[0].disabled = false;
        document.getElementsByName("arccos")[0].disabled = false;
        document.getElementsByName("arctan")[0].disabled = false;
        document.getElementsByName("-")[0].disabled = false;
        document.getElementsByName("1")[0].disabled = false;
        document.getElementsByName("2")[0].disabled = false;
        document.getElementsByName("3")[0].disabled = false;
        document.getElementsByName("/")[0].disabled = false;
        document.getElementsByName("4")[0].disabled = false;
        document.getElementsByName("5")[0].disabled = false;
        document.getElementsByName("6")[0].disabled = false;
        document.getElementsByName("*")[0].disabled = false;
        document.getElementsByName("7")[0].disabled = false;
        document.getElementsByName("8")[0].disabled = false;
        document.getElementsByName("9")[0].disabled = false;
        document.getElementsByName("0")[0].disabled = false;
    }

    //función que vacía la pila y habilita los botones
    empty(){
        this.binary = false;
        this.decimal = true;
        this.octal = false;
        this.hexadecimal = false;
        this.habilitarBotones();
        this.pila.empty();
        document.querySelector('input[type=text][name=\"currentnum\"]').value = "";
        document.querySelector('textarea[name=\"pantalla\"]').innerHTML = "";
    }
}
var pila = new Pila();//creamos la pila
calculadora = new CalculadoraBases(pila);//creamos la calculadora

document.addEventListener('keydown', function (event) {
    if(event.key === 'Delete'){//Borrar todo
        event.preventDefault();
        calculadora.empty();
    }
});