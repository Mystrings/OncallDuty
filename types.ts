
export enum IncidentStatus {
  TRIGGERED = 'triggered',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved'
}

export enum IncidentUrgency {
  HIGH = 'high',
  LOW = 'low'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Service {
  id: string;
  name: string;
  status: 'active' | 'warning' | 'critical';
  description: string;
  lastIncidentAt?: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  urgency: IncidentUrgency;
  serviceId: string;
  createdAt: string;
  assignedTo?: string;
  logs?: string[];
}

export interface OnCallShift {
  id: string;
  userId: string;
  start: string;
  end: string;
}
