import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/Note';
import { FormGroup, FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

  note: Note;
  noteEditForm: FormGroup;

  constructor(
    private _form: FormBuilder,
    private _noteService: NoteService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { 
      
      this._activatedRoute.paramMap.subscribe(p => {
        this._noteService.getNote(p.get('id')).subscribe((noteResponse: Note) => {
          this.note = noteResponse;
          this.createForm();
        });
      });
    }

  ngOnInit() {
  }

  createForm() {
    this.noteEditForm = this._form.group({
      NoteId: new FormControl(this.note.NoteId),
      IsStarred: new FormControl(this.note.IsStarred),
      Title: new FormControl(this.note.Title),
      Content: new FormControl(this.note.Content)
    });
  }

  onSubmit() {
    this._noteService.updateNote(this.noteEditForm.value).subscribe(data => {
      this._router.navigate(["/note/index"]);
    })
  }
}
