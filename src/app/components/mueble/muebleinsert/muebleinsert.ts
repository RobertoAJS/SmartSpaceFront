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
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Authservice } from '../../../services/authservice';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-muebleinsert',
  standalone: true,
  imports: [
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    RouterLink
  ],
  templateUrl: './muebleinsert.html',
  styleUrl: './muebleinsert.css',
})
export class Muebleinsert implements OnInit {
  form: FormGroup = new FormGroup({});
  mueble: Mueble = new Mueble();
  id: number = 0;
  edicion: boolean = false;

  listaCategorias: string[] = [
    'Sala','Dormitorio','Comedor','Cocina','Oficina','Baño','Infantil','Exterior','Otro'
  ];

  listaEstilos: string[] = [
    'Moderno','Contemporaneo','Minimalista','Industrial','Clasico','Japandi','Divertido','Otro'
  ]; 

   listaSoftware: string[] = [
    'Blender', 'AutoCAD', 'SketchUp', '3ds Max', 'Revit', 'Cinema 4D', 'Maya', 'Otro'
  ];



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


   this.mueble = {
      ...this.mueble,
      ...this.form.value,
      idUsuario: userId
    };



    
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