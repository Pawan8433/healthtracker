import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from "./workout-list/workout-list.component";
import { MatPaginatorModule } from '@angular/material/paginator';
 
 
// import { CanvasJSChartComponent } from './canvasjs-chart.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkoutFormComponent,    MatPaginatorModule, WorkoutListComponent, 
  
       ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'health-challenge-tracker';
}
