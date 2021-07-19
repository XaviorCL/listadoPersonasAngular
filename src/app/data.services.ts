import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Persona } from './persona.model';

@Injectable()
export class DataServices{
  constructor(private httpClient: HttpClient){}

  // tslint:disable-next-line: typedef
  cargarPersonas(): Observable<any> {
    return this.httpClient.get('https://listado-persona-d5dea-default-rtdb.firebaseio.com/datos.json');
  }

  // Guardar personas
  // tslint:disable-next-line: typedef
  guardarPersonas(personas: Persona[]){
      this.httpClient.put('https://listado-persona-d5dea-default-rtdb.firebaseio.com/datos.json/', personas)
      // tslint:disable-next-line: deprecation
      .subscribe(
        response => console.log('resultado de guardar' + response),
        error => console.log('error al guardar registro' + error)
        );

  }

  modificarPersona(index: number, persona: Persona){
    let url: string;
    url = 'https://listado-persona-d5dea-default-rtdb.firebaseio.com/datos/' + index + '.json';
    this.httpClient.put(url, persona)
    .subscribe(
      response => console.log('modificacion Ok:' + response)
    ,
    error  => console.log('error al modificar la persona' + error)
    );
  }

    eliminarPersona(index:number){
    // tslint:disable-next-line: no-shadowed-variable
    let url: string;
    url = 'https://listado-persona-d5dea-default-rtdb.firebaseio.com/datos/' + index + '.json';
    this.httpClient.delete(url).subscribe(
    response => console.log('modificacion Ok: ' + response),
    error  => console.log('error al eliminar persona' + error)
    );
    }

  }






