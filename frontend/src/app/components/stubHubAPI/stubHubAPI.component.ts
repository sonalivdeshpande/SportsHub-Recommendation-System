import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacesService } from '../../places.service';
import { stubHub } from 'src/app/place';

@Component({
  selector: 'app-find',
  templateUrl: './stubHubAPI.component.html',
  styleUrls: ['./stubHubAPI.component.css']
})
export class StubMasterAPIComponent implements OnInit {

  createForm: FormGroup;
  hintColor;
  timeLimit;
  eventName;
  category;
  eventDateList1;
  eventDateList2;
  date;
  zipcode;
  private eventList: any[];
   
  private dataSource: stubHub[] = [];

    displayData: stubHub[] = [];
    displayDataFilter: stubHub[] = [];

    displayedColumns: string[] = ['name','date','venue','city','category','postalCode', 'reviews','fetchComments'];

  constructor(private placesService: PlacesService, private fb: FormBuilder, private router: Router) {
    this.hintColor = "#76FF03";

    this.createForm = this.fb.group({
      Date: '',
      Zip: ''
    });
  }

  getStubHubEventName(name, category){
    this.eventName = this.placesService.getStubHubEventName(name);
    this.category = this.placesService.storeCategories(category);
    this.router.navigate(['/reviewrate']);
}

navigateEventPage(name){
  this.eventName = this.placesService.getStubHubEventName(name);
  this.router.navigate(['/viewDetails']);
}

compareDateZip(date, zipcode){
  this.date = date;
  var res = this.date.split("/");
 if(res[0].length == 1){
     res[0] = "0"+res[0];
 }
 if(res[1].length == 1){
     res[1] = "0"+res[1];
 }
 this.date = res[0]+ "/" +res[1]+ "/" +res[2];
  this.zipcode = zipcode;
  
  this.ngOnInit();
 }

  ngOnInit() {
    this.placesService.stubHubAPI().subscribe((data)=> {
            
      this.eventName = data['events'];
       Object.values(this.eventName).map(eventinfo => {
        let event: stubHub = {}; 
        event.name = eventinfo['name'];
        var year = eventinfo['eventDateLocal'].substring(0,4);
        var month = eventinfo['eventDateLocal'].substring(5,7);
        var day = eventinfo['eventDateLocal'].substring(8,10);
        event.date = month + "/" + day + "/" +year;
        event.venue = eventinfo['venue']['name'];
        event.city = eventinfo['venue']['city'];
        event.category = eventinfo['venue']['venueConfigName'];
        event.postalCode = eventinfo['venue']['postalCode'];
        if(this.date === event.date && this.zipcode === event.postalCode){
          this.displayDataFilter.push(event);
      }
      else{
          this.displayData.push(event); 
      }   
    });
    if(this.displayDataFilter.length == 0){
        this.dataSource = this.displayData;
    }
    else{
        this.dataSource = this.displayDataFilter;
    }
    //TODO: Insert  
    this.placesService.insertAllEventDetails(this.displayData).subscribe(); 
   });
  }

}
