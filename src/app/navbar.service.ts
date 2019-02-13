import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navStateSource = new Subject<boolean>();
  navState$ = this.navStateSource.asObservable();

  constructor() { }

  setNavBarState( state: boolean) {
    this.navStateSource.next( state );
  }

}
