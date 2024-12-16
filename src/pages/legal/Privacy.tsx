import React from 'react';
import LegalSection from '../../components/legal/LegalSection';
import LegalList from '../../components/legal/LegalList';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

        <LegalSection title="1. Information We Collect">
          <p className="text-gray-600">
            We collect various types of information to provide and improve our services to you:
          </p>
          <h3 className="text-xl font-medium mt-4">Personal Information</h3>
          <LegalList items={[
            'Name and contact information',
            'Academic credentials and affiliations',
            'Professional background',
            'Account login details',
            'Communication preferences'
          ]} />

          <h3 className="text-xl font-medium mt-4">Usage Information</h3>
          <LegalList items={[
            'Device and browser information',
            'IP address and location data',
            'Usage patterns and preferences',
            'Interaction with our services'
          ]} />
        </LegalSection>

        <LegalSection title="2. How We Use Your Information">
          <p className="text-gray-600">
            We use your information for the following purposes:
          </p>
          <LegalList items={[
            'Providing and improving our services',
            'Communicating about events and opportunities',
            'Personalizing your experience',
            'Ensuring security and preventing fraud',
            'Analytics and service optimization'
          ]} />
        </LegalSection>

        <LegalSection title="3. Information Sharing">
          <p className="text-gray-600">
            We may share your information with:
          </p>
          <LegalList items={[
            'Chapter leaders and administrators',
            'Event organizers (with your consent)',
            'Service providers and partners',
            'Legal authorities when required by law'
          ]} />
        </LegalSection>

        <LegalSection title="4. Your Rights">
          <p className="text-gray-600">
            You have the following rights regarding your personal information:
          </p>
          <LegalList items={[
            'Access your personal information',
            'Request corrections to your data',
            'Delete your account and associated data',
            'Opt-out of marketing communications',
            'Export your data in a portable format'
          ]} />
        </LegalSection>

        <LegalSection title="5. Contact Us">
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:privacy@aiclubx.org" className="text-indigo-600 hover:text-indigo-800">
              privacy@aiclubx.org
            </a>
          </p>
        </LegalSection>
      </div>
    </div>
  );
}