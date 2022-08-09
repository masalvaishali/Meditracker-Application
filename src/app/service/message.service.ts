import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = "https://api.textlocal.in/send";

  constructor(private http: HttpClient) { }

  sendSMS(message: string, number: string) {
    return this.http.get(this.url + "?apikey=g5LDhBKYxFE-pQt8DZSR9TzJtt8JLTjHPVSkHEzvkt&message=" + message + "&numbers=91" + number + "&sender=TXTLCL")
  }

}
