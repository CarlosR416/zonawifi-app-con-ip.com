<?php

namespace App\controller;
use App\Models;
use App\Helpers\DataMikrotick;
use Illuminate\Database\Capsule\Manager as DB;

class Appzona
{   
    protected $container;

    function __construct($container){
        $this->container = $container;
    }

    function index(){

        return $this->container->twig->render($this->container->response,  "app_zona/index.twig");
    
    }

    function getMikros(){
        $data = DataMikrotick::getAlls();

        return json_encode($data);
    }

    function conectados(){

        $data = DataMikrotick::get($this->container->request->getParam('router'));

        if(!isset($data)){
            return $this->container->twig->render($this->container->response,  "page_404.twig");
        }else{
            return $this->container->twig->render($this->container->response, "app_zona/administracion/conectados.twig", ["data" => $data]);
        }
    }

    function TicketsActivos(){

        $data = DataMikrotick::get($this->container->request->getParam('id'));

        if(!isset($data)){
            return $this->container->twig->render($this->container->response,  "page_404.twig");
        }else{
            return $this->container->twig->render($this->container->response, "app_zona/administracion/ticketsactivos.twig", ["data" => $data]);
        }
    }

    function MacActivas(){
        $data = DataMikrotick::get($this->container->request->getParam('id'));

        if(!isset($data)){
            return $this->container->twig->render($this->container->response,  "page_404.twig");
        }else{

            return $this->container->twig->render($this->container->response, "app_zona/administracion/macsactivas.twig", ["data" => $data]);
        }    
    }

    function buscartickets(){
        return $this->container->twig->render($this->container->response, "app_zona/administracion/buscartickets.twig");
    }
}