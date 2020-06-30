import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lng = 7.809007;
  lat = 51.678418;

  constructor() {
    // const nuevoMarcador = new Marcador( this.lat, this.lng );
    // this.marcadores.push(nuevoMarcador);
   }

  ngOnInit(): void {
    this.cargarMarcadores();
  }

  agregarMarcador( evento ) {
    // console.log(evento);
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador( coords.lat, coords.lng );
    this.marcadores.push( nuevoMarcador );
    this.guardarEnStorage();
  }

  guardarEnStorage() {
    localStorage.setItem( 'marcadores', JSON.stringify(this.marcadores) );
  }

  cargarMarcadores() {
    const marcadoresEnStorage = localStorage.getItem( 'marcadores' );
    if (marcadoresEnStorage) {
      this.marcadores = JSON.parse( marcadoresEnStorage );
    }
  }

  borrarMarcador( i: number ) {
    console.log(i);
    this.marcadores.splice(i, 1);
    this.guardarEnStorage();
  }
}
