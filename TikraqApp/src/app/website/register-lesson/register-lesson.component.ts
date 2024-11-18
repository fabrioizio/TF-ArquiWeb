import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect, MatSelectModule} from "@angular/material/select";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Lengua} from '../../model/Lengua';
import {Usuario} from '../../model/Usuario';
import {Router, RouterLink} from '@angular/router';
import {CursoService} from '../../services/curso.service';
import {LenguaService} from '../../services/lengua.service';
import {UsuarioService} from '../../services/usuario.service';
import {Curso} from '../../model/Curso';
import {Progreso} from '../../model/Progreso';
import {ProgresoService} from '../../services/progreso.service';
import {LeccionService} from '../../services/leccion.service';
import {Leccion} from '../../model/Leccion';

@Component({
  selector: 'app-register-lesson',
  standalone: true,
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
  templateUrl: './register-lesson.component.html',
  styleUrl: './register-lesson.component.css'
})
export class RegisterLessonComponent implements OnInit {
  registroLeccionForm: FormGroup;
  cursos: Curso[] = [];

  //progreso: Progreso[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private leccionService: LeccionService,
    private cursoService: CursoService
    //private progresoService: ProgresoService
  ) {}

  ngOnInit(): void {
    this.registroLeccionForm = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      cursoID: ['', Validators.required],
      //progresoID: ['', Validators.required],
    });

    this.cargarCursos();
  }


  cargarCursos(): void {
    this.cursoService.listarCursos().subscribe({
      next: (data) => this.cursos = data,
      error: (err) => console.error("Error al cargar cursos", err)
    });
  }

  //cargarProgresos(): void {
  // this.progresoService.listarLecciones().subscribe({
  //    next: (data) => this.lecciones = data,
  //    error: (err) => console.error("Error al cargar lenguas", err)
  //  });
  //}

  onSubmit(): void {
    if (this.registroLeccionForm.valid) {

      const cursoSeleccionado = this.cursos.find(
        c => c.id === this.registroLeccionForm.get('cursoID')?.value
      );

      if (!cursoSeleccionado) {
        console.error("Error: No se encontró el curso seleccionado.");
        return;
      }

      const leccion: Leccion = {
        id: 0,
        titulo: this.registroLeccionForm.get('titulo')?.value || '',
        contenido: this.registroLeccionForm.get('contenido')?.value || '',
        cursosCursoid: cursoSeleccionado,
      };

      this.leccionService.crearLeccion(leccion).subscribe({
        next: (response) => {
          console.log('Leccion registrada exitosamente:', response);
          this.router.navigate(['/lessonA']);
        },
        error: (err) => {
          console.error('Error al registrar la leccion:', err);
        }
      });
    }
  }
}
