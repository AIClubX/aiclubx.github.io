import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  Settings,
  Building2,
  ChevronDown,
  MessageSquare,
  Trophy,
  FileText
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/admin', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Members', 
    href: '/admin/members', 
    icon: Users 
  },
  { 
    name: 'Chapters', 
    href: '/admin/chapters', 
    icon: Building2 
  },
  { 
    name: 'Events', 
    href: '/admin/events', 
    icon: Calendar 
  },
  { 
    name: 'Resources', 
    icon: BookOpen,
    subItems: [
      { name: 'Job Opportunities', href: '/admin/resources/jobs' },
      { name: 'Open Projects', href: '/admin/resources/projects' },
      { name: 'Learning Resources', href: '/admin/resources/learning' }
    ]
  },
  {
    name: 'Wall of Fame',
    href: '/admin/contributors',
    icon: Trophy
  },
  {
    name: 'About Page',
    href: '/admin/about',
    icon: FileText
  },
  {
    name: 'Chat Settings',
    href: '/admin/chat-config',
    icon: MessageSquare
  },
  { 
    name: 'Settings', 
    href: '/admin/settings', 
    icon: Settings 
  }
];

export default function AdminNav() {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Resources']);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <nav className="space-y-1 px-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isExpanded = expandedItems.includes(item.name);

        return (
          <div key={item.name}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleExpand(item.name)}
                  className="w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="flex items-center">
                    <Icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isExpanded && (
                  <div className="pl-11 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.href!}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <Icon className="mr-3 h-6 w-6" />
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}