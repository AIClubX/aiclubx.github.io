import React, { useState } from 'react';
import { Save, TestTube } from 'lucide-react';

interface EmailSettingsForm {
  provider: 'smtp' | 'sendgrid' | 'mailgun';
  smtpSettings: {
    host: string;
    port: number;
    username: string;
    password: string;
    encryption: 'none' | 'tls' | 'ssl';
  };
  apiKey: string;
  fromEmail: string;
  fromName: string;
  templates: {
    welcome: string;
    eventRegistration: string;
    passwordReset: string;
    newsletter: string;
  };
}

export default function EmailSettings() {
  const [formData, setFormData] = useState<EmailSettingsForm>({
    provider: 'smtp',
    smtpSettings: {
      host: '',
      port: 587,
      username: '',
      password: '',
      encryption: 'tls'
    },
    apiKey: '',
    fromEmail: 'noreply@aiclubx.org',
    fromName: 'AI Club X',
    templates: {
      welcome: '',
      eventRegistration: '',
      passwordReset: '',
      newsletter: ''
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

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

  const handleTestEmail = async () => {
    setIsTesting(true);
    try {
      // TODO: Implement test email sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsTesting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('smtp.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        smtpSettings: {
          ...prev.smtpSettings,
          [field]: field === 'port' ? parseInt(value) : value
        }
      }));
    } else if (name.startsWith('template.')) {
      const template = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        templates: {
          ...prev.templates,
          [template]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email Provider
        </label>
        <select
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="smtp">SMTP</option>
          <option value="sendgrid">SendGrid</option>
          <option value="mailgun">Mailgun</option>
        </select>
      </div>

      {formData.provider === 'smtp' && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">SMTP Settings</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SMTP Host
              </label>
              <input
                type="text"
                name="smtp.host"
                value={formData.smtpSettings.host}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                SMTP Port
              </label>
              <input
                type="number"
                name="smtp.port"
                value={formData.smtpSettings.port}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="smtp.username"
                value={formData.smtpSettings.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="smtp.password"
                value={formData.smtpSettings.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Encryption
            </label>
            <select
              name="smtp.encryption"
              value={formData.smtpSettings.encryption}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="none">None</option>
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
            </select>
          </div>
        </div>
      )}

      {formData.provider !== 'smtp' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <input
            type="password"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From Email
          </label>
          <input
            type="email"
            name="fromEmail"
            value={formData.fromEmail}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            From Name
          </label>
          <input
            type="text"
            name="fromName"
            value={formData.fromName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Welcome Email
          </label>
          <textarea
            name="template.welcome"
            value={formData.templates.welcome}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event Registration
          </label>
          <textarea
            name="template.eventRegistration"
            value={formData.templates.eventRegistration}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password Reset
          </label>
          <textarea
            name="template.passwordReset"
            value={formData.templates.passwordReset}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Newsletter
          </label>
          <textarea
            name="template.newsletter"
            value={formData.templates.newsletter}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleTestEmail}
          disabled={isTesting}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
            isTesting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <TestTube className="h-4 w-4 mr-2" />
          {isTesting ? 'Sending...' : 'Send Test Email'}
        </button>

        <button
          type="submit"
          disabled={isSaving}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isSaving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Email Settings'}
        </button>
      </div>
    </form>
  );
}