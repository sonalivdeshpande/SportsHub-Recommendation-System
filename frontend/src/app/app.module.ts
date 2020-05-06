import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { MatToolbarModule, MatNativeDateModule, MatFormFieldModule,MatCheckboxModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatListModule } from '@angular/material';
import { MatDatepickerModule  } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

import { PlacesService } from './places.service';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { TicketMasterAPIComponent } from './components/ticketMasterAPI/ticketMasterAPI.component';
import { ReviewRatingComponent } from './components/reviewrate/reviewrate.component';
import { StubMasterAPIComponent } from './components/stubHubAPI/stubHubAPI.component';
import { ViewReviewRating } from './components/viewreviewrate/viewreviewrate.component';
import { EditReviewRating } from './components/editReviewRating/editReviewRating.component';
import { ViewEventDetails } from './components/viewEventDetails/viewEventDetails.component';
import { HeatMapComponent } from './components/divvy-heat-map/heat-map.component';
import { ChartComponent } from './components/chart/chart.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'recommend', component: RecommendComponent },
  { path:'ticketMasterAPI', component: TicketMasterAPIComponent },
  { path: 'reviewrate', component: ReviewRatingComponent },
  { path: 'editreview', component: EditReviewRating },
  { path: 'stubHubAPI', component: StubMasterAPIComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'viewDetails', component: ViewEventDetails },
  { path: 'viewreviewrate', component:ViewReviewRating  },
  { path: 'heat_map', component: HeatMapComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    TicketMasterAPIComponent,
    EditReviewRating,
    ChartComponent,
    StubMasterAPIComponent,
    ReviewRatingComponent,
    ViewReviewRating,
    ViewEventDetails,
    RecommendComponent,
    HeatMapComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    SatDatepickerModule,
    SatNativeDateModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyASQBoZRVHLXUQZoHLcr1Vfxt_ro223t4U'+ '&libraries=visualization'}),
    FormsModule,
    NgbModule,
    MatCheckboxModule,
    MatListModule

  ],

  providers: [PlacesService, GoogleMapsAPIWrapper, MatDatepickerModule, MatNativeDateModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
