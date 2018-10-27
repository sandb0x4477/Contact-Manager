import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MongodbService {


  selectedContact: Contact;

  contacts: Contact[];

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${ this.baseUrl }/contacts`, this.getHeaders());
  }

  postContact(contact): any {
    return this.http.post(`${ this.baseUrl }/contacts`, contact, this.getHeaders());
  }

  postLogin(payload) {
    return this.http.post(`${ this.baseUrl }/autenticate`, payload, this.getHeaders());
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ this.auth.getToken() }`
        }
      )
    };
    return httpOptions;
  }

  deleteContect(id: string) {
    return this.http.delete(`${ this.baseUrl }/contacts/${ id }`, this.getHeaders());
  }

  updateContact(id: string, contact: Contact) {
    return this.http.put(`${ this.baseUrl }/contacts/${ id }`, contact, this.getHeaders());
  }
}
