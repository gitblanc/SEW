"use strict";
class CalculadoraCientifica extends Calculadora{
    //constructor
    constructor(){
        super();
        this.radianes = true;
        this.change = true;
        this.notacion = true;
        this.hyper = true;
    }

    //función DEG
    deg(){
        if(this.radianes){
            this.radianes = false;
            var num = new Number(document.getElementsByName("pantalla")[0].value) * (100/Math.PI);
            document.getElementsByName("pantalla")[0].value = num;
        }
        else{
            this.radianes = true;
            var num = new Number(document.getElementsByName("pantalla")[0].value) * (Math.PI/100);
            document.getElementsByName("pantalla")[0].value = num;
        }
    }

    //función HYP
    hyp(){
        if(!this.hyper) {
            let sinhb = document.createElement("button");
            sinhb.setAttribute("type", "button");
            sinhb.setAttribute("onclick", "calculadora.sinh()");
            sinhb.innerHTML = "sinh";
            document.querySelector("body > form > button:nth-child(12)").replaceWith(sinhb);
            let coshb = document.createElement("button");
            coshb.setAttribute("type", "button");
            coshb.setAttribute("onclick", "calculadora.cosh()");
            coshb.innerHTML = "cosh";
            document.querySelector("body > form > button:nth-child(13)").replaceWith(coshb);
            let tanhb = document.createElement("button");
            tanhb.setAttribute("type", "button");
            tanhb.setAttribute("onclick", "calculadora.tanh()");
            tanhb.innerHTML = "tanh";
            document.querySelector("body > form > button:nth-child(14)").replaceWith(tanhb);
            this.hyper = true;
        } else {
            this.hyper = false;
            let sinb = document.createElement("button");
            sinb.setAttribute("type", "button");
            sinb.setAttribute("onclick", "calculadora.sin()");
            sinb.innerHTML = "sin";
            document.querySelector("body > form > button:nth-child(12)").replaceWith(sinb);
            let cosb = document.createElement("button");
            cosb.setAttribute("type", "button");
            cosb.setAttribute("onclick", "calculadora.cos()");
            cosb.innerHTML = "cos";
            document.querySelector("body > form > button:nth-child(13)").replaceWith(cosb);
            let tanb = document.createElement("button");
            tanb.setAttribute("type", "button");
            tanb.setAttribute("onclick", "calculadora.tan()");
            tanb.innerHTML = "tan";
            document.querySelector("body > form > button:nth-child(14)").replaceWith(tanb);
        }
    }

    //funcion f-e
    fe(){
        if(!this.notacion) {
            this.notacion = false;
            var res = document.getElementsByName("pantalla")[0].value;
            this.pantalla = new Number(res).toExponential();
            document.getElementsByName("pantalla")[0].value = this.pantalla;
        } else {
            this.notacion = true;
            var res = document.getElementsByName("pantalla")[0].value;
            this.pantalla = new Number(res);
            document.getElementsByName("pantalla")[0].value = this.pantalla;
        }
    }

