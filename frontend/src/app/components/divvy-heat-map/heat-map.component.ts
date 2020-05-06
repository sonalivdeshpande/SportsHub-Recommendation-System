import { AfterViewInit, Component,Input,ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as heatmap from 'heatmap.js'
import { google } from 'google-maps';
import { PlacesService } from '../../places.service';
import { Observable } from "rxjs";
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { location } from 'src/app/place';

interface Location {
  lat: number;
  lng: number;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  label: string;
}

@Component({
  selector: 'heatmap',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss']
})


export class HeatMapComponent implements OnInit{

    google: google;
    gradient;
    gradientStep = -1;
    newGradient;
    distinct = [];
    heatMapData: any[];
    timeArray:any;
    timeOffset = 0;
    timer;

    //noOfDivvyDataSamplesRequested: number;
    //noOfDivvyDataSamplesProcessed: number;
    eventName;
    private eventList: any[]
    stubHubLocation;

    currentChicagoTime;

    timeStamp;
    currentTime;


    private map: google.maps.Map = null;
    heatmap: google.maps.visualization.HeatmapLayer = null;

    constructor(private placesService:PlacesService) {}
    locationList: location [] =[];



    ngOnInit() {
      this.plot_on_heatMap();
    }

  async plot_on_heatMap(){
    let result = await this.placesService.ticketMasterAPI().toPromise();
    this.eventName = result['_embedded'];
       this.eventList= this.eventName['events'];
       Object.values(this.eventList).map(eventinfo => {
           let location: location ={};
           location.latitude = eventinfo['_embedded']['venues'][0]['location']['latitude'];
           location.longitude = eventinfo['_embedded']['venues'][0]['location']['longitude'];
 
           this.locationList.push(location);
       });

      let stubhubresult = await this.placesService.stubHubAPI().toPromise(); 
      this.stubHubLocation = stubhubresult['events'];   
      Object.values(this.stubHubLocation).map(eventinfo => {
        let location: location ={};
            location.latitude = eventinfo['venue']['latitude'];
            location.longitude = eventinfo['venue']['longitude'];
            this.locationList.push(location);        
        })

      let locationofEvents=[];

      for (let i = 0; i < this.locationList.length; i++) {
        let event_location = {
          location: new google.maps.LatLng(this.locationList[i].latitude, this.locationList[i].longitude)

        }
        locationofEvents.push(event_location);
      }
  
      this.heatMapData = locationofEvents;
  
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.heatMapData
      });
  
      this.heatmap.setMap(this.map);
  }

  public location:Location = {
    lat: 41.882607,
    lng: -87.643548,
    label: 'You are Here',
    zoom: 10
  };

  onMapLoad(mapInstance: google.maps.Map) {
   
    this.map = mapInstance;
  }


  clearHeatMap(){
    if(this.heatmap){
      this.heatmap.setMap(null);
      this.heatMapData =[];
    }

  }
  
  ngOnDestroy() {

      this.map  = null;
      this.heatmap = null;
         
  }

}
