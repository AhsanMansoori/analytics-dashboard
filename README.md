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

### Enhanced Sidebar Features
- **Collapsible Design**: Toggle between full and collapsed sidebar for more screen space
- **Active Link Highlighting**: Visual indicators for current page with smooth transitions
- **User Profile Section**: Quick access to profile and logout options
- **Search Functionality**: Find menu items quickly with built-in search
- **Dynamic Menu Items**: Role-based menu visibility with notification badges
- **Tooltips**: Helpful tooltips when sidebar is collapsed
- **Quick Actions**: Shortcut buttons for common tasks
- **External Links**: Easy access to documentation and support
- **Version Information**: App version and copyright details

### Profile Management
- **Comprehensive Profile Page**: Editable user information and preferences
- **Password Management**: Secure password change functionality
- **Activity Logging**: Detailed history of user actions and login attempts
- **Security Settings**: Two-factor authentication and session management
- **Professional Information**: Work-related details and contact information

### Analytics Explorer
- **Custom Dashboard Builder**: Drag-and-drop interface for creating custom dashboards
- **Widget Library**: Various chart types (line, bar, pie, metric cards)
- **Data Source Integration**: Connect multiple data sources with configurable time ranges
- **Real-time Preview**: Live preview of dashboard layouts
- **Export & Save**: Save custom dashboards and export configurations

### Integrations Management
- **Third-party Connections**: Manage integrations with popular services
- **Supported Services**: Stripe, Mailchimp, Slack, Salesforce, Google Analytics, Shopify, AWS S3, PostgreSQL
- **Configuration Management**: Easy setup and configuration of integration settings
- **Sync Status**: Real-time sync status and activity monitoring
- **Category Organization**: Organized by service type (Payments, Marketing, CRM, etc.)

### Audit & Compliance
- **Comprehensive Audit Logs**: Track all user actions and system changes
- **Security Monitoring**: Failed login attempts and permission violations
- **Compliance Reporting**: Generate reports for regulatory requirements
- **Advanced Filtering**: Search and filter logs by user, action, status, and time range
- **Export Capabilities**: Export audit logs for external analysis

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
- **Drag & Drop**: @hello-pangea/dnd

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
│   │   ├── ProfilePage.tsx     # User profile management
│   │   ├── AnalyticsExplorer.tsx # Custom dashboard builder
│   │   ├── IntegrationsPanel.tsx # Third-party integrations
│   │   ├── AuditLogsPanel.tsx  # Audit and compliance logs
│   │   ├── UserManagementPanel.tsx # User administration
│   │   ├── Sidebar.tsx         # Enhanced navigation sidebar
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

### Enhanced Sidebar
- **Collapsible Design**: Minimize sidebar to icon-only view for more screen space
- **Smart Search**: Quickly find menu items with integrated search functionality
- **Role-Based Navigation**: Menu items automatically filtered based on user permissions
- **Notification Badges**: Real-time indicators for unread notifications and pending items
- **Quick Actions**: One-click access to common tasks like creating reports or adding users
- **User Profile Integration**: Quick access to profile settings and logout
- **External Resources**: Direct links to documentation and support
- **Responsive Design**: Optimized for both desktop and mobile experiences

### Profile Management
- **Personal Information**: Editable profile details including contact information
- **Professional Details**: Work-related information and company details
- **Security Settings**: Password management and two-factor authentication setup
- **Activity History**: Comprehensive log of user actions and login history
- **Preferences**: Customizable settings for notifications and interface

### Analytics Explorer
- **Drag & Drop Builder**: Intuitive interface for creating custom dashboards
- **Widget Variety**: Multiple chart types and metric cards available
- **Data Source Flexibility**: Connect to various data sources with custom configurations
- **Real-time Preview**: See how dashboards will look before saving
- **Export Options**: Save and share custom dashboard configurations

### Integrations Hub
- **Popular Services**: Pre-built connectors for major business tools
- **Easy Configuration**: Simple setup process with guided configuration
- **Status Monitoring**: Real-time sync status and error reporting
- **Category Organization**: Services grouped by function for easy discovery
- **Activity Logs**: Track all integration activities and sync operations

### Audit & Compliance
- **Comprehensive Logging**: Every user action and system change is recorded
- **Security Focus**: Special attention to authentication and permission events
- **Advanced Search**: Powerful filtering and search capabilities
- **Compliance Ready**: Generate reports suitable for regulatory requirements
- **Export Functionality**: Download logs for external analysis and archiving

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
- Analytics Explorer access
- Integration management
- Audit log access

### Manager
- Access to dashboard and analytics
- Can generate reports
- Limited settings access
- Analytics Explorer access
- Integration management
- Cannot manage users or view audit logs

### Viewer
- Read-only access to dashboard
- Basic analytics viewing
- Limited settings (personal preferences only)
- Cannot generate reports
- No administrative access

## Customization

### Adding New Charts
1. Create a new chart component in `frontend/components/charts/`
2. Add the data type to the backend API response
3. Include the chart in the dashboard layout
4. Add export functionality

### Adding New Integrations
1. Define the integration in `IntegrationsPanel.tsx`
2. Add configuration options and connection logic
3. Implement sync functionality
4. Add to the appropriate category

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
- Edge (