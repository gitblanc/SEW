<?php
session_start();

class CalculadoraMilan{
    protected $memoria;
    protected $pantalla;

    public function __construct(){
        $this->memoria='';
        $this->pantalla='';
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
            $res = eval('return ' . $this->pantalla . ' ;');
            $this->pantalla = $res;
            return $res;
        }catch(Error $e){
            $this->pantalla = 'Error';
        }catch(Exception $e){
            $this->pantalla = 'Error';
        }
    }

    public function borrar(){
        $this->pantalla = '';
    }

    public function mrc(){
        $this->memoria = $this->pantalla;
    }

    public function mMenos(){
        $this->pantalla .= '-'.$this->memoria .'';
    }

    public function mMas(){
        $this->pantalla .= '+'.$this->memoria .'';
    }

    public function getPantalla(){
        return $this->pantalla;
    }

    public function getMemoria(){
        return $this->memoria;
    }
}

class CalculadoraCientifica extends CalculadoraMilan{
    public function __construct(){
        parent::__construct();
        $this->deg = false; //para los radianes
    }

    public function deg(){
        $value = $this->igual();

        if($this->deg == true){
            $this->pantalla .= $value * (pi()/180);
            $this->deg = false;
        }else{
            $this->pantalla .= $value * (180/pi());
            $this->deg = true;
        }
    }

    public function mc(){
        $this->memoria = '';
    }

    public function mr(){
        $this->pantalla .= $this->memoria;
    }

    public function cuadrado(){
        $this->pantalla .= '**2';
    }

    public function potencia(){
        $this->pantalla .= '**';
    }

    public function seno(){
        $this->pantalla .= 'sin(';
    }

    public function coseno(){
        $this->pantalla .= 'cos(';
    }

    public function tan(){
        $this->pantalla .= 'tan(';
    }

    public function potencia10(){
        $this->pantalla .= '10**';
    }

    public function logBase10(){
        $this->pantalla .= 'log10(';
    }

    public function logNeperiano(){
        $this->pantalla .= 'log(';
    }

    public function borrarUltimo(){
        $this->pantalla = substr($this->pantalla,0,-1);
    }

    public function fact(){
        $aux=0;
        try{
            $aux = $this->igual();
            $res = 1;
            for($i = 1; $i <= $aux; $i++){
                $res = $res * $i;
            }
            $this->pantalla = $res;
        }catch (Error $e){
            $this->pantalla = 'Error';
        }catch (Exception $e){
            $this->pantalla ='Error';
        }
    }

    public function parentesisIzq(){
        $this->pantalla .= '(';
    }

    public function parentesisDer(){
        $this->pantalla .= ')';
    }

    public function exp(){
        $this->pantalla .= 'exp(';
    }
}

if(!isset($_SESSION['calc'])){
    $calc = new CalculadoraCientifica();
    $_SESSION['calc'] = $calc;
}

if(count($_POST)>0){
    $c = $_SESSION['calc'];
 
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

     if(isset($_POST['deg'])) $c->deg();
     if(isset($_POST['mc'])) $c->mc();
     if(isset($_POST['mr'])) $c->mr();
     if(isset($_POST['x^2'])) $c->cuadrado();
     if(isset($_POST['x^y'])) $c->potencia();
     if(isset($_POST['sin'])) $c->seno();
     if(isset($_POST['cos'])) $c->coseno();
     if(isset($_POST['('])) $c->parentesisIzq();
     if(isset($_POST[')'])) $c->parentesisDer();
     if(isset($_POST['tan'])) $c->tan();
     if(isset($_POST['10^x'])) $c->potencia10();
     if(isset($_POST['log'])) $c->logBase10();
     if(isset($_POST['ln'])) $c->logNeperiano();
     if(isset($_POST['borraruno'])) $c->borrarUltimo();
     if(isset($_POST['pi'])) $c->pi();
     if(isset($_POST['fact'])) $c->fact();
     if(isset($_POST['Exp'])) $c->exp();

 
     $_SESSION['calc'] = $c;
 }
 echo "
 <!DOCTYPE html>
 <html lang='es'>
 <head>
     <meta charset='UTF-8' />
     <title>Ejercicio 2</title>
     <meta name='viewport' content='width=device-width'>
     <meta name='author' content='Eduardo Blanco Bielsa'>
     <meta name='description' content='Calculadora básica'>
     <link rel='stylesheet' type='text/css' href='./CalculadoraCientifica.css'/>
 </head>
 <body>
     <form action='#' method='post' name='CalculadoraCientifica'>
         <label for='pantalla'>Eduardo Blanco Bielsa - UO285176</label>
         <input type='text' id='pantalla' name='pantalla' value='";
         
         echo $_SESSION['calc']->getPantalla();
         
         echo"' readonly/>
         <button type='submit' value='deg' name='deg'>DEG</button>
         <button type='submit' value='hyp' name='hyp'>HYP</button>
         <button type='submit' value='f-e' name='f-e'>F-E</button>
 
         <button type='submit' value='mc' name='mc'>MC</button>
         <button type='submit' value='mr' name='mr'>MR</button>
         <button type='submit' value='m+' name='m+'>M+</button>
         <button type='submit' value='m-' name='m-'>M-</button>
         <button type='submit' value='ms' name='ms'>MS</button>
 
         <button type='submit' value='x^2' name='x^2'>x<sup>2</sup></button>
         <button type='submit' value='x^y' name='x^y'>x<sup>y</sup></button>
         <button type='submit' value='sin' name='sin'>sin</button>
         <button type='submit' value='cos' name='cos'>cos</button>
         <button type='submit' value='tan' name='tan'>tan</button>
 
         <button type='submit' value='raiz' name='raiz'>√</button>
         <button type='submit' value='10^x' name='10^x'>10<sup>x</sup></button>
         <button type='submit' value='log' name='log'>log</button>
         <button type='submit' value='Exp' name='Exp'>Exp</button>
         <button type='submit' value='%' name='%'>Mod</button>
 
         <button type='submit' value='flecha' name='flecha'>↑</button>
         <button type='submit' value='ce' name='ce'>CE</button>
         <button type='submit' value='c' name='c'>C</button>
         <button type='submit' value='borraruno' name='borraruno'>⌫</button>
         <button type='submit' value='/' name='/'>÷</button>
 
         <button type='submit' value='pi' name='pi'>π</button>
         <button type='submit' value='7' name='7'>7</button>
         <button type='submit' value='8' name='8'>8</button>
         <button type='submit' value='9' name='9'>9</button>
         <button type='submit' value='*' name='*'>x</button>
 
         <button type='submit' value='fact' name='fact'>n!</button>
         <button type='submit' value='4' name='4'>4</button>
         <button type='submit' value='5' name='5'>5</button>
         <button type='submit' value='6' name='6'>6</button>
         <button type='submit' value='-' name='-'>-</button>
 
         <button type='submit' value='+/-' name='+/-'>±</button>
         <button type='submit' value='1' name='1'>1</button>
         <button type='submit' value='2' name='2'>2</button>
         <button type='submit' value='3' name='3'>3</button>
         <button type='submit' value='+' name='+'>+</button>
 
         <button type='submit' value='(' name='('>(</button>
         <button type='submit' value=')' name=')'>)</button>
         <button type='submit' value='0' name='0'>0</button>
         <button type='submit' value='decimal' name='decimal'>.</button>
         <button type='submit' value='=' name='='>=</button>
     </form>
 </body>
 </html>
";
?>