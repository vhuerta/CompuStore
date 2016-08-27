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
    )
);
