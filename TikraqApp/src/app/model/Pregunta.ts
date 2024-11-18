export class Pregunta {
  id: number;
  texto: string;
  opciones: string[];
  indiceRespuestaCorrecta: number;
  leccionesLeccionid: { id: number };

  constructor(id: number = 0, texto: string, opciones: string[], indiceRespuestaCorrecta: number, leccionesLeccionid: { id: number }) {
    this.id = id;
    this.texto = texto;
    this.opciones = opciones;
    this.indiceRespuestaCorrecta = indiceRespuestaCorrecta;
    this.leccionesLeccionid = leccionesLeccionid;
  }

}
