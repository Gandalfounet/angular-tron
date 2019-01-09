import { Component } from '@angular/core';
import TronWeb from 'tronweb';
import {UserService} from './shared/user.service';
declare global {
    interface Window { tronWeb: any; }
}

window.tronWeb = window.tronWeb || {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
    title = 'frontend';
    HttpProvider = TronWeb.providers.HttpProvider;

	// fullNode = new this.HttpProvider('https://api.trongrid.io');
	// solidityNode = new this.HttpProvider('https://api.trongrid.io');
	// eventServer = 'https://api.trongrid.io/';

	user:any = false;
	contract:any = false;
	
	updateUser:any = false;
	tronState:any = false;
	tronWebS:any = {
                            installed: false,
                            loggedIn: false
                        }
	constructor(private userService: UserService){	
	    var self = this;
	    var tries = 10;
	    this.updateUser = setInterval(function(){	    	
	    	if(tries > 0){
	    		self.initTron(function(res){
	    			if(res == false){
	    				//const tmp_tronwebaddress = window.tronWeb.address.fromHex(((window.tronWeb.trx.getAccount()).address).toString())
		    			const tmp_tronwebaddress = window.tronWeb.defaultAddress.base58
	           			console.log(tmp_tronwebaddress)
	           			window.tronWeb.trx.getBalance(tmp_tronwebaddress).then(balance => {
					        console.log(balance / 1000000);
					        self.userService.setUser(tmp_tronwebaddress, balance)				        
				            
					        tries = 0;
					    }).catch(err => console.error(err));
	    			}
		    		
		    	});   
		    	tries--;
	    	}else{
	    		clearInterval(self.updateUser)
	    	}		
	    }, 1000)

	    window.tronWeb.on('addressChanged', () => {
	    	tries = 10;
		    this.updateUser = setInterval(function(){	    	
		    	if(tries > 0){
		    		self.initTron(function(res){
		    			if(res == false){
		    				//const tmp_tronwebaddress = window.tronWeb.address.fromHex(((window.tronWeb.trx.getAccount()).address).toString())
			    			const tmp_tronwebaddress = window.tronWeb.defaultAddress.base58
		           			console.log(tmp_tronwebaddress)
		           			window.tronWeb.trx.getBalance(tmp_tronwebaddress).then(balance => {
						        console.log(balance / 1000000);
						        self.userService.setUser(tmp_tronwebaddress, balance)				        
					            
						        tries = 0;
						    }).catch(err => console.error(err));
		    			}
			    		
			    	});   
			    	tries--;
		    	}else{
		    		clearInterval(self.updateUser)
		    	}		
		    }, 1000)
        });
	}
	initTron(callback){
		if(!this.user){
			const tronWebState = {
	            installed: !!window.tronWeb,
	            loggedIn: window.tronWeb && window.tronWeb.ready
	        };
	        console.log(tronWebState)
	        if(tronWebState.installed ) {
	        	this.tronState = tronWebState;	        	
			    tronWebState.installed = !!window.tronWeb;
	            tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;
	            this.tronState = tronWebState;
	            console.log(this.tronState);

	            this.user = true;	      
	               
	            return callback(true)
	            
	        }
		}else{
			clearInterval(this.updateUser);
			return callback(false);
		}
	}
	startEventListener(){

	    this.contract.logGameCreated().watch((err, {result}) =>{

	    if(err){return console.log("Failed to bind the event : ", err);}

	    console.log(result);	

	    })

    }

}
