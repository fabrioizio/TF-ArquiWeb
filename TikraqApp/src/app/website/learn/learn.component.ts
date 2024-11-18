import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormBuilder, FormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {UsuarioService} from '../../services/usuario.service';
import {CursoService} from '../../services/curso.service';
import {Curso} from '../../model/Curso';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {RoleService} from '../../services/role.service';
import {Leccion} from '../../model/Leccion';
import {LeccionService} from '../../services/leccion.service';

@Component({
  selector: 'app-learn',
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
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit, AfterViewInit{
  listarCursos: Curso[] = [];
  displayedColumns = ['nombreCurso', 'descripcion','accion'];
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource<Curso>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cursoService: CursoService = inject(CursoService);
  usuarioService: UsuarioService = inject(UsuarioService);
  route: Router = inject(Router);

  constructor() {}

  nav(element: Curso): void {
    localStorage.setItem('cursoId', element.id.toString()); // Guarda el ID del curso seleccionado en localStorage
    this.route.navigate(['/lesson']); // Navega al componente de lecciones
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log("Cargando Lista de cursos para los usuarios");
    this.loadLista();
  }

  loadLista(): void {
    const usuarioLogueado = this.usuarioService.getUserId();
    const usuarioId = usuarioLogueado ? parseInt(usuarioLogueado, 10) : 0;

    this.cursoService.listarCursosPorIdUsuario(usuarioId).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error("Error en consulta de cursos", err)
    });


  }
}
