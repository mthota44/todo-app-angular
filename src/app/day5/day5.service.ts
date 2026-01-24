import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Day5Service {
    private http = inject(HttpClient);
    private apiUrl = 'https://api.restful-api.dev/objects';

    // GET: Fetch all objects
    getObjects(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // POST: Create a new object
    createObject(payload: any): Observable<any> {
        return this.http.post(this.apiUrl, payload);
    }

    // PUT: Update an existing object
    updateObject(id: string, payload: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, payload);
    }

    // DELETE: Delete an object
    deleteObject(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
