"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import type { EventClickArg, EventInput, EventMountArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

type ViewMode = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

type EventDetails = {
  id: string;
  title: string;
  start: string; 
  end?: string; 
  allDay?: boolean;
  classNames?: string[];
  extendedProps?: {
    company?: string;
    location?: string;
    attendeesCount?: number;
    dots?: string[]; 
  };
};

const STORAGE_KEY = "ds_calendar_events_v1";



function formatDateLine(date: Date) {
 
  const fmt = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return fmt.format(date);
}

function formatTimeLine(date: Date) {
 
  const fmt = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return fmt.format(date);
}

function loadEventsFromStorage(): EventDetails[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveEventsToStorage(events: EventDetails[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

function seedEvents(): EventDetails[] {
  return [
    {
      id: "e-design",
      title: "Design Conference",
      start: "2019-10-07T07:19:00",
      allDay: false,
      classNames: ["fc-ev", "fc-ev--purple"],
      extendedProps: {
        company: "F6D Davio Mission Suite 157",
        location: "Meaghan",
        attendeesCount: 15,
        dots: ["#111827", "#9ca3af", "#e5e7eb"],
      },
    },
    {
      id: "e-weekend",
      title: "Weekend Festival",
      start: "2019-10-16T22:00:00",
      allDay: false,
      classNames: ["fc-ev", "fc-ev--pink"],
      extendedProps: {
        company: "8530 Delet Flats Suite 158",
        location: "Sweden",
        attendeesCount: 20,
        dots: ["#f59e0b", "#10b981", "#3b82f6"],
      },
    },
    {
      id: "e-glasto",
      title: "Glastonbury Festival",
      start: "2019-10-20T20:00:00",
      end: "2019-10-22T20:00:00",
      allDay: false,
      classNames: ["fc-ev", "fc-ev--orange"],
      extendedProps: {
        company: "456 Walter Road Apt. 571",
        location: "Turks and Caicos Islands",
        attendeesCount: 14,
        dots: ["#ef4444", "#a855f7", "#22c55e"],
      },
    },
    {
      id: "e-ultra",
      title: "Ultra Europe 2019",
      start: "2019-10-25T10:00:00",
      allDay: false,
      classNames: ["fc-ev", "fc-ev--blue"],
      extendedProps: {
        company: "506 Satterfield Tunnel Apt. 983",
        location: "San Marino",
        attendeesCount: 25,
        dots: ["#06b6d4", "#f97316", "#3b82f6"],
      },
    },
  ];
}



export default function CalendarPageView() {
  const [viewMode, setViewMode] = useState<ViewMode>("dayGridMonth");

  
  const [events, setEvents] = useState<EventDetails[]>([]);
  const eventsForCalendar = useMemo<EventInput[]>(() => {
    return events.map((ev) => ({
      id: ev.id,
      title: ev.title,
      start: ev.start,
      end: ev.end,
      allDay: ev.allDay ?? false,
      className: ev.classNames?.join(" ") || "",
      extendedProps: ev.extendedProps,
    }));
  }, [events]);

 
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<EventDetails | null>(null);
  const [anchor, setAnchor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    location: "",
    organization: "",
  });

  const cardRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<ReturnType<FullCalendar["getApi"]> | null>(null);

  
  useEffect(() => {
    const stored = loadEventsFromStorage();
    const initial = stored ?? seedEvents();
    setEvents(initial);
    if (!stored) saveEventsToStorage(initial);
  }, []);


  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return;
      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

 
  useEffect(() => {
    if (!modalOpen) return;

    const onDown = (e: MouseEvent) => {
      const el = modalRef.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return;
      setModalOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  const updateTitle = () => {
    const titleEl = document.getElementById("calTitle");
    const api = apiRef.current;
    if (titleEl && api) titleEl.textContent = api.view?.title ?? "";
  };

  const openTooltip = (ev: EventDetails, clientX: number, clientY: number) => {
    setActive(ev);
    setAnchor({ x: clientX, y: clientY });
    setOpen(true);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const id = String(arg.event.id);
    const found = events.find((e) => e.id === id) ?? null;

    const x = arg.jsEvent?.clientX ?? 0;
    const y = arg.jsEvent?.clientY ?? 0;

    const fallback: EventDetails = {
      id,
      title: arg.event.title,
      start: arg.event.start?.toISOString() ?? new Date().toISOString(),
      end: arg.event.end?.toISOString(),
      allDay: arg.event.allDay,
      classNames: (arg.event.classNames ?? []) as string[],
      extendedProps: {
        ...(arg.event.extendedProps as any),
      },
    };

    openTooltip(found ?? fallback, x, y);
  };

  const handleEventDidMount = (info: EventMountArg) => {
    
    const el = info.el as HTMLElement;
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.style.cursor = "pointer";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();

      const id = String(info.event.id);
      const found = events.find((ev) => ev.id === id);
      const r = el.getBoundingClientRect();
      openTooltip(
        found ?? {
          id,
          title: info.event.title,
          start: info.event.start?.toISOString() ?? new Date().toISOString(),
          end: info.event.end?.toISOString(),
          allDay: info.event.allDay,
          classNames: info.event.classNames as string[],
          extendedProps: info.event.extendedProps as any,
        },
        r.left + r.width / 2,
        r.top + 10
      );
    };

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  };

  const deleteActiveEvent = () => {
    if (!active) return;
    const next = events.filter((e) => e.id !== active.id);
    setEvents(next);
    saveEventsToStorage(next);
    setOpen(false);
  };

  const handleAddEvent = () => {
    setModalOpen(true);
    
    const selectedDate = apiRef.current?.view?.activeStart;
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate.toISOString().split("T")[0],
      }));
    }
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.date) {
      return;
    }

    
    const timeParts = formData.time.split(":");
    const hours = timeParts[0]?.padStart(2, "0") || "00";
    const minutes = timeParts[1]?.padStart(2, "0") || "00";
    const startISO = `${formData.date}T${hours}:${minutes}:00`;
    
    const newEvent: EventDetails = {
      id: `e-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: formData.title.trim(),
      start: startISO,
      allDay: false,
      classNames: ["fc-ev", "fc-ev--blue"],
      extendedProps: {
        company: formData.organization.trim() || undefined,
        location: formData.location.trim() || undefined,
        attendeesCount: Math.floor(Math.random() * 20) + 5,
        dots: ["#3b82f6", "#ec4899", "#10b981"],
      },
    };

    const next = [...events, newEvent];
    setEvents(next);
    saveEventsToStorage(next);
    
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      location: "",
      organization: "",
    });
    
    setModalOpen(false);
  };

  const handleCancelModal = () => {
    setFormData({
      title: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      location: "",
      organization: "",
    });
    setModalOpen(false);
  };

  const tooltipMeta = useMemo(() => {
    if (!active) return null;
    const startDate = new Date(active.start);
    const dateText = formatDateLine(startDate);
    const timeText = active.allDay ? "All Day" : formatTimeLine(startDate);

    const company = active.extendedProps?.company ?? "—";
    const location = active.extendedProps?.location ?? "—";
    const dots = active.extendedProps?.dots ?? ["#6d28d9", "#ec4899", "#06b6d4"];
    const extra = active.extendedProps?.attendeesCount ?? 8;

    return { dateText, timeText, company, location, dots, extra };
  }, [active]);

 

  const upcomingEvents = useMemo(() => {
  
    const sorted = [...events].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    return sorted.slice(0, 6);
  }, [events]);

  const openFromSidebar = (ev: EventDetails) => {
    
    openTooltip(ev, window.innerWidth - 420, 140);
  };

  return (
    <div className="cal-page">
      {/* LEFT PANEL */}
      <aside className="cal-left">
        <button className="cal-add-btn" type="button" onClick={handleAddEvent}>
          + Add New Event
        </button>

        <div className="cal-left-title">You are going to</div>

        <div className="cal-left-list">
          {upcomingEvents.map((ev) => {
            const d = new Date(ev.start);
            const dateLine = `${formatDateLine(d)} at ${formatTimeLine(d)}`;
            const line1 = ev.extendedProps?.company ?? "";
            const line2 = ev.extendedProps?.location ?? "";
            const dots = ev.extendedProps?.dots ?? ["#111827", "#9ca3af", "#e5e7eb"];
            const extra = ev.extendedProps?.attendeesCount ?? 0;

            return (
              <button
                key={ev.id}
                type="button"
                className="cal-left-item"
                onClick={() => openFromSidebar(ev)}
                aria-label={`Open ${ev.title}`}
              >
                <div className="cal-left-avatar" />

                <div className="cal-left-body">
                  <div className="cal-left-name">{ev.title}</div>
                  <div className="cal-left-muted">{dateLine}</div>
                  <div className="cal-left-muted">{line1}</div>
                  <div className="cal-left-muted">{line2}</div>

                  <div className="cal-left-people">
                    {dots.slice(0, 3).map((c, i) => (
                      <span
                        key={`${ev.id}-dot-${i}`}
                        className="cal-left-dot"
                        style={{ background: c }}
                        aria-hidden="true"
                      />
                    ))}
                    {extra > 0 && <span className="cal-left-plus">{extra}+</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button className="cal-more" type="button">
          See More
        </button>
      </aside>

      {/* RIGHT - CALENDAR */}
      <div className="cal-card">
        <section className="cal-right">
            {/* TOP BAR */}
            <div className="cal-top">
              <button
                type="button"
                className="cal-btn cal-btn--ghost"
                onClick={() => {
                  apiRef.current?.today();
                  updateTitle();
                }}
              >
                Today
              </button>

              <div className="cal-title-area">
                <button
                  type="button"
                  className="cal-icon-btn"
                  aria-label="Previous"
                  onClick={() => {
                    apiRef.current?.prev();
                    updateTitle();
                  }}
                >
                  <i className="bi bi-chevron-left" />
                </button>

                <div className="cal-title" id="calTitle" />

                <button
                  type="button"
                  className="cal-icon-btn"
                  aria-label="Next"
                  onClick={() => {
                    apiRef.current?.next();
                    updateTitle();
                  }}
                >
                  <i className="bi bi-chevron-right" />
                </button>
              </div>

              <div className="cal-switch">
                <button
                  type="button"
                  className={`cal-pill ${viewMode === "timeGridDay" ? "is-active" : ""}`}
                  onClick={() => setViewMode("timeGridDay")}
                >
                  Day
                </button>
                <button
                  type="button"
                  className={`cal-pill ${viewMode === "timeGridWeek" ? "is-active" : ""}`}
                  onClick={() => setViewMode("timeGridWeek")}
                >
                  Week
                </button>
                <button
                  type="button"
                  className={`cal-pill ${viewMode === "dayGridMonth" ? "is-active" : ""}`}
                  onClick={() => setViewMode("dayGridMonth")}
                >
                  Month
                </button>
              </div>
            </div>

            <div className="cal-divider" />

            <div className="cal-wrap">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={viewMode}
                headerToolbar={false}
                height="100%"
                fixedWeekCount={false}
                showNonCurrentDates={true}
                dayMaxEventRows={1}
                moreLinkClick="popover"
                navLinks={true}
                editable={false}
                selectable={true}
                events={eventsForCalendar}
                initialDate="2019-10-01"
                firstDay={1}
                dayHeaderFormat={{ weekday: "short" }}
                eventDisplay="block"
                eventContent={(arg) => (
                  <div className="cal-event">
                    <span className="cal-event__text">{arg.event.title}</span>
                  </div>
                )}
                eventClick={handleEventClick}
                eventDidMount={handleEventDidMount}
                datesSet={() => updateTitle()}
                ref={(ref) => {
                  apiRef.current = ref?.getApi() ?? null;
                  setTimeout(updateTitle, 0);
                }}
              />

              {/* TOOLTIP */}
              {open && active && tooltipMeta && (
                <div
                  className="cal-tooltip"
                  style={{
                    left: Math.max(12, anchor.x - 160),
                    top: Math.max(12, anchor.y + 12),
                  }}
                  ref={cardRef}
                >
                  <div className="cal-tooltip__head">
                    <div className="cal-tooltip__title">{active.title}</div>

                    <button
                      type="button"
                      className="cal-tooltip__trash"
                      aria-label="Delete"
                      onClick={deleteActiveEvent}
                    >
                      <i className="bi bi-trash3" />
                    </button>
                  </div>

                  <div className="cal-tooltip__sub">{tooltipMeta.company}</div>
                  <div className="cal-tooltip__meta">{tooltipMeta.dateText}</div>
                  <div className="cal-tooltip__meta">{tooltipMeta.timeText}</div>
                  <div className="cal-tooltip__meta">{tooltipMeta.location}</div>

                  <div className="cal-tooltip__line" />

                  <div className="cal-tooltip__avatars">
                    {tooltipMeta.dots.slice(0, 3).map((c, i) => (
                      <span
                        key={`${c}-${i}`}
                        className="cal-dot"
                        style={{ background: c }}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="cal-plus">+{tooltipMeta.extra}</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

      {/* Add Event Modal */}
      {modalOpen && (
        <div className="cal-modal-overlay">
          <div className="cal-modal" ref={modalRef}>
            <div className="cal-modal-header">
              <h2 className="cal-modal-title">Add New Event</h2>
              <button
                type="button"
                className="cal-modal-close"
                onClick={handleCancelModal}
                aria-label="Close"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmitEvent} className="cal-modal-form">
              <div className="cal-modal-field">
                <label className="cal-modal-label">
                  Event Title <span className="cal-modal-required">*</span>
                </label>
                <input
                  type="text"
                  className="cal-modal-input"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="cal-modal-field">
                <label className="cal-modal-label">
                  Date <span className="cal-modal-required">*</span>
                </label>
                <input
                  type="date"
                  className="cal-modal-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="cal-modal-field">
                <label className="cal-modal-label">Time</label>
                <div className="cal-modal-time-wrapper">
                  <input
                    type="time"
                    className="cal-modal-input"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                  <i className="bi bi-clock cal-modal-time-icon" />
                </div>
              </div>

              <div className="cal-modal-field">
                <label className="cal-modal-label">Location</label>
                <input
                  type="text"
                  className="cal-modal-input"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="cal-modal-field">
                <label className="cal-modal-label">Organization</label>
                <input
                  type="text"
                  className="cal-modal-input"
                  placeholder="Enter organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>

              <div className="cal-modal-actions">
                <button
                  type="button"
                  className="cal-modal-btn cal-modal-btn--cancel"
                  onClick={handleCancelModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cal-modal-btn cal-modal-btn--submit"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
