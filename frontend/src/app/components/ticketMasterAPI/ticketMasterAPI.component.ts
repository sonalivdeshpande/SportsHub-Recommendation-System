import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from '../../places.service';
import { ticketMaster, location } from 'src/app/place';
import {MatExpansionModule} from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({templateUrl: 'ticketMasterAPI.component.html', styleUrls: ['ticketMasterAPI.component.css'],})

export class TicketMasterAPIComponent implements OnInit {
    ticketMasterAPIForm: FormGroup;
    loading = false;
    submitted = false;
    eventName;
    category;
    eventDateList1;
    eventDateList2;
    date;
    zipcode;
    private eventList: any[]
   
    private dataSource: ticketMaster[] = [];

    private locationList: location[] =[];

    displayData: ticketMaster[] = [];
    displayDataFilter: ticketMaster[] = [];

    displayedColumns: string[] = ['name','date','venue','city','category','postalCode', 'reviews','fetchComments'];

    constructor(private placesService: PlacesService,private fb: FormBuilder, private router: Router) {
        this.ticketMasterAPIForm = this.fb.group({
            Date: '',
            Zip: ''
      
          });
    }   

    getTicketMasterEventName(name, category){
        this.eventName = this.placesService.getTicketMasterEventName(name)
        this.category = this.placesService.storeCategories(category);
        this.router.navigate(['/reviewrate']);
    }

    navigateEventPage(name){
        this.eventName = this.placesService.getTicketMasterEventName(name);
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
        //TODO: Delete
        this.placesService.deleteAllEventDetail().subscribe();

      this.placesService.ticketMasterAPI().subscribe((data)=> {
           this.eventName = data['_embedded'];
          
            this.eventList= this.eventName['events'];
            Object.values(this.eventList).map(eventinfo => {
                let event: ticketMaster = {}; 
                let location: location ={};
                event.name = eventinfo['name'];
                var year = eventinfo['dates']['start']['dateTime'].substring(0,4);
                var month = eventinfo['dates']['start']['dateTime'].substring(5,7);
                var day = eventinfo['dates']['start']['dateTime'].substring(8,10);
                event.date = month+"/"+day+"/"+year;
                event.city = 'Chicago';
                event.venue= eventinfo['_embedded']['venues'][0]['name'];
                event.category = eventinfo['classifications'][0]['genre']['name'];
                event.postalCode = eventinfo['_embedded']['venues'][0]['postalCode'];

                location.latitude = eventinfo['_embedded']['venues'][0]['location']['latitude'];
                location.longitude = eventinfo['_embedded']['venues'][0]['location']['longitude'];

                this.locationList.push(location);

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

    heatmapsLocation(){

    }
}
