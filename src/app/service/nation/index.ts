import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Nation } from '../../model/nation'

@Injectable({
  providedIn: 'root',
})
export class NationService {

  constructor(private http:HttpClient) { }

  getAllNations():Observable<Nation[]> {
    return this.http.get<Nation[]>( 'assets/data.json' )
  }
}