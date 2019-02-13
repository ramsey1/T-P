import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-interview-status',
  templateUrl: './interview-status.component.html',
  styleUrls: ['./interview-status.component.css']
})
export class InterviewStatusComponent implements OnInit {

  interviewStatus: any;
  schedule: any;
  serverSchedule:any;
  test: any;

  constructor(private statusService: DataService) { }


  async ngOnInit() {

    let res =await this.getFeedback();
    this.serverSchedule = res['schedule'];


    for (var i = 0; i < this.interviewStatus.length; i++) {
      for (var j = 0; j < this.schedule.length; j++) {
        if (this.interviewStatus[i].interviewerName == this.schedule[j].interviewerName &&
          this.interviewStatus[i].candidateName == this.schedule[j].candidateName &&
          this.interviewStatus[i].date == this.schedule[j].date &&
          this.interviewStatus[i].time == this.schedule[j].time) {
          if (this.schedule[j].marks == null || this.schedule[j].marks == "") {
            this.schedule[j].marks = this.interviewStatus[i].marks;
            console.log(this.interviewStatus[i].marks);
          }
        }
      }
    }
    localStorage.setItem("schedule", JSON.stringify(this.schedule));

    console.log(this.serverSchedule);
  }

  getSchedule() {
    return new Promise((resolve,reject)=>{
      this.statusService.getServerData().subscribe(res => {
        resolve(res);
      })  
    })
  }

  async getFeedback() {
    this.interviewStatus = this.statusService.getFeedback();
    this.schedule = this.statusService.getSchedule();
    let res = await this.getSchedule();
    return res;
  }

}
