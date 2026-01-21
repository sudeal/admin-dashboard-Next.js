"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

type Gender = "Male" | "Female" | "Other";

export default function ContactPageView() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { t } = useLanguage();

  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Male" as Gender,
  });

  const openFilePicker = () => fileRef.current?.click();

  const onPickPhoto = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Contact submit:", form);
  };

  return (
    <div className="ct-page">
      <h1 className="ct-title">{t("addNewContact")}</h1>

      <div className="ct-card">
        <form className="ct-form" onSubmit={onSubmit}>
        
          <div className="ct-photo">
            <button
              type="button"
              className="ct-photo-btn"
              onClick={openFilePicker}
              aria-label="Upload Photo"
            >
              {photoPreview ? (
                
                <img className="ct-photo-img" src={photoPreview} alt="Preview" />
              ) : (
                <div className="ct-photo-icon">
                  <i className="bi bi-camera" />
                </div>
              )}
            </button>

            <button type="button" className="ct-photo-link" onClick={openFilePicker}>
              {t("uploadPhoto")}
            </button>

            <input
              ref={fileRef}
              className="ct-hidden-file"
              type="file"
              accept="image/*"
              onChange={(e) => onPickPhoto(e.target.files?.[0])}
            />
          </div>

          
          <div className="ct-grid">
            <div className="ct-field">
              <label className="ct-label">{t("firstName")}</label>
              <input
                className="ct-input"
                placeholder={t("firstName").toLowerCase()}
                value={form.firstName}
                onChange={onChange("firstName")}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">{t("lastName")}</label>
              <input
                className="ct-input"
                placeholder={t("lastName").toLowerCase()}
                value={form.lastName}
                onChange={onChange("lastName")}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">{t("email")}</label>
              <input
                className="ct-input"
                type="email"
                placeholder={t("email").toLowerCase()}
                value={form.email}
                onChange={onChange("email")}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">{t("phone")}</label>
              <input
                className="ct-input"
                placeholder={t("phone").toLowerCase()}
                value={form.phone}
                onChange={onChange("phone")}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">{t("dateOfBirth")}</label>
              <div className="ct-input-icon">
                <input
                  className="ct-input ct-input--withicon"
                  placeholder="gg . aa . yyyy"
                  value={form.dob}
                  onChange={onChange("dob")}
                />
                <i className="bi bi-calendar3 ct-icon" />
              </div>
            </div>

            <div className="ct-field">
              <label className="ct-label">{t("gender")}</label>
              <div className="ct-select-wrap">
                <select className="ct-select" value={form.gender} onChange={onChange("gender")}>
                  <option value="Male">{t("male")}</option>
                  <option value="Female">{t("female")}</option>
                  <option value="Other">{t("other")}</option>
                </select>
                <i className="bi bi-chevron-down ct-select-icon" />
              </div>
            </div>
          </div>

         
          <div className="ct-actions">
            <button className="ct-submit" type="submit">
              {t("saveContact")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
