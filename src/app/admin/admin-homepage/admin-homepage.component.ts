import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/navbar.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  textShow:boolean;

  constructor(private router:Router,private navBarService:NavbarService) { }

  ngOnInit() {
    this.navBarService.setNavBarState( true );
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "250px";
    this.textShow=true;

  }

  closeNav(){
    document.getElementById("mySidenav").style.width = "0px";
    this.textShow=false;
  }

}
