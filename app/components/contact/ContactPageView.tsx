"use client";

import { useRef, useState } from "react";

type Gender = "Male" | "Female" | "Other";

export default function ContactPageView() {
  const fileRef = useRef<HTMLInputElement | null>(null);

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
      <h1 className="ct-title">Add New Contact</h1>

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
              Upload Photo
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
              <label className="ct-label">First Name</label>
              <input
                className="ct-input"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={onChange("firstName")}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Last Name</label>
              <input
                className="ct-input"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={onChange("lastName")}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Your email</label>
              <input
                className="ct-input"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={onChange("email")}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Phone Number</label>
              <input
                className="ct-input"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={onChange("phone")}
              />
            </div>

            <div className="ct-field">
              <label className="ct-label">Date of Birth</label>
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
              <label className="ct-label">Gender</label>
              <div className="ct-select-wrap">
                <select className="ct-select" value={form.gender} onChange={onChange("gender")}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <i className="bi bi-chevron-down ct-select-icon" />
              </div>
            </div>
          </div>

         
          <div className="ct-actions">
            <button className="ct-submit" type="submit">
              Add Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
