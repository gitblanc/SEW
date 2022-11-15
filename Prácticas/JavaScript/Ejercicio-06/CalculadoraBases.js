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

    modificarBase(v1){
        if(this.octal){
            v1 = parseInt(v1,8);
        }else if(this.hexadecimal){
            v1 = parseInt(v1,16);
        }else if(this.binary){
            v1 = parseInt(v1,2);
        }else if(this.decimal){
            return v1;
        }
        return v1;
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
            this.deshabilitarBotones();
        }
    }

    //función que convierte a base 8 (ha de haber sólo un número en la pila)
    base8(){
        if(this.pila.size() >= 1){
            this.pilaBases.empty();
            for(let i = 0; i<this.pila.size();i++){
                var elem = this.toOctal(this.pila.get(i));
                this.pilaBases.pushMyPila(elem);
            }
            
            this.binary = true;
            this.decimal = false;
            this.octal = false;
            this.hexadecimal = false;
    
            this.show(pilaBases);
            this.deshabilitarBotones();
        }
    }

    //función que convierte a base 16 (ha de haber sólo un número en la pila)
    base16(){
        if(this.pila.size() >= 1){
            this.pilaBases.empty();
            for(let i = 0; i<this.pila.size();i++){
                var elem = this.toHex(this.pila.get(i));
                this.pilaBases.pushMyPila(elem);
            }
            
            this.binary = true;
            this.decimal = false;
            this.octal = false;
            this.hexadecimal = false;
    
            this.show(pilaBases);
            this.deshabilitarBotones();
        }
    }

    //función que convierte a base 10 (ha de haber sólo un número en la pila)
    baseDecimal(){
        if(this.pila.size() >= 1){
            this.pilaBases.empty();
            for(let i = 0; i<this.pila.size();i++){
                var elem = this.toDecimal(this.pila.get(i));
                this.pilaBases.pushMyPila(elem);
            }
            
            this.binary = true;
            this.decimal = false;
            this.octal = false;
            this.hexadecimal = false;
    
            this.show(pilaBases);
            this.deshabilitarBotones();
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
        document.getElementsByName("ENTER")[0].disabled = true;
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
        this.habilitarBotones();
    }

    //función enter
    enter(){
        this.binary = false;
        this.decimal = true;
        this.octal = false;
        this.hexadecimal = false;
        this.pila.pushMyPila(Number(document.querySelector('input[type=text][name=\"currentnum\"]').value));
        document.querySelector('input[type=text][name=\"currentnum\"]').value = "";
        this.show(this.pila);
    }
}
var pila = new Pila();//creamos la pila
var pilaBases = new Pila();//creamos la pila de bases
calculadora = new CalculadoraBases(pila, pilaBases);//creamos la calculadora

document.addEventListener('keydown', function (event) {
    if(event.key === 'Delete'){//Borrar todo
        event.preventDefault();
        calculadora.vaciar();
    }
    if(event.key === 'Enter'){//Enter
        event.preventDefault();
        calculadora.enter();
    }
});