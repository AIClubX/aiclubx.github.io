import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import NewsletterSignup from './NewsletterSignup';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Club X</span>
            </div>
            <p className="mt-4 text-gray-600">
              Connecting students, educators, and industry professionals to create a vibrant
              community of AI enthusiasts.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <Link to="/contact" className="text-gray-400 hover:text-gray-500">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/chapters" className="text-gray-600 hover:text-indigo-600">
                  Chapters
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-indigo-600">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-indigo-600">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Join Us with Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Join Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/join" className="text-gray-600 hover:text-indigo-600">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-600 hover:text-indigo-600">
                  Start a Chapter
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-600 hover:text-indigo-600">
                  Partner with Us
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gray-600 hover:text-indigo-600">
                  Sponsor
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-base text-gray-400">
              © {currentYear} AI Club X. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}