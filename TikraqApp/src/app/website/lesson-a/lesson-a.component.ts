import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Curso} from '../../model/Curso';
import {CursoService} from '../../services/curso.service';
import {Leccion} from '../../model/Leccion';
import {LeccionService} from '../../services/leccion.service';
import {DatePipe, NgIf} from '@angular/common';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-lesson-a',
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
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './lesson-a.component.html',
  styleUrl: './lesson-a.component.css'
})
export class LessonAComponent implements OnInit, AfterViewInit{
  listarLecciones: Leccion[] = [];
  displayedColumns = ['id', 'titulo', 'contenido', 'cursoId', 'accion'];
  dataSource: MatTableDataSource<Leccion> = new MatTableDataSource<Leccion>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //cursoService: CursoService = inject(CursoService);
  //route: Router = inject(Router);

  leccionService: LeccionService = inject(LeccionService);
  route: Router = inject(Router);

  constructor() {}
  nav():void{
    this.route.navigate(['/pregunta']);

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Cargando Lista de lecciones");
    this.loadLista();
  }

  loadLista(): void {
    this.leccionService.listarLecciones().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error("Error en consulta de cursos", err)
    });
  }

}
