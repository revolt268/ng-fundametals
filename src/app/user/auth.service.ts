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

  updateCurrentUser(firstName: string, lastName:string){
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
