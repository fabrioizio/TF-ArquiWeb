import {Progreso} from './Progreso';
import {Curso} from './Curso';
import {Pregunta} from './Pregunta';

export class Leccion {
  id: number;
  titulo: string;
  contenido: string;
  cursosCursoid: { id:number };

  constructor(id: number=0, titulo: string, contenido: string, cursosCursoid: { id:number }) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.cursosCursoid = cursosCursoid;
  }

}
