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
  private pastrieUrl = `${environment.urlApi}/pastrie`;
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
    const url = `${this.pastrieUrl}/${recipeId}`;
    console.log(url);
    return this.http.get<Pastrie>(url, httpOptions)
    
  }

  createPastrie(pastrie: Pastrie): Observable<Pastrie> {
    return this.http.post<Pastrie>(this.pastriesUrl, pastrie, httpOptions);
  }
  updatePastrie(pastrie: Pastrie): Observable<Pastrie> {
    const url = `${this.pastriesUrl}/${pastrie.id}`;
    return this.http.put<Pastrie>(url, pastrie, httpOptions);
  }

  deletePastrie(pastrieId: string): Observable<void> {
    const url = `${this.pastriesUrl}/${pastrieId}`;
    return this.http.delete<void>(url, httpOptions);
  }
}