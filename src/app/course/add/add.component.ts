import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Course } from '../../shared/course';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  newCourse: Course = {
    courseId: 0,
    name: '', 
    description: '',
    duration:'',
  };

  constructor(private dataService: DataService, private router: Router) { }

  AddCourse() {
    this.dataService.AddCourse(this.newCourse).subscribe(response => {
      console.log('Course added successfully:', response);
      this.newCourse = {
        courseId: 0,
        name: '',
        description: '',
        duration: '',
      };
       this.router.navigate(['/courses']);
      }, error => {
          console.error('Error adding course:', error);
      });
  }
}
