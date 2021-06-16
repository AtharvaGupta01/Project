import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';


// export interface PeriodicElement {
//   control_type: string;
//   distinct_values: number;
// }



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
  // options = ['One', 'Two', 'Three'];
  options = []
  ELEMENT_DATA = [];
  filteredOptions: Observable<string[]>;
  displayedColumns: string[] = ['control_type', 'distinct_values'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  async fetchData(){
    var url = 'http://localhost:5000/'
    var response = await fetch(url)
    response = await response.json()
    this.options = Object.values(response)
  }

  async getAppNameDropdown(event ,id){
    var url = `http://localhost:5000/${id}`
    var response = await fetch(url)
    response = await response.json()
    console.log(response)
  }

  ngOnInit() {
    this.fetchData()
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}








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
