import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Camera, 
  Key, 
  Activity,
  Clock,
  Monitor,
  Smartphone,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
  device: string;
  location: string;
  ip: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Analytics enthusiast with 5+ years of experience in data visualization and business intelligence.',
    company: 'Analytics Inc.',
    position: 'Senior Data Analyst',
    website: 'https://example.com',
    timezone: 'Pacific Standard Time (PST)',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Mock activity log data
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      action: 'Login',
      description: 'Signed in to dashboard',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      device: 'Chrome on macOS',
      location: 'San Francisco, CA',
      ip: '192.168.1.100'
    },
    {
      id: '2',
      action: 'Report Generated',
      description: 'Created sales report for Q4 2023',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      device: 'Chrome on macOS',
      location: 'San Francisco, CA',
      ip: '192.168.1.100'
    },
    {
      id: '3',
      action: 'Settings Updated',
      description: 'Changed notification preferences',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      device: 'Safari on iPhone',
      location: 'San Francisco, CA',
      ip: '192.168.1.101'
    },
    {
      id: '4',
      action: 'Data Export',
      description: 'Exported dashboard data as CSV',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      device: 'Chrome on macOS',
      location: 'San Francisco, CA',
      ip: '192.168.1.100'
    },
    {
      id: '5',
      action: 'Login',
      description: 'Signed in to dashboard',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      device: 'Firefox on Windows',
      location: 'New York, NY',
      ip: '10.0.0.50'
    }
  ];

  const handleSaveProfile = () => {
    // In a real app, this would call the backend API
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call the backend API
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangePasswordOpen(false);
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes('iPhone') || device.includes('Android')) {
      return <Smartphone className="h-4 w-4" />;
    }
    return <Monitor className="h-4 w-4" />;
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Login':
        return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'Settings Updated':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'Report Generated':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900';
      case 'Data Export':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and view your activity.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Shield className="h-3 w-3" />
            <span className="capitalize">{user?.role}</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {profileData.position} at {profileData.company}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined Dec 2023</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>
                  Your work-related information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={profileData.position}
                      onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={profileData.timezone}
                    onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center space-x-2">
                      <Key className="h-4 w-4" />
                      <span>Change Password</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Enter your current password and choose a new one.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleChangePassword}>
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Security settings and account protection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Login Notifications</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified of new sign-ins</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Active Sessions</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your active sessions</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Your recent actions and login history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {activityLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className={`p-2 rounded-full ${getActionColor(log.action)}`}>
                        {log.action === 'Login' && <User className="h-4 w-4" />}
                        {log.action === 'Settings Updated' && <Shield className="h-4 w-4" />}
                        {log.action === 'Report Generated' && <Activity className="h-4 w-4" />}
                        {log.action === 'Data Export' && <Globe className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {log.action}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3" />
                            <span>{formatDistanceToNow(log.timestamp, { addSuffix: true })}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {log.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            {getDeviceIcon(log.device)}
                            <span>{log.device}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{log.location}</span>
                          </div>
                          <span>IP: {log.ip}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
