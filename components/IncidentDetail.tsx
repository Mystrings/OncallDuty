
import React, { useState } from 'react';
import { Incident, IncidentStatus, User } from '../types';
import { geminiService } from '../services/geminiService';

interface IncidentDetailProps {
  incident: Incident;
  users: User[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: IncidentStatus) => void;
}

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incident, users, onClose, onUpdateStatus }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const assignee = users.find(u => u.id === incident.assignedTo);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const result = await geminiService.analyzeIncident(incident);
    setAnalysis(result || "Analysis failed.");
    setIsAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                incident.urgency === 'high' ? 'bg-red-600 text-white' : 'bg-blue-100 text-blue-700'
              }`}>
                {incident.urgency} Urgency
              </span>
              <span className="text-gray-400 text-xs">ID: {incident.id}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{incident.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-xl text-gray-400"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2 p-8 space-y-8 border-r border-gray-100">
            {/* Description */}
            <section>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Incident Description</h3>
              <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                {incident.description}
              </p>
            </section>

            {/* Logs */}
            <section>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Logs & Events</h3>
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto">
                {incident.logs?.map((log, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="text-slate-600 shrink-0">[{idx + 1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
                {(!incident.logs || incident.logs.length === 0) && <p className="text-slate-500 italic">No logs provided for this incident.</p>}
              </div>
            </section>

            {/* AI Analysis */}
            <section className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white w-6 h-6 rounded flex items-center justify-center">
                    <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
                  </div>
                  <h3 className="font-bold text-blue-900">Pulse AI Analysis</h3>
                </div>
                {!analysis && !isAnalyzing && (
                  <button 
                    onClick={handleAnalyze}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition-all"
                  >
                    Generate RCA
                  </button>
                )}
              </div>
              
              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-sm text-blue-600 font-medium">Gemini is analyzing logs and context...</p>
                </div>
              )}

              {analysis && (
                <div className="prose prose-sm prose-blue max-w-none text-blue-800">
                  <div className="whitespace-pre-wrap">{analysis}</div>
                  <div className="mt-4 pt-4 border-t border-blue-200 flex gap-2">
                    <button className="text-blue-600 hover:bg-blue-100 px-3 py-1 rounded text-xs font-bold border border-blue-200">Helpful</button>
                    <button className="text-blue-400 hover:bg-blue-100 px-3 py-1 rounded text-xs font-bold">Unhelpful</button>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="bg-gray-50/50 p-8 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Actions</h3>
              <div className="space-y-3">
                {incident.status === IncidentStatus.TRIGGERED && (
                  <button 
                    onClick={() => onUpdateStatus(incident.id, IncidentStatus.ACKNOWLEDGED)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-bold shadow-sm"
                  >
                    Acknowledge
                  </button>
                )}
                {incident.status !== IncidentStatus.RESOLVED && (
                  <button 
                    onClick={() => onUpdateStatus(incident.id, IncidentStatus.RESOLVED)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold shadow-sm"
                  >
                    Resolve
                  </button>
                )}
                <button className="w-full bg-white hover:bg-gray-100 text-gray-700 py-2 rounded-lg font-bold border border-gray-200 shadow-sm">
                  Add Note
                </button>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Assigned Responder</h3>
              {assignee ? (
                <div className="flex items-center gap-3">
                  <img src={assignee.avatar} className="w-10 h-10 rounded-full border border-gray-200" alt={assignee.name} />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{assignee.name}</p>
                    <p className="text-xs text-gray-500">{assignee.email}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Unassigned</p>
              )}
            </section>

            <section>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Timeline</h3>
              <div className="space-y-4 relative">
                <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gray-200"></div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div>
                  <p className="text-xs font-bold text-gray-900">Triggered</p>
                  <p className="text-[10px] text-gray-400">{new Date(incident.createdAt).toLocaleString()}</p>
                </div>
                {incident.status === IncidentStatus.ACKNOWLEDGED && (
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-orange-500 border-2 border-white"></div>
                    <p className="text-xs font-bold text-gray-900">Acknowledged</p>
                    <p className="text-[10px] text-gray-400">Just now</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
