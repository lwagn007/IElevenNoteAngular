import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/Note';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-note-index',
  templateUrl: './note-index.component.html',
  styleUrls: ['./note-index.component.css']
})
export class NoteIndexComponent implements OnInit {

  of;
  notes: Note[];
  columnNames = ['NoteId', 'Title', 'IsStarred', 'CreatedUtc', 'buttons'];
  dataSource: NoteDataSource | null;

  constructor(private _noteService: NoteService) { }

  ngOnInit() {
    this._noteService.getNotes().subscribe((notes: Note[]) => {
      //example of logging date returned from request
      console.log(notes);
      this.dataSource = new NoteDataSource(notes);
    });
  }

  isStarred(note: Note, e) {
    note.IsStarred = !note.IsStarred;
    this._noteService.starred(note).subscribe(() => {});
  }

}

export class NoteDataSource extends DataSource<any> {
  constructor(private _notesData: Note[]) {
    super();
  }

  connect(): Observable<Note[]> {
    return of(this._notesData);
  }

  disconnect() { }
}
