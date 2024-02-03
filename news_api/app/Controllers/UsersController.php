<?php
namespace App\Controllers;

use App\Models\UsersModel;

class UsersController extends BaseController
{
  public function login(){
    $db = db_connect();
  
    $model = new UsersModel($db);
  
    $email = $this->request->getJSON()->email;
   
    $password = $this->request->getJSON()->password;
    
    $result = $model->login($email, $password);
   
    foreach($result as $key=>$res){
      $result[$key]->exam = base64_encode($result[$key]->exam);
    }
    
    if(count($result)>0){
  
      return $this->response
        ->setStatusCode(200)
        ->setJson($result);
    } else {

      return $this->response 
        ->setStatusCode(500)
        ->setBody('Access Denied');
    }
  }

  public function getDepartments(){
    $db = db_connect();
    $model = new UsersModel($db);
    $result = $model->getDepartments();
   
    return $this->response
      ->setStatusCode(200)
      ->setJson($result);
  }

  public function getTemplate(){
    $db = db_connect();
    $model = new UsersModel($db);
    $result = $model->getTemplate();

    foreach($result as $key=>$res){
      $result[$key]->file = base64_encode($result[$key]->file);
    }

    return $this->response
      ->setStatusCode(200)
      ->setJson($result);
  }

  public function register(){
    $db = db_connect();
    $model = new UsersModel($db);

    //$data = $this->request->getJSON();
    $file = $this->request->getFile('exam');
    if($file !== null){
      $file = file_get_contents($file);
    }

    $isNew = true;
   

    if($this->request->getPost('id') != ''){
      $isNew = false;
    }
    $data = [
      'email' => $this->request->getPost('email'),
      'password' => $this->request->getPost('password'),
      'first_name' => $this->request->getPost('first_name'),
      'middle_name' => $this->request->getPost('middle_name'),
      'last_name' => $this->request->getPost('last_name'),
      'user_type' => $this->request->getPost('user_type'),
      'is_approved' => $this->request->getPost('is_approved'),
      'suffix' => $this->request->getPost('suffix'),
      'department_id' => $this->request->getPost('department_id'),
      'id_number' => $this->request->getPost('id_number'),
      'exam' => $file,
      'id' => $this->request->getPost('id')
    ];



    
  
  
    $userId = $model->register($data);
    if($userId == -1){
      return $this->response 
        ->setStatusCode(500)
        ->setJson(['userId'=>$userId, 'message'=>'Account is already registered']);
    }

    return $this->response 
      ->setStatusCode(200)
      ->setJson(['userId'=>$userId, 'message'=>'Success', 'isNew'=> $isNew]);
   
  }

  public function getUserList(){
    $db = db_connect();
    $model = new UsersModel($db);

    $result = $model->getUserList();
    foreach($result as $key=>$res){
      $result[$key]->exam = base64_encode($result[$key]->exam);
    }
    return $this->response
      ->setStatusCode(200)
      ->setJson($result);
  }
}