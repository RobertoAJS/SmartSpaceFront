import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Muebleservice } from '../../../services/muebleservice';
import { Mueble } from '../../../models/mueble';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Authservice } from '../../../services/authservice';

@Component({
  selector: 'app-muebleinsert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './muebleinsert.html',
  styleUrl: './muebleinsert.css',
})
export class Muebleinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  mueble: Mueble = new Mueble();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private mS: Muebleservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: Authservice,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      
      // --- NUEVOS CAMPOS (Reemplazan a dimension) ---
      alto: [0, [Validators.required, Validators.min(0)]],
      ancho: [0, [Validators.required, Validators.min(0)]],
      profundidad: [0, [Validators.required, Validators.min(0)]],
      // ---------------------------------------------
      
      estilo: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: [''],
      programaDev: [''], // Para el software de diseño
      sostenibilidad: [false],
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  init(): void {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe((data) => {
        this.mueble = data;
        this.form.patchValue({
          nombre: data.nombre,
          categoria: data.categoria,
          // Mapeamos las nuevas dimensiones
          alto: data.alto,
          ancho: data.ancho,
          profundidad: data.profundidad,
          estilo: data.estilo,
          precio: data.precio,
          descripcion: data.descripcion,
          programaDev: data.programaDev,
          sostenibilidad: data.sostenibilidad,
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const userId = this.authService.getUserId();
  if (userId <= 0) {
      alert("Error: No se pudo identificar al usuario.");
      return;
  }

  const payload = {
      idMueble: this.edicion ? this.id : undefined,
      nombre: this.form.value.nombre,
      categoria: this.form.value.categoria,
      alto: this.form.value.alto,
      ancho: this.form.value.ancho,
      profundidad: this.form.value.profundidad,
      estilo: this.form.value.estilo,
      precio: this.form.value.precio,
      descripcion: this.form.value.descripcion,
      programaDev: this.form.value.programaDev,
      sostenibilidad: this.form.value.sostenibilidad,
      
      idUsuario: userId // <--- AQUÍ ESTÁ EL CAMPO QUE FALTABA (Plano)
  };


  
    // 3. Enviar este 'payload' en lugar de 'this.mueble'
    if (this.edicion) {
      // Nota: Asegúrate que tu servicio acepte 'any' o el tipo correcto
      this.mS.update(payload as any).subscribe(() => {
        this.mS.list().subscribe((data) => this.mS.setList(data));
        this.router.navigate(['/muebles']);
      });
    } else {
      this.mS.insert(payload as any).subscribe(() => {
        this.mS.list().subscribe((data) => this.mS.setList(data));
        this.router.navigate(['/muebles']);
      });
    }

  }
}