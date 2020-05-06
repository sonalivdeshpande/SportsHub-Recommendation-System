import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../../places.service';
import { viewUserReviewRating } from 'src/app/place';
import { editReviewRating } from 'src/app/place';
import {MatExpansionModule} from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({templateUrl: 'viewreviewrate.component.html', styleUrls: ['viewreviewrate.component.css'],})

export class ViewReviewRating implements OnInit {
    ticketMasterAPIForm: FormGroup;
    loading = false;
    submitted = false;
    eventName;
    review;
    rate;
   
    constructor(private placesService: PlacesService, private router: Router) {}  

    private dataSource: viewUserReviewRating[] = [];
    private dataSource1: editReviewRating[] = [];

    displayData: viewUserReviewRating[] = [];
    displayData1: editReviewRating[] = [];

    displayedColumns: string[] = ['name', 'review', 'rating', 'edit', 'delete'];

    navigateToEditReviewRating(eventName, review, rate){
        let event: editReviewRating = {};
        event.eventname = eventName;
        event.reviews = review;
        event.ratings = rate;
        this.displayData1.push(event);
        this.placesService.storeData = this.displayData1;
        this.router.navigate(['/editreview']);
    }

    delete_user_details(eventname){
        var username = this.placesService.username;
        this.placesService.deleteReviewRating(username,eventname).subscribe(() => {
            this.router.navigate(['/recommend']);
          });
      }
    
    ngOnInit() { 
        this.placesService.getReviewRating().subscribe((
            response => {
                // this.displayData.push(response);
                Object.values(response['rows']).map(eventinfo => {
                    let event: viewUserReviewRating = {}; 
                    event.eventname = eventinfo['eventname'];
                    event.reviews = eventinfo['reviews'];
                    event.ratings= eventinfo['ratings'];
                    this.displayData.push(event);   
                });
                this.dataSource = this.displayData;
            }));
     }
}
