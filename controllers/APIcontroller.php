<?php

namespace Controllers;
use Model\Servicio;

class APIcontroller {

    public static function index() {
        $sevicios = Servicio::all();
        echo json_encode($sevicios);
    }
}