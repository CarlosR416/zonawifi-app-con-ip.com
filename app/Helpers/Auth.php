<?php
namespace App\Helpers; 
use App\Models\User;
use App\Models\RutaUser;
use App\Models\Rutas;
use App\Models\Menu;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth
{
    static function logout()
	{
		session_destroy();
	}
	
	static function check()
	{
		return isset($_SESSION['usuario']);
	} 

	static function login($pass, $user)
	{

		$Resul = User::where('usuario',$user)->first();

		if (!isset($Resul)) {

			return false;

		}else if(password_verify($pass, $Resul->pass)){

			$_SESSION['usuario'] = $Resul->id;
			$_SESSION['admin'] = $Resul->admin;
			
			$ids = DataMikrotick::getAlls();
			$id_m = [];
			
			foreach ($ids as $key => $value) {
				
				if(isset($value->id)){
					$id_m[] = $value['id']; 
				}

			}

			$key = 'example_key';
			$payload = [
				'iss' => 'http://zonawifi-app.con-ip.com',
				'aud' => 'http://zonawifi-app.con-ip.com',
				'ip_type' => 'remote',
				'Mikroticks' => $id_m,
				'iat' => 1356999524,
				'nbf' => 1357000000
			];

			$jwt = JWT::encode($payload, $key, 'HS256');

			$_SESSION['token_sid'] = $jwt;

			setcookie("token_api", $jwt, time() + 30*24*60*60, "/");
			
			if(is_null($Resul->path)){

				$_SESSION['path'] = ['clientes', 'todos'];

			}else{

				$path = $Resul->path;
				$args = [];
				do {
					$pos = strpos($path, "/");

					$arg =  $pos ? substr($path, 0, $pos) : substr($path, 0) ;
					
					$args[] = $arg;

					$path = substr($path, $pos+1);

				} while ($pos);

				$_SESSION['path'] = $args;

			}
			
			return true;

		}
		
		return false;
	}

	function user()
	{

		if (isset($_SESSION['usuario'])) {

			return User::where('id',$_SESSION['usuario'])->first();

		}

		return false;
	}
	 
	static function checkpath($path = '/', $AllowedPath = []){


		if(!in_array($path, $AllowedPath, true)){

			$ruta = Rutas::where('ruta', $path);
			
			if($ruta->exists()){
				$ruta = $ruta->first();
				$acceso = RutaUser::where(['id_user' => $_SESSION['usuario'], 'id_ruta' => $ruta->id]);
				
				if($acceso->exists()){
					return true;
				}

			}

			return false;
			

		}else{

			return true;

		}
		
	}

	public function conf(){

		$session_user =  User::find($_SESSION['usuario']);
		$menu = Menu::orderBy('nivel')->get();
		
		$data = ['menu' => $menu, 'session_user' => $session_user];


		return $data;
	}

	static function defaultPath($router){

		return $router->pathFor('ruta', ['arg1' => $_SESSION['path'][0], 'arg2' => $_SESSION['path'][1]]);
	
	}

	static function getId(){
		return $_SESSION['usuario'];
	}
}

?>