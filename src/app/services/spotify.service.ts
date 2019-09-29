import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  // ** Token para peticiones de Spotify **
  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBN1k3vU8aKmZC2iDWlJJRYGNKSWWuVqLVxTcEHbYdBWE_x9fxXqSeyBaDgm0IgEMj82sR6Xkun44-dx3g'
    });

    return this.http.get(url, { headers });
  }

  // ** Peticion de las 20 Canciones del momento **
  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => data['albums'].items ));
  }

  // ** Peticion para la búsqueda de Artistas **
  getArtistas( termino: string ) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));
  }

  // ** Peticion del ID del Artista **
  getArtistaSolo( id: string ) {
    return this.getQuery(`artists/${ id }`);
  }

  // ** Peticion del Top-Track del Artista **
  getTopTracks( id: string ) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks'] ));
  }

}
