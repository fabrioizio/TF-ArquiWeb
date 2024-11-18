export class Consulta {
  id: number;
  titulo: string;
  descripcion: string;
  usuariosUsuarioid: { id: number };

  constructor(id: number=0, titulo: string, descripcion: string,usuariosUsuarioid: { id: number }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.usuariosUsuarioid = usuariosUsuarioid;
  }
}
