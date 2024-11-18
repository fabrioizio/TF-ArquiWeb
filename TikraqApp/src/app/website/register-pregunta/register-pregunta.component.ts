import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Curso} from '../../model/Curso';
import {Router, RouterLink} from '@angular/router';
import {LeccionService} from '../../services/leccion.service';
import {Leccion} from '../../model/Leccion';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {Pregunta} from '../../model/Pregunta';
import {PreguntaService} from '../../services/pregunta.service';

@Component({
  selector: 'app-register-pregunta',
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
  templateUrl: './register-pregunta.component.html',
  styleUrl: './register-pregunta.component.css'
})
export class RegisterPreguntaComponent implements OnInit{
  registroPreguntaForm: FormGroup;
  lecciones: Leccion[] = [];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private preguntaService:PreguntaService,
    private leccionService: LeccionService,
  ) {}

  ngOnInit(): void {
    this.registroPreguntaForm = this.fb.group({
      texto: ['', Validators.required],
      opcion1: ['', Validators.required],
      opcion2: ['', Validators.required],
      opcion3: ['', Validators.required],
      opcion4: ['', Validators.required],
      indiceRespuestaCorrecta: ['', Validators.required],
      leccionID: ['', Validators.required],
    });

    this.cargarLecciones();
  }


  cargarLecciones(): void {
    this.leccionService.listarLecciones().subscribe({
      next: (data) => (this.lecciones = data),
      error: (err) => console.error('Error al cargar lecciones', err),
    });
  }
  onSubmit(): void {
    if (this.registroPreguntaForm.valid) {
      const leccionSeleccionada = this.lecciones.find(
        (l) => l.id === this.registroPreguntaForm.get('leccionID')?.value
      );

      if (!leccionSeleccionada) {
        console.error('Error: No se encontró la lección seleccionada.');
        return;
      }

      const opciones = [
        this.registroPreguntaForm.get('opcion1')?.value,
        this.registroPreguntaForm.get('opcion2')?.value,
        this.registroPreguntaForm.get('opcion3')?.value,
        this.registroPreguntaForm.get('opcion4')?.value,
      ];

      const pregunta: Pregunta = {
        id: 0,
        texto: this.registroPreguntaForm.get('texto')?.value || '',
        opciones: opciones,
        indiceRespuestaCorrecta: Number(this.registroPreguntaForm.get('indiceRespuestaCorrecta')?.value) || 0,
        leccionesLeccionid: { id: leccionSeleccionada.id },
      };

      this.preguntaService.registrarPregunta(pregunta).subscribe({
        next: (response) => {
          console.log('Pregunta registrada exitosamente:', response);
          this.router.navigate(['/pregunta']);
        },
        error: (err) => {
          console.error('Error al registrar la pregunta:', err);
        },
      });
    }
  }

}
