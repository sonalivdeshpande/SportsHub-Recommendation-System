import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';



@Component({
  selector: 'app-find',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  createForm: FormGroup;
  hintColor;
  timeLimit;


  constructor(private placesService: PlacesService, private fb: FormBuilder, private router: Router) {
    this.hintColor = "#76FF03";

    this.createForm = this.fb.group({
      firstname: '',
      lastname: '',
      address: '',
      zipcode: '',
      username: '',
      password: '',
      sportsinterested: ''
    });
  }

  get_user_details(firstname,lastname,address,zipcode,username,password,sportsinterested) {
    this.placesService.get_user_details(firstname,lastname,address,zipcode,username,password,sportsinterested).subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
  }

}
