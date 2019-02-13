import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-assign-interviewer',
  templateUrl: './assign-interviewer.component.html',
  styleUrls: ['./assign-interviewer.component.css']
})
export class AssignInterviewerComponent implements OnInit {

  candidates:any;
  serverCandidates:any;

  interviewers:any;
  serverInterviewwers:any;

  schedule:any;
  serverSchedule:any;

  assignInterviewer:FormGroup;

  
  initializeform(){
    this.assignInterviewer = new FormGroup({
      interviewerName:new FormControl('',[Validators.required]),
      candidateName:new FormControl('',[Validators.required]),
      interviewerEmail:new FormControl(''),
      candidateEmail:new FormControl(''),
      date:new FormControl('',[Validators.required]),
      time:new FormControl('',[Validators.required]),
      marks:new FormControl('')
    });
  }


  constructor(private assignService:DataService) { }

  async ngOnInit() {
    this.initializeData();
    this.initializeform();
    let res = await this.getServerData();
    this.serverCandidates = res['candidate'];
    this.serverInterviewwers = res['interviewer'];
    this.serverSchedule = res['schedule'];
    console.log('candidates',this.serverCandidates);
    console.log('interviewers',this.serverInterviewwers);
    console.log('schedule',this.serverSchedule);
  }

  initializeData(){
    this.interviewers=this.assignService.getInterviewer();
    this.candidates=this.assignService.getCandidate();
    this.schedule=this.assignService.getSchedule();
  }

  serverData(){
    return new Promise((resolve,reject)=>{
      this.assignService.getServerData().subscribe(res=>{
        resolve(res);
      })
    })
  }

  async getServerData(){
    let res = await this.serverData();
    return res;
  }

  onSubmit(){
    console.warn(this.assignInterviewer.value.interviewerName);

    for (var i=0;i<this.interviewers.length;i++){
      if(this.assignInterviewer.value.interviewerName==this.interviewers[i].fullName){
        this.assignInterviewer.value.interviewerEmail=this.interviewers[i].email;
        break;
      }
    }


    for (var i=0;i<this.candidates.length;i++){
      if(this.assignInterviewer.value.candidateName==this.candidates[i].fullName){
        this.assignInterviewer.value.candidateEmail=this.candidates[i].email;
        break;
    }
  }

    this.assignInterviewer.value.marks="";
    this.schedule.push(this.assignInterviewer.value);
    localStorage.setItem("schedule",JSON.stringify(this.schedule));
    this.assignInterviewer.reset();
  }

}
