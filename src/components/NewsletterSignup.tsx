import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Implement newsletter signup API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg px-4 py-6">
      <h4 className="text-sm font-semibold text-gray-900">
        Stay Updated
      </h4>
      <p className="mt-2 text-sm text-gray-600">
        Subscribe to our newsletter for updates and AI insights.
      </p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              status === 'loading'
                ? 'bg-indigo-400'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {status === 'loading' ? (
              'Subscribing...'
            ) : (
              <>
                Subscribe
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
        {status === 'success' && (
          <p className="mt-2 text-xs text-green-600">
            Thanks for subscribing!
          </p>
        )}
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}