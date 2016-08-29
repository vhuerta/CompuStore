<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Clase Sales, contiene los metodos para hacer una compra.
 */
class Sales extends Custom_Controller {
    /**
     * Construtor
     */
    public function __construct() {
        parent::__construct();
        $this->load->model('Sales_model', 'sales');
    }

    /**
     * Ruta para crear una venta
     *
     * Mapea la siguiente ruta:
     * 		GET http://example.com/products
     */
    public function index_post() {
        $this->form_validation->set_data(array(
            'store_id' => $this->post('store_id'),
            'products_id' => $this->post('products_id')
        ));
        if($this->form_validation->run('sales_post')) {
            $result = $this->sales->create($this->post('store_id'), $this->post('products_id'), $this->current_user->id);
            $this->response($result, $result->status === 'success'? 200 : 400);
        } else {
            return $this->_validation_errors($this->form_validation->error_array());
        }
    }
}