    //función 
    flecha(){
        if(!this.change) {
            this.change = true;
            let x3b = document.createElement("button");
            x3b.setAttribute("type", "button");
            x3b.setAttribute("onclick", "calculadora.x3()");
            x3b.innerHTML = "x<sup>3</sup>";
            document.querySelector("body > form > button:nth-child(10)").replaceWith(x3b);
            let asinb = document.createElement("button");
            asinb.setAttribute("type", "button");
            asinb.setAttribute("onclick", "calculadora.asin()");
            asinb.innerHTML = "sin<sup>-1</<sup>";
            document.querySelector("body > form > button:nth-child(12)").replaceWith(asinb);
            let acosb = document.createElement("button");
            acosb.setAttribute("type", "button");
            acosb.setAttribute("onclick", "calculadora.acos()");
            acosb.innerHTML = "cos<sup>-1</<sup>";
            document.querySelector("body > form > button:nth-child(13)").replaceWith(acosb);
            let atanb = document.createElement("button");
            atanb.setAttribute("type", "button");
            atanb.setAttribute("onclick", "calculadora.atan()");
            atanb.innerHTML = "tan<sup>-1</<sup>";
            document.querySelector("body > form > button:nth-child(14)").replaceWith(atanb);
            let lnb = document.createElement("button");
            lnb.setAttribute("type", "button");
            lnb.setAttribute("onclick", "calculadora.ln()");
            lnb.innerHTML = "ln";
            document.querySelector("body > form > button:nth-child(17)").replaceWith(lnb);
        } else {
            this.change = false;
            let x2b = document.createElement("button");
            x2b.setAttribute("type", "button");
            x2b.setAttribute("onclick", "calculadora.x2()");
            x2b.innerHTML = "x<sup>2</sup>";
            document.querySelector("body > form > button:nth-child(10)").replaceWith(x2b);
            let sinb = document.createElement("button");
            sinb.setAttribute("type", "button");
            sinb.setAttribute("onclick", "calculadora.sin()");
            sinb.innerHTML = "sin";
            document.querySelector("body > form > button:nth-child(12)").replaceWith(sinb);
            let cosb = document.createElement("button");
            cosb.setAttribute("type", "button");
            cosb.setAttribute("onclick", "calculadora.cos()");
            cosb.innerHTML = "cos";
            document.querySelector("body > form > button:nth-child(13)").replaceWith(cosb);
            let tanb = document.createElement("button");
            tanb.setAttribute("type", "button");
            tanb.setAttribute("onclick", "calculadora.tan()");
            tanb.innerHTML = "tan";
            document.querySelector("body > form > button:nth-child(14)").replaceWith(tanb);
            let logb = document.createElement("button");
            logb.setAttribute("type", "button");
            logb.setAttribute("onclick", "calculadora.log10()");
            logb.innerHTML = "log";
            document.querySelector("body > form > button:nth-child(17)").replaceWith(logb);
        }   
    }

    //función mc
    mc() {
        this.memoria = "";
    }

    //función mr
    mr() {
        this.pantalla = this.memoria;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función ms
    ms() {
        this.memoria = document.getElementsByName("pantalla")[0].value;
    }

    //función cuadrado
    cuadrado() {
        var result = Math.pow(new Number(document.getElementsByName("pantalla")[0].value), 2);
        this.pantalla = result;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función de elevar al cubo
    cubo() {
        var result = Math.pow(new Number(document.getElementsByName("pantalla")[0].value), 3);
        this.pantalla = result;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función potencia
    potencia() {
        this.pantalla += "**";
		document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función logaritmo neperiano
    ln() {
        var res = Math.log(new Number(this.pantalla));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función exponente
    exp() {
        var res = Math.exp(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }
    
    //función seno
    sin() {
        var res = Math.sin(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función coseno
    cos() {
        var res = Math.cos(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función tangente
    tan() {
        var res = Math.tan(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función sinh
    sinh() {
        var res = Math.sinh(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función cosh
    cosh() {
        var res = Math.cosh(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función tanh
    tanh() {
        var res = Math.tanh(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función asinh
    asin() {
        var res = Math.asin(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función acos
    acos() {
        var res = Math.acos(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función atan
    atan() {
        var res = Math.atan(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función base 10
    base10() {
        var res = Math.pow(10,new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función logaritmo
    log() {
        var res = Math.log10(new Number(document.getElementsByName("pantalla")[0].value));
        this.pantalla = res;
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función pi
    pi() {
        this.pantalla += Math.PI;
		document.getElementsByName("pantalla")[0].value = this.pantalla
    }

    //función factorial
    factorial() {
        var n = new Number(document.getElementsByName("pantalla")[0].value);
        var result = 1; 
	    for (var i=1; i<=n; i++) {
		    result = result * i; 
	    }
        this.pantalla = result;
	    document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //función borrado
    ce() {
        this.pantalla = "";
        document.getElementsByName("pantalla")[0].value = this.pantalla;
        this.memoria = 0;
    }

    //función eliminar 1 valor
    deleteOne() {
        var res = document.getElementsByName("pantalla")[0].value;
        this.pantalla = res.substring(0, res.length - 1);
        document.getElementsByName("pantalla")[0].value = this.pantalla;
    }

    //parentesis izquierda
    parentesisIzq(){
        this.pantalla += "(";
		document.getElementsByName("pantalla")[0].value = this.pantalla
    }

    //parentesis derecha
    parentesisDer(){
        this.pantalla += ")";
		document.getElementsByName("pantalla")[0].value = this.pantalla
    }
}
var calculadora = new CalculadoraCientifica();