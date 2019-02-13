import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.css']
})
export class CandidateRegisterComponent implements OnInit {

  candidate:any;
  profileForm:FormGroup;
  resPath:string;
  vidPath:string;
  getCand:any;

  private filesControlR = new FormControl(null, [FileUploadValidators.filesLimit(1)]);
  private filesControlV = new FormControl(null, [FileUploadValidators.filesLimit(1)]);


  initializeForm() {
    this.profileForm = new FormGroup({
      fullName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators
      .email]),
      mobile: new FormControl('',[Validators.required]),
      password:new FormControl(''),
      experience:new FormGroup({
        year:new FormControl('',[Validators.required]),
        month:new FormControl('',[Validators.required]),
      }),

      resume: this.filesControlR,
      video: this.filesControlV
    }); 
  }
  constructor(private candidateService:DataService) { }

  ngOnInit() {
    this.getCandidate();
    this.initializeForm();
  }

  getCandidate(){
    this.candidate =  this.candidateService.getCandidate();
  }

  onSubmit(){
    
    for(var i=0;i<this.candidate.length;i++){
      if(this.profileForm.value.email==this.candidate[i].email){
        alert('User Email Already Exists');
        return;
      }
    }    
    // console.warn(this.profileForm.value);
    // console.warn(this.getCand);
    
    this.profileForm.value.password="default";
    this.resPath=this.profileForm.value.resume[0].name;
    this.vidPath=this.profileForm.value.video[0].name;

    this.profileForm.value.resume=this.resPath;
    this.profileForm.value.video=this.vidPath;
    this.candidate.push(this.profileForm.value);

    localStorage.setItem("candidate",JSON.stringify(this.candidate));
    this.profileForm.reset();

    setTimeout(()=>{window.location.reload();},6000);
  }

}
