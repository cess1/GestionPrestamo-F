import { Component, ViewChild } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app.material.module';
import { MatDialog } from '@angular/material/dialog';
import { PrestamoService } from '../../services/solicitud-prestamo.service';
import { CrudSolicitudPrestamoAgregarComponent } from '../crud-solicitud-prestamo-agregar/crud-solicitud-prestamo-agregar.component';
import { SolicitudPrestamo } from '../../models/solicitud-prestamo.model';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CrudSolicitudPrestamoActualizarComponent } from '../crud-solicitud-prestamo-actualizar/crud-solicitud-prestamo-actualizar.component';

@Component({
  selector: 'app-crud-solicitud-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent],
  templateUrl: './crud-solicitud-prestamo.component.html',
  styleUrl: './crud-solicitud-prestamo.component.css',
})
export class ActualizarSolicitudPrestamoEstado {
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = [
    'idSolicitud',
    'capital',
    'dias',
    'montoPagar',
    'fechaInicioPrestamo',
    'fechaFinPrestamo',
    'estadoSolicitud',
    'acciones',
  ];
  filtro: string = '';
  constructor(
    private dialogService: MatDialog,
    private prestamoService: PrestamoService
  ) {}

  refreshTable() {
    console.log('>>> refreshTable [ini]');
    this.prestamoService.obtenerPrestamos().subscribe((x) => {
      this.dataSource = new MatTableDataSource<SolicitudPrestamo>(x);
      this.dataSource.paginator = this.paginator;
    });
    console.log('>>> refreshTable [fin]');
  }

  // actualizaEstado(obj: SolicitudPrestamo) {
  //   obj.estado = obj.estado == 1 ? 0 : 1;
  //   this.prestamoService.actualizarCrud(obj).subscribe();
  // }

  actualizaEstado(obj: SolicitudPrestamo) {
    if (obj.estadoSolicitud && obj.estadoSolicitud.idDataCatalogo) {
      if (obj.estadoSolicitud.idDataCatalogo === 13) {
        obj.estadoSolicitud.idDataCatalogo = 14;
      } else if (obj.estadoSolicitud.idDataCatalogo === 14) {
        obj.estadoSolicitud.idDataCatalogo = 13;
      }

      this.prestamoService.actualizarCrud(obj).subscribe(
        (response) => {
          console.log('Estado actualizado con éxito', response);
          this.refreshTable();
        },
        (error) => {
          console.error('Error al actualizar el estado', error);
        }
      );
    }
  }
}
