import { Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {HttpClient } from '@angular/common/http';
import { Comic } from './comic';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

const DOMAIN = 'https://xkcd.now.sh';


const API_URL = DOMAIN;

@Injectable()
export class ComicService {

  constructor(
    private http: HttpClient
  ) {
  }
// API: GET /todos
  public getAllComics() {
    // will use this.http.get()

    return new Promise( resolve => {this.http
      .get(API_URL)
      .subscribe(response => {
        resolve(response);
      });
    });
  }

  // API: POST /todos
  public createComic(comic: Comic) {
    // will use this.http.post()
  }

  // API: GET comic by ID
  public getComicById(comicId: number) {
    // will use this.http.get()

    const idURL = '/' + comicId + '/';
    const url = DOMAIN + idURL;
    return new Promise(resolve => {
      this.http
        .get(url)
        .subscribe(response => {
          resolve(response);
        });
    });
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  // Toggle comic favorited
  toggleComicFavorited(comic: Comic) {
    if (comic.liked === undefined || comic.liked === false) {
      comic.liked = true;
        let comics = JSON.parse(localStorage.getItem('comics'));
        comics.push(comic);
        localStorage.setItem('comics', JSON.stringify(comics));
    } else {
      comic.liked = false;
      // remove from local storage
      let comics = JSON.parse(localStorage.getItem('comics'));
      for (let i = 0; i < comics.length; i++) {
        if (comics[i].num === comic.num) {
          comics.splice(i, 1);
          localStorage.setItem('comics', JSON.stringify(comics));
        }
      }
    }
    return comic.liked;
  }
  matchComicsToFavorited(comic) {
    let comics = JSON.parse(localStorage.getItem('comics'));
    for (let i = 0; i < comics.length; i++) {
      if (comics[i].num === comic.num) {
        comic.liked = true;
      }
    }
    return comic;
  }

}
