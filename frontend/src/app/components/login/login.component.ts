import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-find',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createForm: FormGroup;
  hintColor;
  timeLimit;
  username;

  constructor(private placesService: PlacesService, private fb: FormBuilder, private router: Router) {
    this.hintColor = "#76FF03";

    this.createForm = this.fb.group({
      where: '',
      find: ''

    });
  }

  validateDetails(find, where) {
    this.placesService.validateDetails(find, where).subscribe(
      response => {
        if(response['rowCount']==0){
          this.router.navigate(['/login']);
        }else if(response['rowCount']==1){
          this.username = find;
          this.router.navigate(['/recommend']);
        }
        
      },
      error => {
        this.router.navigate(['/login']);
      }
    );
  }

  findRegisterPage() {
    this.router.navigate(['/register']);
    }


  ngOnInit() {
  }

}
