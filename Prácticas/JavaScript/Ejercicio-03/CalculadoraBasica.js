"use strict";
class Calculadora{
    constructor() {
        this.memoria = "";
        this.pantalla = "";
        this.max = 12;
        this.caracteres = 0;
        {
            document.addEventListener("keydown", (event) => {
                if (["*", "/", "-", "+", ".", "%", "√", "+/-"].some(ev => event.key.includes(ev))) {
                    switch (event.key) {
                        case "*":
                            this.multiplicacion();
                            break;
                        case "/":
                            this.division();
                            break;
                        case "-":
                            this.resta();
                            break;
                        case "+":
                            this.suma();
                            break;
                        case ".":
                            this.decimal();
                            break;
                        case "%":
                            this.mod();
                            break;
                        case "√":
                            this.sqrt();
                            break;
                        case "+/-":
                            this.masmenos();
                            break;
                    }
                }else if (!isNaN(event.key)) {
                    this.digitos(event.key);
                }else if (event.key == "Enter") {
                    this.igual();
                }
            })
        };
    }

    //para mostrar los números por pantalla
    digitos(numero){
        if(this.caracteres < 12){
            this.pantalla += numero;
            document.getElementById("pantalla").value = this.pantalla;
            this.caracteres+=1;
        }
    }

    //decimales
    punto(){
        if(this.caracteres < 12){
            this.pantalla += ".";
            document.getElementById("pantalla").value = this.pantalla;
            this.caracteres+=1;
        }
    }

    //suma
    suma(){
        if(this.caracteres < 12){
            this.pantalla += "+";
            document.getElementById("pantalla").value = this.pantalla;
            this.caracteres+=1;
        }
    }

    //resta
    resta(){
        if(this.caracteres < 12){
            this.pantalla += "-";
            document.getElementById("pantalla").value = this.pantalla;
            this.caracteres+=1;
        }
    }

    //multiplicacion
    multiplicacion(){
        if(this.caracteres < 12){
            this.pantalla += "*";
            document.getElementById("pantalla").value = this.pantalla;
            this.caracteres+=1;
        }
    }

    //division
    division(){
        if(this.caracteres < 12){
            this.pantalla += "/";
            document.getElementById("pantalla").value = this.pantalla;
            this.caracteres+=1;
        }
    }

    //raiz cuadrada
    sqrt(){
        var res = Math.sqrt(new Number(document.getElementById("pantalla").value).toFixed(5));
        this.pantalla = res;
        document.getElementById("pantalla").value = this.pantalla;
            
    }

    //función +/-
    masmenos() {
        var result = - new Number(document.getElementById("pantalla").value);
        this.pantalla = result;
        document.getElementById("pantalla").value = this.pantalla;
        this.caracteres+=1;
    }

    //modulo
    mod(){
        if(this.caracteres < 12){
            this.pantalla += "%"
            this.pantalla = document.getElementById("pantalla").value = this.pantalla;
            this.caracteres+=1;
        }
    }

    //mrc
    mrc(){
        this.pantalla = this.memoria;
        document.getElementById("pantalla").value = this.pantalla;
        this.memoria = "";
    }

    //mMenos
    mMenos(){
        var p = document.getElementById("pantalla").value;
        var operacion = this.memoria += "-" + p;
        this.memoria = eval(operacion).toString();
        this.pantalla = "";
        document.getElementById("pantalla").value = this.pantalla;
    }

    //mMas
    mMas(){
        var p = document.getElementById("pantalla").value;
        var operacion = this.memoria += "+" + p;
        this.memoria = eval(operacion).toString();
        this.pantalla = "";
        document.getElementById("pantalla").value = this.pantalla;
    }

    //borrar
    borrar(){
        this.pantalla = "";
                document.getElementById("pantalla").value = this.pantalla;
        this.caracteres = 0;        
    }

    //igual
    igual(){
        this.pantalla = document.getElementById("pantalla").value;
        this.pantalla = eval(this.pantalla);
        document.getElementById("pantalla").value = this.pantalla;
    }
}

var calculadora = new Calculadora()