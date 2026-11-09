// Modelos (interfaces): describen la FORMA de los datos. TypeScript los usa
// para avisarte en tiempo de compilación si te equivocas en un campo.

// Un texto en los dos idiomas del sitio. La plantilla elige uno con i18n.t().
export interface Localized {
  es: string;
  en: string;
}

export interface Project {
  id: string;
  name: Localized;
  status: Localized;
  updated: string; // fecha de la última modificación (AAAA-MM-DD)
  codeUrl: string; // enlace al código
  description: Localized;
  tags: Localized[];
  image?: string; // vista previa: ruta dentro de public/, p. ej. 'projects/a.png'
}

export interface Experiment {
  id: string;
  title: string;
  description: Localized;
  tags: Localized[];
}

export interface StackCard {
  icon: string;
  title: Localized;
  tags: string[];
  interestedIn?: string[];
}

// Respuestas del backend (Portfolio.Api)
export interface HelloResponse {
  message: string;
  from: string;
  timestamp: string;
}

export interface ServerTimeResponse {
  iso: string;
  human: string;
  unix: number;
}
