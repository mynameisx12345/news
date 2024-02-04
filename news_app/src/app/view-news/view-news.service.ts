import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environment/environment';
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

  getNews(author){
    let param = '?';
    if(author){
      param += `author=${author}`;
    }

    return this.http.get(`${this.apiUrl}/news/get${param}`).pipe(
      map((news:any)=>{
        return news.map((newsA)=>{
          return {
            ...newsA,
            image: newsA.image ? this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${newsA.image}`):
              newsA.image
          }
        })
      })
    )
  }
}

interface News {
  title: string,
  content: string,
  image: any,
  department: []
}
