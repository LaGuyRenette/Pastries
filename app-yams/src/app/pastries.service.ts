import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Pastrie } from './pastrie';
import {environment} from '../environments/environment.development'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PastriesService {
  private pastriesUrl = `${environment.urlApi}/pastries`;
  private ingredientsListsUrl = `${environment.urlApi}/ingredientsLists`;
  private pastriesUrlOrderQuantity = `${environment.urlApi}/pastries/order-quantity`;
  private searchPastriesUrl = `${environment.urlApi}/pastries-search`;
  private pastriesUrlCount = `${environment.urlApi}/pastries-count`;
  private numberPastries: number = 0;
  private currentPage: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {
  }

  getPastries(): Observable<Pastrie[]> {

    return this.http.get<Pastrie[]>(this.pastriesUrl, httpOptions).pipe(
      map((pastries: Pastrie[]) => pastries.sort((a, b) => b.quantity - a.quantity))
    )
  }

  search(word: string): Observable<Pastrie[]> {

    return this.http.get<Pastrie[]>(this.searchPastriesUrl + `/${word}`, httpOptions);
  }

  paginate(start: number, end: number): Observable<Pastrie[]> {

    return this.http.get<Pastrie[]>(this.pastriesUrlOrderQuantity + `/${start}/${end}`, httpOptions);
  }

  count(): Observable<number> {
    return this.http.get<number>(this.pastriesUrlCount , httpOptions);
  }

  setCurrentPage(page: number) {
    // observer
    this.currentPage.next(page); // next du subject notifie à l'observable
  }

  getCurrentPage(): Subject<number> {
    // observable
    return this.currentPage;
  }

  getRecipe(recipeId: string): Observable<Pastrie> {
    const url = `${this.pastriesUrl}/${recipeId}`;
    console.log(url);
    return this.http.get<Pastrie>(url, httpOptions)
    
    
  }
  
  addOrUpdateRecipe(recipe: Pastrie): Observable<Pastrie> {
    if (recipe.id) {
      // Utilisé put pour update recipe qui a déja un id
      const url = `${this.pastriesUrl}/${recipe.id}`;
      return this.http.put<Pastrie>(url, recipe, httpOptions);
    } else {
      // si il n'y a pas déja d'id post permet de l'inclure 
      return this.http.post<Pastrie>(this.pastriesUrl, recipe, httpOptions);
    }
  }
  deleteRecipe(recipeId: string): Observable<void> {
    const url = `${this.pastriesUrl}/${recipeId}`;
    return this.http.delete<void>(url, httpOptions);
  }
}

