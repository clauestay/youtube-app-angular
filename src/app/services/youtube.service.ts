import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class YoutubeService {

  private youtubeUrl:string ='https://www.googleapis.com/youtube/v3';
  private apikey:string = 'AIzaSyCpKlKZCpErbRL8wa-kTNcC7MZ8iGEU0aA';
  private playlist:string = 'UUmLzftbGGGCodNHCYbUXn6A';
  

  private nextPageToken:string = '';

  public url:string ='';

  constructor( public http:HttpClient ) { }

  getVideos(){

    //let url = `${ this.youtubeUrl }/playlistItems`;
    //let url =  `${ this.youtubeUrl }/playlistItems?part=snippet%2CcontentDetails%2Cstatus&maxResults=4&playlistId=UUmLzftbGGGCodNHCYbUXn6A&key=AIzaSyB3xP4-9pLmB47orb3DFh4uHFYY5mSxa0g`;
    //let params = new URLSearchParams();

    //params.set( 'part', 'snippet' );
    //params.set( 'maxResults', '10' );
    //params.set( 'playlistId', this.playlist );
    //params.set( 'key', this.apikey );
    let url = '';

    if( this.nextPageToken ){
      url =  `${ this.youtubeUrl }/playlistItems?part=snippet&maxResults=4&pageToken=CAQQAA&playlistId=UUmLzftbGGGCodNHCYbUXn6A&key=AIzaSyCpKlKZCpErbRL8wa-kTNcC7MZ8iGEU0aA`;
     // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=4&playlistId=UUuaPTYj15JSkETGnEseaFFg&key=
    }else {
      url =  `${ this.youtubeUrl }/playlistItems?part=snippet&maxResults=4&playlistId=UUmLzftbGGGCodNHCYbUXn6A&key=AIzaSyCpKlKZCpErbRL8wa-kTNcC7MZ8iGEU0aA`;
        }


    return this.http.get( url )
            .pipe(map( res =>{
                let resp = JSON.parse(JSON.stringify(res));
                this.nextPageToken = resp.nextPageToken;

                let videos:any[]=[];
                for( let video of resp.items ){
                  let snippet = video.snippet;
                  videos.push( snippet );
                }

                return videos;
            }));

  }

}
