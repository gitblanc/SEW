<?php
session_start();
class Evangelion{
    protected $db;
    protected $lastCommand;
    protected $currentdatabase;

    public function construct()
    {
        $this->lastCommand = "Bienvenido a mi ejercicio 7, una base de datos relacional de la serie de televisión Evangelion...";
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
    public function seleccionarBase()
    {
        $this->crearConexion();
        $this->db->select_db($this->currentdatabase);
    }

    public function getLastCommand(){
        return $this->lastCommand;
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

    //Métodos principales
    public function createDatabase()
    {
        $this->crearConexion();
        $query = "CREATE DATABASE IF NOT EXISTS ejercicio7 COLLATE utf8_spanish_ci ;";
        $this->executeQuery($query);
        $this->currentdatabase = "ejercicio7";
        $this->db->select_db($this->currentdatabase);
        $this->lastCommand = "<p>Se ha creado la base de datos de nombre ejercicio7...</p>";
    }

    public function createTables()
    {
        $this->seleccionarBase();
        $t1 = "CREATE TABLE IF NOT EXISTS `Pais`(
            `id_p` int NOT NULL,
            `nombre_pais` varchar(120) NOT NULL,
            PRIMARY KEY (`id_p`)
        );";
        
        $t2 = "CREATE TABLE IF NOT EXISTS `Superior`(
            `id_s` int NOT NULL,
            `nombre` varchar(120) NOT NULL,
            `nacionalidad` varchar(120) NOT NULL,
            PRIMARY KEY(`id_s`)
        );";
        
        $t3 = "CREATE TABLE IF NOT EXISTS `Eva`(
            `id_eva` int NOT NULL,
            `color` varchar(120) NOT NULL,
            `arma` varchar(120) NOT NULL,
            `id_pil` int NOT NULL,
            `id_pais` int NOT NULL,
            `id_a` int NOT NULL,
            PRIMARY KEY(`id_eva`)
        );";
        
