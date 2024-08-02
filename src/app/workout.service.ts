import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  userName: string;
  workoutType: string;
  workoutMinutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private localStorageKey = 'workouts';
  private workoutsSubject = new BehaviorSubject<Workout[]>(this.getWorkouts());
  workouts$ = this.workoutsSubject.asObservable();

  constructor() {}

  private getWorkouts(): Workout[] {
    const workoutsJson = localStorage.getItem(this.localStorageKey);
    if (workoutsJson) {
      try {
        return JSON.parse(workoutsJson) as Workout[];
      } catch (error) {
        console.error('Failed to parse workouts from localStorage', error);
        return []; // Return empty array on parse failure
      }
    } else {
      // Add default initial data if none exists
      const initialWorkouts: Workout[] = [
        { userName: 'John Doe', workoutType: 'Running', workoutMinutes: 30 },
        { userName: 'Jane Smith', workoutType: 'Cycling', workoutMinutes: 45 },
        { userName: 'Alice Johnson', workoutType: 'Swimming', workoutMinutes: 60 }
      ];
      this.saveWorkouts(initialWorkouts); // Save initial data
      return initialWorkouts;
    }
  }

  private saveWorkouts(workouts: Workout[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(workouts));
    this.workoutsSubject.next(workouts); // Notify subscribers of the change
  }

  saveWorkout(workout: Workout): void {
    const workouts = [...this.getWorkouts(), workout];
    this.saveWorkouts(workouts);
  }
}
