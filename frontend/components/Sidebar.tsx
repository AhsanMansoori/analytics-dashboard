import React, { useState, useMemo } from 'react';
import { 
  X, 
  BarChart3, 
  FileText, 
  Settings, 
  Home, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Bell,
  Users,
  Plus,
  ExternalLink,
  Moon,
  Sun,
  LogOut,
  User as UserIcon,
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
  badge?: {
    count: number;
    variant: 'default' | 'destructive' | 'secondary' | 'outline';
  };
  external?: boolean;
  href?: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  roles: string[];
}

export default function Sidebar({ isOpen, onClose, activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Dynamic menu items configuration
  const menuItems: MenuItem[] = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      roles: ['admin', 'manager', 'viewer'] 
    },
    { 
      id: 'analytics-explorer', 
      label: 'Analytics Explorer', 
      icon: TrendingUp, 
      roles: ['admin', 'manager'],
      badge: { count: 1, variant: 'secondary' }
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FileText, 
      roles: ['admin', 'manager'],
      badge: { count: 2, variant: 'secondary' }
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell, 
      roles: ['admin', 'manager', 'viewer'],
      badge: unreadCount > 0 ? { count: unreadCount, variant: 'destructive' } : undefined
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: Users, 
      roles: ['admin'] 
    },
    { 
      id: 'integrations', 
      label: 'Integrations', 
      icon: Zap, 
      roles: ['admin', 'manager'] 
    },
    { 
      id: 'audit-logs', 
      label: 'Audit Logs', 
      icon: Shield, 
      roles: ['admin'] 
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: UserIcon, 
      roles: ['admin', 'manager', 'viewer'] 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      roles: ['admin', 'manager', 'viewer'] 
    },
  ];

  // External links
  const externalLinks: MenuItem[] = [
    {
      id: 'docs',
      label: 'Documentation',
      icon: ExternalLink,
      roles: ['admin', 'manager', 'viewer'],
      external: true,
      href: 'https://docs.example.com'
    },
    {
      id: 'support',
      label: 'Support',
      icon: ExternalLink,
      roles: ['admin', 'manager', 'viewer'],
      external: true,
      href: 'https://support.example.com'
    }
  ];

  // Quick actions
  const quickActions: QuickAction[] = [
    {
      id: 'new-report',
      label: 'New Report',
      icon: Plus,
      action: () => {
        onTabChange('reports');
        onClose();
      },
      roles: ['admin', 'manager']
    },
    {
      id: 'add-user',
      label: 'Add User',
      icon: UserIcon,
      action: () => {
        onTabChange('users');
        onClose();
      },
      roles: ['admin']
    }
  ];

  // Filter menu items based on user role and search query
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const hasRole = item.roles.includes(user?.role || 'viewer');
      const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
      return hasRole && matchesSearch;
    });
  }, [user?.role, searchQuery]);

  const filteredQuickActions = useMemo(() => {
    return quickActions.filter(action => 
      action.roles.includes(user?.role || 'viewer')
    );
  }, [user?.role]);

  const filteredExternalLinks = useMemo(() => {
    return externalLinks.filter(link => 
      link.roles.includes(user?.role || 'viewer')
    );
  }, [user?.role]);

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.external && item.href) {
      window.open(item.href, '_blank');
    } else {
      onTabChange(item.id);
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const SidebarContent = () => (
    <>
      {/* Header */}
      <div className={`flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700 ${isCollapsed ? 'px-4' : ''}`}>
        <div className={`flex items-center space-x-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <BarChart3 className="h-8 w-8 text-blue-600 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Analytics
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Collapsed expand button */}
      {isCollapsed && (
        <div className="flex justify-center p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(false)}
            className="w-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`flex-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <TooltipProvider>
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              const menuButton = (
                <button
                  onClick={() => handleMenuItemClick(item)}
                  className={`
                    w-full flex items-center ${isCollapsed ? 'justify-center px-3 py-3' : 'px-4 py-3'} text-left rounded-lg transition-all duration-200 group
                    ${isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge variant={item.badge.variant} className="ml-2">
                          {item.badge.count}
                        </Badge>
                      )}
                      {item.external && (
                        <ExternalLink className="h-3 w-3 ml-2 opacity-50" />
                      )}
                    </>
                  )}
                </button>
              );

              return (
                <li key={item.id}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {menuButton}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="flex items-center space-x-2">
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge variant={item.badge.variant} className="ml-2">
                            {item.badge.count}
                          </Badge>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    menuButton
                  )}
                </li>
              );
            })}
          </ul>
        </TooltipProvider>

        {/* Quick Actions */}
        {!isCollapsed && filteredQuickActions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {filteredQuickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="w-full justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* External Links */}
        {!isCollapsed && filteredExternalLinks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Resources
            </h3>
            <div className="space-y-1">
              {filteredExternalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleMenuItemClick(link)}
                    className="w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{link.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className={`border-t border-gray-200 dark:border-gray-700 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {/* Theme Toggle */}
        <div className={`flex ${isCollapsed ? 'justify-center mb-4' : 'justify-between items-center mb-4'}`}>
          {!isCollapsed && (
            <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className={isCollapsed ? 'w-full' : ''}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {!isCollapsed && <span className="ml-2">{isDark ? 'Light' : 'Dark'}</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  Toggle {isDark ? 'Light' : 'Dark'} Mode
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        <Separator className="mb-4" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'p-3'} rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
              alt="Profile"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            {!isCollapsed && (
              <div className="ml-3 flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role}
                </p>
              </div>
            )}
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && !isCollapsed && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
              <button
                onClick={() => {
                  onTabChange('profile');
                  setShowUserMenu(false);
                  onClose();
                }}
                className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <UserIcon className="h-4 w-4 mr-3" />
                <span className="text-sm">Profile</span>
              </button>
              <button
                onClick={() => {
                  onTabChange('settings');
                  setShowUserMenu(false);
                  onClose();
                }}
                className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Settings className="h-4 w-4 mr-3" />
                <span className="text-sm">Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
              >
                <LogOut className="h-4 w-4 mr-3" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>

        {/* Version Info */}
        {!isCollapsed && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              Analytics Dashboard v2.1.0
            </p>
            <p className="text-xs text-gray-400">
              © 2024 Analytics Inc.
            </p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        <SidebarContent />
      </div>
    </>
  );
}
