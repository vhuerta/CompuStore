<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class Custom_Controller extends REST_Controller {

    protected $current_user = null;

    /**
     * Constructor
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * Este metodo se ejecuta antes de la funcion que mapea la ruta a la que
     * se desea entrar.
     *
     * Se verificara la autentificacion para todas las rutas excepto para las
     * configuradas en la variable $config['public_routes'], ver archivo /application/config
     *
     * @param string $method Nombre del metodo que se esta llamando
     * @param array $params Parametros que se enviaran al metodo
     *
     * @return void
     */
    public function _remap($method, $params = array()) {
        // Ruta completa a la que se intenta acceder
        $full_path = $this->_get_full_route($method);
        // Verifica si la ruta es public
        if(!in_array($full_path, $this->config->item('public_routes'))) {
            // La ruta no es publica verificar token
            $verify = $this->_verify_token();
            if($verify->status === 'fail') {
                return $this->response($verify, 400, false);
            }
            $this->current_user = $verify->data;
        }

        // Llama al metodo del padre ya que este se encarga de mandar llamar al metodo
        // solicitado
        parent::_remap($method, $params);
    }

    /**
     * Este metodo returna la ruta completa con el folder, el controlador y el metodo
     * al que se esta intentando acceder.
     *
     * @param $method Nombre del metodo que se esta llamando
     * @return string Ruta completa
     */
    private function _get_full_route($method) {
        // Obtiene el nombre del controlador
        $controller = $this->router->fetch_class();
        // Obtiene el primer segnmento directamente de la url
        if($segment = $this->uri->segment(1)) {
            // Si el segmento es diferente al nombre del controlador entonces es una carpeta
            $controller = ($segment !== $controller)? "{$segment}/{$controller}" : $controller;
        }
        return "{$controller}/$method";
    }

    /**
     *
     */
    private function _verify_token() {
        $token = @getallheaders()['Authorization'];
        $token = empty($token)? @getallheaders()['authorization'] : $token;
        $token = empty($token)? @getallheaders()['AUTHORIZATION'] : $token;
        $this->load->model('Auth_model', 'auth');
        return $this->auth->verify_token($token);
    }

    /**
     * Metodo de ayuda para responder los errores de validacion de un endpoint
     *
     * @params array $errors Los errores de validacion
     */
    protected function _validation_errors($errors) {
        $response = array(
            'status' => 'fail',
            'code' => 'validation.fail.verify',
            'data' => $errors
        );
        return $this->response($response, 400);
    }

}
