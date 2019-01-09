import { Component, OnInit } from '@angular/core';
import TronWeb from 'tronweb';
import {UserService} from '../../shared/user.service';
declare global {
    interface Window { tronWeb: any; }
}

window.tronWeb = window.tronWeb || {};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  current_deposit:any = 10;
  contract:any = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  placeBet(){
  	if(this.userService.getUser() && this.userService.getUser().address){
  		window.tronWeb.contract().at("XXX").then(res => {
        	this.contract = res;
        	//self.startEventListener();   
        	this.contract.placeBet(this.current_deposit*100000000).send({
                shouldPollResponse:true,
                callValue:0,
                from: this.userService.getUser().address
            }).then(res => {
                console.log('RES')
                console.log(res)
            }).catch(err => {
                console.log('ERR')
                console.log(err)
            });
        })
  	}
  	
  }
}
