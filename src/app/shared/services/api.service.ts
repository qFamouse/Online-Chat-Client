import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class ApiService {
	constructor(private http: HttpClient) {}

	get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
		return this.http.get<T>(`${path}`, { params });
	}

	getBlob(path: string): Observable<Blob> {
		return this.http.get(`${path}`, { responseType: "blob" });
	}

	post<T>(path: string, body: Object = {}): Observable<T> {
		return this.http.post<T>(path, body);
	}

	put<T>(path: string, body: Object = {}): Observable<T> {
		return this.http.put<T>(path, body);
	}

	patch<T>(path: string, body: Object = {}): Observable<T> {
		return this.http.patch<T>(path, body);
	}

	delete(path: string): Observable<boolean> {
		return this.http.delete<boolean>(path);
	}
}
