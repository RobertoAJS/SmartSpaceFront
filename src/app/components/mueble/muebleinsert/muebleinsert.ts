import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      dimension: ['', Validators.required],
      estilo: ['', Validators.required],
      precio: [0, Validators.required],
      sostenibilidad: [false],
      proveedor: ['', Validators.required],
    });

    // Luego vemos si viene con /edits/:id
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
        // Rellenamos campos, el id solo lo mostramos aparte
        this.form.patchValue({
          nombre: data.nombre,
          categoria: data.categoria,
          dimension: data.dimension,
          estilo: data.estilo,
          precio: data.precio,
          sostenibilidad: data.sostenibilidad,
          proveedor: data.proveedor,
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Pasamos del form al objeto
    this.mueble.nombre = this.form.value.nombre;
    this.mueble.categoria = this.form.value.categoria;
    this.mueble.dimension = this.form.value.dimension;
    this.mueble.estilo = this.form.value.estilo;
    this.mueble.precio = this.form.value.precio;
    this.mueble.sostenibilidad = this.form.value.sostenibilidad;
    this.mueble.proveedor = this.form.value.proveedor;

    if (this.edicion) {
      // El id viene de la ruta, no del form
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
