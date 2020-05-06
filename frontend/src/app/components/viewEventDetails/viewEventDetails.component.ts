import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../../places.service';
import { viewUserReviewRating } from 'src/app/place';
import { editReviewRating } from 'src/app/place';
import {MatExpansionModule} from '@angular/material/expansion';
import { Router } from '@angular/router';
import { viewDetails } from 'src/app/place';

@Component({templateUrl: 'viewEventDetails.component.html', styleUrls: ['viewEventDetails.component.css'],})

export class ViewEventDetails implements OnInit {
    loading = false;
    submitted = false;
    name = this.placesService.ticketMasterEventName;
    username;
    eventname;
    reviews;
    ratings;
    lengthData;
    displayData: viewDetails[] = [];
    private dataSource: viewDetails[] = [];

    displayedColumns: string[] = ['username','rating','review'];
    constructor(private placesService: PlacesService, private router: Router) {}  
    
    ngOnInit() { 
        this.placesService.viewEventDetails(this.name).subscribe((response => 
            {
                Object.values(response).map(eventinfo => {
                    let event: viewDetails = {}; 
                    this.lengthData = JSON.stringify(response['rowCount']);
                    let list_of_eventnames = [];
                    for(let i=0; i<this.lengthData;i++){
                    let username = response['rows'][i]['username'];
                    let reviews = response['rows'][i]['reviews'];
                    let ratings = response['rows'][i]['ratings'];
                    list_of_eventnames.push({username:username,reviews: reviews,ratings:ratings});
                }
                this.displayData = list_of_eventnames;   
                });
                this.dataSource = this.displayData;
            }));
        
    }
}
