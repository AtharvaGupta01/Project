import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatPaginator} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



export interface PeriodicElement {
  control_type: string;
  distinct_values: number;
}


/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,AfterViewInit {
  //dropdown1
  myControl = new FormControl();
  options = []
  filteredOptions: Observable<string[]>;
  //table1
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['control_type', 'distinct_values'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  isLoadingResults = false;
  //dropdown2
  myControl2 = new FormControl();
  options2 = []
  filteredOptions2: Observable<string[]>;
  //dropdown3
  myControl3 = new FormControl();
  options3 = ['Control Name','Automation Id']
  filteredOptions3: Observable<string[]>;
  selected = 'option1';
  //table2
  ELEMENT_DATA2: PeriodicElement[] = [];
  displayedColumns2: string[] = ['control_name', 'events'];
  dataSource2 = new MatTableDataSource(this.ELEMENT_DATA2);
  isLoadingResults2 = false;

  //table1
  @ViewChild(MatSort) sort: MatSort;

  //dropdown1
  async fetchData(){
    var url = 'http://localhost:5000/'
    var response = await fetch(url)
    response = await response.json()
    this.options = Object.values(response)
    console.log(this.options)
  }

  //table1
  async getAppNameDropdown(event ,id){
    this.isLoadingResults = true;
    var url = `http://localhost:5000/${id}`
    var response = await fetch(url)
    response = await response.json()
    console.log(response)
    this.ELEMENT_DATA = response['data']
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)

    //dropdown2
    var my_options2 = this.ELEMENT_DATA
    var dict = {}
    for (var index in my_options2) {
      dict[my_options2[index]['control_type']]= my_options2[index]['distinct_values']
    }
    this.options2 = Object.keys(dict)
    console.log(this.options2)

    this.ngAfterViewInit()
  }

  //dropdown2
  // async fetchData2(){

  // }

  //dropdown3
  async fetchData3(){
    var url = 'http://localhost:5000/'
    var response = await fetch(url)
    response = await response.json()
    this.options3 = Object.values(response)
  }

  //table2
  async getControlTypeDropdown(event ,id){
    this.isLoadingResults2 = true;
    var url = `http://localhost:5000/${id}`
    var response = await fetch(url)
    response = await response.json()
    console.log(response)
    this.ELEMENT_DATA2 = response['data']
    this.dataSource2 = new MatTableDataSource(this.ELEMENT_DATA)
    this.ngAfterViewInit()
  }

  //dropdown1
  ngOnInit() {
    this.fetchData()
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  ngAfterViewInit() {
    //table1
    this.dataSource.sort = this.sort;
    this.isLoadingResults = false;
    //dropdown2
    this.filteredOptions2 = this.myControl2.valueChanges
    .pipe(
      startWith(''),
      map(value2 => this._filter2(value2))
    );
  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter2(value2: string): string[] {
    const filterValue2 = value2.toLowerCase();

    return this.options2.filter(option2 => option2.toLowerCase().includes(filterValue2));
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
