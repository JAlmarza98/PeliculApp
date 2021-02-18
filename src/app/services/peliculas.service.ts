import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetails } from '../interfaces/movie-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private url : string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http:HttpClient ) { }

  get params() {

    return {
      api_key: 'c033e94e2aa30e4ea6c4905a16be7362',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }

  }

  resetCarteleraPage(){

    this.carteleraPage = 1;
    
  }

  getCartelera():Observable<Movie[]> {

    if( this.cargando) {
      return of([]);
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.url}/movie/now_playing`,{params: this.params}).pipe( map((resp)=> resp.results ),tap(() => { this.carteleraPage += 1; this.cargando = false;}) )

  }

  buscarPeliculas( data: string ):Observable<Movie[]>{

    const params = {...this.params, page: '1', query: data};

    return this.http.get<CarteleraResponse>(`${this.url}/search/movie`,{params}).pipe(map( resp => resp.results));

  }

  getPeliculaDetalle( id: string ){

    return this.http.get<MovieDetails>(`${ this.url }/movie/${ id }`,{params: this.params}).pipe(catchError( err => of(null)))

  }

  getCast( id: string ):Observable<Cast[]>{

    return this.http.get<CreditsResponse>(`${ this.url }/movie/${ id }/credits`,{params: this.params}).pipe(map(resp => resp.cast),catchError( err => of([])));

  }

}
