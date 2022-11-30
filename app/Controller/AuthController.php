<?php 

namespace App\Controller;
use App\Helpers\Auth;


class AuthController
{
	
	protected $container;

    function __construct($container){
        $this->container = $container;
    }


	function loginPage(){

		return $this->container->twig->render($this->container->response,  "login.twig");

	}

	function login(){

		$Auth =	Auth::login(
					$this->container->request->getParam('pass'),
					$this->container->request->getParam('user')
				);
	
		if ($Auth){

			return $this->container->response->withRedirect($this->container->router->pathFor('ruta', ['arg1' => $_SESSION['path'][0], 'arg2' => $_SESSION['path'][1]]));
			
		}

		
		return $this->container->response->withRedirect($this->container->router->pathFor('login'));

	}

	public function logout(){

		Auth::logout();

		return  $this->container->response->withRedirect($this->container->router->pathFor('login'));

	}

	public function DefaultPath(){

		if(Auth::check()){
			return $this->container->response->withRedirect(Auth::defaultPath($this->container->router));
		}else{
			return $this->container->response->withRedirect($this->container->router->pathFor('login'));
		}
		


	}

	
}

?>