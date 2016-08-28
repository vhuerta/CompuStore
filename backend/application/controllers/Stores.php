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

    public function index_get() {
        return $this->response($this->stores->findAll(), 200);
    }

}
