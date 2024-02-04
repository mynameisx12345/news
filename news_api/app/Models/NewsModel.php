<?php namespace App\Models;

use CodeIgniter\Database\ConnectionInterface;

class NewsModel{
  protected $db;

  public function __construct(ConnectionInterface &$db){
    $this->db =& $db;
  }

  function saveNews($data){
    $this->db->table('news')
        ->insert($data);
      $userId = $this->db->insertID();
      return $userId;
  }

  function getNews($author){
    $builder = $this->db->table('news');
    if(!empty($author)){
      $builder->where('author', $author);
    }

    $query = $builder->get()->getResult();
    foreach($query as $key => $res){
      $query[$key]->image = base64_encode($query[$key]->image);
     }
    return $query;
  }

}