import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Place } from '../../place';
import { PlacesService } from '../../places.service';
import { charts, reviewCharts } from 'src/app/place';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  title;
  private places: Place[];
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 150, left: 80};
  private margin1 = {top: 20, right: 20, bottom: 150, left: 80};
  chart_1_Rating:string;
  chart_2_Review:string;

  private x: any;
  private y: any;
  private x1: any;
  private y1: any;
  private svg: any;
  private g: any;
  lengthData;

  private displayData: charts[];
  private displayData1: reviewCharts[];

  constructor(private placesService: PlacesService) {}

  ngOnInit() {
  }

  findRatingChart(){
    this.title = "Rating Chart";
    this.fetchChartData();
  }

  findReviewChart(){
    this.title = "Reviews Chart";
    this.fetchReviewChartData();
  }

  fetchChartData(){
    this.placesService
    .getChart().subscribe((data) => {
    this.lengthData = JSON.stringify(data['rowCount']);
        let event: charts = {}; 
        let list_of_eventnames = [];
        for(let i=0; i<this.lengthData;i++){
            let eventname = data['rows'][i]['eventname'];
            let ratings = data['rows'][i]['avg'];
            list_of_eventnames.push({eventname:eventname,ratings:ratings});
        }
        this.displayData = list_of_eventnames;
      this.initSvg();
      this.init_X_Y_Axis();
      this.create_X_Y_Axis();
      this.createBarChart1(this.displayData);
    });
    
  }

  fetchReviewChartData(){
    this.placesService.getReviewChart().subscribe((data) => {
      this.lengthData = JSON.stringify(data['rowCount']);
          let event: reviewCharts = {}; 
          let list_of_eventnames = [];
          for(let i=0; i<this.lengthData;i++){
              let eventname = data['rows'][i]['eventname'];
              let reviews = data['rows'][i]['count'];
              list_of_eventnames.push({eventname:eventname,reviews:reviews});
          }
          this.displayData1 = list_of_eventnames; 
          console.log(this.displayData1);
        this.initSvg();
        this.init_X_Y_Axis1();
        this.create_X_Y_Axis1();
        this.createBarChart(this.displayData1);
      });
     
  }

  private initSvg() {
      this.svg = d3.select('svg');
      this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
      console.log(this.width);
      this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
      this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initSvg1() {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width') - this.margin1.left - this.margin1.right;
    this.height = +this.svg.attr('height') - this.margin1.top - this.margin1.bottom;
    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin1.left + ',' + this.margin1.top + ')');
}

  private init_X_Y_Axis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(.800);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, .099]);
    this.x.domain(this.displayData.map((d) => d.eventname));
    this.y.domain([0, d3Array.max(this.displayData, (d) => Number(d.ratings))]);
  }

  private init_X_Y_Axis1() {
    this.x1 = d3Scale.scaleBand().rangeRound([0, this.width]).padding(.800);
    this.y1 = d3Scale.scaleLinear().rangeRound([this.height, .099]);
    this.x1.domain(this.displayData1.map((d) => d.eventname));
    this.y1.domain([0, d3Array.max(this.displayData1, (d) => Number(d.reviews))]);
  }

  private create_X_Y_Axis() {

    this.g.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3Axis.axisBottom(this.x))
                .selectAll("text")
                .attr("y", 0)
                .attr("x", 9)
                .attr("dy", ".35em")
                .attr("transform", "rotate(60)")
                .style("text-anchor", "start");

    this.g.append('g')
                .attr('class', 'axis axis--y')
                .call(d3Axis.axisLeft(this.y))
                .append("text")
                .attr("transform", "rotate(90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

    this.svg.append("text")
                .attr("x", this.width / 2 + 80)
                .attr("y", this.height + 85)
                .style("text-anchor", "middle")
                .text("EventName");

    this.svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 15)
                .attr("x", 0 - (this.height / 2))
                .style("text-anchor", "middle")
                .text("Rating");

  }

  private create_X_Y_Axis1() {

    this.g.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3Axis.axisBottom(this.x1))
                .selectAll("text")
                .attr("y", 0)
                .attr("x", 9)
                .attr("dy", ".35em")
                .attr("transform", "rotate(60)")
                .style("text-anchor", "start");

    this.g.append('g')
                .attr('class', 'axis axis--y')
                .call(d3Axis.axisLeft(this.y1))
                .append("text")
                .attr("transform", "rotate(90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

    this.svg.append("text")
                .attr("x", this.width / 2 + 80)
                .attr("y", this.height + 85)
                .style("text-anchor", "middle")
                .text("EventName");

    this.svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 15)
                .attr("x", 0 - (this.height / 2))
                .style("text-anchor", "middle")
                .text("Review Count");

  }

  private createBarChart(data){
    var bars = this.g.selectAll(".bar")
                          .remove()
                          .exit()
                          .data(data)

    //now actually give each rectangle the corresponding data
    bars.enter().append('rect')
                    .attr('class', 'bar')
                    .attr('x', (d) => this.x1(d.eventname) )
                    .attr('y', (d) => this.y1(d.reviews) )
                    .attr('width', this.x1.bandwidth())
                    .attr('height', (d) => this.height - this.y1(d.reviews) );
  }

  private createBarChart1(data){
    var bars = this.g.selectAll(".bar")
                          .remove()
                          .exit()
                          .data(data)

    bars.enter().append('rect')
                    .attr('class', 'bar')
                    .attr('x', (d) => this.x(d.eventname) )
                    .attr('y', (d) => this.y(d.ratings) )
                    .attr('width', this.x.bandwidth())
                    .attr('height', (d) => this.height - this.y(d.ratings) );
  }
}
