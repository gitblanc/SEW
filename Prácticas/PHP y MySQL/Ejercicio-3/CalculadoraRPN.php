<?php

session_start();

class Pila{
    protected $data;
    protected $max;

    public function __construct(){
        $this->data = array();
        $this->size = 0;
    }

    public function push($element){
        $this->data[$this->size] = $element;
        $this->size += 1;
    }

    public function pop(){
        if($this->size > 0){
            $this->size -= 1;
            return $this->data[$this->size];
        }
    }

    public function empty(){
        $this->size = 0;
        $this->data = array();
    }

    public function isEmpty(){
        return $this->size == 0;
    }

    public function getSize(){
        return $this->size;
    }

    public function show(){
        $cad = "";
        for($i = $this->size - 1; $i >= 0; $i--){
            $cad .= "(" . $i . ": \t\t" . $this->data[$i] . ")\n";
        }
        return $cad;
    }
}

class CalculadoraRPN{
    public function __construct(){
        $this->pantalla="";
        $this->pila = new Pila();
    }

    private function pop(){
        return $this->pila->pop();
    }

    private function push($value){
        try{
            $value = floatval($value);
            $this->pila->push($value);
        }catch(Error | Exception ){
            $this->currentPantalla='Error';
        }
    }

    public function show(){
        return $this->pila->show();
    }

    public function getPantalla(){
        return $this->pantalla;
    }

    public function digito($num){
        $this->pantalla = $this->pantalla . $num;
    }

    public function suma(){
        if( $this->pila->getSize() >= 2){
            $n1 = $this->pop();
            $n2 = $this->pop();

            $res = $n1 + $n2;
            $this->push($res);
        }
    }

    public function resta(){
        if( $this->pila->getSize() >= 2){
            $n1 = $this->pop();
            $n2 = $this->pop();

            $res = $n1 - $n2;
            $this->push($res);
        }
    }

    public function multiplicacion(){
        if( $this->pila->getSize() >= 2){
            $n1 = $this->pop();
            $n2 = $this->pop();

            $res = $n1 * $n2;
            $this->push($res);
        }
    }

    public function division(){
        if( $this->pila->getSize() >= 2){
            $n1 = $this->pop();
            $n2 = $this->pop();

            $res = $n1 / $n2;
            $this->push($res);
        }
    }

    public function seno(){
        if($this->pila->getSize() >= 1){
            $n1 = $this->pop();
            $res = sin($n1);
            
            $this->push($res);
        }
    }

    public function coseno(){
        if($this->pila->getSize() >= 1){
            $n1 = $this->pop();
            $res = cos($n1);
            
            $this->push($res);
        }
    }

    public function tangente(){
        if($this->pila->getSize() >= 1){
            $n1 = $this->pop();
            $res = tan($n1);
            
            $this->push($res);
        }
    }

    public function arcseno(){
        if($this->pila->getSize() >= 1){
            $n1 = $this->pop();
            $res = asin($n1);
            
            $this->push($res);
        }
    }

    public function arccoseno(){
        if($this->pila->getSize() >= 1){
            $n1 = $this->pop();
            $res = acos($n1);
            
            $this->push($res);
        }
    }

    public function arctangente(){
        if($this->pila->getSize() >= 1){
            $n1 = $this->pop();
            $res = atan($n1);
            
            $this->push($res);
        }
    }

    public function changeSign(){
        $num = $this->pop();
        $this->push($num*(-1));
    }

    public function enter(){
        $num = $this->pantalla;
        $this->push($num);
        $this->pantalla='';
    }

    public function empty(){
        $this->pantalla='';
        $this->pila->empty();
    }
}

if(!isset($_SESSION['calculadoraRPN'])){
    $c = new CalculadoraRPN();
    $_SESSION['calculadoraRPN'] = $c;
}

