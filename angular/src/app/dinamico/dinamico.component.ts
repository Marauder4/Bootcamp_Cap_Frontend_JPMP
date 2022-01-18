import { Component, OnInit } from '@angular/core';
import { ContactosComponent } from '../contactos';
import { DemosComponent } from '../demos/demos.component';
import { FormularioComponent } from '../formulario/formulario.component';
import { HomeComponent } from '../main';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css']
})
export class DinamicoComponent implements OnInit {
  menu = [
    { texto: 'contactos', icono: 'chalkboard-teacher', componente: ContactosComponent },
    { texto: 'formulario', icono: 'chalkboard-teacher', componente: FormularioComponent },
    { texto: 'inicio', icono: 'home', componente: HomeComponent},
    { texto: 'demos', icono: 'chalkboard-teacher', componente: DemosComponent },
  ]
  actual: any = this.menu[0].componente;

  constructor() { }

  public seleccionar(indice: number): void {
    this.actual = this.menu[indice].componente;
  }

  ngOnInit(): void {
  }

}
