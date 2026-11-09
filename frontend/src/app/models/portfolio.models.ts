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
  stack: Localized;
  year: number;
  status: Localized;
  description: Localized;
  tags: Localized[];
}

export interface Experiment {
  id: string;
  title: string;
  description: Localized;
  tags: Localized[];
}

export interface Skill {
  id: number;
  name: string;
  category: Localized;
  focus: Localized;
  level: Localized;
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
