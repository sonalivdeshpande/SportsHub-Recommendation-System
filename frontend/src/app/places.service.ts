import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { editReviewRating } from 'src/app/place';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Place } from './place';
// import { eventNames } from 'cluster';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  uri = 'http://localhost:4000';
  Emmiter;
  time_interval;
  stationNameSelected = 'None';
  username;
  ticketMasterEventName;
  categoryTicketMaster;
  categoryStubhub;
  stubHubEventName;
  viewEventName;
  viewReview;
  viewRate;
  storeData: editReviewRating[] = [];

  constructor(private http: HttpClient) { }

  getTicketMasterEventName(eventName){
    this.ticketMasterEventName = eventName;
    return this.ticketMasterEventName;
  }

  getStubHubEventName(eventName){
    this.ticketMasterEventName = eventName;
    return this.ticketMasterEventName;
  }

  storeCategories(category){
    this.categoryTicketMaster = category;
    return this.categoryTicketMaster;
  }

  getChart() {
    return this.http.get(`${this.uri}/draw_charts`);
  }

  getReviewChart(){
    return this.http.get(`${this.uri}/draw_charts_reviews`);
  }

  updateUserReviewRating(username,eventname,review,rating){
    const updateReviewRating = {
      reviews: review,
      ratings: rating,
      username: username,
      eventname: eventname
    }
    return this.http.post(`${this.uri}/update_user_review_rating`, updateReviewRating, httpOptions);
  }

  deleteAllEventDetail(){
    return this.http.delete(`${this.uri}/delete_apiDetails`);
  }

  insertAllEventDetails(insertEventDetails){
    return this.http.post(`${this.uri}/insert_apiDetails`, JSON.stringify(insertEventDetails), httpOptions);
  }


  deleteReviewRating(username, eventName){
    const deleteReviewRating = {
      username: username,
      eventname: eventName
    }
    return this.http.post(`${this.uri}/delete_user_review_rating`, deleteReviewRating, httpOptions);
  }

  validateDetails(username, password){
    const get_username_pass = JSON.stringify({
      username: username,
      password: password
    });
    this.username = username;
    return this.http.post(`${this.uri}/validateUserDetails`,  get_username_pass, httpOptions);
  }

  get_user_details(firstname,lastname,address,zipcode,username,password,sportsinterested){
    const get_Registration_at =JSON.stringify( {
                firstname: firstname,
                lastname: lastname,
                address: address,
                zipcode: zipcode,
                username: username,
                password: password,
                sportsinterested: sportsinterested
              });
    return this.http.post(`${this.uri}/get_user_details`, get_Registration_at, httpOptions);
  }

  post_reviewrating(username, eventname,review, rating,category) {
    const get_reviews_ratings = JSON.stringify({
      username: username,
      eventname: eventname,
      reviews: review,
      ratings: rating,
      categories: category
    });
    //this.post_rating_recombee(username, eventname, rating);
    return this.http.post(`${this.uri}/get_reviewrating`, get_reviews_ratings, httpOptions);    
  }

  post_rating_recombee(username, eventname, rating){
    const send_ratings_to_recombee = JSON.stringify({
      username: username,
      eventname: eventname,
      ratings: rating  
    });
    return this.http.post(`${this.uri}/send_data_to_recombee`, send_ratings_to_recombee, httpOptions);

  }

  viewEventDetails(eventname){
    const event = JSON.stringify({
      eventname: eventname
    });
    return this.http.post(`${this.uri}/view_event_details`, event, httpOptions); 
  }

  getReviewRating(){
    const user = {
      username: this.username
    }
    return this.http.post(`${this.uri}/get_user_reviewrating`, user, httpOptions);
  }
  

  getRecommendation(){
    const user = {
      username: this.username
    }
    return this.http.post(`${this.uri}/get_recommendation`, user, httpOptions);
    
  }


    destroy(){
      if(this.time_interval){
        clearInterval(this.time_interval);
      }
      if(this.Emmiter){
        this.Emmiter.complete();
      }
    }


    ticketMasterAPI(){
      return this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&classificationName=sports&city=chicago&apikey=UAqO3o1BAysEH2XgzXAXzAe9GGV7q0Le`,
      {headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }});
    }

    stubHubAPI(){
      return this.http.get(`https://api.stubhub.com/sellers/search/events/v3?state=Illinois&country=US&categoryName=Sports`,
      {headers: {
        'Authorization': 'Bearer IpNpFPsrVdpUGGAAkNIKmRG9J5Vb',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    }});
    }

}
