export class Calificacion {
  id: number;
  rating: number;
  usuariosUsuarioid: { id: number };

  constructor(id: number =0, rating: number, usuariosUsuarioid: { id: number }) {
    this.id = id;
    this.rating = rating;
    this.usuariosUsuarioid = usuariosUsuarioid;
  }
}
