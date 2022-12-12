<?php
session_start();

class BaseDatos
{
    protected $db;
    protected $lastCommand;
    protected $currentdatabase;
    public function construct()
    {
        $this->lastCommand = "Bienvenido a mi ejercicio 6...";
        $this->currentdatabase = '';
    }
    //Métodos auxiliares
    public function crearConexion()
    {
        $this->db = new mysqli("localhost", "DBUSER2022", "DBPSWD2022");

        if ($this->db->connect_errno) {
            $this->lastCommand = "<p>Error de conexión: " . $this->db->connect_errno . "</p>";
        }else{
            $this->lastCommand = "<p>Conexión con la base de datos establecida...</p>";
        }
    }

    public function cerrarConexion()
    {
        $this->db->close();
    }

    public function executeQuery($query)
    {
        $res = $this->db->query($query);
        if ($res == true) {
            $this->lastCommand = "<p>Consulta ejecutada correctamente...</p>";
        } else {
            $this->lastCommand = "<p>Error en la consulta: " . $query . "</p>";
        }
        return $res;
    }

    public function seleccionarBase()
    {
        $this->crearConexion();
        $this->db->select_db($this->currentdatabase);
    }

    public function getLastCommand(){
        return $this->lastCommand;
    }

    //Métodos para el menú
    public function createDatabase()
    {
        $this->crearConexion();
        $query = "CREATE DATABASE IF NOT EXISTS Ejercicio6 COLLATE utf8_spanish_ci ;";
        $this->executeQuery($query);
        $this->currentdatabase = "Ejercicio6";
        $this->db->select_db($this->currentdatabase);
        $this->lastCommand = "<p>Se ha creado la base de datos de nombre Ejercicio6...</p>";
    }

