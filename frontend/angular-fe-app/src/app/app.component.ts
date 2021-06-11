import { Component } from '@angular/core';
import showapplications from '../../../../';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'First Attempt';

  public showapplicationList:{id:string, name:string}[] = showapplications;
}
