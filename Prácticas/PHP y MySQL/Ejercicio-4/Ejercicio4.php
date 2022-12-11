<?php
//api usada -> https://commodities-api.com/
session_start();

class Petroleo
{
    public function __construct()
    {
        $this->apiKey = 'vktsm2fdyb1jij0b2defg9j146y139thtgq2e8c60av331tcnb98soymh2gz';
        $this->moneda = 'USD';
        $this->precioBrent = "";
        $this->precioWti = "";
        $this->error = false;
        $this->errorMssg = '';
        $this->exito = false;
    }

    public function mostrarPrecios()
    {
        if($this->exito == true){
            $res = "<h3>Precio del petróleo por barril</h3>";
            $res .= "<p>Precio del Brent oil en " . $this->moneda . ": " . $this->precioBrent . "</p>";
            $res .= "<p>Precio del Wti oil en " . $this->moneda . ": " . $this->precioWti . "</p>";
            return $res;
        }
        if ($this->error == true) 
        {
            return $this->errorMssg;
        }
    }

    public function obtenerDatos($fecha)
    {
        $url = 'https://commodities-api.com/api/' . $fecha . '?access_key=' . $this->apiKey . '&base=' . $this->moneda . '&symbols=WTIOIL,BRENTOIL';
        $c = curl_init($url);
        curl_setopt($c, CURLOPT_RETURNTRANSFER, true);

        $res = curl_exec($c);
        curl_close($c);

        $respuesta = json_decode($res, true);

         if ($respuesta['data']['success'] == true) 
         {
            $this->exito = true;
            $this->precioBrent = 1 / $respuesta['data']['rates']['BRENTOIL'];
            $this->precioWti = 1 / $respuesta['data']['rates']['WTIOIL'];
         }else{
             $this->errorMssg = $respuesta['data']['error']['info'];
             $this->error =  true;
         }
    }

    public function getDate()
    {
        return "20". date('y-m-d',(strtotime ('-1 day', strtotime(date('y-m-d')))));
    }
}

if(!isset($_SESSION['petrol'])){
    $app = new Petroleo();
    $_SESSION['petrol'] = $app;
}

if (count($_POST) > 0) {
    $app = $_SESSION['petrol'];

    if (!isset($_POST['fecha'])) {
        echo "Por favor, selecciona una fecha";
    } else {
        $fecha = $_POST['fecha'];
        if(isset($_POST['datos'])) $app->obtenerDatos($fecha);
    }

    $_SESSION['petrol'] = $app;
}

echo "
<!DOCTYPE HTML>
<html lang='es'>
    <head>
        <meta charset='UTF-8' />
        <title>Ejercicio 4</title>
        <link rel='stylesheet' type='text/css' href='./Ejercicio4.css' />
    
        <meta name='author' content='Eduardo Blanco Bielsa' />
        <meta name='description' content='Ejercicio 4' />
        <meta name ='viewport' content ='width=device-width, initial-scale=1.0' />
           
    </head>
    <body>
            <h1>Precio del petróleo por fecha</h1>
            <h2>Hecho por Eduardo Blanco Bielsa - UO285176</h2>
            <form action='#' method='post' name='api'>
                <p><label for='fecha'>Fecha del precio del barril</label><p>";

            echo "<p><input type='date' id='fecha'  name='fecha' step='1' min='2010-01-01' max='";
            echo $_SESSION['petrol']->getDate();
            echo "' value = '";
            echo $_SESSION['petrol']->getDate();
            echo"'/></p>";
            echo "
                <input type='submit' name='datos' value='Cargar datos'/>
            </form>";
            echo $_SESSION['petrol']->mostrarPrecios();
        echo "
    </body>
</html>
";
?>