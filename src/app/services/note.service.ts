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

  getNote(id: string) {
    return this._http.get(`${Api_Url}/api/Note/${id}`, { headers: this.getHeaders() });
  }

  postNote(note: Note) {
    return this._http.post(`${Api_Url}/api/Note`, note, { headers: this.getHeaders() });
  }

  updateNote(note: Note) {
    return this._http.put(`${Api_Url}/api/Note`, note, { headers: this.getHeaders() });
  }

  starred(note: Note) {
    if(note.IsStarred) {
      return this._http.put(`${Api_Url}/api/Note/${note.NoteId}/Star`, null, { headers: this.getHeaders() });
    } else {
      return this._http.delete(`${Api_Url}/api/Note/${note.NoteId}/Star`, { headers: this.getHeaders() });
    }
  }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
