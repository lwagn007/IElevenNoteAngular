import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../models/Note';
import { Observable } from 'rxjs';

const Api_Url = 'https://localhost:44398';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this._http.get<Note[]>(`${Api_Url}/api/Note`, { headers: this.getHeaders() });
  }

  postNote(note: Note) {
    return this._http.post(`${Api_Url}/Note`, note, { headers: this.getHeaders() });
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
