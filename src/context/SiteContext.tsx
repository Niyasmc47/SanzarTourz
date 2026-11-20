import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, TourPackage } from '../types';
import { siteConfig as defaultSiteConfig } from '../config/siteConfig';
import { tourPackages as defaultPackages } from '../data/packages';

interface SiteContextType {
  siteConfig: SiteConfig;
  packages: TourPackage[];
  isLoading: boolean;
  isMongoConnected: boolean;
  updateSiteConfig: (newConfig: SiteConfig) => Promise<void>;
  addPackage: (newPackage: TourPackage) => Promise<void>;
  updatePackage: (id: string, updated: Partial<TourPackage>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  adminPassword: string;
  updateAdminPassword: (newPassword: string) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const CONFIG_STORAGE_KEY = 'sanzar_tourz_site_config_v2';
const PACKAGES_STORAGE_KEY = 'sanzar_tourz_packages';
const PASSWORD_STORAGE_KEY = 'sanzar_admin_password';
const AUTH_STORAGE_KEY = 'sanzar_admin_authenticated';
const DEFAULT_PASSWORD = 'sanzar2026';

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMongoConnected, setIsMongoConnected] = useState(false);

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

  // Fetch from MongoDB API on initial mount
  useEffect(() => {
    let isMounted = true;

    async function loadDataFromApi() {
      try {
        // Fetch Packages
        const pkgRes = await fetch('/api/packages');
        if (pkgRes.ok) {
          const pkgData = await pkgRes.json();
          if (pkgData.success && Array.isArray(pkgData.packages) && pkgData.packages.length > 0) {
            if (isMounted) {
              setPackages(pkgData.packages);
              localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(pkgData.packages));
              setIsMongoConnected(true);
            }
          }
        }

        // Fetch Config
        const cfgRes = await fetch('/api/config');
        if (cfgRes.ok) {
          const cfgData = await cfgRes.json();
          if (cfgData.success && cfgData.config) {
            if (isMounted) {
              setSiteConfig(cfgData.config);
              localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(cfgData.config));
              setIsMongoConnected(true);
            }
          }
        }
      } catch (err) {
        // Silently fallback to localStorage or code defaults if API isn't hosted locally or offline
        console.log('MongoDB API unreachable or running standalone frontend. Using local cache.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadDataFromApi();
    return () => { isMounted = false; };
  }, []);

  // Update site configuration
  const updateSiteConfig = async (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }

    // Attempt MongoDB sync
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      });
      if (res.ok) setIsMongoConnected(true);
    } catch {
      // Offline fallback
    }
  };

  // Add new package
  const addPackage = async (newPackage: TourPackage) => {
    const updated = [newPackage, ...packages];
    setPackages(updated);
    try {
      localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save packages to localStorage:', e);
    }

    // Attempt MongoDB sync
    try {
      const res = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPackage)
      });
      if (res.ok) setIsMongoConnected(true);
    } catch {
      // Offline fallback
    }
  };

  // Update existing package
  const updatePackage = async (id: string, updated: Partial<TourPackage>) => {
    const target = packages.find((p) => p.id === id);
    const fullUpdated = { ...target, ...updated } as TourPackage;
    const updatedList = packages.map((pkg) => (pkg.id === id ? fullUpdated : pkg));
    setPackages(updatedList);

    try {
      localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save packages to localStorage:', e);
    }

    // Attempt MongoDB sync
    try {
      const res = await fetch('/api/packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullUpdated)
      });
      if (res.ok) setIsMongoConnected(true);
    } catch {
      // Offline fallback
    }
  };

  // Delete package
  const deletePackage = async (id: string) => {
    const updatedList = packages.filter((pkg) => pkg.id !== id);
    setPackages(updatedList);
    try {
      localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error('Failed to save packages to localStorage:', e);
    }

    // Attempt MongoDB sync
    try {
      await fetch(`/api/packages?id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch {
      // Offline fallback
    }
  };

  // Reset to original code defaults
  const resetToDefaults = async () => {
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
        isLoading,
        isMongoConnected,
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
