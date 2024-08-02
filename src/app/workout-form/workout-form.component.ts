import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { WorkoutService, Workout } from '../workout.service';

@Component({
  selector: 'workout-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout(): void {
    if (this.userName && this.workoutType && this.workoutMinutes > 0) {
      const newWorkout: Workout = {
        userName: this.userName,
        workoutType: this.workoutType,
        workoutMinutes: this.workoutMinutes
      };

      this.workoutService.saveWorkout(newWorkout);
      this.resetForm();
    } else {
      console.log('Invalid input');
    }
  }

  resetForm(): void {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
