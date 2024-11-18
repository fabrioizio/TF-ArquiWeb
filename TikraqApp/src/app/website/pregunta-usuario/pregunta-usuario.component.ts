import {Component, OnInit} from '@angular/core';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {PreguntaService} from '../../services/pregunta.service';
import {LeccionService} from '../../services/leccion.service';
import {Pregunta} from '../../model/Pregunta';
import {CommonModule} from '@angular/common';
import {MatTable} from '@angular/material/table';
import {Progreso} from '../../model/Progreso';
import {ProgresoService} from '../../services/progreso.service';
import {Leccion} from '../../model/Leccion';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-pregunta-usuario',
  standalone: true,
  imports: [
    MatRadioButton,
    MatRadioGroup,
    FormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './pregunta-usuario.component.html',
  styleUrl: './pregunta-usuario.component.css'
})
export class PreguntaUsuarioComponent implements OnInit{
  preguntas: Pregunta[] = [];
  preguntaActualIndex: number = 0;
  respuestaSeleccionada: string = '';
  respuestasSeleccionadas: { [key: number]: string } = {};
  leccionId: number | null = null;

  constructor(
    private preguntaService: PreguntaService,
    private leccionService: LeccionService,
    private progresoService: ProgresoService,
    private usuarioService :UsuarioService
  ) {}

  ngOnInit(): void {
    const l = this.leccionService.getLecionId();
    const leccionId = l? parseInt(l, 10) : 0;
    console.log(leccionId)
    if (leccionId) {
      this.preguntaService.listarPreguntasPorIdLeccion(leccionId).subscribe({
        next: (preguntas: Pregunta[]) => {
          this.preguntas = preguntas;
          if (this.preguntas.length > 0) {
            this.cargarPregunta(this.preguntaActualIndex);
          }
        },
        error: (err) => console.error('Error al obtener preguntas', err)
      });
    }
  }



  cargarPregunta(index: number): void {
    const preguntaId = this.preguntas[index].id;
    this.respuestaSeleccionada = this.respuestasSeleccionadas[preguntaId] || '';
  }

  siguientePregunta(): void {
    this.guardarRespuesta();
    if (this.preguntaActualIndex < this.preguntas.length - 1) {
      this.preguntaActualIndex++;
      this.cargarPregunta(this.preguntaActualIndex);
    }
  }

  anteriorPregunta(): void {
    this.guardarRespuesta();
    if (this.preguntaActualIndex > 0) {
      this.preguntaActualIndex--;
      this.cargarPregunta(this.preguntaActualIndex);
    }
  }

  guardarRespuesta(): void {
    const preguntaId = this.preguntas[this.preguntaActualIndex].id;
    this.respuestasSeleccionadas[preguntaId] = this.respuestaSeleccionada;
    console.log(`Respuesta guardada para la pregunta ${preguntaId}: ${this.respuestaSeleccionada}`);
  }

  enviarRespuestas(): void {
    // Guarda la última respuesta antes de enviar
    this.guardarRespuesta();

    const l1 = this.leccionService.getLecionId();
    const leccionId1 = l1 ? parseInt(l1, 10) : 0;

    const p = this.progresoService.getProgresoId();
    const progresoId = p ? parseInt(p, 10) : 0;

    const usuarioLogueado = this.usuarioService.getUserId();
    const usuarioId = usuarioLogueado ? parseInt(usuarioLogueado, 10) : 0;
    console.log("leccion Id",leccionId1)
    console.log("progreso Id",progresoId)
    console.log("usuario Id",usuarioId)
    const n = this.usuarioService.getNombreUsuario();
    const NombreUsuario = String(n);
    const today = new Date();
    const progreso: Progreso = {
      id: progresoId,
      estado: 'Terminado',
      fechaUltimoAcceso: today,
      leccionesLeccionid: { id: leccionId1 },
      usuariosUsuarioid: { id: usuarioId, nombre: NombreUsuario }
    };

    this.progresoService.actualizarProgreso(progreso).subscribe({
      next: (response) => {
        console.log('Progreso actualizado exitosamente:', response);

        // Mostrar respuestas finales
        console.log('Respuestas finales:', this.respuestasSeleccionadas);
      },
      error: (err) => {
        console.error('Error al registrar progreso:', err);
      }
    });
  }
}
