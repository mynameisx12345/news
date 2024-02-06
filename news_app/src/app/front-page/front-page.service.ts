import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FrontPageService {
  apiUrl = environment.apiUrl;
  constructor(
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }

  getFeatured(department){
    return this.http.get(`${this.apiUrl}/news/featured?department=${department}`).pipe(
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
}
