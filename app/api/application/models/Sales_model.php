<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Clase modelo que contiene los metodos para manipular las ventas
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
class Sales_Model extends CI_model {

    /**
     * Crea una nueva venta
     *
     * @param int $store_id
     * @param int $products_id
     * @param int $user_id
     * @return object
     */
    public function create($store_id, $products_id, $user_id) {
        // Primero se descuenta del stock para apartar
        $this->db->where('store_id', $store_id);
        $this->db->where('products_id', $products_id);
        $this->db->where('stock > 0');
        $this->db->set('stock', 'stock-1', FALSE);
        $this->db->update('stocks');
        $affected = $this->db->affected_rows();
        // Si hubo registros afectados es porque habia stock
        if($affected) {
            // Crea la nueva venta y retorna el id
            $this->db->insert('sales', array('store_id' => $store_id, 'products_id' => $products_id, 'users_id' => $user_id));
            $id = $this->db->insert_id();
            return (object)array(
                'status' => 'success',
                'code' => 'sales.success.create',
                'data' => array('id' => $id)
            );
        } else {
            // Fallo porque no habia estock
            return (object)array(
                'status' => 'fail',
                'code' => 'validation.fail.verify',
                'data' => array('products_id' => 'validation.empty_stock')
            );
        }
    }

}