if(count($_POST)>0){
    $c = $_SESSION['calculadoraRPN'];

    if(isset($_POST['+'])) $c->suma();
    if(isset($_POST['-'])) $c->resta();
    if(isset($_POST['*'])) $c->multiplicacion();
    if(isset($_POST['/'])) $c->division();
    if(isset($_POST['sin'])) $c->seno();
    if(isset($_POST['cos'])) $c->coseno();
    if(isset($_POST['tan'])) $c->tangente();
    if(isset($_POST['asin'])) $c->arcseno();
    if(isset($_POST['acos'])) $c->arccoseno();
    if(isset($_POST['atan'])) $c->arctangente();
    if(isset($_POST['+/-'])) $c->changeSign();
    if(isset($_POST['='])) $c->enter();
    if(isset($_POST['c'])) $c->empty();
    if(isset($_POST['1'])) $c->digito('1');
    if(isset($_POST['2'])) $c->digito('2');
    if(isset($_POST['3'])) $c->digito('3');
    if(isset($_POST['4'])) $c->digito('4');
    if(isset($_POST['5'])) $c->digito('5');
    if(isset($_POST['6'])) $c->digito('6');
    if(isset($_POST['7'])) $c->digito('7');
    if(isset($_POST['8'])) $c->digito('8');
    if(isset($_POST['9'])) $c->digito('9');
    if(isset($_POST['0'])) $c->digito('0');
    if(isset($_POST['decimal'])) $c->digito('.');
    if(isset($_POST['enter'])) $c->enter();

    $_SESSION['calculadoraRPN'] = $c;
}

echo"
<!DOCTYPE HTML>
<html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <title>Ejercicio 3</title>
        <meta name ='viewport' content ='width=device-width, initial-scale=1.0'>
        <meta name='author' content='Eduardo Blanco Bielsa'>
        <meta name='description' content='Calculadora RPN'>
        <link rel='stylesheet' type='text/css' href='./CalculadoraRPN.css'/>
           
    </head>
    <body>
        <form action='#' method='post' name='Calculadora'>
            <label for='pantalla'>Eduardo Blanco Bielsa - UO285176</label>
            <textarea rows='10' id='pantalla' name='pantalla' lang='es' disabled>";
            
            echo $_SESSION['calculadoraRPN']->show();
            echo "
            </textarea>
            
            <label for='currentnum'>Número:</label>
            <input type='text' id='currentnum' name='currentnum' value='";
            
            echo $_SESSION['calculadoraRPN']->getPantalla();
            echo "
            ' lang='es' readonly/>
                
            <button type='submit' value='sin' name='sin'>sin</button>
            <button type='submit' value='cos' name='cos'>cos</button>
            <button type='submit' value='tan' name='tan'>tan</button>
            <button type='submit' value='+' name='+'>+</button>
            
    
            <button type='submit' value='asin' name='asin'>arcsin</button>
            <button type='submit' value='acos' name='acos'>arccos</button>
            <button type='submit' value='atan' name='atan'>arctan</button>
            <button type='submit' value='-' name='-'>-</button>
            
            <button type='submit' value='1' name='1'>1</button>
            <button type='submit' value='2' name='2'>2</button>
            <button type='submit' value='3' name='3'>3</button>
            <button type='submit' value='/' name='/'>÷</button>   
            
            <button type='submit' value='4' name='4'>4</button>
            <button type='submit' value='5' name='5'>5</button>
            <button type='submit' value='6' name='6'>6</button>
            <button type='submit' value='*' name='*'>x</button>
    
            <button type='submit' value='7' name='7'>7</button>
            <button type='submit' value='8' name='8'>8</button>
            <button type='submit' value='9' name='9'>9</button>
            <button type='submit' value='c' name='c'>C</button>
               
            <button type='submit' value='+/-' name='+/-'>+/-</button>
            <button type='submit' value='0' name='0'>0</button>
            <button type='submit' value='decimal' name='decimal'>.</button>
            
            <button type='submit' value='enter' name='enter'>ENTER</button>
        </form>
    </body>
</html>";
?>