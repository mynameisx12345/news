<?php
namespace App\Controllers;

use App\Models\NewsModel;

class NewsController extends BaseController
{
  public function saveNews(){
    $db = db_connect();
    $model = new NewsModel($db);

    $file = $this->request->getFile('image');
    if($file !== null){
      $file = file_get_contents($file);
    }
    date_default_timezone_set('Asia/Singapore');
    $curDate = date('y-m-d');

    $datePublished = $this->request->getPost('date_published');
    if(!empty($datePublished)){
      $datePublished = $curDate;
    } else {
      $datePublished = null;
    }
    $data = [
      'title' => $this->request->getPost('title'),
      'content' => $this->request->getPost('content'),
      'department_id' => $this->request->getPost('department_id'),
      'author' => $this->request->getPost('author'),
      'id'=> $this->request->getPost('id'),
      'date_published'=> $datePublished,
      'image' => $file
    ];

    $isNew = false;
    if(empty($this->request->getPost('id'))){
      $isNew = true;
    }


    $newsId = $model->saveNews($data);

    return $this->response 
      ->setStatusCode(200)
      ->setJson(['newsId'=>$newsId, 'message'=>'Success', 'isNew'=> $isNew]);
  }

  public function getNews(){
    $db = db_connect();
    $model = new NewsModel($db);
    $author = $this->request->getGet('author');
    $department = $this->request->getGet('department');
    $published = $this->request->getGet('published');
    $id = $this->request->getGet('id');

    $result = $model->getNews($author, $department, $published, $id);

    return $this->response
      ->setStatusCode(200)
      ->setJson($result);
  }

  public function setFeatured(){
    $db = db_connect();
  
    $model = new NewsModel($db);
  
    $department = $this->request->getJSON()->department;
    $news = $this->request->getJSON()->news;

    $data = [
      'department'=>$department,
      'news'=>$news
    ];


    $newsId = $model->setFeatured($data);

    return $this->response
      ->setStatusCode(200)
      ->setJson(['newsId'=>$newsId, 'message'=>'Success']);
  }

  public function getFeatured(){
    $db = db_connect();
  
    $model = new NewsModel($db);
    $department = $this->request->getGet('department');
  
    $result = $model->getFeatured($department);
  
    return $this->response
      ->setStatusCode(200)
      ->setJson($result);
  }
}