# AI VM System - Log Search Frontend

A React.js + Tailwind CSS frontend system for searching and filtering call logs.

## Features

- **Text Search**: Search across transcripts, phone numbers, labels, and call UUIDs
- **Date Range Filtering**: Filter logs by start and end dates
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Filtering**: Instant search results as you type
- **Expandable Transcripts**: View full transcript content with expand/collapse

## Technology Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **react-app-rewired** - Custom webpack configuration without ejecting
- **date-fns** - Date manipulation utilities

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm start` - Start development server (uses react-app-rewired)
- `npm run build` - Build for production (uses react-app-rewired)
- `npm test` - Run tests (uses react-app-rewired)
- `npm run eject` - Eject from Create React App (not recommended)

## Project Structure

```
src/
├── App.js          # Main application component
├── index.js        # React entry point
└── index.css       # Tailwind CSS imports and custom styles

config-overrides.js  # react-app-rewired configuration
tailwind.config.js   # Tailwind CSS configuration
postcss.config.js    # PostCSS configuration
```

## Customization

### Webpack Configuration

This project uses `react-app-rewired` to customize webpack configuration without ejecting. Edit `config-overrides.js` to:

- Add path aliases
- Customize webpack rules
- Add plugins
- Modify build configuration

### Tailwind CSS

Customize the design system by editing `tailwind.config.js`:

- Add custom colors
- Extend spacing, typography, or other design tokens
- Configure content paths

## Sample Data

The application includes sample log data demonstrating:

- Different call directions (caller/callee)
- Various labels (unknown, customer, support)
- Sample transcripts and audio file links
- Timestamp formatting

## API Integration

To connect to your actual API:

1. Replace the `sampleLogs` array in `App.js`
2. Implement API calls using `fetch` or `axios`
3. Add loading states and error handling
4. Update the filtering logic as needed

## Building for Production

```bash
npm run build
```

The build output will be in the `build/` directory, ready for deployment.

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change the port in package.json scripts if needed
2. **Build errors**: Check that all dependencies are properly installed
3. **Tailwind not working**: Ensure PostCSS and Tailwind are properly configured

### Getting Help

- Check the console for error messages
- Verify all dependencies are installed
- Ensure Node.js version compatibility 