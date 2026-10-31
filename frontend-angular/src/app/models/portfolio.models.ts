// Modelos (interfaces): describen la FORMA de los datos. TypeScript los usa
// para avisarte en tiempo de compilación si te equivocas en un campo.

export type ProjectStatus = 'ACTIVO' | 'ARCHIVO';

export interface Project {
  id: string;
  name: string;
  stack: string;
  year: number;
  status: ProjectStatus;
  description: string;
  tags: string[];
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  focus: string;
  level: string;
}

export interface StackCard {
  icon: string;
  title: string;
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
