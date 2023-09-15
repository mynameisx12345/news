import { Component } from '@angular/core';
import { of, tap } from 'rxjs';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.sass']
})
export class ReactionComponent {


  isLike = false;
  isBookmark = false;
  clapping = false;

  count = {
    like: 4,
    bookmark: 3,
    clap: 20
  }

  like(){
    this.isLike = !this.isLike;
    if(this.isLike){
      this.count.like++;
    } else {
      this.count.like--;
    }
  }

  bookmark(){
    this.isBookmark = !this.isBookmark;
    if(this.isBookmark){
      this.count.bookmark++;
    } else {
      this.count.bookmark--;
    }
  }

  clap(){
    if(this.clapping) return
    this.count.clap++;
    this.clapping = true;
    setTimeout(()=>{
      this.clapping = false;
    },5000)
  }
}
