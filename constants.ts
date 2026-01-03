
import { IncidentStatus, IncidentUrgency, User, Service, Incident } from './types';

export const INITIAL_USERS: User[] = [
  { id: 'u1', name: 'Alex Rivera', email: 'alex@startup.io', avatar: 'https://picsum.photos/seed/u1/100' },
  { id: 'u2', name: 'Sam Chen', email: 'sam@startup.io', avatar: 'https://picsum.photos/seed/u2/100' },
  { id: 'u3', name: 'Jordan Blake', email: 'jordan@startup.io', avatar: 'https://picsum.photos/seed/u3/100' },
];

export const INITIAL_SERVICES: Service[] = [
  { id: 's1', name: 'Checkout API', status: 'critical', description: 'Handles all payment processing flows' },
  { id: 's2', name: 'User Dashboard', status: 'active', description: 'Main customer facing portal' },
  { id: 's3', name: 'Notification Worker', status: 'warning', description: 'Queues emails and SMS alerts' },
  { id: 's4', name: 'Search Index', status: 'active', description: 'Elasticsearch cluster for product search' },
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-1',
    title: '500 Errors on POST /charge',
    description: 'Stripe webhook returned 402, causing 500 errors in our API gateway.',
    status: IncidentStatus.TRIGGERED,
    urgency: IncidentUrgency.HIGH,
    serviceId: 's1',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    logs: [
      'Error: Request to Stripe timed out after 30000ms',
      'Stack: at stripeService.ts:42',
      'DB: Connection pool exhausted'
    ]
  },
  {
    id: 'inc-2',
    title: 'High Latency on Login',
    description: 'Auth service responding in > 2000ms.',
    status: IncidentStatus.ACKNOWLEDGED,
    urgency: IncidentUrgency.HIGH,
    serviceId: 's2',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    assignedTo: 'u2',
    logs: [
      'Latency: 2450ms',
      'CPU: 95% on auth-instance-1'
    ]
  },
  {
    id: 'inc-3',
    title: 'Email Delivery Delay',
    description: 'SMTP buffer is full, some emails delayed by 5 mins.',
    status: IncidentStatus.RESOLVED,
    urgency: IncidentUrgency.LOW,
    serviceId: 's3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    assignedTo: 'u1',
    logs: [
      'Queue size: 4500 items',
      'Worker 3 restarted'
    ]
  }
];
