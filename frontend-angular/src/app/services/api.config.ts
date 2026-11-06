import { InjectionToken } from '@angular/core';

// Un InjectionToken es una "etiqueta" para pedir un valor por inyección de
// dependencias. Aquí: la URL base del backend. Se decide según dónde corre.
export const API_BASE = new InjectionToken<string>('API_BASE', {
  providedIn: 'root',
  factory: () =>
    location.hostname === 'localhost' || location.hostname === '127.0.0.1'
      ? 'http://localhost:5050'
      : 'https://api.mateoigua.com',
});
