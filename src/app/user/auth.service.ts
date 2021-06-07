import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient){}

  loginUser(userName: string, password: string) {
    // the username property here has to match the property on the server
    //   this is why it is all lower case
    //   This will be the body
    let loginInfo = { username: userName, password: password };
    let options = { headers: new HttpHeaders({ 'Contect-Type': 'application/json' })};

    // This url can be completely different depnding on how the
    //   api is writen for the login and the details can vary
    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data['user'];
      }))
      .pipe(catchError(err => {
        return of(false)
      }))
  }

  isAuthenticated(){
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    // This is one way we can do this, but we can also use the tap call as well
    //  call back is within the subscribe
    /* this.http.get('/api/currentIdentity')
      .subscribe(data => {
        if(data instanceof Object) {
          this.currentUser = <IUser>data;
        }
      }); */

      // callback is with the tap method instead of the subscribe
      //  The benefit of this is that we can use this code if we want
      //  components to react to the change by changing this to a return
      //  and adding the subscribe on their end
      this.http.get('/api/currentIdentity')
        .pipe(tap(data => {
          if(data instanceof Object) {
            this.currentUser = <IUser>data;
          }
        }))
        .subscribe();
  }

  updateCurrentUser(firstName: string, lastName:string){
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
