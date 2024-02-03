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
   
    $builder->where('email', $data['email']);
   
    $builder->orwhere('id_number', $data['id_number']);
  
    $query = $builder->get()->getResult();
    if(count($query)>0){
      return -1;
    }
 
    $dataF = $data;
    // $dataF = [
    //   'email' => $data->email,
    //   'password' => $data->password,
    //   'first_name' => $data->first_name,
    //   'middle_name' => $data->middle_name,
    //   'last_name' => $data->last_name,
    //   'user_type' => $data->user_type,
    //   'is_approved' => $data->is_approved,
    //   'suffix' => $data->suffix,
    //   'department_id' => $data->department_id,
    //   'id_number' => $data->id_number,
    //   'exam' => $data->exam
    // ];
   
    

    $this->db->table('users')
      ->insert($dataF);
    $userId = $this->db->insertID();
    return $userId;
  
  }
}