import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { userModel } from "./user.model";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class AuthService {

  private isAuthenticated = false;
  private token: any;
  private tokenTimer: any;
  private userId: any;
  private userName: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUserName() {
    return this.userName;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  registerUser(name: string, email: string, pass: string) {
    const authRegister: userModel = {name: name, email: email, pass: pass};
    this.http.post(BACKEND_URL + "register", authRegister)
    .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  loginUser (email: string, pass: string) {
    const authLogin: userModel = { email: email, pass: pass};
    this.http.post<{ token: string; expiresIn: number; _id: string, name:string }>(BACKEND_URL + "login", authLogin)
    .subscribe({
      next: (response: { token: any; expiresIn: any; _id: any; name: any; }) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response._id;
          this.userName = response.name;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId, this.userName);
          this.router.navigate(["/"]);
        }
      },
      error: (error) => {
        this.authStatusListener.next(false);
        console.log(error)
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation._id;
      this.userName = authInformation.name;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, _id: string, name: string) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("expiration", expirationDate.toISOString());
    sessionStorage.setItem("_id", _id);
    sessionStorage.setItem("name", name);
  }

  private clearAuthData() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expiration");
    sessionStorage.removeItem("_id");
    sessionStorage.removeItem("name");
  }

  private getAuthData() {
    const token = sessionStorage.getItem("token");
    const expirationDate = sessionStorage.getItem("expiration");
    const _id = sessionStorage.getItem("_id");
    const name = sessionStorage.getItem("name");
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      _id: _id,
      name: name
    };
  }
}
