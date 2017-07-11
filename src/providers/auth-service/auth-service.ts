import { Injectable } from '@angular/core';
import { Headers,Http,Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {JwtHelper} from "angular2-jwt";

export class User {
  user_first_name: string;
  user_last_name: string;
  user_email: string;

  constructor(user_first_name: string, user_last_name: string, user_email: string) {
    this.user_first_name = user_first_name;
    this.user_last_name = user_last_name;
    this.user_email = user_email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  private LOGIN_URL = "https://staging.bidr.co/api/auth?key=ce52728f580499be6d00e2acbe8b996f";

  contentHeader = new Headers({"Content-Type": "application/json"});
  error: string;
  jwtHelper = new JwtHelper();
  user: string;

  constructor(private http: Http) {}

  public login(credentials) {
    if(credentials.user_phone === null || credentials.user_pass === null){
      return Observable.throw("Please insert credentials");
    }else{
      return this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(this.extractData)
      .catch(this.handleError);
      // return Observable.create(observer => {
      //   console.log(credentials);
      //   // At this point make a request to your backend to make a real check!
      //   // let access = (credentials.password === 'pass' && credentials.email === "email");
      //   // this.currentUser = new User('Jordan','riser.jordan@gmail.com');
      //   // observer.next(access);
      //   // observer.complete();
      // });
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    this.error = null;
    this.user = body.user[0];
    return body || {};
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
