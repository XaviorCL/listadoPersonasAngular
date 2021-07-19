import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DataServices } from './data.services';
import { LogginService } from './LogginService.service';
import { Persona } from './persona.model';

@Injectable() // para agregar un servicio dentro de otro servicio
export  class PersonasService{
  personas: Persona[] = [];

  saludar = new EventEmitter<number>();

  constructor(private logginService: LogginService,
              private dataServices: DataServices
    ){}

    // tslint:disable-next-line: typedef
    setPersonas(personas: Persona[]){
      this.personas = personas;
    }

   // tslint:disable-next-line: typedef
   getPersonas(){
     return this.dataServices.cargarPersonas();
  }

  agregarPersona(persona: Persona){
     this.logginService.enviaMensajeAConsola('Agregamos :' + persona.nombre);

     if(this.personas == null){
       this.personas = [];
     }

     this.personas.push( persona );
     this.dataServices.guardarPersonas(this.personas);
  }

  encontrarPersona(index: number){
    const people: Persona = this.personas[index];
    this.logginService.enviaMensajeAConsola('encontramos a:' + people.nombre + '' + people.apellido);
    return people;
  }
  modificarPersona(index: number, persona: Persona){
    let persona1 = this.personas[index];
    persona1.nombre = persona.nombre;
    persona1.apellido = persona.apellido;
    this.dataServices.modificarPersona(index, persona);
  }

  eliminarPersona(index: number){
    this.personas.splice(index, 1);
    this.dataServices.eliminarPersona(index);
    this.modificarPersonas();
  }

  modificarPersonas(){
    if (this.personas != null){
      this.dataServices.guardarPersonas(this.personas);
    }
  }
}
