export class Usuario {
    idUsuario?: number;        // <-- opcional, SIN valor por defecto
    username: string = ''; 
    nombre: string = '';
    email: string = '';
    password: string = ''; 
    statusUsuario:boolean=false
}
