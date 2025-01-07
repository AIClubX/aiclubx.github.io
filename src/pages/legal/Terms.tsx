import React from 'react';
import LegalSection from '../../components/legal/LegalSection';
import LegalList from '../../components/legal/LegalList';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

        <LegalSection title="1. Acceptance of Terms">
          <p className="text-gray-600">
            By accessing or using AI Club X's services, you agree to be bound by these Terms of Service
            and our Privacy Policy. If you disagree with any part of these terms, you may not access
            our services.
          </p>
        </LegalSection>

        <LegalSection title="2. Membership Eligibility">
          <p className="text-gray-600">
            To be eligible for membership, you must meet the following criteria:
          </p>
          <LegalList items={[
            'Be at least 18 years old or have parental consent',
            'Provide accurate registration information',
            'Maintain the security of your account',
            'Agree to our Code of Conduct',
            'Meet role-specific requirements if applicable'
          ]} />
        </LegalSection>

        <LegalSection title="3. User Conduct">
          <p className="text-gray-600">
            Members must adhere to the following guidelines:
          </p>
          <LegalList items={[
            'Respect intellectual property rights',
            'Maintain professional conduct in all interactions',
            'Not engage in harassment or discrimination',
            'Not share confidential information',
            'Follow event and chapter guidelines'
          ]} />
        </LegalSection>

        <LegalSection title="4. Content and Intellectual Property">
          <p className="text-gray-600">
            When using our services:
          </p>
          <LegalList items={[
            'You retain ownership of your content',
            'You grant us license to use your content for service operation',
            'You must respect others\' intellectual property rights',
            'We may remove content that violates these terms'
          ]} />
        </LegalSection>

        <LegalSection title="5. Termination">
          <p className="text-gray-600">
            We reserve the right to terminate accounts that:
          </p>
          <LegalList items={[
            'Violate these terms of service',
            'Engage in fraudulent activity',
            'Misuse club resources',
            'Harm the club\'s reputation'
          ]} />
        </LegalSection>

        <LegalSection title="6. Contact">
          <p className="text-gray-600">
            For questions about these Terms of Service, please contact us at:{' '}
            <a href="mailto:legal@aiclubx.org" className="text-indigo-600 hover:text-indigo-800">
              legal@aiclubx.org
            </a>
          </p>
        </LegalSection>
      </div>
    </div>
  );
}