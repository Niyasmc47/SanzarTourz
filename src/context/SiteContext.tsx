import React, { createContext, useContext, useState } from 'react';
import { SiteConfig, TourPackage } from '../types';
import { siteConfig as defaultSiteConfig } from '../config/siteConfig';
import { tourPackages as defaultPackages } from '../data/packages';

interface SiteContextType {
  siteConfig: SiteConfig;
  packages: TourPackage[];
  updateSiteConfig: (newConfig: SiteConfig) => void;
  addPackage: (newPackage: TourPackage) => void;
  updatePackage: (id: string, updated: Partial<TourPackage>) => void;
  deletePackage: (id: string) => void;
  resetToDefaults: () => void;
  adminPassword: string;
  updateAdminPassword: (newPassword: string) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const CONFIG_STORAGE_KEY = 'sanzar_tourz_site_config';
const PACKAGES_STORAGE_KEY = 'sanzar_tourz_packages';
const PASSWORD_STORAGE_KEY = 'sanzar_admin_password';
const AUTH_STORAGE_KEY = 'sanzar_admin_authenticated';
const DEFAULT_PASSWORD = 'sanzar2026';

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Site configuration state
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved site config:', e);
    }
    return defaultSiteConfig;
  });

  // 2. Packages state
  const [packages, setPackages] = useState<TourPackage[]>(() => {
    try {
      const saved = localStorage.getItem(PACKAGES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved packages:', e);
    }
    return defaultPackages;
  });

  // 3. Admin Security / Password state
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(PASSWORD_STORAGE_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return DEFAULT_PASSWORD;
  });

  // 4. Session authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Sync site config to localStorage
  const updateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save site config to localStorage:', e);
    }
  };

  // Sync packages to localStorage
  const savePackages = (newPackages: TourPackage[]) => {
    setPackages(newPackages);
    try {
      localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(newPackages));
    } catch (e) {
      console.error('Failed to save packages to localStorage:', e);
    }
  };

  // Add new package
  const addPackage = (newPackage: TourPackage) => {
    const updated = [newPackage, ...packages];
    savePackages(updated);
  };

  // Update existing package
  const updatePackage = (id: string, updated: Partial<TourPackage>) => {
    const updatedList = packages.map((pkg) =>
      pkg.id === id ? { ...pkg, ...updated } : pkg
    );
    savePackages(updatedList);
  };

  // Delete package
  const deletePackage = (id: string) => {
    const updatedList = packages.filter((pkg) => pkg.id !== id);
    savePackages(updatedList);
  };

  // Reset to original code defaults
  const resetToDefaults = () => {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    localStorage.removeItem(PACKAGES_STORAGE_KEY);
    setSiteConfig(defaultSiteConfig);
    setPackages(defaultPackages);
  };

  // Change Admin Password
  const updateAdminPassword = (newPassword: string) => {
    setAdminPassword(newPassword);
    try {
      localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
    } catch (e) {
      console.error('Failed to save admin password:', e);
    }
  };

  // Authenticate Admin
  const login = (passwordAttempt: string): boolean => {
    if (passwordAttempt === adminPassword) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <SiteContext.Provider
      value={{
        siteConfig,
        packages,
        updateSiteConfig,
        addPackage,
        updatePackage,
        deletePackage,
        resetToDefaults,
        adminPassword,
        updateAdminPassword,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
