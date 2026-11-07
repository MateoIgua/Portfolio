import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HelloResponse, ServerTimeResponse } from '../models/portfolio.models';
import { API_BASE } from './api.config';

// Servicio = clase con lógica reutilizable, creada UNA vez (providedIn: 'root')
// y compartida por quien la pida con inject(). Equivale a api-client.js.
@Injectable({ providedIn: 'root' })
export class PortfolioApiService {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE);

  // GET /api/hello
  getHello(): Observable<HelloResponse> {
    return this.http.get<HelloResponse>(`${this.base}/api/hello`);
  }

  // GET /api/hello/now
  getServerTime(): Observable<ServerTimeResponse> {
    return this.http.get<ServerTimeResponse>(`${this.base}/api/hello/now`);
  }
}
