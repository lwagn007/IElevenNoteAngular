import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  noteCreateForm: FormGroup;

  constructor(private _form: FormBuilder, private _noteService: NoteService, private _router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.noteCreateForm = this._form.group({
      Title: new FormControl,
      Content: new FormControl
    });
  }

  onSubmit() {
    this._noteService.postNote(this.noteCreateForm.value).subscribe(data => {
      this._router.navigate(['/note/index']);
    })
  }
}
