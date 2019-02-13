import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  logout=false;
  url='http://localhost:3000/'

  constructor(private http: HttpClient) { }

  // getScheduleServer(){
    // console.log("working");
    
    // return this.http.get<Config>(this.url);
    getServerData (): Observable<any> {
      console.log("working",this.url);
      return this.http.get<any>(this.url)
    }
  // }

  getCandidate() {
    if (JSON.parse(localStorage.getItem("candidate")) != null) {
      return JSON.parse(localStorage.getItem("candidate"));
    }
    else {
      return new Array();
    }
  }

  getInterviewer() {
    if (JSON.parse(localStorage.getItem("interviewer")) != null) {
      return JSON.parse(localStorage.getItem("interviewer"));
    }
    else {
      return new Array();
    }
  }

  getSchedule() {
    if (JSON.parse(localStorage.getItem("schedule")) != null) {
      return JSON.parse(localStorage.getItem("schedule"));
    }
    else {
      return new Array();
    }
  }

  getFeedback() {
    if (JSON.parse(localStorage.getItem("feedback")) != null) {
      return JSON.parse(localStorage.getItem("feedback"));
    }
    else {
      return new Array();
    }
  }

  isLogin(loggedin) {
    this.logout = loggedin
  }

}
