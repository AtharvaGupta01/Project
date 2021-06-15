//  import { Component, OnInit } from '@angular/core';

//  @Component({
//    selector: 'app-root',
//    templateUrl: './app.component.html',
//    styleUrls: ['./app.component.css']
//  })
//  export class AppComponent implements OnInit {
//    // title = 'First Attempt';
//    keys = Object.values({a:1,b:2,c:3})
//    async fetchData(){
//      var url = 'http://localhost:5000/'
//      // var url = 'https://api.chucknorris.io/jokes/random'
//      var response = await fetch(url)
//      response = await response.json()
//      console.log(typeof(response), response)
//      this.keys = Object.values(response)
//    }

//    ngOnInit(){
//      this.fetchData()
//    }
// }



import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  my_values = Object.values({a:1,b:2,c:3})
  myControl = new FormControl();
  options: Object[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<Object[]>;

  async fetchData(){
    var url = 'http://localhost:5000/'
    var response = await fetch(url)
    response = await response.json()
    this.my_values = Object.values(response)
    console.log(this.my_values)
    // var keys = [];
    // for (var nu in this.my_values) {
    //   if (nu.hasOwnProperty(nu)) {
    //     keys.push(nu);
    //   }
    // }
    // console.log(typeof(keys))
  }


  ngOnInit() {
    this.fetchData()
    this.options = this.my_values
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Object[] {
    const filterValue = value.toString().toLowerCase();

    return this.options.filter(option => option.toString().toLowerCase().includes(filterValue));
  }
}
