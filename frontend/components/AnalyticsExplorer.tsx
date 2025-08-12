import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DragDropContext, 
  Droppable, 
  Draggable,
  DropResult
} from '@hello-pangea/dnd';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign,
  Plus,
  X,
  Settings,
  Download,
  Save,
  Eye
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Widget {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'metric';
  title: string;
  dataSource: string;
  config: any;
}

interface AvailableWidget {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'metric';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

export default function AnalyticsExplorer() {
  const { toast } = useToast();
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'widget-1',
      type: 'line',
      title: 'Sales Trend',
      dataSource: 'sales',
      config: { timeRange: '30d' }
    },
    {
      id: 'widget-2',
      type: 'bar',
      title: 'User Registrations',
      dataSource: 'users',
      config: { groupBy: 'day' }
    }
  ]);

  const [selectedDataSource, setSelectedDataSource] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  const availableWidgets: AvailableWidget[] = [
    {
      id: 'line-chart',
      type: 'line',
      title: 'Line Chart',
      description: 'Show trends over time',
      icon: LineChart,
      category: 'Charts'
    },
    {
      id: 'bar-chart',
      type: 'bar',
      title: 'Bar Chart',
      description: 'Compare categories',
      icon: BarChart3,
      category: 'Charts'
    },
    {
      id: 'pie-chart',
      type: 'pie',
      title: 'Pie Chart',
      description: 'Show proportions',
      icon: PieChart,
      category: 'Charts'
    },
    {
      id: 'metric-card',
      type: 'metric',
      title: 'Metric Card',
      description: 'Display key numbers',
      icon: TrendingUp,
      category: 'Metrics'
    }
  ];

  const dataSources = [
    { id: 'sales', name: 'Sales Data', fields: ['amount', 'date', 'product', 'region'] },
    { id: 'users', name: 'User Data', fields: ['registrations', 'date', 'source', 'country'] },
    { id: 'revenue', name: 'Revenue Data', fields: ['revenue', 'date', 'category', 'channel'] },
    { id: 'traffic', name: 'Website Traffic', fields: ['visits', 'date', 'page', 'source'] }
  ];

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'available-widgets' && destination.droppableId === 'dashboard') {
      // Add new widget to dashboard
      const widgetType = availableWidgets.find(w => w.id === result.draggableId);
      if (widgetType) {
        const newWidget: Widget = {
          id: `widget-${Date.now()}`,
          type: widgetType.type,
          title: widgetType.title,
          dataSource: selectedDataSource || 'sales',
          config: { timeRange: selectedTimeRange }
        };
        setWidgets([...widgets, newWidget]);
        toast({
          title: "Widget Added",
          description: `${widgetType.title} has been added to your dashboard.`,
        });
      }
    } else if (source.droppableId === 'dashboard' && destination.droppableId === 'dashboard') {
      // Reorder widgets in dashboard
      const newWidgets = Array.from(widgets);
      const [reorderedWidget] = newWidgets.splice(source.index, 1);
      newWidgets.splice(destination.index, 0, reorderedWidget);
      setWidgets(newWidgets);
    }
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
    toast({
      title: "Widget Removed",
      description: "Widget has been removed from your dashboard.",
    });
  };

  const saveDashboard = () => {
    toast({
      title: "Dashboard Saved",
      description: "Your custom dashboard has been saved successfully.",
    });
  };

  const exportDashboard = () => {
    toast({
      title: "Dashboard Exported",
      description: "Your dashboard configuration has been exported.",
    });
  };

  const renderWidget = (widget: Widget, index: number) => {
    const getWidgetIcon = (type: string) => {
      switch (type) {
        case 'line': return <LineChart className="h-5 w-5" />;
        case 'bar': return <BarChart3 className="h-5 w-5" />;
        case 'pie': return <PieChart className="h-5 w-5" />;
        case 'metric': return <TrendingUp className="h-5 w-5" />;
        default: return <BarChart3 className="h-5 w-5" />;
      }
    };

    return (
      <Draggable key={widget.id} draggableId={widget.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 transition-all ${
              snapshot.isDragging ? 'shadow-lg rotate-2' : 'hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getWidgetIcon(widget.type)}
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {widget.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeWidget(widget.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)} Chart Preview
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Data: {widget.dataSource}</span>
              <span>Range: {widget.config.timeRange}</span>
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Explorer
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Build custom dashboards with drag-and-drop widgets.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={exportDashboard}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={saveDashboard}>
            <Save className="h-4 w-4 mr-2" />
            Save Dashboard
          </Button>
        </div>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">Dashboard Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Widget Library */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Widget Library</CardTitle>
                    <CardDescription>
                      Drag widgets to your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Configuration */}
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Data Source
                        </label>
                        <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select data source" />
                          </SelectTrigger>
                          <SelectContent>
                            {dataSources.map((source) => (
                              <SelectItem key={source.id} value={source.id}>
                                {source.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Time Range
                        </label>
                        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="90d">Last 90 days</SelectItem>
                            <SelectItem value="1y">Last year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Droppable droppableId="available-widgets" isDropDisabled>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-3"
                        >
                          {availableWidgets.map((widget, index) => {
                            const Icon = widget.icon;
                            return (
                              <Draggable
                                key={widget.id}
                                draggableId={widget.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-grab transition-all ${
                                      snapshot.isDragging 
                                        ? 'shadow-lg bg-blue-50 dark:bg-blue-900/20' 
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                      <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                          {widget.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                          {widget.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </div>

              {/* Dashboard Canvas */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dashboard Canvas</CardTitle>
                    <CardDescription>
                      Drop widgets here to build your dashboard
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Droppable droppableId="dashboard">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-96 p-4 border-2 border-dashed rounded-lg transition-colors ${
                            snapshot.isDraggingOver
                              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {widgets.length === 0 ? (
                            <div className="flex items-center justify-center h-64">
                              <div className="text-center">
                                <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                  Start Building Your Dashboard
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                  Drag widgets from the library to create your custom analytics dashboard
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {widgets.map((widget, index) => renderWidget(widget, index))}
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DragDropContext>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Dashboard Preview</span>
              </CardTitle>
              <CardDescription>
                Preview how your dashboard will look to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {widgets.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Widgets Added
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Add some widgets in the builder to see the preview
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {widgets.map((widget) => (
                    <div key={widget.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        {widget.type === 'line' && <LineChart className="h-5 w-5 text-blue-600" />}
                        {widget.type === 'bar' && <BarChart3 className="h-5 w-5 text-green-600" />}
                        {widget.type === 'pie' && <PieChart className="h-5 w-5 text-purple-600" />}
                        {widget.type === 'metric' && <TrendingUp className="h-5 w-5 text-orange-600" />}
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {widget.title}
                        </h3>
                      </div>
                      <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          Live {widget.type} chart
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
