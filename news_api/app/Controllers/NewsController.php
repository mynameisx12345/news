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

  public function addExam(){
    $db = db_connect();

    $model = new NewsModel($db);

    $data = [
      'description' => $this->request->getJSON()->description,
      'dt_scheduled' => $this->request->getJSON()->dt_scheduled,
      'type' => $this->request->getJSON()->type,
    ];

    $examId = $model->addExam($data);

    return $this->response 
      ->setStatusCode(200)
      ->setJson(['examId'=>$examId, 'message'=>'Success']);
  }

  public function deleteExam(){
    $db = db_connect();

    $model = new NewsModel($db);

    $id =  $this->request->getGet('id');

    $model->deleteExam($id);

    return $this->response 
      ->setStatusCode(200)
      ->setJson(['message'=>'Success']);
  }

  public function getExams(){
    $db = db_connect();

    $model = new NewsModel($db);

    $type =  $this->request->getGet('type');

    $exams = $model->getExams($type);

    return $this->response 
    ->setStatusCode(200)
    ->setJson(['exams' =>$exams, 'message'=>'Success']);
  }

  public function saveComment(){
    $db = db_connect();

    $model = new NewsModel($db);

    date_default_timezone_set('Asia/Singapore');
    $curDate = date('y-m-d');

    $data = [
      'comment' => $this->request->getJSON()->comment,
      'dt_commented' => $curDate,
      'user_id' => $this->request->getJSON()->user_id,
      'news_id' => $this->request->getJSON()->news_id,
      'id' => $this->request->getJSON()->id
    ];

    $isNew = false;

    if(empty($this->request->getJSON()->id)){
      $isNew = true;
    }

    $commentId = $model->saveComment($data);
    return $this->response 
    ->setStatusCode(200)
    ->setJson(['commentId'=>$commentId, 'message'=>'Success', 'isNew'=> $isNew]);
  }

  public function getComments(){
    $db = db_connect();

    $model = new NewsModel($db);

    $newsId = $this->request->getGet('newsId');

    $result = $model->getComments($newsId);

    return $this->response
      ->setStatusCode(200)
      ->setJson($result);
  }

  public function deleteComment(){
    $db = db_connect();

    $model = new NewsModel($db);
    $commentId = $this->request->getGet('commentId');
    $model->deleteComment($commentId);
    return $this->response 
    ->setStatusCode(200)
    ->setJson(['message'=>'Success']);
  }
}