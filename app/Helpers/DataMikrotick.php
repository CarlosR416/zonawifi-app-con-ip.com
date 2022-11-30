<?php

namespace App\Helpers; 
use App\Models;

class DataMikrotick 
{
    static function getAlls(){
        $mikrotiks = Models\Mikroticks::where('cliente_id', Auth::getId())->get();
        /*$API = new \App\Lib\Routeros\RouterosAPI();
        $API->debug = false;
        $API->port = 8728;
        $API->timeout = 3;
        $API->attempts = 2;
        $API->delay = 1;*/ 

        /*foreach ($mikrotiks as $key => $data) {

            if($API->connect($data->ip, "admin", "8891957")){
                $mikrotiks[$key]->conexion =  "Activo" ;
                $API->disconnect();
            }else{
                $mikrotiks[$key]->conexion =  "Inactivo";
            }
            
        }*/
        
        return $mikrotiks;
    }
    
    static function get($id){


        $mikrotick = Models\Mikroticks::where('cliente_id', Auth::getId())->where('id', $id)->first();

        return $mikrotick;
    }

}