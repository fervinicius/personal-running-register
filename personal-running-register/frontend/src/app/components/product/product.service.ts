import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Sport } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/sports"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  create(sport: Sport): Observable<Sport> {
    return this.http.post<Sport>(this.baseUrl, sport)
  }

  read(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.baseUrl)
  }

  readById(id: string | null): Observable<Sport> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Sport>(url)
  }

  update(sport: Sport): Observable<Sport> {
    const url = `${this.baseUrl}/${sport.id}`
    return this.http.put<Sport>(url, sport)
  }

  delete(id: string | null): Observable<Sport> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Sport>(url)
  }

}
