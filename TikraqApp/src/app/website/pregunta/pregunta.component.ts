import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {Leccion} from '../../model/Leccion';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {LeccionService} from '../../services/leccion.service';
import {Router, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Pregunta} from '../../model/Pregunta';
import {PreguntaService} from '../../services/pregunta.service';

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css'
})
export class PreguntaComponent implements OnInit,AfterViewInit{

  listarPreguntas: Pregunta[] = [];
  p:Pregunta[]=[];
  displayedColumns = [ 'id', 'texto', 'opcion1', 'opcion2', 'opcion3', 'opcion4', 'respuestaCorrecta', 'leccionId'];
  dataSource: MatTableDataSource<Pregunta> = new MatTableDataSource<Pregunta>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  preguntaService: PreguntaService = inject(PreguntaService);
  leccionService: LeccionService = inject (LeccionService);
  route: Router = inject(Router);

  constructor() {
    console.log("Cargando constructor de cursos");
  }
  nav():void{
    console.log("XD")

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Cargando Lista de Cursos");
    this.loadLista();
  }

  loadLista(): void {
    this.preguntaService.listarPreguntas().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error("Error en consulta de preguntas", err)
    });
  }



}
