export class Traduccion {
  id: number;
  textoOriginal: string;
  textoTraducido: string;
  fechaTraduccion: Date;
  idiomaOriginal: string;
  idiomaTraducir: string;
  usuariosUsuarioid: { id: number };

  constructor(id: number, textoOriginal: string, textoTraducido: string, fechaTraduccion: Date, idiomaOriginal: string, idiomaTraducir: string, usuariosUsuarioid: { id: number }) {
    this.id = id;
    this.textoOriginal = textoOriginal;
    this.textoTraducido = textoTraducido;
    this.fechaTraduccion = fechaTraduccion;
    this.idiomaOriginal = idiomaOriginal;
    this.idiomaTraducir = idiomaTraducir;
    this.usuariosUsuarioid=usuariosUsuarioid;
  }
}
