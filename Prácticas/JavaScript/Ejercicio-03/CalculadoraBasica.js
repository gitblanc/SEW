"use strict";
class Calculadora{
    constructor() {
        this.memoria = "";
        this.pantalla = "";
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
        this.pantalla += numero;
        document.getElementById("pantalla").value = this.pantalla;
    }

    //decimales
    punto(){
        this.pantalla += ".";
        document.getElementById("pantalla").value = this.pantalla;
    }

    //suma
    suma(){
        this.pantalla += "+";
        document.getElementById("pantalla").value = this.pantalla;
    }

    //resta
    resta(){
        this.pantalla += "-";
        document.getElementById("pantalla").value = this.pantalla;
    }

    //multiplicacion
    multiplicacion(){
        this.pantalla += "*";
        document.getElementById("pantalla").value = this.pantalla;
    }

    //division
    division(){
        this.pantalla += "/";
        document.getElementById("pantalla").value = this.pantalla;
    }

    //raiz cuadrada
    sqrt(){
        var res = Math.sqrt(new Number(document.getElementById("pantalla").value));
        this.pantalla = res;
        document.getElementById("pantalla").value = this.pantalla;
    }

    //función +/-
    masmenos() {
        var result = - new Number(document.getElementById("pantalla").value);
        this.pantalla = result;
        document.getElementById("pantalla").value = this.pantalla;
    }

    //modulo
    mod(){
        this.pantalla += "%"
        this.pantalla = document.getElementById("pantalla").value = this.pantalla;
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
    }

    //igual
    igual(){
        this.pantalla = document.getElementById("pantalla").value;
        this.pantalla = eval(this.pantalla);
        document.getElementById("pantalla").value = this.pantalla;
    }
}

var calculadora = new Calculadora()