<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Clase modelo que contiene los metodos para manipular y consultar las tiendas
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
class Products_Model extends CI_model {

    /**
     *  Aplica los filtros al objeto db para despues poder hacer la consulta,
     *  esta separado para poderse reutilizar con el count
     *
     * @param array $filters Filtros para la busqueda
     * @param int|boolean $limit Limite de la busqueda
     * @param int|boolean $offset Registros a saltar
     * @return object
     */
    private function _filters($filters, $limit = false, $offset = false) {
        if(isset($filters['name']) && !empty($filters['name'])) { // Si trae name
            $this->db->like('name', $filters['name'], 'both');
        }
        if(isset($filters['key']) && !empty($filters['key'])) { // Si trae key
            $this->db->like('key', $filters['key'], 'both');
        }

        if($limit) {
                $this->db->limit($limit, $offset);
        }
    }

    /**
     * Cuenta los productos que coincidan con los filtros enviados
     *
     * @param array $filters Filtros para la busqueda
     * @return object
     */
    public function count($filters) {
        $this->_filters($filters);
        $count = $this->db->count_all_results('products');
        return (object)array(
            'status' => 'success',
            'code' => 'products.success.count',
            'data' => array('count' => $count)
        );
    }

    /**
     * Busca los productos con los filtros enviados
     *
     * @param array $filters Filtros para la busqueda
     * @param int|boolean $limit Limite de la busqueda
     * @param int|boolean $offset Registros a saltar
     * @return object
     */
    public function find($filters, $limit = false, $offset = false) {
        $this->_filters($filters, $limit, $offset);
        $products = $this->db->get('products')->result();
        return (object)array(
            'status' => 'success',
            'code' => 'products.success.find',
            'data' => $products
        );
    }

    /**
     * Agrega la infomacion de los stocks a los productos
     *
     * @param array $products arreglo de productos con id
     * @return array Los productos mas la informacion de los stocks
     */
    public function populate_stocks($products) {

        foreach($products as &$p) {
            $this->db->select('s.id, s.name, st.stock');
            $this->db->from('stores AS s');
            $this->db->join('stocks AS st', 's.id = st.store_id', 'left');
            $this->db->where('st.products_id', $p->id);
            $p->stocks = $this->db->get()->result();
        }

        return $products;
    }
}
