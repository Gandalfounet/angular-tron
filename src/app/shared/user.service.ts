import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any = false;
  constructor() { 

  }

  getUser(){
  	return this.user;
  }

  setUser(address, balance){
  	if(this.user){
  		this.user.address = address;
  		this.user.balance = balance;
  	}else{
  		this.user = {
  			address: address,
  			balance: balance
  		}
  	}
  }

}
