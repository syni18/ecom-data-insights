# E-commerce Data Insights Dashboard

A Modular, responsive dashboard for visualizing and analyzing e-commerce data, built with React, TypeScript, and Tailwind CSS.

## Source Code

### GitHub Repository
[View on GitHub](https://github.com/syni18/ecom-data-insights.git)

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/syni18/ecom-data-insights.git
cd ecom-data-insights
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Architecture Decisions

This project follows a modern React application architecture:

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit for global state
- **Data Fetching**: React Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for fast development and optimized builds


### Performance Optimization

- Implemented code splitting using React.lazy()
- Used React.memo() for expensive components
- Implemented limit for large lists
- Optimized icons and assets
- Used proper caching strategies with React Query

## Demo

### Deployed Application

[View Live Demo](https://endearing-kelpie-290741.netlify.app/)



### Test Data Setup
1. Clone the repository
2. Run the development server
3. In application there is already added Some Static Data [mockData.ts]


## Documentation

### Component Documentation
  -  Building each Component Modular, Beacause it is easy to debug, Reuseable and Easy to readable.
  -  A reusable components like - Buttons, Cards , toast, icons, forms , inputbox, etc
### Redux Store Documentation

The application uses Redux Toolkit for state management with the following structure:
- Uses to Pass the data to anywhere in the application.
- this help to reduce the over fetching data everywhere , do it once and store in Redux store and use it.

Key slices:
- `products`: Products Array state
- `orders`: displaying orders and Modify

### API Integration Details

The application integrates with the following APIs:

1. **Mockapi.io API**
   - Base URL: `https://<your-token>.mockapi.io/:endpoint`
   - Endpoints: Products

### Known Issues and Future Improvements

#### Known Issues
1. Performance lag when loading large datasets
2. Mobile responsiveness issues in certain views
3. Browser compatibility issues with older versions

#### Future Improvements
1. Implement real-time data updates
2. Enhance mobile responsiveness
3. Add export functionality for reports
4. Implement user roles and permissions
5. Add more customization options for dashboards

