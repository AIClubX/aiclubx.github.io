import React, { useState } from 'react';
import { Save, Link } from 'lucide-react';

interface IntegrationSettingsForm {
  googleAnalytics: {
    enabled: boolean;
    trackingId: string;
  };
  discord: {
    enabled: boolean;
    webhookUrl: string;
    notifyEvents: boolean;
    notifyRegistrations: boolean;
  };
  github: {
    enabled: boolean;
    organizationName: string;
    repositoryName: string;
    accessToken: string;
  };
  zoom: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
}

export default function IntegrationSettings() {
  const [formData, setFormData] = useState<IntegrationSettingsForm>({
    googleAnalytics: {
      enabled: false,
      trackingId: ''
    },
    discord: {
      enabled: false,
      webhookUrl: '',
      notifyEvents: true,
      notifyRegistrations: true
    },
    github: {
      enabled: true,
      organizationName: 'AIClubX',
      repositoryName: 'aiknowledgebase',
      accessToken: ''
    },
    zoom: {
      enabled: false,
      clientId: '',
      clientSecret: '',
      redirectUri: ''
    }
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // TODO: Implement API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const [service, field] = name.split('.');
    
    setFormData(prev => ({
      ...prev,
      [service]: {
        ...prev[service as keyof IntegrationSettingsForm],
        [field]: type === 'checkbox' ? checked : value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      {/* Google Analytics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Google Analytics</h3>
          <input
            type="checkbox"
            name="googleAnalytics.enabled"
            checked={formData.googleAnalytics.enabled}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>

        {formData.googleAnalytics.enabled && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tracking ID
            </label>
            <input
              type="text"
              name="googleAnalytics.trackingId"
              value={formData.googleAnalytics.trackingId}
              onChange={handleChange}
              placeholder="UA-XXXXXXXXX-X"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Discord Integration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Discord Integration</h3>
          <input
            type="checkbox"
            name="discord.enabled"
            checked={formData.discord.enabled}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>

        {formData.discord.enabled && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Webhook URL
              </label>
              <input
                type="url"
                name="discord.webhookUrl"
                value={formData.discord.webhookUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="discord.notifyEvents"
                  checked={formData.discord.notifyEvents}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Notify on new events
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="discord.notifyRegistrations"
                  checked={formData.discord.notifyRegistrations}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Notify on event registrations
                </label>
              </div>
            </div>
          </>
        )}
      </div>

      {/* GitHub Integration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">GitHub Integration</h3>
          <input
            type="checkbox"
            name="github.enabled"
            checked={formData.github.enabled}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>

        {formData.github.enabled && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                name="github.organizationName"
                value={formData.github.organizationName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Repository Name
              </label>
              <input
                type="text"
                name="github.repositoryName"
                value={formData.github.repositoryName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Access Token
              </label>
              <input
                type="password"
                name="github.accessToken"
                value={formData.github.accessToken}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </>
        )}
      </div>

      {/* Zoom Integration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Zoom Integration</h3>
          <input
            type="checkbox"
            name="zoom.enabled"
            checked={formData.zoom.enabled}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>

        {formData.zoom.enabled && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client ID
              </label>
              <input
                type="text"
                name="zoom.clientId"
                value={formData.zoom.clientId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Secret
              </label>
              <input
                type="password"
                name="zoom.clientSecret"
                value={formData.zoom.clientSecret}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Redirect URI
              </label>
              <input
                type="url"
                name="zoom.redirectUri"
                value={formData.zoom.redirectUri}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isSaving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Link className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Integration Settings'}
        </button>
      </div>
    </form>
  );
}