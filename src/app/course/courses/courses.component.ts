import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Course } from '../../shared/course';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  @ViewChild('editCourse') editCourse!: any; 
  courses: Course[] = [];
  editedCourse: Course | null = null;
  constructor(private dataService: DataService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.GetCourses();
  }

  GetCourses(): void {
    this.dataService.GetCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  EditCourse(courseId: number): void {
    const foundCourse = this.courses.find(course => course.courseId === courseId);
    if (foundCourse) {
        this.editedCourse = foundCourse;
        const modalRef = this.modalService.open(this.editCourse);
        modalRef.result.then(
          (result) => {
            console.log('Modal closed:', result);
          },
          (reason) => {
            console.log('Modal dismissed:', reason);
          }
        );
    }
}

save(): void {
    if (this.editedCourse) {
        this.dataService.EditCourse(this.editedCourse.courseId, this.editedCourse).subscribe(
            (editedCourse: Course) => {
                console.log('Saved edited course:', editedCourse);
                this.GetCourses();
            },
            (error) => {
                console.error('Error saving edited course:', error);
            }
        );
        this.modalService.dismissAll();
    }
}

close(): void {
    this.modalService.dismissAll('cancel');
}

DeleteCourse(courseId: number): void {
  if (confirm('Are you sure you want to delete this course?')) {
    this.dataService.DeleteCourse(courseId).subscribe(
      () => {
        // Remove the deleted course from the local array
        this.courses = this.courses.filter(course => course.courseId !== courseId);
        this.GetCourses();
      },
      () => {
        location.reload();
      }
    );
  }
}
}