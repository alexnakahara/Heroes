import { Poder } from './../poder';
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-list-poder',
  templateUrl: './list-poder.component.html',
  styleUrls: ['./list-poder.component.css']
})
export class ListPoderComponent implements OnInit {

  @Input() poderes: Poder[];
  @Input() id: number;


  constructor(private heroService: HeroService) { }

  ngOnInit() {
  console.log('O poder', this.poderes);
  }

  addPoder(name: string, potencia: number): void {
    name = name.trim();
    if (!name) { return; }

    const poder: Poder = {
      id_hero: this.id,
      id_poder: 0,
      tx_poder: name,
      nu_potencia: potencia,
      is_deleted: false
    };
    this.heroService.addPoder(poder).subscribe(resp => {
      this.poderes.push(resp);
    });
  }
  delete(poder: Poder): void {
    this.poderes = this.poderes.filter(h => h !== poder);
    this.heroService.deletePoder(poder).subscribe();
  }

}
