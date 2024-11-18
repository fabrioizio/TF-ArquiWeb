import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Lengua} from '../../model/Lengua';
import {LenguaService} from '../../services/lengua.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [
    MatTable,
    MatPaginator,
    MatSort,
    MatButton,
    RouterLink,
    MatIcon,
    MatRowDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatRow,
    MatHeaderRow,
    MatCellDef,
    MatHeaderCellDef,
    MatCell,
    MatHeaderCell
  ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent implements OnInit,AfterViewInit{

  listarLenguas: Lengua[] = [];
  displayedColumns = ['id', 'nombreLengua'];
  dataSource: MatTableDataSource<Lengua> = new MatTableDataSource<Lengua>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lenguaService: LenguaService = inject(LenguaService);
  loginService: LoginService = inject(LoginService)
  route: Router = inject(Router);

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    console.log("Cargando Lista de lenguajes");
    this.loadLista();
  }

  loadLista(): void {
    this.lenguaService.listarLenguas().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => {
        console.error("Error en consulta de lenguas", err);
        alert("No se pudieron cargar los lenguajes. Intenta nuevamente.");
      }
    });
  }

}
