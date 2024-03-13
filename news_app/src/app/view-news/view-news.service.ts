import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ViewNewsService {
  apiUrl = environment.apiUrl;
  private currentNews: BehaviorSubject<News> = new BehaviorSubject<News>(null);
  currentNews$ = this.currentNews.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }

  setCurrentNews(news:News){
    this.currentNews.next(news);
  }

  saveNews(news){
    return this.http.post(`${this.apiUrl}/news/save`, news);
  }

  getNews(author='', department='', published='',id=''){
    console.log('searched');
    let param = '?';
    if(author){
      param += `author=${author}&`;
    }

    if(department){
      param += `department=${department}&`;
    }
    if(published){
      param += `published=${published}&`;
    }
    if(id){
      param += `id=${id}`;
    }

    return this.http.get(`${this.apiUrl}/news/get${param}`).pipe(
      map((news:any)=>{
        return news.map((newsA)=>{
          return {
            ...newsA,
            department: newsA.department_id,
            image: newsA.image ? this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${newsA.image}`):
              newsA.image
          }
        })
      })
    )
  }

  addComment(comment){
    let data = {
      id: comment.id,
      comment: comment.message,
      user_id: comment.user_id,
      news_id: comment.news_id
    }
    return this.http.post(`${this.apiUrl}/news/comment`,data);
  }

  deleteComment(comment){
    return this.http.delete(`${this.apiUrl}/news/comment?commentId=${comment.id}`);
  }

  getComments(newsId){
    return this.http.get(`${this.apiUrl}/news/comment?newsId=${newsId}`).pipe(
      map((comments:any)=>{
        return comments.map(comment=>{
          return {
            ...comment,
            message: comment.comment,
            originalMessage: comment.comment,
            dtModified: moment(comment.dt_commented).format('MMM DD, YYYY'),
            isRead: true
          }
        })
      })
    )
  }
}

interface News {
  id: number,
  title: string,
  content: string,
  image: any,
  department: any;
  first_name: string,
  middle_name: string,
  last_name: string,
  suffix: string
}
