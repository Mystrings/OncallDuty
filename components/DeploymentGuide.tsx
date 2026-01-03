
import React from 'react';

const DeploymentGuide: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl pb-20">
      <div className="bg-gradient-to-r from-green-600 to-teal-700 p-8 rounded-2xl text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Live Status & Checklist</h2>
        <p className="opacity-90">Your application is configured for deployment to GitHub Pages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-link text-blue-500"></i>
            Production URL
          </h3>
          <p className="text-sm text-gray-600 mb-4">Your app will be live at:</p>
          <a 
            href="https://Mystrings.github.io/pulse-oncall/" 
            target="_blank" 
            className="block p-3 bg-gray-50 rounded-lg border border-gray-100 text-blue-600 font-mono text-xs truncate hover:bg-gray-100 transition-colors"
          >
            https://Mystrings.github.io/pulse-oncall/
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-orange-500"></i>
            API Security
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            The Gemini API key you provided is being injected via GitHub Secrets. This keeps it hidden from the source code while allowing the app to function in production.
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-6">Verification Steps</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <i className="fa-solid fa-circle-check text-green-500 mt-1"></i>
            <div>
              <p className="text-sm font-bold">1. Check GitHub Actions</p>
              <p className="text-xs text-gray-500">Navigate to the "Actions" tab in your repository to ensure the "Deploy to GitHub Pages" workflow passed.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
            <i className="fa-solid fa-circle-check text-green-500 mt-1"></i>
            <div>
              <p className="text-sm font-bold">2. Test AI Analysis</p>
              <p className="text-xs text-gray-500">Open an incident and click "Generate RCA" to verify the Gemini API connection is active.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentGuide;
