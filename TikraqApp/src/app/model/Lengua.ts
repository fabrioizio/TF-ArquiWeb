import {Curso} from './Curso';

export class Lengua {
  id: number;
  nombreLengua: string;
  cursos: Curso[] = [];

  constructor(id: number, nombreLengua: string) {
    this.id = id;
    this.nombreLengua = nombreLengua;
  }

}
