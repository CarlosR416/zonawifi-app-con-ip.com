<?php

namespace App\Middleware;
use App\Helpers\Auth;



class AuthMiddleware extends Middleware
{
	 
	
	public function __invoke($request, $response, $next)
	{
		
		$uri = $request->getUri();
		$path = $uri->getPath();
		
		$path = substr($path, 0, 1) == "/" ? substr($path, 1) : $path;
		
		if (!Auth::check()){

			return $response->withRedirect($this->container->router->pathFor('login'));
		  	
		}else if(!Auth::checkpath($path,  $this->container->settings['AllowedPath'])){

			$uri = $uri->withPath("noautorizado");
			
			$msj = ["MSJ" => ['error' => ["title" => "Sin Permiso", "text" => "No estas autorizado"]]];

			return $response->withRedirect($this->container->router->pathFor('unauthorize'), 301);
			/*return $response->withStatus(403)
            ->withHeader('Content-Type', 'text/html')
            ->write(json_encode($msj));*/
		}

		return $response = $next($request, $response);
        
	}



	
	
	

	
}

?>