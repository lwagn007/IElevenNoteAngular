import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NoteIndexComponent } from './components/note-index/note-index.component';
import { NoteCreateComponent } from './components/note-create/note-create.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { NoteDeleteComponent } from './components/note-delete/note-delete.component';
import { NoteEditComponent } from './components/note-edit/note-edit.component';


const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'note', children: [
      { path: 'index', component: NoteIndexComponent },
      { path: 'create', component: NoteCreateComponent },
      { path: 'detail/:id', component: NoteDetailComponent },
      { path: 'delete/:id', component: NoteDeleteComponent },
      { path: 'edit/:id', component: NoteEditComponent }
    ]
  },
  { path: '**', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
