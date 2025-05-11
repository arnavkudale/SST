interface PerformanceBudget {
  maxBundleSize: number;
  maxImageSize: number;
  maxThirdPartySize: number;
  maxTotalSize: number;
  maxLCP: number;
  maxFID: number;
  maxCLS: number;
}

export const performanceBudget: PerformanceBudget = {
  maxBundleSize: 200 * 1024, // 200KB
  maxImageSize: 100 * 1024, // 100KB
  maxThirdPartySize: 50 * 1024, // 50KB
  maxTotalSize: 500 * 1024, // 500KB
  maxLCP: 2500, // 2.5s
  maxFID: 100, // 100ms
  maxCLS: 0.1, // 0.1
};

class PerformanceBudgetMonitor {
  private static instance: PerformanceBudgetMonitor;
  private budget: PerformanceBudget;

  private constructor(budget: PerformanceBudget) {
    this.budget = budget;
  }

  public static getInstance(budget?: PerformanceBudget): PerformanceBudgetMonitor {
    if (!PerformanceBudgetMonitor.instance) {
      PerformanceBudgetMonitor.instance = new PerformanceBudgetMonitor(budget || performanceBudget);
    }
    return PerformanceBudgetMonitor.instance;
  }

  public checkBundleSize(size: number): boolean {
    if (size > this.budget.maxBundleSize) {
      console.warn(`Bundle size (${(size / 1024).toFixed(2)}KB) exceeds budget (${(this.budget.maxBundleSize / 1024).toFixed(2)}KB)`);
      return false;
    }
    return true;
  }

  public checkImageSize(size: number): boolean {
    if (size > this.budget.maxImageSize) {
      console.warn(`Image size (${(size / 1024).toFixed(2)}KB) exceeds budget (${(this.budget.maxImageSize / 1024).toFixed(2)}KB)`);
      return false;
    }
    return true;
  }

  public checkThirdPartySize(size: number): boolean {
    if (size > this.budget.maxThirdPartySize) {
      console.warn(`Third-party size (${(size / 1024).toFixed(2)}KB) exceeds budget (${(this.budget.maxThirdPartySize / 1024).toFixed(2)}KB)`);
      return false;
    }
    return true;
  }

  public checkTotalSize(size: number): boolean {
    if (size > this.budget.maxTotalSize) {
      console.warn(`Total size (${(size / 1024).toFixed(2)}KB) exceeds budget (${(this.budget.maxTotalSize / 1024).toFixed(2)}KB)`);
      return false;
    }
    return true;
  }

  public checkLCP(value: number): boolean {
    if (value > this.budget.maxLCP) {
      console.warn(`LCP (${value.toFixed(2)}ms) exceeds budget (${this.budget.maxLCP}ms)`);
      return false;
    }
    return true;
  }

  public checkFID(value: number): boolean {
    if (value > this.budget.maxFID) {
      console.warn(`FID (${value.toFixed(2)}ms) exceeds budget (${this.budget.maxFID}ms)`);
      return false;
    }
    return true;
  }

  public checkCLS(value: number): boolean {
    if (value > this.budget.maxCLS) {
      console.warn(`CLS (${value.toFixed(3)}) exceeds budget (${this.budget.maxCLS})`);
      return false;
    }
    return true;
  }
}

export const performanceBudgetMonitor = PerformanceBudgetMonitor.getInstance(); 