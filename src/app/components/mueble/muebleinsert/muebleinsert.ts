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
        // Llenar el formulario con los datos existentes
        this.form.patchValue(data);
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
      alert("Error de sesión: No se pudo identificar al usuario. Por favor inicia sesión nuevamente.");
      return;
    }


    this.mueble.nombre = this.form.value.nombre;
    this.mueble.categoria = this.form.value.categoria;
    
    // Asignamos los nuevos valores
    this.mueble.alto = this.form.value.alto;
    this.mueble.ancho = this.form.value.ancho;
    this.mueble.profundidad = this.form.value.profundidad;
    
    this.mueble.estilo = this.form.value.estilo;
    this.mueble.precio = this.form.value.precio;
    this.mueble.descripcion = this.form.value.descripcion;
    this.mueble.programaDev = this.form.value.programaDev;
    this.mueble.sostenibilidad = this.form.value.sostenibilidad;
    this.mueble.idUsuario=this.form.value.idUsuario;


   if (this.edicion) {
      this.mueble.idMueble = this.id;
      this.mS.update(this.mueble).subscribe(() => {
        this.mS.list().subscribe((data) => this.mS.setList(data));
        this.router.navigate(['/muebles']);
      });
    } else {
      this.mS.insert(this.mueble).subscribe(() => {
        this.mS.list().subscribe((data) => this.mS.setList(data));
        this.router.navigate(['/muebles']);
      });
    }
  }
}