    public function createTable()
    {
        $this->seleccionarBase();
        $crearTabla = "CREATE TABLE IF NOT EXISTS PruebasUsabilidad (
            dni int not null,
            nombre varchar(120) not null,
            apellidos varchar(120) not null,
            correo varchar(120) not null,
            telefono int not null,
            edad int not null,
            sexo varchar(120) not null,
            nivel_informatica int not null,
            tiempo int not null,
            tarea_correcta boolean not null,
            comentarios varchar(255) not null,
            propuestas varchar(255) not null,
            valoracion int not null);
            ";
        $this->executeQuery($crearTabla);
        $this->lastCommand = "<p>La tabla PruebasUsabilidad se creó correctamente...</p>";
    }

    public function insertarDatos()
    {
        $this->seleccionarBase();
        $dato1 = "INSERT INTO PruebasUsabilidad(dni, nombre, apellidos, correo, telefono, edad, sexo, nivel_informatica, tiempo, tarea_correcta, comentarios, propuestas, valoracion) 
        VALUES(1,'Eduardo','Blanco Bielsa','UO2851764@uniovi.es',123456789,20,'hombre',8,34,1,'buena práctica','hola',8);";
        $dato2 = "INSERT INTO PruebasUsabilidad(dni, nombre, apellidos, correo, telefono, edad, sexo, nivel_informatica, tiempo, tarea_correcta, comentarios, propuestas, valoracion) 
        VALUES(2,'María','Estrada Muñiz','UO2861764@uniovi.es',123456788,21,'mujer',4,57,0,'no me gusta la informática','abandona la carrera',2);";
        $dato3 = "INSERT INTO PruebasUsabilidad(dni, nombre, apellidos, correo, telefono, edad, sexo, nivel_informatica, tiempo, tarea_correcta, comentarios, propuestas, valoracion) 
        VALUES(3,'Alex','Pérez Pérez','UO2851764@uniovi.es',123456787,19,'hombre',5,49,1,'muy fácil','me gustarían menos ejs de javascript',6);";
        $dato4 = "INSERT INTO PruebasUsabilidad(dni, nombre, apellidos, correo, telefono, edad, sexo, nivel_informatica, tiempo, tarea_correcta, comentarios, propuestas, valoracion) 
        VALUES(4,'Manolo','Lama Pérez','UO2841764@uniovi.es',123456786,22,'hombre',2,78,0,'hola','no me gusta php',1);";

        $this->executeQuery('DELETE FROM PruebasUsabilidad;');
        $this->executeQuery($dato1);
        $this->executeQuery($dato2);
        $this->executeQuery($dato3);
        $this->executeQuery($dato4);

        $this->lastCommand = "<p>Los datos se insertaron correctamente...</p>";
    }

    public function buscarDatos()
    {
        $this->seleccionarBase();
        $buscarMayoresDe20 = "SELECT * FROM PruebasUsabilidad where edad > 20;";
        $res = $this->executeQuery($buscarMayoresDe20);
        if ($res) {
            $this->lastCommand = "<p>Personas con más de 20 años:</p>";
            while($row = $res->fetch_array()){
                $this->lastCommand .= "<p>" . $row['nombre'] . " - " . $row['apellidos'] . " - " . $row['correo'] . " - " . $row['edad'] . "</p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al buscar personas con más de 20 años...</p>";
        }
    }

    public function modificarEdad()
    {
        $this->seleccionarBase();
        $modificarEdad = "UPDATE PruebasUsabilidad SET edad = edad+1;";
        $this->executeQuery($modificarEdad);
        $this->lastCommand = "<p>La edad de todos los participantes fue modificada correctamente...</p>";
    }

    public function borrarDatos()
    {
        $this->seleccionarBase();
        $borrar = "DELETE FROM PruebasUsabilidad;";
        $this->executeQuery($borrar);
        $this->lastCommand = "<p>Se borraron todos los datos correctamente...</p>";
    }

    public function generarInforme()
    {
        $this->seleccionarBase();
        $findall = "SELECT * FROM PruebasUsabilidad;";
        $res = $this->executeQuery($findall);

        $numUsers = 0;
        $men = 0;
        $women = 0;
        $edadMedia = 0;
        $tareaCorrecta = 0;
        $nivelInformaticaMedio = 0;
        $tiempoMedio = 0;
        $valoracionMedia = 0;

        if($res){
            $this->lastCommand = "<p>Informe:</p>";
            while($row = $res->fetch_array()){
                $numUsers = $numUsers + 1;

                if ($row['sexo'] == "hombre") {
                    $men = $men + 1;
                } else {
                    $women = $women + 1;
                }

                $edadMedia = $edadMedia + $row['edad'];

                $tareaCorrecta = $tareaCorrecta + $row['tarea_correcta'];

                $nivelInformaticaMedio = $nivelInformaticaMedio + $row['nivel_informatica'];

                $tiempoMedio = $tiempoMedio + $row['tiempo'];

                $valoracionMedia = $valoracionMedia + $row['valoracion'];
            }

            if ($numUsers >= 1) {
                //cálculo de porcentajes y valores
                $men = ($men / $numUsers) * 100;
                $women = ($women / $numUsers) * 100;
                $edadMedia = ($edadMedia / $numUsers);
                $tareaCorrecta = ($tareaCorrecta / $numUsers) * 100;
                $nivelInformaticaMedio = ($nivelInformaticaMedio / $numUsers);
                $tiempoMedio = ($tiempoMedio / $numUsers);
                $valoracionMedia = ($valoracionMedia / $numUsers);

                $this->lastCommand .= "<p>Edad media: " . $edadMedia . "</p>";
                $this->lastCommand .= "<p>Hombres: " . $men . "%</p>";
                $this->lastCommand .= "<p>Mujeres: " . $women . "%</p>";
                $this->lastCommand .= "<p>Nivel de informática medio: " . $nivelInformaticaMedio . "</p>";
                $this->lastCommand .= "<p>Tiempo medio: " . $tiempoMedio . "</p>";
                $this->lastCommand .= "<p>Realizaron la tarea correctamente: " . $tareaCorrecta . "%</p>";
                $this->lastCommand .= "<p>Valoración media: " . $valoracionMedia . "</p>";
            } else {
                $this->lastCommand = "<p>La base de datos está vacía...</p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al generar el informe...</p>";
        }
    }

    public function importarCSV()
    {
        $this->seleccionarBase();
        $fileName = $_FILES["file"]["tmp_name"];

        if($_FILES["file"]["type"] != "application/vnd.ms-excel"){
            $this->lastCommand = "<p>Archivo con formato incorrecto o no cargado...</p>";
            return;
        }

        $filePath = ''.$fileName;

        if(!empty($fileName) && file_exists($filePath)){
            $file = fopen($fileName, "r");
            while (($getData = fgetcsv($file, 10000, ",")) !== FALSE)
            {
                $query = $this->db->prepare('INSERT INTO PruebasUsabilidad(dni,nombre,apellidos,
                correo,telefono,edad,sexo,nivel_informatica,tiempo,tarea_correcta,comentarios,propuestas,valoracion) 
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');

                $query->bind_param('isssiisiiissi',$getData[0],$getData[1],$getData[2],$getData[3],$getData[4],$getData[5],$getData[6],$getData[7],$getData[8],
                $getData[9],$getData[10],$getData[11],$getData[12]);
                $res = $query->execute();
                if(isset($res))
                {
                    $this->lastCommand = "<p>CSV importado con éxito</p>";   
                }
                else {
                    $this->lastCommand = "<p>Error al importar el CSV.</p>";
                }
            }
            fclose($file);  
        }
    }

    public function exportarCSV()
    {
        $this->seleccionarBase();
        $findall = "SELECT * FROM PruebasUsabilidad;";
        $res = $this->executeQuery($findall);
        if ($res) {
            $file = fopen('pruebasUsabilidad.csv', 'w');

            while($row = mysqli_fetch_assoc($res)){
                fputcsv($file, $row);
            }
            fclose($file);
        } else {
            $this->lastCommand = "<p>Error al exportar el CSV...</p>";
            return;
        }

        $fileName = basename('pruebasUsabilidad.csv');
        $filePath = ''.$fileName;
        if(!empty($fileName) && file_exists($filePath)){
            // Define headers
            header("Cache-Control: public");
            header("Content-Description: File Transfer");
            header("Content-Disposition: attachment; filename=$fileName");
            header("Content-Type: text/csv");
            header("Content-Transfer-Encoding: binary");
            
            // Read the file
            readfile($filePath);
            $this->lastCommand = "<p>Datos exportados correctamente...</p>";
            exit;
        }else{
            $this->lastCommand = "<p>Error al exportar CSV...</p>";
            return;
        }
    }
}

if(!isset($_SESSION['database'])){
    $db = new BaseDatos();
    $db->crearConexion();
    $_SESSION['database'] = $db;
}

if (count($_POST) > 0) {

    $db = $_SESSION['database'];

    if(isset($_POST['crearBD'])) $db->createDatabase();
    if(isset($_POST['crearTabla']))$db->createTable();
    if(isset($_POST['insertar']))$db->insertarDatos();
    if(isset($_POST['buscar']))$db->buscarDatos();
    if(isset($_POST['modificar']))$db->modificarEdad();
    if(isset($_POST['borrar']))$db->borrarDatos();
    if(isset($_POST['informe']))$db->generarInforme();
    if(isset($_POST['descargar']))$db->exportarCSV();
    if(isset($_POST['cargar']))$db->importarCSV();

    $db->cerrarConexion();
    $_SESSION['database'] = $db;
}

echo "
<!DOCTYPE HTML>
<html lang='es'>
    <head>
        <meta charset='UTF-8' />
        <title>Ejercicio 6</title>
        <link rel='stylesheet' type='text/css' href='./Ejercicio6.css' />
    
        <meta name='author' content='Eduardo Blanco Bielsa' />
        <meta name='description' content='Ejercicio 6' />
        <meta name ='viewport' content ='width=device-width, initial-scale=1.0' />
           
    </head>
    <body>
        <h1>Gestión de una base de datos</h1>
        <h2>Hecho por Eduardo Blanco Bielsa - UO285176</h2>
        <form action='#' method='post' name='database' enctype='multipart/form-data'>
            <p><input type='submit' value='Crear Base de Datos' name='crearBD'/></p>
            <p><input type='submit' value='Crear una tabla' name='crearTabla'/></p>
            <p><input type='submit' value='Insertar datos en una tabla' name='insertar'/></p>
            <p><input type='submit' value='Buscar datos en una tabla' name='buscar'/></p>
            <p><input type='submit' value='Modificar datos en una tabla' name='modificar'/></p>
            <p><input type='submit' value='Borrar datos de una tabla' name='borrar'/></p>
            <p><input type='submit' value='Generar Informe' name='informe'/></p>
            <p><input type='submit' value='Descargar CSV' name='descargar'/></p>
            <label for='archivo'>Cargar datos</label>
            <p><input type='file' id='archivo' name='file'/></p>
            <p><input type='submit' value='Cargar datos al CSV' name='cargar'/></p>
        </form>

        <section><h3>Último comando ejecutado:</h3>";
        echo $_SESSION['database']->getLastCommand();
        echo "</section>
    </body>
</html>";
?>