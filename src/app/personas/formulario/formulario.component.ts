import { logging } from 'protractor';
import { LogginService } from './../../LogginService.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasService } from '../../personas.service';
import { Persona } from './../../persona.model';



@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit{
  nombreInput = '';
  apellidoInput = '';
  index: number;
  modoEdicion: number;

   constructor(private personasS: PersonasService,
               private router: Router,
               private route: ActivatedRoute,
               private loggin: LogginService) {}

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];

    if (this.modoEdicion != null && this.modoEdicion === 1){
      const persona: Persona = this.personasS.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }
   guardarPersona(){
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    this.loggin.enviaMensajeAConsola(persona1.nombre + ' ' + persona1.apellido);
    if (this.modoEdicion != null && this.modoEdicion === 1){
      this.personasS.modificarPersona(this.index, persona1);
    } else{
      this.personasS.agregarPersona(persona1);
    }
    this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index != null){
      this.personasS.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }
}
