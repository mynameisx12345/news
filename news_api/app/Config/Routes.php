<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('users', function($routes){
  $routes->post('login','UsersController::login');
  $routes->post('register','UsersController::register');
  $routes->get('list','UsersController::getUserList');
});

$routes->group('lov', function($routes){
  $routes->get('departments','UsersController::getDepartments');
  $routes->get('template', 'UsersController::getTemplate');
});;

$routes->group('news', function($routes){
  $routes->post('save','NewsController::saveNews');
  $routes->get('get','NewsController::getNews');
});