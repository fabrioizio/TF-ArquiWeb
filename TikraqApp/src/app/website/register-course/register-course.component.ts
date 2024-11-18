import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { LenguaService } from '../../services/lengua.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Curso } from '../../model/Curso';
import { Lengua } from '../../model/Lengua';
import { Usuario } from '../../model/Usuario';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-course',
  standalone: true,
  templateUrl: './register-course.component.html',
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./register-course.component.css']
})
export class RegisterCourseComponent implements OnInit {
  registroCursoForm: FormGroup;
  lenguas: Lengua[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cursoService: CursoService,
    private lenguaService: LenguaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.registroCursoForm = this.fb.group({
      nombreCurso: ['', Validators.required],
      descripcion: ['', Validators.required],
      lenguaID: ['', Validators.required],
      usuarioID: ['', Validators.required],
    });

    this.cargarLenguas();
    this.cargarUsuarios();
  }

  cargarLenguas(): void {
    this.lenguaService.listarLenguas().subscribe({
      next: (data) => this.lenguas = data,
      error: (err) => console.error("Error al cargar lenguas", err)
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error("Error al cargar usuarios", err)
    });
  }

  onSubmit(): void {
    if (this.registroCursoForm.valid) {
      const lenguaSeleccionada = this.lenguas.find(
        l => l.id === this.registroCursoForm.get('lenguaID')?.value
      );

      const usuarioSeleccionado = this.usuarios.find(
        u => u.id === this.registroCursoForm.get('usuarioID')?.value
      );

      if (!lenguaSeleccionada || !usuarioSeleccionado) {
        console.error("Error: No se encontró la lengua o el usuario seleccionado.");
        return;
      }

      const curso: Curso = {
        id: 0,
        nombreCurso: this.registroCursoForm.get('nombreCurso')?.value || '',
        descripcion: this.registroCursoForm.get('descripcion')?.value || '',
        lenguasLenguaid: lenguaSeleccionada,
        usuariosUsuarioid: usuarioSeleccionado,
        lecciones: []
      };

      this.cursoService.crearCurso(curso).subscribe({
        next: (response) => {
          console.log('Curso registrado exitosamente:', response);
          this.router.navigate(['/course']);
        },
        error: (err) => {
          console.error('Error al registrar curso:', err);
        }
      });
    }
  }
}
