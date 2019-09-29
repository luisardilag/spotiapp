import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;

    // ** Peticion de los nuevos lanzamientos del día **
    spotify.getNewReleases()
      .subscribe(( data: any ) => {
        this.nuevasCanciones = data;
        this.loading = false;
      },
      // Si hay un error en la petición lo muestra en el mensaje del Home
      ( errorServicio ) => {
        this.loading = false;
        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
      }
      );

  }
}
