import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../providers/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  videoSel: any;
  modalSel = false;
  constructor(private _yts: YoutubeService) {
    this._yts.getVideos().subscribe( videos => {
      this.videos = videos;
    });
   }

  ngOnInit() {
  }
  verVideo(video: any) {
    this.videoSel = video;
    this.modalSel = true;
  }
  cerrarModal() {
    this.modalSel = false;
  }
  cargarMas() {
    this._yts.getVideos().subscribe( videos => {
      this.videos.push.apply(this.videos, videos);
    });
  }
}
