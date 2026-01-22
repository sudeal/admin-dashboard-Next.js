"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useLanguage } from "@/app/contexts/LanguageContext";
import useTranslation from "@/app/hooks/useTranslation";

type HeaderProps = {
    onMenuClick?: () => void;
    onMenuClickDesktop?: () => void;
  };

type Notification = {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  description: string;
};

const notifications: Notification[] = [
  {
    id: "1",
    icon: "bi-gear",
    iconBg: "#60a5fa",
    title: "Settings",
    description: "Update Dashboard",
  },
  {
    id: "2",
    icon: "bi-calendar",
    iconBg: "#f472b6",
    title: "Event Update",
    description: "An event date update again",
  },
  {
    id: "3",
    icon: "bi-person",
    iconBg: "#a78bfa",
    title: "Profile",
    description: "Update your profile",
  },
  {
    id: "4",
    icon: "bi-exclamation-triangle",
    iconBg: "#f87171",
    title: "Application Error",
    description: "Check Your running application",
  },
];

export default function Header({ onMenuClick, onMenuClickDesktop }: HeaderProps) {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();
    const { t } = useTranslation();
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const notificationButtonRef = useRef<HTMLButtonElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const profileButtonRef = useRef<HTMLButtonElement>(null);
    const languageRef = useRef<HTMLDivElement>(null);
    const languageButtonRef = useRef<HTMLButtonElement>(null);
    
    const handleMenuClick = () => {
     
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        if (onMenuClick) onMenuClick();
      } else {
        if (onMenuClickDesktop) onMenuClickDesktop();
      }
    };

    const toggleNotification = () => {
      setNotificationOpen(!notificationOpen);
      setProfileOpen(false); 
      setLanguageOpen(false);
    };

    const toggleProfile = () => {
      setProfileOpen(!profileOpen);
      setNotificationOpen(false); 
      setLanguageOpen(false);
    };

    const toggleLanguageDropdown = () => {
      setLanguageOpen(!languageOpen);
      setNotificationOpen(false);
      setProfileOpen(false);
    };

    const handleLanguageChange = (lang: "en" | "tr") => {
      if (lang !== language) {
        toggleLanguage();
      }
      setLanguageOpen(false);
    };

    const handleLogout = () => {
      setProfileOpen(false);
      router.push("/login");
    };

    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        
        if (
          notificationOpen &&
          notificationRef.current &&
          !notificationRef.current.contains(event.target as Node) &&
          notificationButtonRef.current &&
          !notificationButtonRef.current.contains(event.target as Node)
        ) {
          setNotificationOpen(false);
        }

        
        if (
          profileOpen &&
          profileRef.current &&
          !profileRef.current.contains(event.target as Node) &&
          profileButtonRef.current &&
          !profileButtonRef.current.contains(event.target as Node)
        ) {
          setProfileOpen(false);
        }

        if (
          languageOpen &&
          languageRef.current &&
          !languageRef.current.contains(event.target as Node) &&
          languageButtonRef.current &&
          !languageButtonRef.current.contains(event.target as Node)
        ) {
          setLanguageOpen(false);
        }
      };

      if (notificationOpen || profileOpen || languageOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [notificationOpen, profileOpen, languageOpen]);

    return (
      <header className="ds-header">
        <div className="ds-header__left">
          <button 
            className="ds-icon-btn" 
            type="button" 
            aria-label="Menu"
            onClick={handleMenuClick}
          >
            <i className="bi bi-list" />
          </button>
  
          <div className="ds-search">
            <i className="bi bi-search ds-search__icon" />
            <input className="ds-search__input" placeholder={t("header.search")} />
          </div>
        </div>

        <div className="ds-header__right">
          <div className="ds-notification-wrapper">
            <button 
              ref={notificationButtonRef}
              className="ds-icon-btn" 
              type="button" 
              aria-label="Notifications"
              onClick={toggleNotification}
            >
              <span className="ds-badge-dot" />
              <i className="bi bi-bell" />
            </button>

            {notificationOpen && (
              <div className="ds-notification-dropdown" ref={notificationRef}>
                <div className="ds-notification-header">
                  <h3 className="ds-notification-title">{t("header.notification")}</h3>
                </div>
                
                <div className="ds-notification-list">
                  {notifications.map((notif) => {
                    let titleKey = "";
                    let descKey = "";
                    if (notif.title === "Settings") {
                      titleKey = "header.settings";
                      descKey = "header.updateDashboard";
                    } else if (notif.title === "Event Update") {
                      titleKey = "header.eventUpdate";
                      descKey = "header.eventDateUpdate";
                    } else if (notif.title === "Profile") {
                      titleKey = "header.profile";
                      descKey = "header.updateProfile";
                    } else if (notif.title === "Application Error") {
                      titleKey = "header.applicationError";
                      descKey = "header.checkRunningApplication";
                    }
                    return (
                      <div key={notif.id} className="ds-notification-item">
                        <div 
                          className="ds-notification-icon" 
                          style={{ backgroundColor: notif.iconBg }}
                        >
                          <i className={`bi ${notif.icon}`} />
                        </div>
                        <div className="ds-notification-content">
                          <div className="ds-notification-item-title">{t(titleKey)}</div>
                          <div className="ds-notification-item-desc">{t(descKey)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="ds-notification-footer">
                  <button 
                    type="button" 
                    className="ds-notification-see-all"
                    onClick={() => setNotificationOpen(false)}
                  >
                    {t("header.seeAllNotification")}
                  </button>
                </div>
              </div>
            )}
          </div>
  
          <button 
            className="ds-icon-btn" 
            type="button" 
            aria-label="Theme"
            onClick={toggleTheme}
          >
            <i className={theme === "dark" ? "bi bi-sun" : "bi bi-moon"} />
          </button>
  
          <div className="ds-language-wrapper">
            <button 
              ref={languageButtonRef}
              className="ds-pill" 
              type="button" 
              aria-label="Language"
              onClick={toggleLanguageDropdown}
            >
              <i className="bi bi-globe2" />
              <span>{language === "en" ? "English" : "Türkçe"}</span>
              <i className="bi bi-chevron-down ds-pill__chev" />
            </button>

            {languageOpen && (
              <div className="ds-language-dropdown" ref={languageRef}>
                <button 
                  type="button" 
                  className={`ds-language-option ${language === "en" ? "active" : ""}`}
                  onClick={() => handleLanguageChange("en")}
                >
                  English
                </button>
                <button 
                  type="button" 
                  className={`ds-language-option ${language === "tr" ? "active" : ""}`}
                  onClick={() => handleLanguageChange("tr")}
                >
                  Türkçe
                </button>
              </div>
            )}
          </div>
  
          <div className="ds-profile-wrapper">
            <button 
              ref={profileButtonRef}
              className="ds-profile" 
              type="button" 
              aria-label="Profile"
              onClick={toggleProfile}
            >
              <span className="ds-avatar">
                <i className="bi bi-person" />
              </span>
              <span className="ds-profile__text">
                <span className="ds-profile__name">Moni Roy</span>
                <span className="ds-profile__role">{t("header.admin")}</span>
              </span>
              <i className="bi bi-chevron-down ds-profile__chev" />
            </button>

            {profileOpen && (
              <div className="ds-profile-dropdown" ref={profileRef}>
                <button 
                  type="button" 
                  className="ds-profile-dropdown-logout"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right" />
                  <span>{t("header.logout")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
}