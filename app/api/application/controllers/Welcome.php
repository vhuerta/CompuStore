<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Clase Products, contiene los metodos para consultar y hacer busqueda de productos.
 */
class Welcome extends Custom_Controller {
    /**
     * Construtor
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * Ruta para obtener los productos
     *
     * Mapea la siguiente ruta:
     * 		GET http://example.com/products
     */
    public function index_get() {
        return $this->response(array(
            'status' => 'success',
            'message' => 'welcome.success.get',
            'data' => array('by' => 'Victor Huerta, vhuertahnz@gmail.com')
        ), 200);
    }
}
