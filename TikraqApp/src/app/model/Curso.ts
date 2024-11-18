import {Lengua} from './Lengua';
import {Usuario} from './Usuario';
import {Leccion} from './Leccion';

export class Curso {
  id: number;
  nombreCurso: string;
  descripcion: string;
  lenguasLenguaid: { id:number };
  usuariosUsuarioid: { id: number };
  lecciones: Leccion[] = [];

  constructor(id: number, nombreCurso: string, descripcion: string, lenguasLenguaid: { id:number }, usuariosUsuarioid: { id: number }) {
    this.id = id;
    this.nombreCurso = nombreCurso;
    this.descripcion = descripcion;
    this.lenguasLenguaid = lenguasLenguaid;
    this.usuariosUsuarioid = usuariosUsuarioid;
  }

}