        $t4 = "CREATE TABLE IF NOT EXISTS `Piloto`(
            `id_p` int NOT NULL,
            `nombre` varchar(120) NOT NULL,
            `apellidos` varchar(120) NOT NULL,
            `nacionalidad` varchar(120) NOT NULL,
            `edad` int NOT NULL,
            `id_s` int NOT NULL,
            PRIMARY KEY(`id_p`)
        );";
        
        $t5 = "CREATE TABLE IF NOT EXISTS `Angel`(
            `id_a` int NOT NULL,
            `nombre` varchar(120) NOT NULL,
            `poder` varchar(120) NOT NULL,
            PRIMARY KEY(`id_a`)
        );";
        
        $t6 = "ALTER TABLE `Eva` ADD CONSTRAINT `Eva_fk0` FOREIGN KEY (`id_pil`) REFERENCES `Piloto`(`id_p`);";
        
        $t7 = "ALTER TABLE `Piloto` ADD CONSTRAINT `Piloto_fk0` FOREIGN KEY (`id_s`) REFERENCES `Superior`(`id_s`);";
        
        $t8 = "ALTER TABLE `Eva` ADD CONSTRAINT `Eva_fk1` FOREIGN KEY (`id_pais`) REFERENCES `Pais`(`id_p`);";
        
        $t9 = "ALTER TABLE `Eva` ADD CONSTRAINT `Eva_fk2` FOREIGN KEY (`id_a`) REFERENCES `Angel`(`id_a`);";
        $this->executeQuery($t1);
        $this->executeQuery($t2);
        $this->executeQuery($t3);
        $this->executeQuery($t4);
        $this->executeQuery($t5);
        $this->executeQuery($t6);
        $this->executeQuery($t7);
        $this->executeQuery($t8);
        $this->executeQuery($t9);

        $d1 = "INSERT INTO `Pais` (`id_p`, `nombre_pais`) VALUES (1, 'Japon');";
        $d2 = "INSERT INTO `Pais` (`id_p`, `nombre_pais`) VALUES (2, 'España');";
        $d3 = "INSERT INTO `Pais` (`id_p`, `nombre_pais`) VALUES (3, 'Alemania');";
        $d4 = "INSERT INTO `Angel` (`id_a`, `nombre`, `poder`) VALUES (1, 'N1', 'Lanzallamas');";
        $d5 = "INSERT INTO `Angel` (`id_a`, `nombre`, `poder`) VALUES (2, 'N2', 'Espada');";
        $d6 = "INSERT INTO `Angel` (`id_a`, `nombre`, `poder`) VALUES (3, 'N3', 'Láser');";
        $d7 = "INSERT INTO `Angel` (`id_a`, `nombre`, `poder`) VALUES (4, 'N4', 'Teleport');";
        $d8 = "INSERT INTO `Superior` (`id_s`, `nombre`, `nacionalidad`) VALUES (1, 'Katsuragi', 'japonesa');";
        $d9 = "INSERT INTO `Piloto` (`id_p`, `nombre`, `apellidos`, `nacionalidad`, `edad`, `id_s`) VALUES (1, 'Shinji', 'Ikari', 'japonesa', '18', 1);";
        $d10 = "INSERT INTO `Piloto` (`id_p`, `nombre`, `apellidos`, `nacionalidad`, `edad`, `id_s`) VALUES (0, 'Rei', 'Ayanami', 'japonesa', '18', 1);";
        $d11 = "INSERT INTO `Piloto` (`id_p`, `nombre`, `apellidos`, `nacionalidad`, `edad`, `id_s`) VALUES (2, 'Asuka', 'Uoriu', 'alemana', '18', 1);";
        $d12 = "INSERT INTO `Piloto` (`id_p`, `nombre`, `apellidos`, `nacionalidad`, `edad`, `id_s`) VALUES (3, 'Tôji', 'Suzuhara', 'japonesa', '18', 1);";
        $d13 = "INSERT INTO `Eva` (`id_eva`, `color`, `arma`, `id_pais`, `id_pil`, `id_a`) VALUES (0, 'azul', 'rifle', 1, 0, 1);";
        $d14 = "INSERT INTO `Eva` (`id_eva`, `color`, `arma`, `id_pais`, `id_pil`, `id_a`) VALUES (1, 'violeta', 'cuchillo', 1, 1, 2);";
        $d15 = "INSERT INTO `Eva` (`id_eva`, `color`, `arma`, `id_pais`, `id_pil`, `id_a`) VALUES (2, 'rojo', 'dientes', 3, 2, 3);";
        $d16 = "INSERT INTO `Eva` (`id_eva`, `color`, `arma`, `id_pais`, `id_pil`, `id_a`) VALUES (3, 'azul', 'escopeta', 2, 3, 4);";
        
        $this->executeQuery($d1);
        $this->executeQuery($d2);
        $this->executeQuery($d3);
        $this->executeQuery($d4);
        $this->executeQuery($d5);
        $this->executeQuery($d6);
        $this->executeQuery($d7);
        $this->executeQuery($d8);
        $this->executeQuery($d9);
        $this->executeQuery($d10);
        $this->executeQuery($d11);
        $this->executeQuery($d12);
        $this->executeQuery($d13);
        $this->executeQuery($d14);
        $this->executeQuery($d15);
        $this->executeQuery($d16);
        $this->lastCommand = "<p>Los datos se insertaron correctamente...</p>";
    }

    public function buscarPilotos()
    {
        $this->seleccionarBase();
        $res = $this->executeQuery("SELECT * FROM Piloto;");
        if ($res) {
            $this->lastCommand = "<p>Pilotos:</p>";
            while($row = $res->fetch_array()){
                $this->lastCommand .= "<p>" . $row['nombre'] . "  " . $row['apellidos'] . " <img src='./img/" . $row['nombre'] .  ".jpg' alt='" . $row['nombre'] ."'/></p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al buscar los pilotos...</p>";
        }
    }

    public function buscarEvas()
    {
        $this->seleccionarBase();
        $res = $this->executeQuery("SELECT * FROM Eva;");
        if ($res) {
            $this->lastCommand = "<p>Evas:</p>";
            while($row = $res->fetch_array()){
                $this->lastCommand .= "<p>Eva" . $row['id_eva'] . " - Arma: " . $row['arma'] . " <img src='./img/" . $row['id_eva'] .  ".jpg' alt='eva" . $row['id_eva'] ."'/></p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al buscar los eva...</p>";
        }
    }

    public function buscarAngeles()
    {
        $this->seleccionarBase();
        $res = $this->executeQuery("SELECT * FROM Angel;");
        if ($res) {
            $this->lastCommand = "<p>Ángeles:</p>";
            while($row = $res->fetch_array()){
                $this->lastCommand .= "<p>" . $row['nombre'] . " - Poder: " . $row['poder'] . " <img src='./img/" . $row['nombre'] .  ".jpg' alt='" . $row['nombre'] ."'/></p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al buscar los ángeles...</p>";
        }
    }

    public function buscarSuperiores()
    {
        $this->seleccionarBase();
        $res = $this->executeQuery("SELECT * FROM Superior;");
        if ($res) {
            $this->lastCommand = "<p>Superiores:</p>";
            while($row = $res->fetch_array()){
                $this->lastCommand .= "<p>" . $row['nombre'] . " <img src='./img/" . $row['nombre'] .  ".jpg' alt='" . $row['nombre'] ."'/></p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al buscar los superiores...</p>";
        }
    }

    public function buscarPilotosConSusEva()
    {
        $this->seleccionarBase();
        $res = $this->executeQuery("SELECT * FROM Piloto;");
        if ($res) {
            $this->lastCommand = "<p>Pilotos y sus eva:</p>";
            while($row = $res->fetch_array()){
                $eva = $this->buscarEvaPorPiloto($row['id_p']);
                $this->lastCommand .= "<p>" . $row['nombre'] . "  " . $row['apellidos'] . " <img src='./img/" . $row['nombre'] .  ".jpg' alt='" . $row['nombre'] ."'/> pilota el Eva" . $eva . " <img src='./img/" . $eva .  ".jpg' alt='" . $eva ."'/></p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al buscar los pilotos...</p>";
        }
    }

    public function buscarEvaPorPiloto($idPiloto)
    {
        $query = "SELECT id_eva FROM Eva WHERE id_pil = ?";
        $res = $this->db->prepare($query);
        $res->bind_param('i', $idPiloto);
        $result = $res->execute();
        $result = $res->get_result();
        $result = $result->fetch_array()[0];
        return $result;
    }

    public function buscarLuchas()
    {
        $this->seleccionarBase();
        $res = $this->executeQuery("SELECT * FROM Piloto;");
        if ($res) {
            $this->lastCommand = "<p>Luchas:</p>";
            while($row = $res->fetch_array()){
                $eva = $this->buscarEvaPorPiloto($row['id_p']);
                $angel = $this->buscarAngelPorEva($eva);
                $this->lastCommand .= "<p>" . $row['nombre'] . "  " . $row['apellidos'] . " <img src='./img/" . $row['nombre'] .  ".jpg' alt='" . $row['nombre'] ."'/> pilota el Eva" . $eva . " <img src='./img/" . $eva .  ".jpg' alt='" . $eva ."'/>
                y lucha contra el ángel " . $angel . " <img src='./img/" . $angel .  ".jpg' alt='" . $angel ."'/></p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al buscar los pilotos...</p>";
        }
    }

    public function buscarAngelPorEva($idEva)
    {
        $query = "SELECT a.nombre FROM Eva e, Angel a WHERE e.id_eva = ? AND e.id_a = a.id_a";
        $res = $this->db->prepare($query);
        $res->bind_param('i', $idEva);
        $result = $res->execute();
        $result = $res->get_result();
        $result = $result->fetch_array()[0];
        return $result;
    }

    public function listarEjecucion()
    {
        $this->seleccionarBase();
        $res = $this->executeQuery("SELECT * FROM Piloto;");
        if ($res) {
            $this->lastCommand = "<p>Ejecución completa:</p>";
            while($row = $res->fetch_array()){
                $eva = $this->buscarEvaPorPiloto($row['id_p']);
                $angel = $this->buscarAngelPorEva($eva);
                $jefe = $this->buscarSuperior($row['id_s']);
                $this->lastCommand .= "<p>Superior: " . $jefe . " <img src='./img/" . $jefe .  ".jpg' alt='" . $jefe ."'/> dirige a " . $row['nombre'] . "  " . $row['apellidos'] . " <img src='./img/" . $row['nombre'] .  ".jpg' alt='" . $row['nombre'] ."'/> pilota el Eva" . $eva . " <img src='./img/" . $eva .  ".jpg' alt='" . $eva ."'/>
                y lucha contra el ángel " . $angel . " <img src='./img/" . $angel .  ".jpg' alt='" . $angel ."'/></p>";
            }
        } else {
            $this->lastCommand = "<p>Hubo un error al buscar los pilotos...</p>";
        }
    }

    public function buscarSuperior($idS)
    {
        $query = "SELECT nombre FROM Superior  WHERE id_s = ?";
        $res = $this->db->prepare($query);
        $res->bind_param('i', $idS);
        $result = $res->execute();
        $result = $res->get_result();
        $result = $result->fetch_array()[0];
        return $result;
    }

}

if(!isset($_SESSION['evangelion'])){
    $e = new Evangelion();
    $e->crearConexion();
    $_SESSION['evangelion'] = $e;
}

if(count($_POST)>0){
    $e = $_SESSION['evangelion'];

    if(isset($_POST['pilotos']))  $e->buscarPilotos();
    if(isset($_POST['crearBD'])) $e->createDatabase();
    if(isset($_POST['crearTabla']))$e->createTables();
    if(isset($_POST['evas']))  $e->buscarEvas();
    if(isset($_POST['angeles']))  $e->buscarAngeles();
    if(isset($_POST['superiores']))  $e->buscarSuperiores();
    if(isset($_POST['pilotoseva']))  $e->buscarPilotosConSusEva();
    if(isset($_POST['lucha']))  $e->buscarLuchas();
    if(isset($_POST['direccion']))  $e->listarEjecucion();
    
    $_SESSION['evangelion'] = $e;
}

echo "
<!DOCTYPE HTML>
<html lang='es'>
    <head>
        <meta charset='UTF-8' />
        <title>Ejercicio 7</title>
        <link rel='stylesheet' type='text/css' href='./Ejercicio7.css' />
    
        <meta name='author' content='Eduardo Blanco Bielsa' />
        <meta name='description' content='Ejercicio 7' />
        <meta name ='viewport' content ='width=device-width, initial-scale=1.0' />
           
    </head>
    <body>
        <h1>Base de datos de Evangelion</h1>
        <h2>Hecho por Eduardo Blanco Bielsa - UO285176</h2>
        <form action='#' method='post' name='database' enctype='multipart/form-data'>
            <input type='submit' value='Crear Base de Datos' name='crearBD'/>
            <input type='submit' value='Crear datos' name='crearTabla'/>
            <input type='submit' value='Listar pilotos' name='pilotos'/>
            <input type='submit' value='Listar evas' name='evas'/>
            <input type='submit' value='Listar ángeles' name='angeles'/>
            <input type='submit' value='Listar superiores' name='superiores'/>
            <input type='submit' value='Listar pilotos y sus eva' name='pilotoseva'/>
            <input type='submit' value='Listar luchas' name='lucha'/>
            <input type='submit' value='Listar ejecución' name='direccion'/>
        </form>
        <p></p>
        <strong>Último comando ejecutado:</strong>
        <section>";
        echo $_SESSION['evangelion']->getLastCommand();
        echo "</section>
    </body>
</html>";
?>