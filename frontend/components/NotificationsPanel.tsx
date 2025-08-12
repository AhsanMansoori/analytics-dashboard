import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Check, CheckCheck, Trash2, Settings as SettingsIcon } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPanel() {
  const { notifications, markAsRead, unreadCount } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'read':
        return notification.read;
      default:
        return true;
    }
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20';
      case 'error':
        return 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        markAsRead(notification.id);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Notifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with your latest alerts and system notifications.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Bell className="h-3 w-3" />
            <span>{unreadCount} unread</span>
          </Badge>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="read">Read ({notifications.length - unreadCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>
                  {filter === 'all' && 'All Notifications'}
                  {filter === 'unread' && 'Unread Notifications'}
                  {filter === 'read' && 'Read Notifications'}
                </span>
              </CardTitle>
              <CardDescription>
                {filter === 'all' && 'View all your notifications'}
                {filter === 'unread' && 'Notifications that need your attention'}
                {filter === 'read' && 'Previously viewed notifications'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No notifications
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {filter === 'unread' && "You're all caught up! No unread notifications."}
                      {filter === 'read' && "No read notifications to display."}
                      {filter === 'all' && "No notifications to display."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                          notification.read
                            ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                            : getNotificationColor(notification.type)
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <Badge variant="destructive" className="text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                              </p>
                              <div className="flex items-center space-x-2">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs"
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    Mark read
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>
            Customize how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Email Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Sales alerts</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-700 dark:text-gray-300">User registrations</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">System updates</span>
                </label>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Push Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Real-time alerts</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Weekly summaries</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Marketing updates</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
