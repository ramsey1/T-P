import { OnInit } from '@angular/core';
import { DataService } from './data.service';


export class Server implements OnInit{

    serverRes:any;

    async ngOnInit(){
        this.serverRes = await this.getServerData();
    }

    constructor(private globalService:DataService){}

    async getServerData(){
        let res = await this.serverData();
        return res;
    }

    serverData(){
        return new Promise((resolve,reject)=>{
            this.globalService.getServerData().subscribe(res=>{
                resolve(res);
            })
        })
    }
}

