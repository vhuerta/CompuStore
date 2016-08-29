<?php

defined('BASEPATH') OR exit('No direct script access allowed');

use \Firebase\JWT\JWT;

/**
 * Clase modelo que  contiene los metodos basicos para autenticar a un usuario
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */
class Auth_Model extends CI_model {

    public function __construct() {
        parent::__construct();
    }

    /**
     * Metodo para autenticar, en caso de ser exitosa la autenticacion
     * genera un token y retorna los datos del usuario
     *
     * @param string $email Correo electronico del usuario
     * @param string $password Password del usuario
     * @return object
     */
    public function authenticate($username, $password) {
        // Consulta la tabla de usuarios con el username
        $this->db->where('username', $username);
        $user = $this->db->get('users')->row();
        // Valida que exista el usuario y que el password sea correcto
        if(!empty($user) && isset($user->password) && password_verify($password, $user->password)) {

            // Genera el token y retorna la respuesta
            unset($user->password); // Quita el password del objecto usuario
            return $this->generate_token($user);
        } else {
            // La validacion fallo
            return (object)array(
                'status' => 'fail',
                'code' => 'authentication.fail.bad_credentials'
            );
        }
    }

    /**
     * Genera un token de autenticación para el usuario enviado
     *
     * @param object $user Usuario con id y email
     * @return object
     */
    public function generate_token($user) {
        $key = $this->config->item('encryption_key'); // Carga la llave de encripción de la configuracion, ver application/config/config.php
        $now = time();

        // Genera el token
        $token = array(
            "iat" => $now,
            "nbf" => $now,
            "data" => array(
                'id' => $user->id,
                'username' => $user->username,
            ),
            'exp' => time() + (60 * 60) // Expira en una hora
        );
        $token =  JWT::encode($token, $key);

        $this->save_token($token, $user);

        // Retorna el resultado
        return (object)array(
            'status' => 'success',
            'code' => 'authentication.success.welcome',
            'data' => array(
                'user' => $user,
                'token' => $token
            )
        );
    }

    /**
     * Borra el o los tokens del usuario y guarda el nuevo token
     *
     * @param string $token Token
     * @param object $user Objecto usuario con id
     * @return integer El id del registro del token nuevo
     */
    public function save_token($token, $user) {
        $this->db->delete('tokens', array('users_id' => $user->id));
        $this->db->insert('tokens', array('users_id' => $user->id, 'token' => $token));
        return $this->db->insert_id();
    }

    /**
     * Busca un token en la base de datos lo retorna
     * @param string $token Token
     * @return object El registro de la tabla tokens
     */
    public function find_token($token) {
        $this->db->where('token', $token);
        $rs = $this->db->get('tokens')->row();
        return $rs;
    }

    /**
     * Recibe un token e intenta decodificarlo
     *
     * @param string $token El token a verificar
     * @return object
     */
    public function verify_token($token) {
        if(!empty($this->find_token($token))) {
            $key = $this->config->item('encryption_key'); // Carga la llave de encripción de la configuracion, ver application/config/config.php
            try {
                $decoded = JWT::decode($token, $key, array('HS256')); // Intenta decodificar el token
                return (object)array(
                    'status' => 'success',
                    'code' => 'authentication.success.token_verified',
                    'data' => $decoded->data
                );
            } catch(Exception $e) { // Token invalido, o expirado
                // Fallo al desencriptar el token
            }
        }
        // Token no encontrado
        return (object)array(
            'status' => 'fail',
            'code' => 'authentication.fail.token_expired_or_invalid',
        );

    }

}
