import { performanceMonitor } from './performance';
import { authManager } from './auth';

interface AlertThreshold {
  metric: string;
  threshold: number;
  severity: 'warning' | 'error';
}

const DEFAULT_THRESHOLDS: AlertThreshold[] = [
  { metric: 'lcp', threshold: 2500, severity: 'warning' },
  { metric: 'lcp', threshold: 4000, severity: 'error' },
  { metric: 'fid', threshold: 100, severity: 'warning' },
  { metric: 'fid', threshold: 300, severity: 'error' },
  { metric: 'cls', threshold: 0.1, severity: 'warning' },
  { metric: 'cls', threshold: 0.25, severity: 'error' },
  { metric: 'ttfb', threshold: 200, severity: 'warning' },
  { metric: 'ttfb', threshold: 600, severity: 'error' }
];

class PerformanceAlertManager {
  private static instance: PerformanceAlertManager;
  private thresholds: AlertThreshold[] = DEFAULT_THRESHOLDS;
  private activeAlerts: Map<string, AlertThreshold> = new Map();
  private checkInterval: number | null = null;

  private constructor() {
    // Initialize from localStorage if available
    const savedThresholds = localStorage.getItem('performanceThresholds');
    if (savedThresholds) {
      this.thresholds = JSON.parse(savedThresholds);
    }
  }

  public static getInstance(): PerformanceAlertManager {
    if (!PerformanceAlertManager.instance) {
      PerformanceAlertManager.instance = new PerformanceAlertManager();
    }
    return PerformanceAlertManager.instance;
  }

  public startMonitoring(intervalMs: number = 30000) {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = window.setInterval(() => {
      if (authManager.isAdmin()) {
        this.checkMetrics();
      }
    }, intervalMs);

    // Initial check
    this.checkMetrics();
  }

  public stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  private checkMetrics() {
    const metrics = performanceMonitor.getMetrics();
    const newAlerts = new Map<string, AlertThreshold>();

    this.thresholds.forEach(threshold => {
      const value = metrics[threshold.metric];
      if (value && value > threshold.threshold) {
        newAlerts.set(threshold.metric, threshold);
        this.notifyAlert(threshold, value);
      }
    });

    this.activeAlerts = newAlerts;
  }

  private notifyAlert(threshold: AlertThreshold, value: number) {
    const message = `Performance Alert: ${threshold.metric.toUpperCase()} is ${value.toFixed(0)}ms (threshold: ${threshold.threshold}ms)`;
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(message);
    }

    // Create browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Performance Alert', {
        body: message,
        icon: '/favicon.ico'
      });
    }
  }

  public getActiveAlerts(): AlertThreshold[] {
    return Array.from(this.activeAlerts.values());
  }

  public setThresholds(thresholds: AlertThreshold[]) {
    this.thresholds = thresholds;
    localStorage.setItem('performanceThresholds', JSON.stringify(thresholds));
    this.checkMetrics(); // Check immediately with new thresholds
  }

  public getThresholds(): AlertThreshold[] {
    return [...this.thresholds];
  }
}

export const performanceAlertManager = PerformanceAlertManager.getInstance(); 