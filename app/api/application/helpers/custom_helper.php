<?php

defined('BASEPATH') OR exit('No direct script access allowed');

if(!function_exists('paginator')) {
    function paginator($count, $limit = 10, $page = 0) {
        //print_r($limit); die();
        $limit = ($limit > 0)? $limit : 1;
        $pages_total = ceil($count / $limit);
        $page = ($page > 0)? (($page <= $pages_total)? $page : $pages_total) : 1;
        $offset = ($limit * ($page - 1));

        return array(
            'total' => $count,
            'limit' => $limit,
            'pages_total' => $pages_total,
            'page' => $page,
            'offset' => $offset,
        );
    }
}
