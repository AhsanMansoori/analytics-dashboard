import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import { Download, Camera } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { UserRegistrationData } from '~backend/analytics/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UserRegistrationsChartProps {
  data: UserRegistrationData[];
}

export default function UserRegistrationsChart({ data }: UserRegistrationsChartProps) {
  const { toast } = useToast();

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'User Registrations',
        data: data.map(item => item.registrations),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(16, 185, 129, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Registrations: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6B7280',
        },
        beginAtZero: true,
      },
    },
  };

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
          User Registrations
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 mr-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
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
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
