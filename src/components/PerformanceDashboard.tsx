import React, { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import { performanceMonitor } from '../lib/performance';
import { performanceAlertManager } from '../lib/performance-alerts';

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

interface UserMetrics {
  interactionCount: number;
  scrollDepth: number;
  timeOnPage: number;
}

interface AlertThreshold {
  metric: string;
  threshold: number;
  severity: 'warning' | 'error';
}

const PerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  });

  const [userMetrics, setUserMetrics] = useState<UserMetrics>({
    interactionCount: 0,
    scrollDepth: 0,
    timeOnPage: 0
  });

  const [alerts, setAlerts] = useState<AlertThreshold[]>([]);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // Start performance monitoring
    performanceAlertManager.startMonitoring();

    const updateMetrics = () => {
      const perfMetrics = performanceMonitor.getMetrics();
      setMetrics({
        fcp: perfMetrics.fcp || 0,
        lcp: perfMetrics.lcp || 0,
        fid: perfMetrics.fid || 0,
        cls: perfMetrics.cls || 0,
        ttfb: perfMetrics.ttfb || 0
      });

      setAlerts(performanceAlertManager.getActiveAlerts());

      // Track dashboard view
      trackEvent('Performance', 'DashboardView', 'metrics_update');
    };

    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);
    updateMetrics();

    return () => {
      clearInterval(interval);
      performanceAlertManager.stopMonitoring();
    };
  }, []);

  const getMetricColor = (value: number, thresholds: { good: number; poor: number }): string => {
    if (value <= thresholds.good) return 'text-green-500';
    if (value <= thresholds.poor) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getAlertSeverityColor = (severity: 'warning' | 'error'): string => {
    return severity === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Performance Dashboard</h2>
      
      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Active Alerts</h3>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={`${alert.metric}-${index}`}
                className={`p-3 rounded ${getAlertSeverityColor(alert.severity)}`}
              >
                <p className="font-medium">
                  {alert.metric.toUpperCase()}: {metrics[alert.metric as keyof PerformanceMetrics]?.toFixed(0)}ms
                  (Threshold: {alert.threshold}ms)
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Web Vitals */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Core Web Vitals</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">First Contentful Paint</p>
              <p className={`text-lg font-medium ${getMetricColor(metrics.fcp, { good: 1800, poor: 3000 })}`}>
                {metrics.fcp.toFixed(0)}ms
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Largest Contentful Paint</p>
              <p className={`text-lg font-medium ${getMetricColor(metrics.lcp, { good: 2500, poor: 4000 })}`}>
                {metrics.lcp.toFixed(0)}ms
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">First Input Delay</p>
              <p className={`text-lg font-medium ${getMetricColor(metrics.fid, { good: 100, poor: 300 })}`}>
                {metrics.fid.toFixed(0)}ms
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Cumulative Layout Shift</p>
              <p className={`text-lg font-medium ${getMetricColor(metrics.cls, { good: 0.1, poor: 0.25 })}`}>
                {metrics.cls.toFixed(3)}
              </p>
            </div>
          </div>
        </div>

        {/* User Metrics */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">User Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Interactions</p>
              <p className="text-lg font-medium text-blue-600">
                {userMetrics.interactionCount}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Scroll Depth</p>
              <p className="text-lg font-medium text-blue-600">
                {userMetrics.scrollDepth}%
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Time on Page</p>
              <p className="text-lg font-medium text-blue-600">
                {(userMetrics.timeOnPage / 1000).toFixed(1)}s
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Time to First Byte</p>
              <p className={`text-lg font-medium ${getMetricColor(metrics.ttfb, { good: 200, poor: 600 })}`}>
                {metrics.ttfb.toFixed(0)}ms
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
        <p className="mt-2">
          <span className="text-green-500">●</span> Good
          <span className="mx-2">|</span>
          <span className="text-yellow-500">●</span> Needs Improvement
          <span className="mx-2">|</span>
          <span className="text-red-500">●</span> Poor
        </p>
      </div>
    </div>
  );
};

export default PerformanceDashboard; 