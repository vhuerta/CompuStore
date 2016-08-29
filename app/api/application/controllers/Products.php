<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Clase Products, contiene los metodos para consultar y hacer busqueda de productos.
 */
class Products extends Custom_Controller {
    /**
     * Construtor
     */
    public function __construct() {
        parent::__construct();
        $this->load->model('Products_model', 'products');
    }

    /**
     * Ruta para obtener los productos
     *
     * Mapea la siguiente ruta:
     * 		GET http://example.com/products
     */
    public function index_get() {
        // Load custom helpers
        $this->load->helper('custom');

        $filters = array(
            'name' => $this->get('name'),
            'key' => $this->get('key'),
        );
        // Count results with filters
        $count = $this->products->count($filters);
        // Generate paginator values
        $limit = (int) $this->get('limit');
        $limit = !empty($limit)? $limit : $this->config->item('pagination')['limit'];
        $paginator = paginator($count->data['count'], $limit, $this->get('page'));
        // Find the products
        $products = $this->products->find($filters, $paginator['limit'], $paginator['offset'])->data;
        $products = $this->products->populate_stocks($products);

        $paginator['records'] = $products;

        return $this->response(array(
            'status' => 'success',
            'message' => 'products.success.find',
            'data' => $paginator
        ), 200);
    }
}
