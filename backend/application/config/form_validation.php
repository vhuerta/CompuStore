<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$config = array(
    'token_post' => array(
        array(
            'field' => 'username',
            'label' => 'Username',
            'rules' => 'required',
            'errors' => array(
                'required' => 'validation.required',
            ),
        ),
        array(
            'field' => 'password',
            'label' => 'Password',
            'rules' => 'required',
            'errors' => array(
                'required' => 'validation.required',
            ),
        )
    ),
    'sales_post' => array(
        array(
            'field' => 'products_id',
            'label' => 'products_id',
            'rules' => array(
                'required',
                'numeric',
                array('product_exists',function($value) {
                    $CI = &get_instance();
                    if(!empty($value)) {
                        $CI->db->where('id', $value);
                        $product = $CI->db->get('products')->row();
                        if(!empty($product)) {
                            return true;
                        }
                    }
                    return false;
                }),
                array('product_in_stock',function($value) {
                    $CI = &get_instance();
                    if(!empty($value)) {
                        $CI->db->where('products_id', $value);
                        $CI->db->where('store_id', $CI->input->post('store_id'));
                        $stock = $CI->db->get('stocks')->row();
                        if(!empty($stock) && $stock->stock > 0) {
                            return true;
                        }
                    }
                    return false;
                })
            ),
            'errors' => array(
                'required' => 'validation.required',
                'product_exists' => 'validation.not_exists',
                'product_in_stock' => 'validation.empty_stock'
            ),
        ),
        array(
            'field' => 'store_id',
            'label' => 'store_id',
            'rules' => array('required', 'numeric', array('store_exists',function($value) {
                $CI = &get_instance();
                if(!empty($value)) {
                    $CI->db->where('id', $value);
                    $store = $CI->db->get('stores')->row();
                    if(!empty($store)) {
                        return true;
                    }
                }
                return false;
            })),
            'errors' => array(
                'required' => 'validation.required',
                'store_exists' => 'validation.not_exists'
            ),
        )
    )
);
