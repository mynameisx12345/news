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
  $routes->post('exam','NewsController::addExam');
  $routes->delete('exam','NewsController::deleteExam');
  $routes->get('exam','NewsController::getExams');
});

$routes->group('news', function($routes){
  $routes->post('save','NewsController::saveNews');
  $routes->get('get','NewsController::getNews');
  $routes->post('featured','NewsController::setFeatured');
  $routes->get('featured','NewsController::getFeatured');
  $routes->post('comment', 'NewsController::saveComment');
  $routes->get('comment','NewsController::getComments');
  $routes->delete('comment','NewsController::deleteComment');
  $routes->post('like', 'NewsController::like');
  $routes->get('like', 'NewsController::getLikes');
  $routes->post('visit', 'NewsController::visit');
  $routes->get('trending', 'NewsController::getTrending');
  $routes->post('report', 'NewsController::saveReport');
});

