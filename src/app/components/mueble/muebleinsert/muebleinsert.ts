import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mueble } from '../../../models/mueble';
import { MuebleService } from '../../../services/muebleservice';

@Component({
  selector: 'app-muebleinsert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './muebleinsert.html',
  styleUrl: './muebleinsert.css'
})
export class MuebleInsert implements OnInit {

  form: FormGroup = new FormGroup({});
  mueble: Mueble = new Mueble();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private fb: FormBuilder,
    private mS: MuebleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: [''],
      dimension: [''],
      estilo: [''],
      precio: [0, Validators.required],
      sostenibilidad: [false],
      proveedor: ['']
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      if (this.edicion) this.init();
    });
  }

  init() {
    this.mS.listId(this.id).subscribe(data => {
      this.mueble = data;
      this.form.patchValue(this.mueble);
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const obj = this.form.value;

    obj.idMueble = this.edicion ? this.id : undefined;

    if (this.edicion) {
      this.mS.update(obj).subscribe(() => {
        alert("Mueble actualizado");
        this.mS.list().subscribe(data => this.mS.setList(data));
        this.router.navigate(['/dashboard/muebles']);
      });
    } else {
      this.mS.insert(obj).subscribe(() => {
        alert("Mueble registrado");
        this.form.reset();
        this.router.navigate(['/dashboard/muebles']);
      });
    }
  }
}
