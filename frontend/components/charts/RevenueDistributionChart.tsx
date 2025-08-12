import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import { Download, Camera } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { RevenueDistribution } from '~backend/analytics/dashboard';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RevenueDistributionChartProps {
  data: RevenueDistribution[];
}

export default function RevenueDistributionChart({ data }: RevenueDistributionChartProps) {
  const { toast } = useToast();

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.amount),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 2,
        hoverBorderWidth: 3,
        cutout: '60%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#6B7280',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(107, 114, 128, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toLocaleString()} (${percentage}%)`;
          }
        }
      },
    },
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.amount, 0);

  const handleExportChart = (format: 'png' | 'jpg') => {
    // In a real app, this would capture the chart canvas and download it
    toast({
      title: "Chart Exported",
      description: `Chart exported as ${format.toUpperCase()}`,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Revenue Distribution
        </h3>
        <div className="flex items-center space-x-2">
          <div className="text-right mr-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExportChart('png')}
            className="flex items-center space-x-1"
          >
            <Camera className="h-4 w-4" />
            <span>PNG</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExportChart('jpg')}
            className="flex items-center space-x-1"
          >
            <Download className="h-4 w-4" />
            <span>JPG</span>
          </Button>
        </div>
      </div>
      <div className="h-80 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Doughnut data={chartData} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
