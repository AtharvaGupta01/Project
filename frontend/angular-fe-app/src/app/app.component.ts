import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { OnInit } from '@angular/core';
import showapplications from 'C:\\Users\\cnaag\\Desktop\\Project\\showapplications.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'First Attempt';

  public myapplist:{app_id:string, app_name:string}[] = showapplications;
  // url = 'http://127.0.0.1:5000/'

  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => console.log(data));


  // showapplicationList = JSON.parse(showapplications);
  // keys = Object.keys(showapplicationList);
}
