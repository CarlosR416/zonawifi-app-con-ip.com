<?php
return [
    'settings' => [
        'displayErrorDetails' => require __DIR__ . '/../config/displayerrors.php', // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Renderer settings
        'renderer' => [
            'template_path' => __DIR__ . '/../template/',
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
        'db'   =>  require __DIR__ . '/../config/config_db.php',
        'router' =>  require __DIR__ . '/../config/config_router.php',
        'AllowedPath' => require __DIR__ . '/../config/AllowedPath.php'
    ],
];
