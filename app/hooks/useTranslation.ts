"use client";

import { useLanguage } from "@/app/contexts/LanguageContext";
import enTranslations from "@/locales/en/common.json";
import trTranslations from "@/locales/tr/common.json";

const translations = {
  en: enTranslations,
  tr: trTranslations,
};

export default function useTranslation(namespace: string = "common") {
  const { language } = useLanguage();

  const t = (key: string, query?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        
        let fallbackValue: any = translations.en;
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === "object" && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; 
          }
        }
        value = fallbackValue;
        break;
      }
    }

    if (typeof value !== "string") {
      return key;
    }

   
    if (query) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return query[key]?.toString() || match;
      });
    }

    return value;
  };

  return { t, lang: language };
}

