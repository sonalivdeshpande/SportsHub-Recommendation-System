import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-find',
  templateUrl: './editreviewrating.component.html',
  styleUrls: ['./editreviewrating.component.css']
})
export class EditReviewRating implements OnInit {

  createForm: FormGroup;
  hintColor;
  timeLimit;
  eventName;
    review;
    rate;


  constructor(private placesService: PlacesService, private fb: FormBuilder, private router: Router) {
    this.hintColor = "#76FF03";

    this.createForm = this.fb.group({
      Review: '',
      Rating: ''

    });
  }

  update_user_details(eventname,review,rating) {
      var username = this.placesService.username;
    this.placesService.updateUserReviewRating(username,eventname,review,rating).subscribe(() => {
        this.router.navigate(['/recommend']);
      });
  }

  ngOnInit() {
        this.eventName = this.placesService.storeData[0]['eventname'];
        this.review = this.placesService.storeData[0]['reviews'];
        this.rate = this.placesService.storeData[0]['ratings'];
  }

}
