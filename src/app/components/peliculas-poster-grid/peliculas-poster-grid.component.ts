import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[];

  constructor( private router: Router ) {}

  ngOnInit(): void {    
  }

  onMovieClick( movie: Movie){

    this.router.navigate(['/movie', movie.id]);
    
  }
}
