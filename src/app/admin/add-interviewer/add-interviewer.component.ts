import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { roles } from '../role-lists';
import { DataService } from 'src/app/data.service';
import { Server } from 'src/app/server';

@Component({
  selector: 'app-add-interviewer',
  templateUrl: './add-interviewer.component.html',
  styleUrls: ['./add-interviewer.component.css']
})
export class AddInterviewerComponent implements OnInit {

  interviewRole = roles;

  addInterviewer: FormGroup;

  interviewer: any;
  serverInterviewers: any;

  serverRes=[];
  getRes = Server;

  initializeform() {
    this.addInterviewer = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', [Validators.required])
    });
  }


  constructor(private interviewerService: DataService) { }

  async ngOnInit() {
    this.getInterviewer();
    this.initializeform();
    let res = await this.getServerData();
    this.serverInterviewers = res['interviewer'];
    console.log('interviewers', this.serverInterviewers);
    // this.serverRes = this.getRes;
    // console.log(this.serverRes);
    console.log(this.getRes.toString);
    

  }

  getInterviewer() {
    this.interviewer = this.interviewerService.getInterviewer();
  }

  serverData() {
    return new Promise((resolve, reject) => {
      this.interviewerService.getServerData().subscribe(res => {
        resolve(res);
      })
    })
  }

  async getServerData() {
    let res = await this.serverData();
    return res;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.addInterviewer.value);
    this.interviewer.push(this.addInterviewer.value);
    localStorage.setItem("interviewer", JSON.stringify(this.interviewer));
    this.addInterviewer.reset();
  }

}
