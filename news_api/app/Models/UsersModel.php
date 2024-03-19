<?php namespace App\Models;

use CodeIgniter\Database\ConnectionInterface;

class UsersModel{
  protected $db;

  public function __construct(ConnectionInterface &$db){
    $this->db =& $db;
  }

  function login($email,$password){
   
 
    $builder = $this->db->table('users');
    
    $builder->select('*');
    
    $builder->where('email', $email);
    
    $builder->where('is_approved',true);
   
    $builder->where('password', $password);
    
    $query = $builder->get()->getResult();
    
    return $query;
  }

  function getDepartments(){
    $builder = $this->db->table('department');
    $builder->select('*');
    $query = $builder->get()->getResult();
    foreach($query as $key => $res){
      $query[$key]->logo = base64_encode($query[$key]->logo);
     }

    return $query;
  }

  function getTemplate(){
    $builder = $this->db->table('template');
    $builder->select('*');
    $query = $builder->get()->getResult();
    return $query;
  }

  function register($data){
   
    $builder = $this->db->table('users');
    if($data['id']== '' || $data['id'] == null){
      $builder->where('email', $data['email']);
   
      $builder->orwhere('id_number', $data['id_number']);
    
      $query = $builder->get()->getResult();
      if(count($query)>0){
        return -1;
      }
   
  
      $this->db->table('users')
        ->insert($data);
      $userId = $this->db->insertID();
      return $userId;
    } else {
     
      $builder->where('id', $data['id']);
     
      $builder->update($data);
      return $data['id'];
    }
   
  
  }

  function getUserList(){
    $builder = $this->db->table('users');
    $builder->select('*');
    $query = $builder->get()->getResult();
    return $query;
  }
}