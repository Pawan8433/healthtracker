import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WorkoutService, Workout } from '../workout.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'workout-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'workoutType', 'workoutMinutes'];
  dataSource = new MatTableDataSource<Workout>();
  workoutTypes: string[] = [];
  searchFilter = '';
  typeFilter = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadWorkoutsFromLocalStorage();
  }

  loadWorkoutsFromLocalStorage(): void {
    const storedData = localStorage.getItem('workouts');
    if (storedData) {
      const workouts: Workout[] = JSON.parse(storedData);
      this.dataSource.data = workouts.slice(0, 5); // Limit to 5 items initially
      this.initializeFilters(this.dataSource.data);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  initializeFilters(data: Workout[]): void {
    this.workoutTypes = Array.from(new Set(data.map(w => w.workoutType)));
  }

  applySearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchFilter = input.value.trim().toLowerCase();
    this.applyFilters();
  }

  applyFilter(filterValue: string): void {
    this.typeFilter = filterValue;
    this.applyFilters();
  }

  applyFilters(): void {
    this.dataSource.filterPredicate = (data: Workout, filter: string) => {
      const matchSearch = data.userName.toLowerCase().includes(this.searchFilter);
      const matchType = this.typeFilter ? data.workoutType === this.typeFilter : true;
      return matchSearch && matchType;
    };

    this.dataSource.filter = 'apply';
  }
}
