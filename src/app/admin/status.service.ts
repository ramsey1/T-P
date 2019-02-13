import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }

  updateSchedule(feedback, schedule) {
    for (var i = 0; i < feedback.length; i++) {
      for (var j = 0; j < schedule.length; j++) {
        if (feedback[i].interviewerName == schedule[j].interviewerName &&
          feedback[i].candidateName == schedule[j].candidateName &&
          feedback[i].date == schedule[j].date &&
          feedback[i].time == schedule[j].time) {
          if (schedule[j].marks == null || schedule[j].marks == "") {
            schedule[j].marks = feedback[i].marks;
            console.log(feedback[i].marks);
          }
        }
      }
    }
    return schedule;

  }
}


