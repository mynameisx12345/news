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

    $data = [
      'title' => $this->request->getPost('title'),
      'content' => $this->request->getPost('content'),
      'department_id' => $this->request->getPost('department'),
      'author' => $this->request->getPost('author'),
      'image' => $file
    ];


    $newsId = $model->saveNews($data);

    return $this->response 
      ->setStatusCode(200)
      ->setJson(['newsId'=>$newsId, 'message'=>'Success']);
  }

  public function getNews(){
    $db = db_connect();
    $model = new NewsModel($db);
    $author = $this->request->getGet('author');

    $result = $model->getNews($author);

    return $this->response
      ->setStatusCode(200)
      ->setJson($result);
  }
}