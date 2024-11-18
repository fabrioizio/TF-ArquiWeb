import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {CommonModule, NgIf} from "@angular/common";
import {Calificacion} from '../../model/Calificacion';
import {ConsultaService} from '../../services/consulta.service';
import {UsuarioService} from '../../services/usuario.service';
import {Consulta} from '../../model/Consulta';
import {CalificacionService} from '../../services/calificacion.service';

@Component({
  selector: 'app-qualify',
  standalone: true,
    imports: [
      RouterLink,
      MatCardContent,
      MatCardTitle,
      MatCard,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      CommonModule
    ],
  templateUrl: './qualify.component.html',
  styleUrl: './qualify.component.css'
})
export class QualifyComponent implements OnInit{
  CalificacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private calificacionService: CalificacionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.CalificacionForm = this.fb.group({
      rating: ['',  [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }
  nav2():void{
    const rolLogueado = this.usuarioService.getRolId(); // Obtiene el ID del usuario logueado
    const rolId = rolLogueado? parseInt(rolLogueado, 10) : 0;

    switch (rolId) {
      case 1:
        console.log(rolId);
        break;
      case 2:
        this.router.navigate(['/main-user-free']);
        break;
      case 3:
        this.router.navigate(['/main-user']);
        break;
      case 4:
        this.router.navigate(['/main-user-premium']);
        break;
      default:
        console.log("Error switch");
        break;
    }
  };
  onSubmit(): void {
    const usuarioLogueado = this.usuarioService.getUserId();
    const usuarioId = usuarioLogueado ? parseInt(usuarioLogueado, 10) : 0;

    const rolLogueado = this.usuarioService.getRolId();
    const rolId = rolLogueado? parseInt(rolLogueado, 10) : 0;

    const calificacion: Calificacion = {
        id: 0,
        rating: this.CalificacionForm.get('rating')?.value || '',
        usuariosUsuarioid: { id: usuarioId }
    };


    this.calificacionService.crearCalificacion(calificacion).subscribe({
      next: (response) => {
        console.log('Calificacion registrada exitosamente:', response);
        switch (rolId) {
          case 1:
            console.log(rolId);
            break;
          case 2:
            this.router.navigate(['/translate-free']);
            break;
          case 3:
            this.router.navigate(['/translate']);
            break;
          case 4:
            this.router.navigate(['/translate-premium']);
            break;
          default:
            console.log("Error switch");
            break;
        }
      },
      error: (err) => {
        console.error('Error al registrar consulta:', err);
      }
    });
  }

}
