<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class APIcontroller {

    public static function index() {
        $sevicios = Servicio::all();
        echo json_encode($sevicios);
    }


    public static function guardar() {
        // Almace la cita y devuelve el ID
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();
        $id = $resultado['id'];

        // Almacena la cita y el servicio
        $idServicios = explode(",", $_POST['servicios']);

        foreach($idServicios as $idServicio) {
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }
        echo json_encode(['resultado' => $resultado]);
    }

    public static function eliminar() {
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            session_start();
            $id = $_POST['id'];
            $cita = Cita::find($id);
            $cita->eliminar();
            $_SESSION['cita_eliminada'] = true;

            header('Location:' . $_SERVER['HTTP_REFERER']);
        }
    }
}