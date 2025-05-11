import { performanceMonitor } from './performance';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// User interaction tracking
interface UserInteraction {
  type: 'click' | 'scroll' | 'input' | 'hover' | 'form';
  element: string;
  value?: string;
  timestamp: number;
  path: string;
}

class UserInteractionTracker {
  private static instance: UserInteractionTracker;
  private interactions: UserInteraction[] = [];
  private readonly maxInteractions = 100;

  private constructor() {
    this.initializeTracking();
  }

  public static getInstance(): UserInteractionTracker {
    if (!UserInteractionTracker.instance) {
      UserInteractionTracker.instance = new UserInteractionTracker();
    }
    return UserInteractionTracker.instance;
  }

  private initializeTracking() {
    // Track clicks
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      this.trackInteraction({
        type: 'click',
        element: this.getElementIdentifier(target),
        timestamp: performance.now(),
        path: window.location.pathname
      });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.trackInteraction({
          type: 'scroll',
          element: 'page',
          value: `${Math.round(maxScroll)}%`,
          timestamp: performance.now(),
          path: window.location.pathname
        });
      }
    });

    // Track form interactions
    document.addEventListener('input', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        this.trackInteraction({
          type: 'input',
          element: this.getElementIdentifier(target),
          timestamp: performance.now(),
          path: window.location.pathname
        });
      }
    });
  }

  private getElementIdentifier(element: HTMLElement): string {
    const id = element.id;
    const classes = Array.from(element.classList).join('.');
    const tag = element.tagName.toLowerCase();
    
    if (id) return `#${id}`;
    if (classes) return `.${classes}`;
    return tag;
  }

  private trackInteraction(interaction: UserInteraction) {
    this.interactions.push(interaction);
    if (this.interactions.length > this.maxInteractions) {
      this.interactions.shift();
    }

    // Send to analytics
    trackEvent('UserInteraction', interaction.type, interaction.element, interaction.timestamp);
  }

  public getInteractions(): UserInteraction[] {
    return [...this.interactions];
  }
}

// Initialize Google Analytics
export const initGA = (measurementId: string) => {
  // Load the Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false,
    debug_mode: process.env.NODE_ENV === 'development',
    custom_map: {
      dimension1: 'user_type',
      dimension2: 'interaction_count',
      metric1: 'scroll_depth',
      metric2: 'time_on_page'
    }
  });

  // Initialize user interaction tracking
  UserInteractionTracker.getInstance();

  // Track Web Vitals
  const sendToGA = ({ name, delta, id }: { name: string; delta: number; id: string }) => {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(delta),
      non_interaction: true,
    });
  };

  // Report Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(sendToGA);
    getFID(sendToGA);
    getFCP(sendToGA);
    getLCP(sendToGA);
    getTTFB(sendToGA);
  });
};

// Track page views with enhanced data
export const trackPageView = (url: string) => {
  const interactions = UserInteractionTracker.getInstance().getInteractions();
  const timeOnPage = performance.now();

  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: document.title,
    user_type: 'returning', // You can implement logic to determine this
    interaction_count: interactions.length,
    scroll_depth: Math.max(...interactions
      .filter(i => i.type === 'scroll')
      .map(i => parseInt(i.value || '0'))
    ),
    time_on_page: timeOnPage
  });
};

// Track custom events with enhanced data
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  const interactions = UserInteractionTracker.getInstance().getInteractions();
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    interaction_count: interactions.length,
    time_on_page: performance.now()
  });
};

// Track performance metrics with enhanced data
export const trackPerformance = () => {
  const metrics = performanceMonitor.getMetrics();
  const interactions = UserInteractionTracker.getInstance().getInteractions();
  
  Object.entries(metrics).forEach(([name, value]) => {
    trackEvent('Performance', name, undefined, value);
  });

  // Track interaction metrics
  trackEvent('UserMetrics', 'InteractionSummary', undefined, interactions.length);
}; 