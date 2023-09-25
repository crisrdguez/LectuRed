export class Usuario{
    email: string | undefined;
    pass:string | undefined;
    nombre:string | undefined;
    

    constructor(email:string|undefined, pass:string|undefined, nombre:string|undefined){
        this.email=email;
        this.pass=pass;
        this.nombre=nombre;
        
    }
}