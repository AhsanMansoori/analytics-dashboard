import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Zap, 
  Settings, 
  Plus, 
  Check, 
  X, 
  ExternalLink,
  CreditCard,
  Mail,
  MessageSquare,
  Database,
  Cloud,
  BarChart3,
  Users,
  ShoppingCart
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  isConnected: boolean;
  isEnabled: boolean;
  lastSync?: Date;
  config?: any;
}

export default function IntegrationsPanel() {
  const { toast } = useToast();
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);

  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing and financial data',
      category: 'Payments',
      icon: CreditCard,
      isConnected: true,
      isEnabled: true,
      lastSync: new Date(Date.now() - 5 * 60 * 1000),
      config: { apiKey: 'sk_test_***', webhookUrl: 'https://api.example.com/webhooks/stripe' }
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing and audience data',
      category: 'Marketing',
      icon: Mail,
      isConnected: true,
      isEnabled: false,
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
      config: { apiKey: 'abc123***', listId: 'list_123' }
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team communication and notifications',
      category: 'Communication',
      icon: MessageSquare,
      isConnected: false,
      isEnabled: false
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM and sales data integration',
      category: 'CRM',
      icon: Users,
      isConnected: false,
      isEnabled: false
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Website traffic and user behavior',
      category: 'Analytics',
      icon: BarChart3,
      isConnected: true,
      isEnabled: true,
      lastSync: new Date(Date.now() - 15 * 60 * 1000),
      config: { propertyId: 'GA_MEASUREMENT_ID', viewId: '123456789' }
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'E-commerce store data and orders',
      category: 'E-commerce',
      icon: ShoppingCart,
      isConnected: false,
      isEnabled: false
    },
    {
      id: 'aws-s3',
      name: 'AWS S3',
      description: 'Cloud storage for data backups',
      category: 'Storage',
      icon: Cloud,
      isConnected: true,
      isEnabled: true,
      lastSync: new Date(Date.now() - 60 * 60 * 1000),
      config: { bucketName: 'analytics-backup', region: 'us-east-1' }
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      description: 'External database connection',
      category: 'Database',
      icon: Database,
      isConnected: false,
      isEnabled: false
    }
  ]);

  const categories = ['All', 'Payments', 'Marketing', 'Communication', 'CRM', 'Analytics', 'E-commerce', 'Storage', 'Database'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIntegrations = integrations.filter(integration => 
    selectedCategory === 'All' || integration.category === selectedCategory
  );

  const connectedIntegrations = integrations.filter(i => i.isConnected);
  const enabledIntegrations = integrations.filter(i => i.isEnabled);

  const handleConnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, isConnected: true, lastSync: new Date() }
        : integration
    ));
    toast({
      title: "Integration Connected",
      description: "Successfully connected to the service.",
    });
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, isConnected: false, isEnabled: false, lastSync: undefined }
        : integration
    ));
    toast({
      title: "Integration Disconnected",
      description: "Successfully disconnected from the service.",
    });
  };

  const handleToggleEnabled = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, isEnabled: !integration.isEnabled }
        : integration
    ));
  };

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsConfigDialogOpen(true);
  };

  const handleSync = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, lastSync: new Date() }
        : integration
    ));
    toast({
      title: "Sync Started",
      description: "Data synchronization has been initiated.",
    });
  };

  const getStatusBadge = (integration: Integration) => {
    if (!integration.isConnected) {
      return <Badge variant="secondary">Not Connected</Badge>;
    }
    if (!integration.isEnabled) {
      return <Badge variant="outline">Connected</Badge>;
    }
    return <Badge variant="default">Active</Badge>;
  };

  const formatLastSync = (date?: Date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Integrations
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Connect and manage third-party services to enhance your analytics.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>{connectedIntegrations.length} Connected</span>
          </Badge>
          <Badge variant="default" className="flex items-center space-x-1">
            <Check className="h-3 w-3" />
            <span>{enabledIntegrations.length} Active</span>
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {integrations.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Integrations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Check className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {connectedIntegrations.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Connected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Settings className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {enabledIntegrations.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {categories.length - 1}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {integration.category}
                          </Badge>
                        </div>
                      </div>
                      {getStatusBadge(integration)}
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {integration.isConnected && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Last sync: {formatLastSync(integration.lastSync)}
                          </span>
                          <Switch
                            checked={integration.isEnabled}
                            onCheckedChange={() => handleToggleEnabled(integration.id)}
                          />
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        {integration.isConnected ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleConfigure(integration)}
                              className="flex-1"
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSync(integration.id)}
                            >
                              Sync
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDisconnect(integration.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => handleConnect(integration.id)}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedIntegrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className="h-8 w-8 text-green-600" />
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <CardDescription>
                          Last sync: {formatLastSync(integration.lastSync)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Switch
                        checked={integration.isEnabled}
                        onCheckedChange={() => handleToggleEnabled(integration.id)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfigure(integration)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.filter(i => !i.isConnected).map((integration) => {
              const Icon = integration.icon;
              return (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Icon className="h-8 w-8 text-gray-400" />
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <CardDescription>{integration.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleConnect(integration.id)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Configure global integration preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Auto-sync</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automatically sync data from connected services
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Sync Notifications</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified when sync operations complete
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Error Alerts</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive alerts when integrations fail
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>
                Recent integration activity and sync history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { service: 'Stripe', action: 'Data sync completed', time: '2 min ago', status: 'success' },
                  { service: 'Google Analytics', action: 'Data sync completed', time: '15 min ago', status: 'success' },
                  { service: 'AWS S3', action: 'Backup completed', time: '1 hour ago', status: 'success' },
                  { service: 'Mailchimp', action: 'Sync failed - API rate limit', time: '2 hours ago', status: 'error' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {log.service}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {log.action}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {log.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Update the configuration settings for this integration.
            </DialogDescription>
          </DialogHeader>
          {selectedIntegration && (
            <div className="space-y-4">
              {selectedIntegration.config && Object.entries(selectedIntegration.config).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Input
                    id={key}
                    defaultValue={value as string}
                    type={key.toLowerCase().includes('key') ? 'password' : 'text'}
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsConfigDialogOpen(false)}>
                  Save Configuration
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
