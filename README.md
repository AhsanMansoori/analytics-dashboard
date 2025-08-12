# Analytics Dashboard

A modern, responsive analytics dashboard built with React, TypeScript, Chart.js, and Tailwind CSS. Features real-time data visualization, user authentication, role-based access control, dark mode support, and a comprehensive set of business intelligence tools.

## Features

### Core Features
- **Modern UI/UX**: Clean design with smooth transitions and hover effects
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with persistent preferences
- **Interactive Charts**: 
  - Line chart for sales over time
  - Bar chart for user registrations
  - Doughnut chart for revenue distribution
- **Real-time Stats**: Key performance indicators with trend indicators

### Authentication & Security
- **User Authentication**: Login/logout system with demo credentials
- **Role-Based Access**: Different user roles (Admin, Manager, Viewer) with appropriate permissions
- **Secure Routes**: Protected dashboard areas based on user authentication

### Advanced Features
- **Real-time Updates**: Dashboard data refreshes automatically every 30 seconds
- **Smart Notifications**: In-app notification system with real-time alerts
- **Advanced Filtering**: Filter dashboard data by date range, region, and category
- **Export Capabilities**: Export charts as PNG/JPG and data as CSV/PDF
- **Customizable Settings**: 
  - Theme customization with accent color selection
  - Notification preferences
  - Data refresh intervals
  - Localization settings

### Reports & Analytics
- **Comprehensive Reports**: Generate detailed business reports
- **Multiple Report Types**: Sales, User Analytics, Performance, and Custom reports
- **Export Options**: Download reports in various formats
- **Historical Data**: Access to previous reports and analytics

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Backend**: Encore.ts (TypeScript backend framework)
- **Charts**: Chart.js with react-chartjs-2
- **Styling**: Tailwind CSS v4
- **State Management**: React Query for server state, React Context for client state
- **Icons**: Lucide React
- **UI Components**: shadcn/ui
- **Date Handling**: date-fns

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

### Demo Credentials

Use these credentials to test the application:
- **Email**: admin@example.com
- **Password**: password123

## Project Structure

```
├── backend/
│   ├── auth/
│   │   ├── encore.service.ts    # Auth service definition
│   │   └── auth.ts              # Authentication endpoints
│   └── analytics/
│       ├── encore.service.ts    # Analytics service definition
│       └── dashboard.ts         # Dashboard API endpoints
├── frontend/
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   ├── charts/             # Chart components with export functionality
│   │   ├── Dashboard.tsx       # Main dashboard component
│   │   ├── DashboardFilters.tsx # Filter controls
│   │   ├── NotificationPanel.tsx # Notification system
│   │   ├── ReportsPanel.tsx    # Reports management
│   │   ├── SettingsPanel.tsx   # User settings
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── TopNavbar.tsx       # Top navigation bar
│   │   └── StatsCards.tsx      # Statistics cards
│   ├── contexts/
│   │   ├── AuthContext.tsx     # Authentication state
│   │   ├── ThemeContext.tsx    # Theme and customization
│   │   └── NotificationContext.tsx # Notification management
│   └── App.tsx                 # Main app component
└── README.md
```

## Features in Detail

### Dashboard Overview
- Key metrics displayed in animated cards with trend indicators
- Sales performance over time with interactive line chart
- User registration trends with bar chart
- Revenue distribution by category with doughnut chart
- Real-time activity feed
- Customizable data refresh intervals

### Authentication System
- Secure login/logout functionality
- User registration with role assignment
- Role-based access control (Admin, Manager, Viewer)
- Persistent authentication state
- Demo credentials for testing

### Real-time Features
- Automatic data refresh every 30 seconds
- Live notification system with unread counters
- Real-time activity simulation
- Instant filter application

### Advanced Filtering
- Date range selection (week, month, quarter, year)
- Regional filtering (North, South, East, West)
- Category-based filtering (E-commerce, Subscriptions, etc.)
- Real-time filter application with data updates

### Export & Download
- Chart export as PNG/JPG images
- Data export as CSV/PDF files
- Report generation with multiple formats
- Download history and management

### Notification System
- Real-time in-app notifications
- Categorized alerts (success, warning, error, info)
- Unread notification counter
- Mark as read functionality
- Notification history

### Settings & Customization
- Dark/light mode toggle with system preference detection
- Accent color customization (6 color options)
- Notification preferences
- Data refresh interval settings
- Language and timezone selection
- User profile management

### Reports Panel
- Multiple report types (Sales, User Analytics, Performance, Custom)
- Date range selection for reports
- Report generation and download
- Historical report access
- Template downloads

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile

### Analytics
- `GET /analytics/dashboard` - Get dashboard data with filters
- `GET /analytics/notifications` - Get user notifications
- `POST /analytics/notifications/:id/read` - Mark notification as read
- `POST /analytics/export` - Export dashboard data

## User Roles & Permissions

### Admin
- Full access to all dashboard features
- Can view and generate all reports
- Access to all settings and configurations
- User management capabilities

### Manager
- Access to dashboard and analytics
- Can generate reports
- Limited settings access
- Cannot manage users

### Viewer
- Read-only access to dashboard
- Basic analytics viewing
- Limited settings (personal preferences only)
- Cannot generate reports

## Customization

### Adding New Charts
1. Create a new chart component in `frontend/components/charts/`
2. Add the data type to the backend API response
3. Include the chart in the dashboard layout
4. Add export functionality

### Modifying Data
- Update the mock data in `backend/analytics/dashboard.ts`
- The API automatically provides type-safe data to the frontend
- Add new filter options in the dashboard filters

### Styling
- Customize colors and spacing using Tailwind CSS classes
- Modify the theme in the ThemeContext for consistent theming
- Add new accent colors in the settings panel

### Adding Notifications
- Use the `addNotification` function from NotificationContext
- Customize notification types and styling
- Add new notification triggers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Optimized re-renders with React Query
- Efficient state management with Context API
- Lazy loading of components
- Memoized chart data processing
- Debounced filter updates

## Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Screen reader compatibility
- High contrast mode support
- Focus management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Demo Features

The application includes several demo features for testing:
- Mock authentication with predefined users
- Simulated real-time data updates
- Sample notifications and alerts
- Demo export functionality
- Test data for all charts and reports

## Future Enhancements

- Integration with real APIs
- Advanced chart types (Radar, Scatter, Heatmap)
- Multi-language support (i18n)
- Email notification system
- Advanced user management
- Data drill-down capabilities
- Mobile app companion
- API rate limiting and caching
