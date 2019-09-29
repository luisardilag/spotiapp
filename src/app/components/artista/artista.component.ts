import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {

  artista: any = {};
  loading: boolean;
  topTracks: any[] = [];

  constructor(  private router: ActivatedRoute,
                private spotify: SpotifyService ) {

    // Envia parametro del artista
    this.router.params.subscribe( params => {
      this.getArtista( params['id'] );
      this.getTopTracks( params['id'] );
    });

    this.loading = true;

  }

  // ** Peticion del Artista individualmente **
  getArtista( id: string ) {
    this.spotify.getArtistaSolo( id )
      .subscribe( artista => {
       this.artista = artista;
       this.loading = false;
      } );
  }

  // ** Peticion del top-track del artista **
  getTopTracks( id:string ) {
    this.spotify.getTopTracks( id )
        .subscribe( topTracks => {
          this.topTracks = topTracks;
        });
  }
}
