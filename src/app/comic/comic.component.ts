import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ComicService} from './comic.service';
import {Comic} from './comic';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss'],
  providers: [ComicService]
})
export class ComicComponent implements OnInit {
  public comics = [];
  public path;
  private show = true;

  // private comicService;

  constructor(private comicService: ComicService, private route: ActivatedRoute) {}

  getComics(query = '') {
    if ( this.path === 'liked') {
      this.comics = JSON.parse(localStorage.getItem('comics'));
      return null;
    } else {
      this.comicService.getAllComics().then(data => {
        const comic = this.comicService.matchComicsToFavorited(data);
        this.comics.push(comic);
        this.getNextNComics(this.comics[this.comics.length - 1].num, 10);
      });
      return null;
    }
  }
  getNextNComics(id, n) {
    for ( let i = id; i >= id - n; i--) {
        this.comicService.getComicById(i).then(response => {
          let comic = this.comicService.matchComicsToFavorited(response);
          comic = this.removeDuplicates(comic);
          this.comics.push(comic);
        });
      }
  }
  removeDuplicates(comic){
    for (let i = 0; i < this.comics.length; i++) {
      if (this.comics[i].num === comic.num) {
        this.comics.splice(i, 1);
      }
    }
    return comic;
  }
  toggleComicFavorited(comic: Comic) {
    this.comicService.toggleComicFavorited(comic);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.show = true;
      this.path = params['liked'];
      this.getComics(this.path);
    });
    if (JSON.parse(localStorage.getItem('comics')) === null) {
      localStorage.setItem('comics', JSON.stringify([]));
    }
  }

  onScroll() {
    if (this.path !== 'liked') {
      this.getNextNComics(this.comics[this.comics.length - 1].num, 10);
    }
  }

}
