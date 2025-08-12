# Analytics Dashboard

A modern, responsive analytics dashboard built with React, TypeScript, Chart.js, and Tailwind CSS. Features real-time data visualization, dark mode support, and a clean, professional interface.

## Features

- **Modern UI/UX**: Clean design with smooth transitions and hover effects
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Interactive Charts**: 
  - Line chart for sales over time
  - Bar chart for user registrations
  - Doughnut chart for revenue distribution
- **Real-time Stats**: Key performance indicators with trend indicators
- **Navigation**: Sidebar navigation with dashboard, reports, and settings
- **Type Safety**: Full TypeScript support for better development experience

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Backend**: Encore.ts (TypeScript backend framework)
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Tailwind CSS v4
- **State Management**: React Query for server state
- **Icons**: Lucide React
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the provided local URL

## Project Structure

```
├── backend/
│   └── analytics/
│       ├── encore.service.ts    # Service definition
│       └── dashboard.ts         # API endpoints with mock data
├── frontend/
│   ├── components/
│   │   ├── charts/             # Chart components
│   │   ├── Dashboard.tsx       # Main dashboard component
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── TopNavbar.tsx       # Top navigation bar
│   │   └── StatsCards.tsx      # Statistics cards
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Dark mode context
│   └── App.tsx                 # Main app component
└── README.md
```

## Features in Detail

### Dashboard Overview
- Key metrics displayed in cards with trend indicators
- Sales performance over time with interactive line chart
- User registration trends with bar chart
- Revenue distribution by category with doughnut chart
- Recent activity feed

### Charts
- **Sales Chart**: Monthly sales data with smooth line visualization
- **User Registrations**: Weekly registration data with bar chart
- **Revenue Distribution**: Category-wise revenue breakdown with doughnut chart

### Navigation
- Collapsible sidebar for mobile devices
- Active state indicators
- Smooth transitions and animations

### Theme Support
- Light and dark mode toggle
- Persistent theme preference
- System preference detection

## Customization

### Adding New Charts
1. Create a new chart component in `frontend/components/charts/`
2. Add the data type to the backend API response
3. Include the chart in the dashboard layout

### Modifying Data
- Update the mock data in `backend/analytics/dashboard.ts`
- The API automatically provides type-safe data to the frontend

### Styling
- Customize colors and spacing using Tailwind CSS classes
- Modify the theme in the ThemeContext for consistent theming

## API Endpoints

- `GET /analytics/dashboard` - Returns dashboard data including stats, sales data, user registrations, and revenue distribution

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
