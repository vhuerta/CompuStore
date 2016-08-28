<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Clase Auth, contiene los metodos para realizar la autentificacion y obtener un token,
 * asi como refrescar el token para obtener uno nuevo.
 */
class Auth extends Custom_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Auth_Model', 'auth');
    }

    /**
     * Ruta para hacer autenticarse
     *
     * POST Mapea la siguiente ruta:
	 * 		http://example.com/auth/token
     */
    public function token_post() {

        $this->form_validation->set_data(array(
            'username' => $this->post('username'),
            'password' => $this->post('password')
        ));
        if($this->form_validation->run('token_post')) {
            $result = $this->auth->authenticate($this->post('username'), $this->post('password'));
            return $this->response($result, $result->status === 'success'? 200 : 400);
        } else {
            return $this->_validation_errors($this->form_validation->error_array());
        }

    }

    /**
     * Ruta para obtener un nuevo token
     *
     * POST Mapea la siguiente ruta:
     * 		http://example.com/auth/token_refresh
     */
    public function token_refresh_get() {
        $result = $this->auth->generate_token($this->current_user);
        return $this->response($result, $result->status === 'success'? 200 : 400);
    }
}
