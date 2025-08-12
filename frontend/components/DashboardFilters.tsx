import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import backend from '~backend/client';

interface DashboardFiltersProps {
  filters: {
    dateRange?: string;
    region?: string;
    category?: string;
  };
  onFiltersChange: (filters: {
    dateRange?: string;
    region?: string;
    category?: string;
  }) => void;
}

export default function DashboardFilters({ filters, onFiltersChange }: DashboardFiltersProps) {
  const { toast } = useToast();

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      const result = await backend.analytics.exportData({ format, filters });
      toast({
        title: "Export Started",
        description: `Your ${format.toUpperCase()} export is being prepared. Download will start shortly.`,
      });
      
      // In a real app, this would trigger an actual download
      console.log('Download URL:', result.downloadUrl);
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={filters.dateRange || ''} onValueChange={(value) => handleFilterChange('dateRange', value)}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.region || ''} onValueChange={(value) => handleFilterChange('region', value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North</SelectItem>
                <SelectItem value="south">South</SelectItem>
                <SelectItem value="east">East</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.category || ''} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="subscriptions">Subscriptions</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="advertising">Advertising</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('csv')}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>CSV</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('pdf')}
            className="flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
