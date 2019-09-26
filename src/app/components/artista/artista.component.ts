import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  loading: boolean;

  constructor(  private router: ActivatedRoute,
                private spotify: SpotifyService ) {

    this.router.params.subscribe( params => {
      this.getArtista( params['id'] );
    });

    this.loading = true;

  }

  getArtista( id: string ) {

    this.spotify.getArtistaSolo( id )
      .subscribe( artista => {

       this.artista = artista;
       this.loading = false;

      } );

  }

  ngOnInit() {
  }

}
