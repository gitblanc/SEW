<?php
session_start();

class CalculadoraMilan{
    protected $memoria;
    protected $pantalla;

    public function __construct(){
        $this->memoria="";
        $this->pantalla="";
    }

    public function operationOrDigit($val){
        $this->pantalla = $this->pantalla .$val;
    }

    public function raiz(){
        $this->pantalla = eval("return sqrt($this->pantalla);");
    }

    public function masmenos(){
        $this->pantalla = eval("return (-1)*($this->pantalla);");
    }

    public function igual(){
        try{
            $res = eval("return $this->pantalla;");
            $this->pantalla = $res;
            return $res;
        }catch(Error $e){
            $this->pantalla = "Error";
        }catch(Exception $e){
            $this->pantalla = "Error";
        }
    }

    public function borrar(){
        $this->pantalla = '';
    }

    public function mrc(){
        $this->memoria = $this->pantalla;
    }

    public function mMenos(){
        $this->pantalla .= '-'.$this->memoria ."";
    }

    public function mMas(){
        $this->pantalla .= '+'.$this->memoria ."";
    }

    public function getPantalla(){
        return $this->pantalla;
    }

    public function getMemoria(){
        return $this->memoria;
    }
}

if(!isset($_SESSION['calculadoraMilan'])){
    $calculadoraMilan = new CalculadoraMilan();
    $_SESSION['calculadoraMilan'] = $calculadoraMilan;
}

if(count($_POST)>0){
    $c = $_SESSION['calculadoraMilan'];
 
     if(isset($_POST['mrc'])) $c->mrc();
     if(isset($_POST['m-'])) $c->mMenos();
     if(isset($_POST['m+'])) $c->mMas();
     if(isset($_POST['/'])) $c->operationOrDigit('/');
     if(isset($_POST['%'])) $c->operationOrDigit('%');
     if(isset($_POST['raiz'])) $c->raiz();
     if(isset($_POST['+/-'])) $c->masmenos();
 
     if(isset($_POST['7'])) $c->operationOrDigit('7');
     if(isset($_POST['8'])) $c->operationOrDigit('8');
     if(isset($_POST['9'])) $c->operationOrDigit('9');
     if(isset($_POST['*'])) $c->operationOrDigit('*');
 
     if(isset($_POST['4'])) $c->operationOrDigit('4');
     if(isset($_POST['5'])) $c->operationOrDigit('5');
     if(isset($_POST['6'])) $c->operationOrDigit('6');
     if(isset($_POST['-'])) $c->operationOrDigit('-');
 
     if(isset($_POST['1'])) $c->operationOrDigit('1');
     if(isset($_POST['2'])) $c->operationOrDigit('2');
     if(isset($_POST['3'])) $c->operationOrDigit('3');
     if(isset($_POST['+'])) $c->operationOrDigit('+');
 
     if(isset($_POST['0'])) $c->operationOrDigit('0');
     if(isset($_POST['decimal'])) $c->operationOrDigit('.');
     if(isset($_POST['c'])) $c->borrar();
     if(isset($_POST['='])) $c->igual();
 
     $_SESSION['calculadoraMilan'] = $c;
 }
 
echo "
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8' />
    <title>Ejercicio 1</title>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta name='author' content='Eduardo Blanco Bielsa'>
    <meta name='DESCRIPTION' content='Calculadora Milan'>
    <link rel='stylesheet' type='text/css' href='./CalculadoraMilan.css'/>
</head>
    <body>
        <form action='#' method='post' name='CalculadoraMilan'>
            <label for='pantalla'>Eduardo Blanco Bielsa - UO285176</label>
            <input type='text' id='pantalla' name='pantalla' value = '";
            echo $_SESSION['calculadoraMilan']->getPantalla();

            
            echo"' title= 'res' readonly/>
            <button type='submit' value='mrc' name='mrc'>MRC</button>
            <button type='submit' value='m-' name='m-'>M-</button>
            <button type='submit' value='m+' name='m+'>M+</button>
            <button type='submit' value='/' name='/'>/</button>
            <button type='submit' value='%' name='%'>%</button>
            <button type='submit' value='raiz' name='raiz'>√</button>
            <button type='submit' value='+/-' name='+/-'>+/-</button>
			<button type='submit' value='*' name='*'>*</button>
            <button type='submit' value='7' name='7'>7</button>
            <button type='submit' value='8' name='8'>8</button>
            <button type='submit' value='9' name='9'>9</button>
            <button type='submit' value='-' name='-'>-</button>
            <button type='submit' value='4' name='4'>4</button>
            <button type='submit' value='5' name='5'>5</button>
            <button type='submit' value='6' name='6'>6</button>
            <button type='submit' value='+' name='+'>+</button>
            <button type='submit' value='1' name='1'>1</button>
            <button type='submit' value='2' name='2'>2</button>
            <button type='submit' value='3' name='3'>3</button>
            <button type='submit' value='c' name='c'>ON/C</button>
            <button type='submit' value='0' name='0'>0</button>
            <button type='submit' value='.' name='decimal'>.</button>
            <button type='submit' value='=' name='='>=</button>
        </form>
    </body>
</html>
";

?>