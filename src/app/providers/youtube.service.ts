import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  token: string;
  youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  apikey = 'AIzaSyBPtuzLzRhyyyfZZa3UjttyOnJ2r9lzLX8';
  playlist = 'PL35ED6D173C0B594F';
  constructor(private http: HttpClient ) {}

  getVideos() {

    const url = `${this.youtubeUrl}/playlistItems`;
    const opcion = { params: new HttpParams().set('part', 'snippet')
                                              .set('maxResults', '10')
                                              .set('playlistId', this.playlist)
                                              .set('key', this.apikey)
    };
    if (this.token) {
      opcion.params = opcion['params'].set('pageToken', this.token);
      console.log(opcion);
    }
    return this.http.get(url, opcion).pipe( map ( data => {
      this.token = data['nextPageToken'];
      const videos: any [] = [];
      data['items'].forEach(video => {
        videos.push( video['snippet'] );
      });
      return videos;
    })
    );
  }
}
