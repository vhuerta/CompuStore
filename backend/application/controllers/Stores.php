<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Clase Stores, contiene los metodos para consultar las tiendas.
 */
class Stores extends Custom_Controller {

    /**
     * Construtor
     */
    public function __construct() {
        parent::__construct();
        $this->load->model('Stores_model', 'stores');
    }

    /**
     * Ruta para obtener las sucursales
     *
     * Mapea la siguiente ruta:
     * 		GET http://example.com/stores
     */
    public function index_get() {
        return $this->response($this->stores->findAll(), 200);
    }

}
