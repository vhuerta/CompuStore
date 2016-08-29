<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Clase modelo que contiene los metodos para manipular y consultar los productos
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
class Stores_Model extends CI_model {

    /**
     * Recupera todas las tiendas de la base de datos
     *
     * @return object
     */
    public function findAll() {
        $stores = $this->db->get('stores')->result();
        return (object)array(
            'status' => 'success',
            'code' => 'stores.success.find',
            'data' => $stores
        );
    }

}
