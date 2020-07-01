import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lng = 7.809007;
  lat = 51.678418;

  constructor( private snackBar: MatSnackBar, private dialog: MatDialog ) {
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
    this.openSnackBar('Marcador creado', 'Cerrar');
  }

  guardarEnStorage() {
    localStorage.setItem( 'marcadores', JSON.stringify(this.marcadores) );
  }

  cargarMarcadores() {
    const marcadoresEnStorage = localStorage.getItem( 'marcadores' );
    if (marcadoresEnStorage) {
      this.marcadores = JSON.parse( marcadoresEnStorage );
    }
    this.openSnackBar('Marcadores cargados', 'Cerrar');
  }

  borrarMarcador( i: number ) {
    // console.log(i);
    this.marcadores.splice(i, 1);
    this.guardarEnStorage();
    this.openSnackBar('Marcador borrado', 'Cerrar');
  }

  editarMarcador( marcador: Marcador ) {
    console.log( marcador );
    // this.marcadores.splice(i, 1);
    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, descripcion: marcador.descripcion }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (!result) {
        return;
      }
      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;
      this.guardarEnStorage();
      this.openSnackBar('Marcador editado', 'Cerrar');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
