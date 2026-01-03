
import React, { useState, useCallback, useMemo } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import IncidentDetail from './components/IncidentDetail';
import DeploymentGuide from './components/DeploymentGuide';
import { INITIAL_INCIDENTS, INITIAL_SERVICES, INITIAL_USERS } from './constants';
import { Incident, IncidentStatus, Service, User } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [services] = useState<Service[]>(INITIAL_SERVICES);
  const [users] = useState<User[]>(INITIAL_USERS);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  const selectedIncident = useMemo(() => 
    incidents.find(i => i.id === selectedIncidentId),
    [incidents, selectedIncidentId]
  );

  const handleUpdateStatus = useCallback((id: string, status: IncidentStatus) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === id ? { ...inc, status } : inc
    ));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard services={services} incidents={incidents} />;
      case 'deployment':
        return <DeploymentGuide />;
      case 'incidents':
        return (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Urgency</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Assigned To</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {incidents.map((incident) => {
                  const assignee = users.find(u => u.id === incident.assignedTo);
                  return (
                    <tr 
                      key={incident.id} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedIncidentId(incident.id)}
                    >
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                          incident.status === IncidentStatus.TRIGGERED ? 'bg-red-100 text-red-700' :
                          incident.status === IncidentStatus.ACKNOWLEDGED ? 'bg-orange-100 text-orange-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {incident.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-sm text-gray-900">{incident.title}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs ${incident.urgency === 'high' ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                          {incident.urgency}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">{new Date(incident.createdAt).toLocaleTimeString()}</td>
                      <td className="px-6 py-4">
                        {assignee ? (
                          <div className="flex items-center gap-2">
                            <img src={assignee.avatar} className="w-6 h-6 rounded-full" alt={assignee.name} />
                            <span className="text-xs text-gray-700">{assignee.name}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <i className="fa-solid fa-chevron-right text-gray-300 text-xs"></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      case 'services':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{service.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                    service.status === 'warning' ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' :
                    'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse'
                  }`}></div>
                </div>
                <p className="text-sm text-gray-500 mb-6">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button className="text-xs font-bold text-blue-600 hover:underline">Configuration</button>
                  <button className="text-xs font-bold text-blue-600 hover:underline">Alert Rules</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'oncall':
        return (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-calendar-days text-2xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Weekly Rotation</h3>
            <p className="text-sm text-gray-500 mt-1">Calendar view for the "Engineering-Core" rotation schedule.</p>
            <div className="mt-8 grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="bg-gray-50 p-3 text-[10px] font-bold text-gray-500 uppercase">{day}</div>
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="bg-white min-h-[100px] p-2 text-left group hover:bg-gray-50 transition-colors">
                  <span className="text-xs text-gray-400">{i + 1}</span>
                  {i === 2 && (
                    <div className="mt-2 bg-blue-600 text-white text-[10px] p-1.5 rounded-md font-bold shadow-sm">
                      Sam Chen (On Call)
                    </div>
                  )}
                  {i === 9 && (
                    <div className="mt-2 bg-slate-700 text-white text-[10px] p-1.5 rounded-md font-bold shadow-sm">
                      Alex Rivera (On Call)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 text-gray-500 italic">
            Component for "{activeTab}" is coming soon!
          </div>
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
      {selectedIncident && (
        <IncidentDetail 
          incident={selectedIncident} 
          users={users} 
          onClose={() => setSelectedIncidentId(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </Layout>
  );
};

export default App;
