# Vercel Deployment Guide

## 1. Environment Variables Setup

Set these environment variables in your Vercel project settings:

```bash
# Analytics
VITE_GA_MEASUREMENT_ID=your-ga-id

# Performance Monitoring
VITE_PERFORMANCE_MONITORING=true
VITE_PERFORMANCE_ALERTS=true

# Feature Flags
VITE_ENABLE_PERFORMANCE_DASHBOARD=true
VITE_ENABLE_ALERTS=true
VITE_ENABLE_NOTIFICATIONS=true

# Cache Settings
VITE_CACHE_DURATION=31536000
VITE_METRICS_UPDATE_INTERVAL=30000
```

## 2. Build Settings

The `vercel.json` configuration includes:
- Security headers
- Asset caching
- Performance optimizations
- Framework settings

## 3. Performance Monitoring Setup

1. **Enable Analytics**
   - Add your Google Analytics Measurement ID in Vercel environment variables
   - Analytics will automatically track performance metrics

2. **Access Performance Dashboard**
   - Deploy to Vercel
   - Set admin user in browser console:
   ```javascript
   authManager.setUser({ id: '1', role: 'admin', email: 'admin@example.com' });
   ```
   - Navigate to `/performance` on your deployed site

3. **Configure Alerts**
   - Alerts are enabled by default
   - Customize thresholds in browser console:
   ```javascript
   performanceAlertManager.setThresholds([
     { metric: 'lcp', threshold: 2000, severity: 'warning' },
     { metric: 'lcp', threshold: 3500, severity: 'error' }
   ]);
   ```

## 4. Vercel Analytics Integration

The deployment includes:
- Automatic performance monitoring
- Real-time metrics tracking
- Browser notifications for alerts
- User interaction tracking

## 5. Security Considerations

- Performance dashboard is protected by role-based access
- Admin access is required to view metrics
- Sensitive data is not exposed to non-admin users

## 6. Monitoring in Production

1. **Access Metrics**
   - Log in as admin
   - Visit `/performance`
   - View real-time metrics and alerts

2. **Set Up Alerts**
   - Enable browser notifications
   - Configure alert thresholds
   - Monitor performance issues

3. **Track Performance**
   - Monitor Core Web Vitals
   - Track user interactions
   - View performance trends

## 7. Troubleshooting

If performance monitoring isn't working:

1. Check environment variables in Vercel
2. Verify admin access is set correctly
3. Ensure browser notifications are enabled
4. Check browser console for errors

## 8. Best Practices

1. **Regular Monitoring**
   - Check metrics daily
   - Review alert history
   - Monitor user interactions

2. **Performance Optimization**
   - Address alerts promptly
   - Optimize based on metrics
   - Track improvements over time

3. **Security**
   - Rotate admin credentials regularly
   - Monitor access logs
   - Review alert patterns 