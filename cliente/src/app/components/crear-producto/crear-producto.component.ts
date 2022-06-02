import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  IsEdit = false;
  productoForm: FormGroup;
  titulo = 'Crear Produto';
  id: string | null;
  imagenName = '';
  formData = new FormData();
  uploadedFiles!: Array<File>;
  timeElapsed = Date.now();
  today = new Date(this.timeElapsed);

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService, 
              private _productoService: ProductoService,
              private aRouter: ActivatedRoute) { 
      this.productoForm = this.fb.group({
        producto: ['', Validators.required],
        categoria: ['', Validators.required],
        ubicacion: ['', Validators.required],
        precio: ['', Validators.required],
        imagen: ['', Validators.required] 
      })
      this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.productoForm);

    console.log(this.productoForm.get('producto')?.value);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
      imagen: this.imagenName
    };

    if(this.IsEdit && this.id !== null){
      this._productoService.eliminarImagen(this.id).subscribe(data => {
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
      for(let i = 0; i < this.uploadedFiles.length; i++){
        this.formData.append("imagen", this.uploadedFiles[i]);
        PRODUCTO.imagen = String(Math.ceil(Date.now()/1000))+'-'+this.uploadedFiles[i].name
      }
      this._productoService.uploadFile(this.formData).subscribe((res) => {
        console.log('Response', res);
      })
      this._productoService.actualizarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue actualizado con exito!', 'Producto Actualizad0');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    console.log(PRODUCTO);
    } else {
      for(let i = 0; i < this.uploadedFiles.length; i++){
          this.formData.append("imagen", this.uploadedFiles[i]);
          PRODUCTO.imagen = String(Math.ceil(Date.now()/1000))+'-'+this.uploadedFiles[i].name
        }
        this._productoService.uploadFile(this.formData).subscribe((res) => {
          console.log('Response', res);
        })
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue registrado con exito!', 'Producto Registrado');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productoForm.reset();
      })
    }
  }

  esEditar(){
      if(this.id !== null){
        this.IsEdit = true
        this.titulo = 'Editar Producto';
        this._productoService.obtenerProducto(this.id).subscribe(data => {
          this.productoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio,
            imagen: data.imagen
          })
          this.imagenName = data.imagen
        })
      } else {
        this.IsEdit = false
      }
  }
  onFileChange(e:any){
    this.uploadedFiles = e.target.files;
  }

}
