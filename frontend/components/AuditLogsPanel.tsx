import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  Settings, 
  Database, 
  FileText, 
  Trash2,
  Edit,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure' | 'warning';
  category: string;
}

export default function AuditLogsPanel() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock audit log data
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      userId: '1',
      userName: 'John Doe',
      userRole: 'admin',
      action: 'User Login',
      resource: 'Authentication',
      details: 'Successful login from Chrome browser',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      category: 'Authentication'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      userId: '1',
      userName: 'John Doe',
      userRole: 'admin',
      action: 'User Created',
      resource: 'User Management',
      resourceId: 'user_456',
      details: 'Created new user account for jane@example.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      category: 'User Management'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      userId: '2',
      userName: 'Jane Smith',
      userRole: 'manager',
      action: 'Report Generated',
      resource: 'Reports',
      resourceId: 'report_789',
      details: 'Generated sales report for Q4 2023',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      category: 'Reports'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      userId: '3',
      userName: 'Bob Johnson',
      userRole: 'viewer',
      action: 'Failed Login Attempt',
      resource: 'Authentication',
      details: 'Failed login attempt - invalid password',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)',
      status: 'failure',
      category: 'Authentication'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      userId: '1',
      userName: 'John Doe',
      userRole: 'admin',
      action: 'Settings Updated',
      resource: 'System Settings',
      details: 'Updated notification preferences',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      category: 'Settings'
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      userId: '2',
      userName: 'Jane Smith',
      userRole: 'manager',
      action: 'Data Export',
      resource: 'Data Management',
      resourceId: 'export_123',
      details: 'Exported dashboard data as CSV',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      category: 'Data Management'
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      userId: '1',
      userName: 'John Doe',
      userRole: 'admin',
      action: 'Integration Connected',
      resource: 'Integrations',
      resourceId: 'stripe',
      details: 'Connected Stripe payment integration',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      category: 'Integrations'
    },
    {
      id: '8',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      userId: '4',
      userName: 'Alice Brown',
      userRole: 'manager',
      action: 'Permission Denied',
      resource: 'User Management',
      details: 'Attempted to access admin-only user management',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'warning',
      category: 'Security'
    }
  ];

  const categories = ['all', 'Authentication', 'User Management', 'Reports', 'Settings', 'Data Management', 'Integrations', 'Security'];
  const statuses = ['all', 'success', 'failure', 'warning'];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failure':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Success</Badge>;
      case 'failure':
        return <Badge variant="destructive">Failure</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Login')) return <User className="h-4 w-4" />;
    if (action.includes('Created') || action.includes('Updated')) return <Edit className="h-4 w-4" />;
    if (action.includes('Deleted')) return <Trash2 className="h-4 w-4" />;
    if (action.includes('Export')) return <Download className="h-4 w-4" />;
    if (action.includes('Report')) return <FileText className="h-4 w-4" />;
    if (action.includes('Settings')) return <Settings className="h-4 w-4" />;
    if (action.includes('Permission')) return <Lock className="h-4 w-4" />;
    return <Eye className="h-4 w-4" />;
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'manager':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Audit logs are being exported to CSV format.",
    });
  };

  const stats = {
    total: auditLogs.length,
    success: auditLogs.filter(log => log.status === 'success').length,
    failures: auditLogs.filter(log => log.status === 'failure').length,
    warnings: auditLogs.filter(log => log.status === 'warning').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Audit Logs
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track user activity and system changes for security and compliance.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.success}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Successful</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.failures}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Failures</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.warnings}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="security">Security Events</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Report</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-32">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Events ({filteredLogs.length})</CardTitle>
              <CardDescription>
                Detailed log of all user actions and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">
                                {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                              </p>
                              <p className="text-xs text-gray-500">
                                {log.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{log.userName}</p>
                              <Badge variant={getRoleBadgeVariant(log.userRole)} className="text-xs">
                                {log.userRole}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getActionIcon(log.action)}
                            <div>
                              <p className="text-sm font-medium">{log.action}</p>
                              <p className="text-xs text-gray-500">{log.details}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{log.resource}</p>
                            {log.resourceId && (
                              <p className="text-xs text-gray-500">ID: {log.resourceId}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(log.status)}
                            {getStatusBadge(log.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm font-mono">{log.ipAddress}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>
                Failed login attempts and security-related activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.filter(log => log.category === 'Authentication' || log.category === 'Security').map((log) => (
                  <div key={log.id} className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      log.status === 'failure' ? 'bg-red-100 dark:bg-red-900' : 
                      log.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' : 
                      'bg-green-100 dark:bg-green-900'
                    }`}>
                      {getStatusIcon(log.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {log.action}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {log.details}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>User: {log.userName}</span>
                        <span>IP: {log.ipAddress}</span>
                        <span>Status: {log.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Report</CardTitle>
              <CardDescription>
                Summary of audit activities for compliance requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">Data Access</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Data exports</span>
                      <span className="text-sm font-medium">3 this month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Report generations</span>
                      <span className="text-sm font-medium">12 this month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Data modifications</span>
                      <span className="text-sm font-medium">8 this month</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">User Activity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Failed logins</span>
                      <span className="text-sm font-medium">2 this week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Permission changes</span>
                      <span className="text-sm font-medium">1 this month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Settings updates</span>
                      <span className="text-sm font-medium">5 this month</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
