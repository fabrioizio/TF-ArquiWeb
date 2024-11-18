import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {DatePipe, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProgresoService} from '../../services/progreso.service';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Curso} from '../../model/Curso';
import {CursoService} from '../../services/curso.service';
import {Progreso} from '../../model/Progreso';

@Component({
  selector: 'app-progress',
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
    MatIcon
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent implements OnInit, AfterViewInit{
  listarProgresos: Progreso[] = [];
  displayedColumns = ['id', 'estado', 'fecha', 'leccionId', 'usuarioId'];
  dataSource: MatTableDataSource<Progreso> = new MatTableDataSource<Progreso>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  progresoService: ProgresoService = inject(ProgresoService);
  route: Router = inject(Router);

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Cargando Lista de progresos");
    this.loadLista();
  }

  loadLista(): void {
    this.progresoService.listarProgresos().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error("Error en consulta de cursos", err)
    });
  }

}
