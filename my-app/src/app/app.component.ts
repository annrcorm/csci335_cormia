import { Component } from '@angular/core';

import { FirebaseAuth, User } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AngularFireDatabase } from 'angularfire2/database';
//import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  authState:Observable<User>;
  currentUser:User;
  messagesSub:any;
  messages:any;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {    
        this.currentUser = user;
        console.log("Logged in as user: " + this.currentUser.displayName);
      } else {
        this.currentUser = null;
      }
    });
  }

  ngOnInit() {  
    this.messagesSub = this.db.list('/messages').valueChanges().subscribe( 
      m => {this.messages = m 
    });
    
  }

  login(){
    console.log("Logging in with google...");
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    console.log("Logging out...")
    return this.afAuth.auth.signOut();
  }
}
