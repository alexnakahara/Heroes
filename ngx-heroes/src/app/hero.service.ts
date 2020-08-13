import { Poder } from './poder';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'https://localhost:44359/api/hero';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET Poder by id. Will 404 if id not found */
  getPoder(id: number): Observable<Poder> {
    const url = `${this.heroesUrl}/getPoder/${id}`;
    return this.http.get<Poder>(url).pipe(
      tap(_ => this.log(`fetched poder id=${id}`)),
      catchError(this.handleError<Poder>(`getPoder id=${id}`))
    );
  }


  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Heroi adicionado id=${newHero.id_hero}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** POST: Add a new Poder to the server */
  addPoder(poder: Poder): Observable<Poder> {
    return this.http.post<Poder>(`${this.heroesUrl}/adicionarPoder`, poder, httpOptions).pipe(
      tap((newPoder: Poder) => this.log(`Heroi adicionado id=${newPoder.id_poder}`)),
      catchError(this.handleError<Poder>('addPoder'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id_hero;
    const url = `${this.heroesUrl}/delete/${id}`;

    return this.http.post<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(` Heroi deletado id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** DELETE: delete the Poder from the server */
  deletePoder(poder: Poder | number): Observable<Poder> {
    const id = typeof poder === 'number' ? poder : poder.id_poder;
    const url = `${this.heroesUrl}/deletePoder/${id}`;

    return this.http.post<Poder>(url, httpOptions).pipe(
      tap(_ => this.log(` Poder deletado id=${id}`)),
      catchError(this.handleError<Poder>('deletePoder'))
    );
  }

  /** POST: Atualizar the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.post(`${this.heroesUrl}/${hero.id_hero}`, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id_hero}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: Atualizar o poder no banco de dados, isso na pagina poder-detail */
  updatePoder(poder: Poder): Observable<any> {
    const url = `${this.heroesUrl}/alterarPoder`;
    console.log(url);
    return this.http.post(url, poder, httpOptions).pipe(
      tap(_ => this.log(`updated Poder id=${poder.id_poder}`)),
      catchError(this.handleError<any>('updatePoder'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
