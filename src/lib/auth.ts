export type UserRole = 'admin' | 'user' | 'guest';

interface User {
  id: string;
  role: UserRole;
  email?: string;
}

class AuthManager {
  private static instance: AuthManager;
  private currentUser: User | null = null;

  private constructor() {
    // Initialize from localStorage if available
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  public setUser(user: User | null) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  public getUser(): User | null {
    return this.currentUser;
  }

  public hasRole(role: UserRole): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role === role;
  }

  public isAdmin(): boolean {
    return this.hasRole('admin');
  }

  public logout() {
    this.setUser(null);
  }
}

export const authManager = AuthManager.getInstance(); 