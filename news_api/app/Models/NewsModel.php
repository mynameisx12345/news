<?php namespace App\Models;

use CodeIgniter\Database\ConnectionInterface;

class NewsModel{
  protected $db;

  public function __construct(ConnectionInterface &$db){
    $this->db =& $db;
  }

  function saveNews($data){
    if(empty($data['id'])){
      $this->db->table('news')
        ->insert($data);
      $userId = $this->db->insertID();
      return $userId;
    } else {
      $builder = $this->db->table('news');
      $builder->where('id', $data['id']);
      $builder->update($data);
      return $data['id'];
    }
    
  }

  function getNews($author, $department, $published, $id){
    $builder = $this->db->table('news');
    $builder->select('news.*, users.first_name, users.middle_name, users.last_name, users.suffix');
    $builder->join('users','news.author = users.id');

    if(!empty($author)){
      $builder->where('news.author', $author);
    }
    if(!empty($department)){
      $builder->where('news.department_id', $department);
    }

    if(!empty($published)){
      $builder->where('news.date_published is NOT NULL', NULL, false);
    }

    if(!empty($id)){
      $builder->where('news.id',$id);
    }

    
    $builder->orderBy('news.id','DESC');

    $query = $builder->get()->getResult();
    foreach($query as $key => $res){
      $query[$key]->image = base64_encode($query[$key]->image);
     }
    return $query;
  }

  function setFeatured($data){
    date_default_timezone_set('Asia/Singapore');
    $curDate = date('y-m-d');

    $builder = $this->db->table('featured');
    $builder->where('department_id', $data['department']);
    $builder->where('is_active',1);
    $builder->set('is_active',0);
    $builder->update();
   
    $lastInsertId = null;
 
    foreach($data['news'] as $key=>$res){
     
      $dataF = [
        'news_id' => $data['news'][$key]->id,
        'department_id' => $data['news'][$key]->department_id,
        'date_featured' => $curDate,
        'is_active' => 1
      ];
   

      $this->db->table('featured')
        ->insert($dataF);
      
      $lastInsertId = $this->db->insertID();
      
    }

    return $lastInsertId;
  }

  function getFeatured($department){
    $builder = $this->db->table('featured');
  
    $builder->join('news', 'featured.news_id = news.id');
    $builder->select('news.*');
  
    $builder->where('featured.is_active', 1);
    $builder->where('featured.department_id', $department);
    $builder->orderBy('featured.id', 'ASC');
  
    $query = $builder->get()->getResult();
    foreach($query as $key => $res){
      $query[$key]->image = base64_encode($query[$key]->image);
     }
   
    return $query;
  }

  function addExam($data){
    $lastInsertId = null;

    $this->db->table('exam')
      ->insert($data);

    $lastInsertId =  $this->db->insertID();
    return $lastInsertId;
  }

  function deleteExam($id){
    $this->db->table('exam')
      ->where('id', $id)
      ->delete();
  }

  function getExams($type){
    $builder = $this->db->table('exam');
    $builder->orderBy('dt_scheduled', 'ASC');

    if(!empty($type)){
      $builder->where('type', $type);
    }
    $query = $builder->get()->getResult();

    return $query;
  }

  function saveComment($data){
    if(empty($data['id'])){
      $this->db->table('comment')
        ->insert($data);

      $commentId = $this->db->insertID();
      return $commentId;
    } else {
      $builder = $this->db->table('comment');
      $builder->where('id', $data['id']);
      $builder->update($data);
      return $data['id'];
    }
  }

  function getComments($newsId){
    $builder = $this->db->table('comment');
    $builder->join('users', 'users.id = comment.user_id');
    $builder->select('comment.*, CONCAT(users.first_name," ", users.middle_name, " ", users.last_name, " ", users.suffix) as user');
    $builder->where('comment.news_id', $newsId);
    $builder->orderBy('comment.id', 'ASC');

    $query = $builder->get()->getResult();

    return $query;
  }

  function deleteComment($commentId){
    $this->db->table('comment')
      ->where('id', $commentId)
      ->delete();
  }

}