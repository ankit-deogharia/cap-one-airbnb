import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

interface Listing {
	distance: number;
	price: number;
	latitude: number;
	longitude: number;
}

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  
  latLongForm:FormGroup;
  res:object;

  weeklyPrice:number;
  idealPrice:number;

  constructor(private http: HttpClient,
  	private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  	this.idealPrice = 0;

	this.latLongForm = new FormGroup({
	  latField: new FormControl('', [
		Validators.required,
		Validators.min(37.7),
		Validators.max(37.84)]),
	  longField: new FormControl('', [
		Validators.required,
		Validators.min(-122.5),
		Validators.max(-122.375)]),
	  neighborsField: new FormControl('', [
		Validators.required])
	});
  }

  getPrices() {
  	// this.spinnerService.show();
  	let params = new HttpParams()
  		.append("lat", this.latLongForm.value.latField)
  		.append("long", this.latLongForm.value.longField)
  		.append("neighbors", this.latLongForm.value.neighborsField)
  	this.res = this.latLongForm.value;
  	this.spinnerService.show();
  	this.http.get<Listing[]>('http://localhost:5000/getInsights', { params: params }).subscribe((data) => {
  		this.idealPrice = data.map(listing => listing.price)
  			.reduce((x,y) => x+y)
  			/ this.latLongForm.value.neighborsField;
  		this.spinnerService.hide();
  	})
  }  
}
