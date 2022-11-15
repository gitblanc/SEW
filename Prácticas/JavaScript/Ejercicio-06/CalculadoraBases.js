class CalculadoraBases extends CalculadoraRPN{
    //constructor
    constructor(pila){
        super(pila);
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

    modificarBase(v1){
        console.log("sin-modificar: " + v1);
        if(this.pila.octal){
            v1 = parseInt(v1,8);
        }else if(this.pila.hexadecimal){
            v1 = parseInt(v1,16);
        }else if(this.binary){
            v1 = parseInt(v1,2);
        }else if(this.pila.decimal){
            return v1;
        }
        console.log("modificado: " + v1);
        return v1;
    }

    //función que convierte a base 2 (ha de haber sólo un número en la pila)
    base2(){
        if(this.pila.size() >= 1){
            let v1 = this.pila.popMyPila();//elemento
            
            v1 = this.toBinary(this.modificarBase(v1));

            this.pila.binary= true;
            this.pila.decimal = false;
            this.pila.octal = false;
            this.pila.hexadecimal = false;
    
            this.pila.pushMyPila(v1);
            this.show();
        }
    }

    //función que convierte a base 8 (ha de haber sólo un número en la pila)
    base8(){
        if(this.pila.size() >= 1){
            var v1 = this.pila.popMyPila();

            v1 = this.toOctal(this.modificarBase(v1));

            this.pila.binary= false;
            this.pila.decimal = false;
            this.pila.octal = true;
            this.pila.hexadecimal = false;
            
            this.pila.pushMyPila(v1);
            this.show();
        }
    }

    //función que convierte a base 16 (ha de haber sólo un número en la pila)
    base16(){
        if(this.pila.size() >= 1){
            var v1 = this.pila.popMyPila();

            v1 = this.toHex(this.modificarBase(v1));

            this.pila.binary= false;
            this.pila.decimal = false;
            this.pila.octal = false;
            this.pila.hexadecimal = true;

            this.pila.pushMyPila(v1);
            this.show();
        }
    }

    //función que convierte a base 10 (ha de haber sólo un número en la pila)
    baseDecimal(){
        if(this.pila.size() >= 1){
            var v1 = this.pila.popMyPila();
            
            v1 = this.modificarBase(v1);

            this.pila.binary= false;
            this.pila.decimal = true;
            this.pila.octal = false;
            this.pila.hexadecimal = false;
            
            this.pila.pushMyPila(v1);
            this.show();
        }
    }

    //cuando trabajamos en base 8, se desabilitan x botones
    deshabilitarBotones(){
        document.getElementsByName("sin")[0].disabled = true;
        document.getElementsByName("cos")[0].disabled = true;
        document.getElementsByName("tan")[0].disabled = true;
        document.getElementsByName("mas")[0].disabled = true;
        document.getElementsByName("arcsin")[0].disabled = true;
        document.getElementsByName("arccos")[0].disabled = true;
        document.getElementsByName("arctan")[0].disabled = true;
        document.getElementsByName("menos")[0].disabled = true;
        document.getElementsByName("1")[0].disabled = true;
        document.getElementsByName("2")[0].disabled = true;
        document.getElementsByName("3")[0].disabled = true;
        document.getElementsByName("entre")[0].disabled = true;
        document.getElementsByName("4")[0].disabled = true;
        document.getElementsByName("5")[0].disabled = true;
        document.getElementsByName("6")[0].disabled = true;
        document.getElementsByName("por")[0].disabled = true;
        document.getElementsByName("7")[0].disabled = true;
        document.getElementsByName("8")[0].disabled = true;
        document.getElementsByName("9")[0].disabled = true;
        document.getElementsByName("0")[0].disabled = true;
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
    }

    //función que vacía la pila y habilita los botones
    empty(){
        this.pila.binary= false;
        this.pila.decimal = true;
        this.pila.octal = false;
        this.pila.hexadecimal = false;
        this.habilitarBotones();
        this.pila.empty();
        document.querySelector('input[type=text][name=\"currentnum\"]').value = "";
        document.querySelector('textarea[name=\"pantalla\"]').innerHTML = "";
    }

    //función enter
    enter(){
        this.pila.binary= false;
        this.pila.decimal = true;
        this.pila.octal = false;
        this.pila.hexadecimal = false;
        this.pila.pushMyPila(Number(document.querySelector('input[type=text][name=\"currentnum\"]').value));
        document.querySelector('input[type=text][name=\"currentnum\"]').value = "";
        this.show();
    }

    //función suma
    suma(){
        if(this.pila.size() >= 2){
            var v1 = this.pila.popMyPila();
            var v2 = this.pila.popMyPila();
            v1 = this.modificarBase(v1);
            v2 = this.modificarBase(v2);
            this.pila.pushMyPila(v1+v2);
            this.show();
        }
    }
}

class Element {
    constructor(val, bin, dec, oct, hex){
        this.value = val;
        this.binary = bin;
        this.decimal = dec;
        this.octal = oct;
        this.hexadecimal = hex;
    }
}

var pila = new Pila();//creamos la pila
calculadora = new CalculadoraBases(pila);//creamos la calculadora

document.addEventListener('keydown', function (event) {
    if(event.key === 'Delete'){//Borrar todo
        event.preventDefault();
        calculadora.empty();
    }
    if(event.key === 'Enter'){//Enter
        event.preventDefault();
        calculadora.enter();
    }
    if (event.key === '+') {//suma
        calculadora.suma();
    }
});