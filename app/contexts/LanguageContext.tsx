"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Dashboard
    dashboard: "Dashboard",
    Products: "Products",
    orders: "Orders",
    analytics: "Analytics",
    suppliers: "Suppliers",
    settings: "Settings",
    stock: "Stock",
    workers: "Workers",
    
    // Header
    search: "Search",
    notifications: "Notifications",
    profile: "Profile",
    logout: "Logout",
    
    // Stock Management
    stockManagement: "Stock Management",
    stockIn: "Stock In",
    stockOut: "Stock Out",
    totalStockValue: "Total Stock Value",
    lowStockItems: "Low Stock Items",
    stockMovements: "Stock Movements",
    needsAttention: "Needs Attention",
    thisMonth: "This Month",
    
    // Settings
    password: "Password",
    language: "Language",
    notificationSettings: "Notification Settings",
    appearance: "Appearance",
    security: "Security",
    settingsDescription: "Manage your account settings and preferences",
    
    // Common
    save: "Save Changes",
    cancel: "Cancel",
    add: "Add",
    edit: "Edit",
    delete: "Delete",
  },
  fr: {
    // Dashboard
    dashboard: "Tableau de Bord",
    Products: "Inventaire",
    orders: "Commandes",
    analytics: "Analytique",
    suppliers: "Fournisseurs",
    settings: "Paramètres",
    stock: "Stock",
    workers: "Employés",
    
    // Header
    search: "Rechercher",
    notifications: "Notifications",
    profile: "Profil",
    logout: "Déconnexion",
    
    // Stock Management
    stockManagement: "Gestion des Stocks",
    stockIn: "Entrée Stock",
    stockOut: "Sortie Stock",
    totalStockValue: "Valeur Totale du Stock",
    lowStockItems: "Articles en Stock Faible",
    stockMovements: "Mouvements de Stock",
    needsAttention: "Nécessite Attention",
    thisMonth: "Ce Mois",
    
    // Settings
    password: "Mot de Passe",
    language: "Langue",
    notificationSettings: "Paramètres de Notification",
    appearance: "Apparence",
    security: "Sécurité",
    settingsDescription: "Gérer vos paramètres de compte et préférences",
    
    // Common
    save: "Enregistrer",
    cancel: "Annuler",
    add: "Ajouter",
    edit: "Modifier",
    delete: "Supprimer",
  },
  ar: {
    // Dashboard
    dashboard: "لوحة التحكم",
    Products: "المخزون",
    orders: "الطلبات",
    analytics: "التحليلات",
    suppliers: "الموردين",
    settings: "الإعدادات",
    stock: "المخزون",
    workers: "العمال",
    
    // Header
    search: "بحث",
    notifications: "الإشعارات",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    
    // Stock Management
    stockManagement: "إدارة المخزون",
    stockIn: "إدخال مخزون",
    stockOut: "إخراج مخزون",
    totalStockValue: "القيمة الإجمالية للمخزون",
    lowStockItems: "المواد منخفضة المخزون",
    stockMovements: "حركات المخزون",
    needsAttention: "يحتاج اهتمام",
    thisMonth: "هذا الشهر",
    
    // Settings
    password: "كلمة المرور",
    language: "اللغة",
    notificationSettings: "إعدادات الإشعارات",
    appearance: "المظهر",
    security: "الأمان",
    settingsDescription: "إدارة إعدادات حسابك وتفضيلاتك",
    
    // Common
    save: "حفظ التغييرات",
    cancel: "إلغاء",
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLanguage(savedLang);
      setIsRtl(savedLang === 'ar');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsRtl(lang === 'ar');
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { language } = useLanguage();
  return translations[language];
}
