class Calculadora{
    //constructor
    constructor() {
        this.memoria = 0;
        this.num1 = "";
		this.num2 = "";
		this.valueOperation = "";
		this.solved = false;
		this.operator = "";
		this.wasReaded = false;
    }
    //función que imprime los dígitos
    digitos(x) {
        if (this.solved) {
			document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
			this.valueOperation = "";
			this.solved = false;
		}
		this.valueOperation += x;
		document.querySelector('input[type=text][name=\"pantalla\"]').value += Number(x);
    }
    //función que imprime el punto de los decimales
    decimal() {
        if (this.solved) {
			document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
			this.valueOperation = "";
			this.solved = false;
		}
		this.valueOperation += ".";
		document.querySelector('input[type=text][name=\"pantalla\"]').value += ".";
    }
    //función asociada a la suma
    suma(){
        if (this.solved) {
			this.valueOperation = document.querySelector('input[type=text][name=\"pantalla\"]').value;
			this.solved = false;
		}
		if (this.valueOperation.length > 0) {
			this.valueOperation += "+";
		}
		document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
        show();
    }
    //función asociada a la resta
    resta(){
        if (this.solved) {
			this.valueOperation = document.querySelector('input[type=text][name=\"pantalla\"]').value;
			this.solved = false;
		}
		if (this.valueOperation.length > 0) {
			this.valueOperation += "-";
		}
		document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
        show();
    }
    //función multiplicación
    multiplicacion() {
        //document.querySelector('input[type=text][name=\"pantalla\"]').value += "*";
        if (this.solved) {
			this.valueOperation = document.querySelector('input[type=text][name=\"pantalla\"]').value;
			this.solved = false;
		}
		if (this.valueOperation.length > 0) {
			this.valueOperation += "*";
		}
		document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
        show();
    }
    //función división
    division() {
        //document.querySelector('input[type=text][name=\"pantalla\"]').value += "/";
        if (this.solved) {
			this.valueOperation = document.querySelector('input[type=text][name=\"pantalla\"]').value;
			this.solved = false;
		}
		if (this.valueOperation.length > 0) {
			this.valueOperation += "/";
		}
		document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
        show();
    }
    //función mrc
    mrc() {
        this.memory = document.querySelector('input[type=text][name=\"pantalla\"]').value;
    }
    //función mMenos
    mMenos() {
        this.memoria = Number(this.memoria) - Number(document.querySelector('input[type=text][name=\"pantalla\"]').value);
    }
    //función mMas
    mMas() {
        this.memoria = Number(this.memoria) + Number(document.querySelector('input[type=text][name=\"pantalla\"]').value);
    }
    //función de borrado
    borrar() {
        this.valueOperation = "";
		document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
    }
    //función igual que evalúa un resultado
    igual() {
        try {
			for (var i=0; i < this.valueOperation.length; i++) {
				if(this.valueOperation[i] == '+') {
					this.operator = "+";
					this.wasReaded = true;
				} else if (this.valueOperation[i] == '-') {
					this.operator = "-";
					this.wasReaded = true;
				} else if (this.valueOperation[i] == '/') {
					this.operator = "/";
					this.wasReaded = true;
				} else if (this.valueOperation[i] == '*') {
					this.operator = "*";
					this.wasReaded = true;
				} else if (this.valueOperation[i] == '%') {
					this.operator = "%";
					this.wasReaded = true;
				} else {
					if (!this.wasReaded) {
						this.num1 += this.valueOperation[i];
					} else {
						this.num2 += this.valueOperation[i];
					}
				}
			}
			document.getElementById('pantalla').value = eval(Number(this.num1) + this.operator + Number(this.num2));
		} catch (err) {
			document.getElementById('pantalla').value = "Error = " + err;
		} finally {
			this.solved = true;
			this.num1 = "";
			this.num2 = "";
			this.wasReaded = false;
		}
	}
    
    //función mod
    mod(){
        if (this.solved) {
			this.valueOperation = document.querySelector('input[type=text][name=\"pantalla\"]').value;
			this.solved = false;
		}
		if (this.valueOperation.length > 0) {
			this.valueOperation += "%";
		}
		document.querySelector('input[type=text][name=\"pantalla\"]').value = "";
    }
    //función raíz cuadrada
    sqrt(){
        var num = Math.sqrt(Number(document.querySelector('input[type=text][name=\"pantalla\"]').value));
		document.querySelector('input[type=text][name=\"pantalla\"]').value = num;
		this.solved = true;
    }
    //función +/-
    masmenos(){
        var aux = Number(document.querySelector('input[type=text][name=\"pantalla\"]').value) * -1;
		this.valueOperation = aux;
		document.querySelector('input[type=text][name=\"pantalla\"]').value = this.valueOperation;
    }
    //función que muestra la memoria
    show(){
        this.valueOperation = Number(this.memoria);
		document.querySelector('input[type=text][name=\"pantalla\"]').value = Number(this.memoria);
		this.solved = true;
    }
}
//creamos la calculadora
calculadora = new Calculadora();
//Añadimos los eventos por teclado
document.addEventListener('keydown', function (event) {
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