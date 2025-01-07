import React, { useState } from 'react';
import { Save, Shield } from 'lucide-react';

interface SecuritySettingsForm {
  passwordRequirements: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  sessionTimeout: number;
  maxLoginAttempts: number;
  twoFactorAuth: boolean;
}

export default function SecuritySettings() {
  const [formData, setFormData] = useState<SecuritySettingsForm>({
    passwordRequirements: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    twoFactorAuth: false
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
    
    if (name.startsWith('password.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        passwordRequirements: {
          ...prev.passwordRequirements,
          [field]: type === 'checkbox' ? checked : parseInt(value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : parseInt(value)
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Password Requirements</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Minimum Length
          </label>
          <input
            type="number"
            name="password.minLength"
            value={formData.passwordRequirements.minLength}
            onChange={handleChange}
            min={6}
            className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="requireUppercase"
              name="password.requireUppercase"
              checked={formData.passwordRequirements.requireUppercase}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="requireUppercase" className="ml-2 block text-sm text-gray-900">
              Require uppercase letters
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="requireNumbers"
              name="password.requireNumbers"
              checked={formData.passwordRequirements.requireNumbers}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="requireNumbers" className="ml-2 block text-sm text-gray-900">
              Require numbers
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="requireSpecialChars"
              name="password.requireSpecialChars"
              checked={formData.passwordRequirements.requireSpecialChars}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-gray-900">
              Require special characters
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          name="sessionTimeout"
          value={formData.sessionTimeout}
          onChange={handleChange}
          min={5}
          className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Login Attempts
        </label>
        <input
          type="number"
          name="maxLoginAttempts"
          value={formData.maxLoginAttempts}
          onChange={handleChange}
          min={3}
          className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="twoFactorAuth"
          name="twoFactorAuth"
          checked={formData.twoFactorAuth}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-900">
          Enable Two-Factor Authentication
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
            isSaving ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <Shield className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Security Settings'}
        </button>
      </div>
    </form>
  );
}