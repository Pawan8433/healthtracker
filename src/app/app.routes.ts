import { Routes } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';

export const routes: Routes = [

    { path: ' workout-form', component: WorkoutFormComponent },
  { path: ' workout-list', component: WorkoutListComponent },
  { path: '', redirectTo: '/workout-form', pathMatch: 'full' }
];
