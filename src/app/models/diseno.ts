import { Mueble } from "./mueble";
import { Usuario } from "./usuario";

export class Diseno {
    idDiseno?: number;
    nombre: string = "";
    urlModelo3d: string = ""; // El link de Cloudinary
    estado: string = "";
    fechaCreacion?: string;
    
    
    mueble?: Mueble;
    usuario?: Usuario;
}