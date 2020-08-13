import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeroService } from '../hero.service';
import { Poder } from './../poder';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-poder-detail',
  templateUrl: './poder-detail.component.html',
  styleUrls: ['./poder-detail.component.css']
})
export class PoderDetailComponent implements OnInit {
  poder: Poder;
  formulario = new FormGroup({
    tx_poder: new FormControl(''),
    nu_potencia: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.getPoder();
  }


  getPoder(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = +params.id;
      this.heroService.getPoder(id).subscribe(poder => {
        console.log('retorno', poder);
        this.poder = poder;
      });
    });

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      tx_poder: [null, Validators.minLength(4)],
      nu_potencia: [null, [Validators.minLength(2), Validators.maxLength(4)]]
    });
  }

  goBack(): void {
    this.location.back();
    console.log(this.goBack);
  }

  atualiza() {
    console.log('retorno do formulario', this.formulario);
    const data: Poder = {
      id_hero: this.poder.id_hero,
      id_poder: this.poder.id_poder,
      tx_poder: this.formulario.value.tx_poder,
      nu_potencia: this.formulario.value.nu_potencia,
      is_deleted: false,
    };
    this.heroService.updatePoder(data).subscribe(resposta => {
      this.formulario.reset(resposta);
    });
  }

}

