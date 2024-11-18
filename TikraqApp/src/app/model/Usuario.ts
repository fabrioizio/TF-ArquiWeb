import {Consulta} from './Consulta';
import {Calificacion} from './Calificacion';
import {Curso} from './Curso';
import {Suscripcion} from './Suscripcion';
import {Traduccion} from './Traduccion';
import {Role} from './Role';

export class Usuario {
  id: number;
  nombre: string;
  correoElectronico: string;
  contrasenia: string;
  idiomaPreferido: string;
  roles: Role[];
  consultas: Consulta[] = [];
  calificaciones: Calificacion[] = [];
  cursos: Curso[] = [];
  suscripciones: Suscripcion[] = [];
  traducciones: Traduccion[] = [];

  constructor( id: number=0,
               nombre: string = '',
               correoElectronico: string = '',
               contrasenia: string = '',
               idiomaPreferido: string = '',
               roles: Role[] = [],
               consultas: Consulta[] = [],
               calificaciones: Calificacion[] = [],
               cursos: Curso[] = [],
               suscripciones: Suscripcion[] = [],
               traducciones: Traduccion[] = []) {
    this.id = id;
    this.nombre = nombre;
    this.correoElectronico = correoElectronico;
    this.contrasenia = contrasenia;
    this.idiomaPreferido = idiomaPreferido;
    this.roles = roles;
    this.consultas = consultas;
    this.calificaciones = calificaciones;
    this.cursos = cursos;
    this.suscripciones = suscripciones;
    this.traducciones = traducciones;
  }
}
