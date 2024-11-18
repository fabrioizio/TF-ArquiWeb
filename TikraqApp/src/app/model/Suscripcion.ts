export class Suscripcion {
  id: number;
  tipo: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  usuariosUsuarioid: { id:number };

  constructor(id: number, tipo: string, fechaInicio: Date, fechaFin: Date, estado: string, usuariosUsuarioid: {id:number }) {
    this.id = id;
    this.tipo = tipo;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.estado = estado;
    this.usuariosUsuarioid = usuariosUsuarioid;
  }
}
