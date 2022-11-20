class calculadoraCientifica extends Calculadora{
    //constructor para la calculadora que llama al constructor base
    constructor() {
        super();
        this.memory = "";
        this.isDeg = true;//ponemos a degrees
        this.hyper = false;
        this.flechaCambio = false;
    }
    //función que determina si la calculadora está en grados o radianes
    deg(){
        let num = eval(document.querySelector('input[type=text][name=\"pantalla\"]').value);
        if(this.isDeg == true){//si está puesta en grados
            document.querySelector('input[type=text][name=\"pantalla\"]').value = num * (Math.PI/180);
            this.isDeg = false;
        }else{//si está en radianes
            document.querySelector('input[type=text][name=\"pantalla\"]').value = num * (180/Math.PI);
            this.isDeg = true;
        }
    }
    //función hyp
    hyp() {
        if(!this.hyper) {
            let sinhb = document.createElement("button");
            sinhb.setAttribute("type", "button");
            sinhb.setAttribute("onclick", "calculadora.sinh()");
            sinhb.innerHTML = "sinh";
            document.querySelector("body > form > button:nth-child(14)").replaceWith(sinhb);
            let coshb = document.createElement("button");
            coshb.setAttribute("type", "button");
            coshb.setAttribute("onclick", "calculadora.cosh()");
            coshb.innerHTML = "cosh";
            document.querySelector("body > form > button:nth-child(15)").replaceWith(coshb);
            let tanhb = document.createElement("button");
            tanhb.setAttribute("type", "button");
            tanhb.setAttribute("onclick", "calculadora.tanh()");
            tanhb.innerHTML = "tanh";
            document.querySelector("body > form > button:nth-child(16)").replaceWith(tanhb);
            this.hyper = true;
        } else {
            this.hyper = false;
            let sinb = document.createElement("button");
            sinb.setAttribute("type", "button");
            sinb.setAttribute("onclick", "calculadora.sin()");
            sinb.innerHTML = "sin";
            document.querySelector("body > form > button:nth-child(14)").replaceWith(sinb);
            let cosb = document.createElement("button");
            cosb.setAttribute("type", "button");
            cosb.setAttribute("onclick", "calculadora.cos()");
            cosb.innerHTML = "cos";
            document.querySelector("body > form > button:nth-child(15)").replaceWith(cosb);
            let tanb = document.createElement("button");
            tanb.setAttribute("type", "button");
            tanb.setAttribute("onclick", "calculadora.tan()");
            tanb.innerHTML = "tan";
            document.querySelector("body > form > button:nth-child(16)").replaceWith(tanb);
        }
    }
    //función flecha
    flecha() {
        if(!this.flechaCambio) {
            let cubo = document.createElement("button");
            cubo.setAttribute("type", "button");
            cubo.setAttribute("onclick", "calculadora.cubo()");
            cubo.innerHTML = "x<sup>3</sup>";
            document.querySelector("body > form > button:nth-child(13)").replaceWith(cubo);
            let asinb = document.createElement("button");
            asinb.setAttribute("type", "button");
            asinb.setAttribute("onclick", "calculadora.asin()");
            asinb.innerHTML = "sin<sup>-1</<sup>";
            document.querySelector("body > form > button:nth-child(14)").replaceWith(asinb);
            let acosb = document.createElement("button");
            acosb.setAttribute("type", "button");
            acosb.setAttribute("onclick", "calculadora.acos()");
            acosb.innerHTML = "cos<sup>-1</<sup>";
            document.querySelector("body > form > button:nth-child(15)").replaceWith(acosb);
            let atanb = document.createElement("button");
            atanb.setAttribute("type", "button");
            atanb.setAttribute("onclick", "calculadora.atan()");
            atanb.innerHTML = "tan<sup>-1</<sup>";
            document.querySelector("body > form > button:nth-child(16)").replaceWith(atanb);
            let lnb = document.createElement("button");
            lnb.setAttribute("type", "button");
            lnb.setAttribute("onclick", "calculadora.ln()");
            lnb.innerHTML = "ln";
            document.querySelector("body > form > button:nth-child(19)").replaceWith(lnb);
            this.flechaCambio = true;
        } else {
            this.flechaCambio = false;
            let cuadrado = document.createElement("button");
            cuadrado.setAttribute("type", "button");
            cuadrado.setAttribute("onclick", "calculadora.cuadrado()");
            cuadrado.innerHTML = "x<sup>2</sup>";
            document.querySelector("body > form > button:nth-child(13)").replaceWith(cuadrado);
            let sinb = document.createElement("button");
            sinb.setAttribute("type", "button");
            sinb.setAttribute("onclick", "calculadora.sin()");
            sinb.innerHTML = "sin";
            document.querySelector("body > form > button:nth-child(14)").replaceWith(sinb);
            let cosb = document.createElement("button");
            cosb.setAttribute("type", "button");
            cosb.setAttribute("onclick", "calculadora.cos()");
            cosb.innerHTML = "cos";
            document.querySelector("body > form > button:nth-child(15)").replaceWith(cosb);
            let tanb = document.createElement("button");
            tanb.setAttribute("type", "button");
            tanb.setAttribute("onclick", "calculadora.tan()");
            tanb.innerHTML = "tan";
            document.querySelector("body > form > button:nth-child(16)").replaceWith(tanb);
            let logb = document.createElement("button");
            logb.setAttribute("type", "button");
            logb.setAttribute("onclick", "calculadora.log10()");
            logb.innerHTML = "log";
            document.querySelector("body > form > button:nth-child(19)").replaceWith(logb);
        }
    }
    //función que expresa en notacion científica
    fe(){
        let num = eval(document.querySelector('input[type=text][name=\"pantalla\"]').value);
        document.querySelector('input[type=text][name=\"pantalla\"]').value = new Number(num).toExponential()
    }
    //función mr
    mr(){
        document.querySelector('input[type=text][name=\"pantalla\"]').value = this.memoria;
    }
    //función mc
    mc(){
        this.memoria = "";
    }
    //función paréntesis izquierda
    parentesisIzq() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "(";
    }
    //función paréntesis derecha
    parentesisDer() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += ")";
    }
    //función pi
    pi() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.PI";
    }
    //función potencia
    pow() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "**";
    }
    //función elevado al cuadrado
    cuadrado() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "**2";
    }
    //función elevado al cubo
    cubo(){
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "**3";
    }
    //función base 10
    base10() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.pow(10, ";
    }
    //función logaritmo
    log10() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.log10(";
    }
    //función exponencial
    exp() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.exp(";
    }
    //función que borra el último elemento
    deleteOne() {
        var aux = document.querySelector('input[type=text][name=\"pantalla\"]').value;
        document.querySelector('input[type=text][name=\"pantalla\"]').value = aux.slice(0, -1);
    }
    //función logaritmo neperiano
    ln() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.log(";
    }
    //función factorial
    factorial() {
        var aux;
        try {
            aux = eval(document.querySelector('input[type=text][name=\"pantalla\"]').value);
            var total = 1; 
            for (var i = 1; i <= aux; i++) {
                total = total * i; 
            } 
            this.ans = total;
            document.querySelector('input[type=text][name=\"pantalla\"]').value = total;
        }
        catch (err) {
            document.querySelector('input[type=text][name=\"pantalla\"]').value =  "SyntaxError";
        }    
    }
    //función seno
    sin() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.sin(";
    }
    //función coseno
    cos() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.cos(";
    }
    //función tangente
    tan() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.tan(";
    }
    //función senoh
    sinh() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.sinh(";
    }
    //función cosenoh
    cosh() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.cosh(";
    }
    //función tangenteh
    tanh() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.tanh(";
    }
    //función arc seno
    asin() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.asin(";
    }
    //función arc coseno
    acos() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.acos(";
    }
    //función arc tangente
    atan() {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += "Math.atan(";
    }
    //CALCULADORA BASICA
    //función que imprime los dígitos
    digitos(x) {
        document.querySelector('input[type=text][name=\"pantalla\"]').value += Number(x);
    }
    //función que imprime el punto de los decimales
    decimal() {
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
calculadora = new calculadoraCientifica();
//añadimios los nuevos eventos de teclado
document.addEventListener('keydown', function (event) {
    if(event.key === 'Backspace'){//tecla backspace
        event.preventDefault();
        calculadora.deleteOne();
    }
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
    if (event.key === '.') {//tecla .
          calculadora.decimal();
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