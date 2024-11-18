import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Curso} from '../../model/Curso';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {CursoService} from '../../services/curso.service';
import {UsuarioService} from '../../services/usuario.service';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {Leccion} from '../../model/Leccion';
import {LeccionService} from '../../services/leccion.service';
import {Usuario} from '../../model/Usuario';
import {Progreso} from '../../model/Progreso';
import {ProgresoService} from '../../services/progreso.service';

@Component({
  selector: 'app-lesson',
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
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit,AfterViewInit{
  listarLecciones: Leccion[] = [];
  displayedColumns = ['titulo', 'contenido','accion'];
  dataSource: MatTableDataSource<Leccion> = new MatTableDataSource<Leccion>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  leccionService: LeccionService = inject(LeccionService);
  usuarioService: UsuarioService = inject(UsuarioService);
  cursoService:CursoService =inject(CursoService)
  progresoService: ProgresoService = inject(ProgresoService);
  route: Router = inject(Router);

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Cargando Lista de lecciones para los usuarios");
    this.loadLista();
  }

  loadLista(): void {
    const c = this.cursoService.getCursoId();
    const cursoId = c? parseInt(c, 10) : 0
    console.log(cursoId)
    this.leccionService.listarLeccionesPorIdCurso(cursoId).subscribe({

      next: (data) => this.dataSource.data = data,

      error: (err) => console.error("Error en consulta de cursos", err)
    });
  }
  nav(leccion: Leccion): void {
    const usuarioLogueado = this.usuarioService.getUserId();
    const usuarioId = usuarioLogueado? parseInt(usuarioLogueado, 10) : 0;
    const n = this.usuarioService.getNombreUsuario();
    const NombreUsuario = String(n);
    const today= new Date();
    const progreso: Progreso = {
      id: 0,
      estado: 'Iniciado',
      fechaUltimoAcceso: today,
      leccionesLeccionid: {id: leccion.id},
      usuariosUsuarioid: {id: usuarioId, nombre: NombreUsuario}
    };

    this.progresoService.registrarProgreso(progreso).subscribe({
      next: (response) => {
        console.log('Progreso registrado exitosamente:', response);
        localStorage.setItem('progresoId', response.id.toString());
        localStorage.setItem('leccionId', leccion.id.toString());
        this.route.navigate(['/pregunta-usuario']);
      },
      error: (err) => {
        console.error('Error al registrar progreso:', err);
      }
    });
    // Guardar el leccionId en localStorage
    //localStorage.setItem('leccionId', leccion.id.toString());
    // Navegar al componente de preguntas
    //this.route.navigate(['/pregunta-usuario']);
  }
}
