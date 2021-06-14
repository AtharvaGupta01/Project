import { Component, OnInit } from '@angular/core';
//import {HttpClient} from '@angular/common/http';
//import showapplications from 'C:\\Users\\cnaag\\Desktop\\Project\\showapplications.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'First Attempt';
  keys = Object.values({a:1,b:2,c:3})
  async fetchData(){
    var url = 'http://localhost:5000/'
    // var url = 'https://api.chucknorris.io/jokes/random'
    var response = await fetch(url)
    response = await response.json()
    console.log(typeof(response), response)
    this.keys = Object.values(response)
  }


  ngOnInit(){
    this.fetchData()
  }
  //public myapplist:{app_id:string, app_name:string}[] = showapplications;

  // showapplicationList = JSON.parse(showapplications);
  // keys = Object.keys(showapplicationList);
}
