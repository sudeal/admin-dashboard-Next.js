"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "tr";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "ds-language";

const translations = {
  en: {
    // Header
    search: "Search",
    notification: "Notification",
    seeAllNotification: "See all notification",
    settings: "Settings",
    updateDashboard: "Update Dashboard",
    eventUpdate: "Event Update",
    eventDateUpdate: "An event date update again",
    profile: "Profile",
    updateProfile: "Update your profile",
    applicationError: "Application Error",
    checkRunningApplication: "Check Your running application",
    logout: "Logout",
    admin: "Admin",
    // Dashboard
    dashboard: "Dashboard",
    totalUsers: "Total User",
    totalOrders: "Total Order",
    totalSales: "Total Sales",
    totalPending: "Total Pending",
    totalCustomers: "Total Customers",
    totalRevenue: "Total Revenue",
    // Sidebar
    products: "Products",
    editProduct: "Edit Product",
    favorites: "Favorites",
    inbox: "Inbox",
    orderLists: "Order Lists",
    productStock: "Product Stock",
    toDoList: "To Do List",
    contact: "Contact",
    pricing: "Pricing",
    // Pricing Plans
    basic: "Basic",
    standard: "Standard",
    premium: "Premium",
    monthlyCharge: "Monthly Charge",
    freeSetup: "Free Setup",
    bandwidthLimit: "Bandwidth Limit 10 GB",
    userConnection: "20 User Connection",
    analyticsReport: "Analytics Report",
    publicApiAccess: "Public API Access",
    pluginsIntegration: "Plugins Integration",
    customContentManagement: "Custom Content Management",
    getStarted: "Get Started",
    startFreeTrial: "Start Your 30 Day Free Trial",
    charts: "Charts",
    calendar: "Calendar",
    pages: "PAGES",
    // Tables
    date: "Date",
    orderType: "Order Type",
    orderStatus: "Order Status",
    customer: "Customer",
    address: "Address",
    type: "Type",
    status: "Status",
    actions: "Actions",
    viewDetails: "View Details",
    // Statuses
    completed: "Completed",
    processing: "Processing",
    rejected: "Rejected",
    onHold: "On Hold",
    inTransit: "In Transit",
    // Table filters
    filterBy: "Filter By",
    last30Days: "Last 30 days",
    thisYear: "This year",
    resetFilter: "Reset Filter",
    // Product Stock
    searchProductName: "Search product name",
    image: "Image",
    productName: "Product Name",
    category: "Category",
    price: "Price",
    piece: "Piece",
    availableColor: "Available Color",
    action: "Action",
    // Charts
    barChart: "Bar Chart",
    pieChart: "Pie Chart",
    donutChart: "Donut Chart",
    // Todo
    addNewTask: "Add New Task",
    // Contact
    addNewContact: "Add New Contact",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    uploadPhoto: "Upload Photo",
    saveContact: "Save Contact",
    // Sales Details
    salesDetails: "Sales Details",
    orderId: "Order ID",
    product: "Product",
    qty: "Qty",
    unitPrice: "Unit Price",
    total: "Total",
    noSalesDataFound: "No sales data found.",
    // Order Details
    backToOrders: "Back to Orders",
    orderNotFound: "Order not found",
    shippingAddress: "Shipping Address",
    tracking: "Tracking",
    trackingNo: "Tracking No:",
    carrier: "Carrier:",
    orderItems: "Order Items",
    item: "Item",
    quantity: "Quantity",
    subtotal: "Subtotal",
    tax: "Tax",
    shipping: "Shipping",
    discount: "Discount",
    grandTotal: "Grand Total",
  },
  tr: {
    // Header
    search: "Ara",
    notification: "Bildirim",
    seeAllNotification: "Tüm bildirimleri gör",
    settings: "Ayarlar",
    updateDashboard: "Dashboard'u Güncelle",
    eventUpdate: "Etkinlik Güncellemesi",
    eventDateUpdate: "Bir etkinlik tarihi tekrar güncellendi",
    profile: "Profil",
    updateProfile: "Profilinizi güncelleyin",
    applicationError: "Uygulama Hatası",
    checkRunningApplication: "Çalışan uygulamanızı kontrol edin",
    logout: "Çıkış",
    admin: "Yönetici",
    // Dashboard
    dashboard: "Gösterge Paneli",
    totalUsers: "Toplam Kullanıcı",
    totalOrders: "Toplam Sipariş",
    totalSales: "Toplam Satış",
    totalPending: "Toplam Bekleyen",
    totalCustomers: "Toplam Müşteri",
    totalRevenue: "Toplam Gelir",
    // Sidebar
    products: "Ürünler",
    editProduct: "Ürünü Düzenle",
    favorites: "Favoriler",
    inbox: "Gelen Kutusu",
    orderLists: "Sipariş Listeleri",
    productStock: "Ürün Stoğu",
    toDoList: "Yapılacaklar Listesi",
    contact: "İletişim",
    pricing: "Fiyatlandırma",
    // Pricing Plans
    basic: "Temel",
    standard: "Standart",
    premium: "Premium",
    monthlyCharge: "Aylık Ücret",
    freeSetup: "Ücretsiz Kurulum",
    bandwidthLimit: "Bant Genişliği Limiti 10 GB",
    userConnection: "20 Kullanıcı Bağlantısı",
    analyticsReport: "Analitik Raporu",
    publicApiAccess: "Genel API Erişimi",
    pluginsIntegration: "Eklenti Entegrasyonu",
    customContentManagement: "Özel İçerik Yönetimi",
    getStarted: "Başla",
    startFreeTrial: "30 Günlük Ücretsiz Denemenizi Başlatın",
    charts: "Grafikler",
    calendar: "Takvim",
    pages: "SAYFALAR",
    // Tables
    date: "Tarih",
    orderType: "Sipariş Türü",
    orderStatus: "Sipariş Durumu",
    customer: "Müşteri",
    address: "Adres",
    type: "Tür",
    status: "Durum",
    actions: "İşlemler",
    viewDetails: "Detayları Görüntüle",
    // Statuses
    completed: "Tamamlandı",
    processing: "İşleniyor",
    rejected: "Reddedildi",
    onHold: "Beklemede",
    inTransit: "Taşınımda",
    // Table filters
    filterBy: "Filtrele",
    last30Days: "Son 30 gün",
    thisYear: "Bu yıl",
    resetFilter: "Filtreyi Sıfırla",
    // Product Stock
    searchProductName: "Ürün adını ara",
    image: "Resim",
    productName: "Ürün Adı",
    category: "Kategori",
    price: "Fiyat",
    piece: "Adet",
    availableColor: "Mevcut Renk",
    action: "İşlem",
    // Charts
    barChart: "Çubuk Grafik",
    pieChart: "Pasta Grafik",
    donutChart: "Halka Grafik",
    // Todo
    addNewTask: "Yeni Görev Ekle",
    // Contact
    addNewContact: "Yeni Kişi Ekle",
    firstName: "Ad",
    lastName: "Soyad",
    email: "E-posta",
    phone: "Telefon",
    dateOfBirth: "Doğum Tarihi",
    gender: "Cinsiyet",
    male: "Erkek",
    female: "Kadın",
    other: "Diğer",
    uploadPhoto: "Fotoğraf Yükle",
    saveContact: "Kişiyi Kaydet",
    // Sales Details
    salesDetails: "Satış Detayları",
    orderId: "Sipariş ID",
    product: "Ürün",
    qty: "Miktar",
    unitPrice: "Birim Fiyat",
    total: "Toplam",
    noSalesDataFound: "Satış verisi bulunamadı.",
    // Order Details
    backToOrders: "Siparişlere Dön",
    orderNotFound: "Sipariş bulunamadı",
    shippingAddress: "Teslimat Adresi",
    tracking: "Takip",
    trackingNo: "Takip No:",
    carrier: "Kargo:",
    orderItems: "Sipariş Öğeleri",
    item: "Öğe",
    quantity: "Miktar",
    subtotal: "Ara Toplam",
    tax: "Vergi",
    shipping: "Kargo",
    discount: "İndirim",
    grandTotal: "Genel Toplam",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    const initialLanguage = stored || "en";
    setLanguage(initialLanguage);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, language);
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "tr" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}