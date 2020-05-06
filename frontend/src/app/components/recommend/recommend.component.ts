import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import data from 'data.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-find',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {

  createForm: FormGroup;
  hintColor;
  timeLimit;
  uri = 'http://localhost:4000';
  eventName;

  recommendationList: String[] = [];
  event: String[] = [];

  displayedColumns: string[] = ['eventname','fetchComments'];

  constructor(private placesService: PlacesService, private fb: FormBuilder, private router: Router,private http: HttpClient) {
    this.hintColor = "#76FF03";

    this.createForm = this.fb.group({
      where: '',
      find: ''

    });
  }

  navigateEventPage(name){
    this.eventName = this.placesService.getTicketMasterEventName(name);
    this.router.navigate(['/viewDetails']);
}

  ngOnInit() {
    this.placesService.getRecommendation().subscribe((data) => {  
      Object.values(data['recomms']).map(recommendation => {
        this.event = recommendation['id'].split("-")
        var name = this.event.join(" ");
        this.recommendationList.push(name)
      });
    });
    
  }

}
