import {Leccion} from './Leccion';

export class Progreso {
  id: number;
  estado: string;
  fechaUltimoAcceso: Date;
  leccionesLeccionid: {id: number};
  usuariosUsuarioid:{id: number, nombre:string};

  constructor(id: number=0, estado: string, fechaUltimoAcceso: Date,  leccionesLeccionid: {id: number},usuariosUsuarioid:{id: number, nombre:string}) {
    this.id = id;
    this.estado = estado;
    this.fechaUltimoAcceso = fechaUltimoAcceso;
    this.leccionesLeccionid=leccionesLeccionid;
    this.usuariosUsuarioid=usuariosUsuarioid
  }
}
