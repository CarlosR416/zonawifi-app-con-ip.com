<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

return function (App $app) {
    $container = $app->getContainer();
    

    $app->get("/", function (Request $request, Response $response, array $args) use ($container){
        $controller = new \App\Controller\AuthController($container);

        return $controller->DefaultPath();
    })->setName('base');


    $app->get("/login", function (Request $request, Response $response, array $args) use ($container){

        $controller = new \App\Controller\AuthController($container);
        
           
         return $controller->loginPage();
            
    })->setName('loginPage');

    $app->post("/login", function (Request $request, Response $response, array $args) use ($container){

        $controller = new \App\Controller\AuthController($container);
        
           
         return $controller->login();
            
    })->setName('login');


    $app->get("/logout", function (Request $request, Response $response, array $args) use ($container){

        $controller = new \App\Controller\AuthController($container);
        
           
         return $controller->logout();
            
    })->setName('logout');


    $app->get("/unauthorize", function (Request $request, Response $response, array $args) use ($container){
        
        return $container->twig->render($response, "unauthorize.twig");
        //echo json_encode([['error' => 'No estas autorizado']]);
            
    })->setName('unauthorize');


    $app->any('/data/{arg1}[/{arg2}]', function (Request $request, Response $response, array $args) use ($container) {
        // Sample log message 
        
        $container->get('logger')->info("Slim-Skeleton '/' route");

        $controller = new \App\Controller\Controller($container);
       
        // Render index view
        return $controller->__run('data', $args["arg1"], $args);

    })->setName('data')->add("AuthMiddleware");

    $app->any('/{arg1}/{arg2}', function (Request $request, Response $response, array $args) use ($container) {
        // Sample log message 

        $container->get('logger')->info("Slim-Skeleton '/' route");

        $controller = new \App\Controller\Controller($container);
       
        // Render index view
        return $controller->__run($args["arg1"], $args["arg2"]);
    })->setName('ruta')->add("AuthMiddleware");

    


    
};
