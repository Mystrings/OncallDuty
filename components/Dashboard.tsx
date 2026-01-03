
import React from 'react';
import { Service, Incident, IncidentStatus } from '../types';

interface DashboardProps {
  services: Service[];
  incidents: Incident[];
}

const Dashboard: React.FC<DashboardProps> = ({ services, incidents }) => {
  const activeIncidents = incidents.filter(i => i.status !== IncidentStatus.RESOLVED).length;
  const criticalServices = services.filter(s => s.status === 'critical').length;
  const mttr = "42m"; // Mock Mean Time To Resolve

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Active Incidents</span>
            <div className="bg-red-100 p-2 rounded-lg">
              <i className="fa-solid fa-circle-exclamation text-red-600"></i>
            </div>
          </div>
          <div className="text-3xl font-bold">{activeIncidents}</div>
          <p className="text-xs text-gray-400 mt-2">+2 since yesterday</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">Service Health</span>
            <div className="bg-green-100 p-2 rounded-lg">
              <i className="fa-solid fa-heart-pulse text-green-600"></i>
            </div>
          </div>
          <div className="text-3xl font-bold">{services.length - criticalServices}/{services.length}</div>
          <p className="text-xs text-gray-400 mt-2">Services operational</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">MTTR (Avg)</span>
            <div className="bg-blue-100 p-2 rounded-lg">
              <i className="fa-solid fa-clock-rotate-left text-blue-600"></i>
            </div>
          </div>
          <div className="text-3xl font-bold">{mttr}</div>
          <p className="text-xs text-gray-400 mt-2">-15% improvement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Incidents */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Recent Incidents</h3>
            <button className="text-blue-600 text-sm hover:underline font-medium">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {incidents.slice(0, 4).map(incident => (
              <div key={incident.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm mb-1">{incident.title}</h4>
                  <p className="text-xs text-gray-500">Created {new Date(incident.createdAt).toLocaleTimeString()}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                  incident.status === IncidentStatus.TRIGGERED ? 'bg-red-100 text-red-700' :
                  incident.status === IncidentStatus.ACKNOWLEDGED ? 'bg-orange-100 text-orange-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {incident.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Overview List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Critical Services</h3>
          </div>
          <div className="p-6 space-y-6">
            {services.filter(s => s.status !== 'active').map(service => (
              <div key={service.id} className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                  service.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <h4 className="text-sm font-semibold">{service.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                </div>
              </div>
            ))}
            {services.filter(s => s.status !== 'active').length === 0 && (
              <p className="text-sm text-gray-500 italic">All services are healthy. Great job!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
