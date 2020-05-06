import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';
// import { UserDetails } from '../../userDetails';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-find',
  templateUrl: './reviewrate.component.html',
  styleUrls: ['./reviewrate.component.css']
})
export class ReviewRatingComponent implements OnInit {

  createForm: FormGroup;
  hintColor;
  timeLimit;
  name = this.placesService.ticketMasterEventName;
  uri = 'http://localhost:4000';
 

  constructor(private placesService: PlacesService, private fb: FormBuilder, private router: Router,private http: HttpClient) {
    this.hintColor = "#76FF03";

    this.createForm = this.fb.group({
      review: '',
      rating: ''

    });
  }
 
  get_reviewrating(review, rating) {
    var username = this.placesService.username;
    var category = this.placesService.categoryTicketMaster;
    this.placesService.post_reviewrating(username, this.name,review, rating, category).subscribe(() => {
      });
      const formattedEventName = this.name.replace(/ /g, "_")
      this.placesService.post_rating_recombee(username, formattedEventName, rating).subscribe(() => {
      });

      this.router.navigate(['/recommend']);
  }

  


  

  ngOnInit() {
  }

}
