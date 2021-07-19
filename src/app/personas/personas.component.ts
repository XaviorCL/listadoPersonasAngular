import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';


@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];

  constructor(
    private personasService: PersonasService,
    private router: Router) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.personasService.getPersonas().subscribe((persona: Persona[]) =>
    { this.personas = persona;
      this.personasService.setPersonas(this.personas);
      console.log('obtener personas suscriber:' + persona.length);
    });
  }

  // tslint:disable-next-line: typedef
  agregar() {
    this.router.navigate(['personas/agregar']);
  }
}
