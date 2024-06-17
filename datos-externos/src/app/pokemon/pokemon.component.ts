import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { PokeapiService } from '../pokeapi.service';
import { IDetallePokemon } from '../interfaces/IDetallePokemon';
import { IPokemon } from '../interfaces/IPokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {
  conteo: number = 0
  pokemons: IPokemon[] = []
  detallesPokemon: IDetallePokemon[] = []
  limite: number = 10

  constructor(private pokeapiService: PokeapiService, private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.ruta.queryParams.subscribe(params => {
      const limiteParametro: number | undefined = params['limite']
      if (limiteParametro) {
        this.limite = params['limite']
      } else {
        this.limite = 10
      }
    })

    this.pokeapiService.getPokemons(this.limite).subscribe(pokemons => {
      this.conteo = pokemons.count
      this.pokemons = pokemons.results

      this.pokemons.forEach(detalle => {
        this.pokeapiService.getDetallesPokemon(detalle.url).subscribe(detallePokemon => {
          this.detallesPokemon.push(detallePokemon)
        })
      })

    })
  }
}
