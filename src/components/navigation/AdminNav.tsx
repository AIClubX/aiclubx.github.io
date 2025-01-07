import React, { useState } from 'react';
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
  FileText,
  Home
} from 'lucide-react';

interface NavItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  subItems?: Array<{
    name: string;
    href: string;
  }>;
  divider?: boolean;
}

const navigation: NavItem[] = [
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
  },
  // Add divider before Home link
  { divider: true } as NavItem,
  {
    name: 'Back to Home',
    href: '/',
    icon: Home
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

  const renderNavItem = (item: NavItem) => {
    if (item.divider) {
      return <hr key="divider" className="my-4 border-gray-200" />;
    }

    const Icon = item.icon;
    const isExpanded = expandedItems.includes(item.name);

    if (item.subItems) {
      return (
        <div key={item.name}>
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
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.href!}
        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      >
        <Icon className="mr-3 h-6 w-6" />
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="space-y-1 px-2">
      {navigation.map(renderNavItem)}
    </nav>
  );
}