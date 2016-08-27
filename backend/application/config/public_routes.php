<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Rutas publicas, este arreglo indica cuales rutas seran publicas y no nesecitaran
 * recibir un token de autentificacion para poder ser llamadas
 */
$config['public_routes'] = array(
    'auth/token'
);
