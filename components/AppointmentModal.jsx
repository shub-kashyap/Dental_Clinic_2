'use client';

import { useState, useEffect } from 'react';
import styles from './AppointmentModal.module.css';

export default function AppointmentModal({ isOpen, onClose, initialService = '' }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: initialService || 'general',
    doctor: 'dr-rajesh',
    date: '',
    time: '10:00 AM',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const servicesList = [
    { id: 'general', name: 'General Dentistry Checkup', duration: '45 mins' },
    { id: 'whitening', name: 'Teeth Whitening Treatment', duration: '60 mins' },
    { id: 'implants', name: 'Dental Implant Consultation', duration: '60 mins' },
    { id: 'orthodontics', name: 'Orthodontics & Clear Aligners', duration: '45 mins' },
    { id: 'root-canal', name: 'Root Canal & Endodontics', duration: '90 mins' },
    { id: 'surgery', name: 'Oral Surgery & Extractions', duration: '60 mins' },
  ];

  const doctorsList = [
    { id: 'dr-rajesh', name: 'Dr. RAJESH (B.D.S., F.A.G.E., Implantology)', role: 'Lead Implantologist & Dental Surgeon', rating: '5.0 ★' },
    { id: 'dr-geetika', name: 'Dr. (Maj) GEETIKA (B.D.S., F.A.G.E.)', role: 'Senior Dental Specialist & Cosmetic Surgeon', rating: '5.0 ★' },
  ];

  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomRef = `SHIVAM-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setStep(3); // Confirmation step
  };

  const selectedServiceObj = servicesList.find((s) => s.id === formData.service || s.name === formData.service) || servicesList[0];
  const selectedDoctorObj = doctorsList.find((d) => d.id === formData.doctor) || doctorsList[0];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.badgeText}>FAST ONLINE BOOKING</span>
            <h2 className={styles.title}>Book Dental Appointment</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressRow}>
          <div className={`${styles.stepIndicator} ${step >= 1 ? styles.activeStep : ''}`}>
            <span>1</span> Service & Doctor
          </div>
          <div className={`${styles.stepIndicator} ${step >= 2 ? styles.activeStep : ''}`}>
            <span>2</span> Date & Contact
          </div>
          <div className={`${styles.stepIndicator} ${step >= 3 ? styles.activeStep : ''}`}>
            <span>3</span> Confirmation
          </div>
        </div>

        {/* Form Body */}
        {step === 1 && (
          <div className={styles.stepBody}>
            <div className={styles.sectionTitle}>Select Treatment Service</div>
            <div className={styles.gridCards}>
              {servicesList.map((srv) => (
                <div
                  key={srv.id}
                  className={`${styles.selectionCard} ${formData.service === srv.id ? styles.selectedCard : ''}`}
                  onClick={() => setFormData({ ...formData, service: srv.id })}
                >
                  <div className={styles.cardHeader}>
                    <strong>{srv.name}</strong>
                  </div>
                  <span className={styles.cardDuration}>⏱ {srv.duration}</span>
                </div>
              ))}
            </div>

            <div className={`${styles.sectionTitle} ${styles.topMargin}`}>Select Dental Specialist</div>
            <div className={styles.gridCards}>
              {doctorsList.map((doc) => (
                <div
                  key={doc.id}
                  className={`${styles.selectionCard} ${formData.doctor === doc.id ? styles.selectedCard : ''}`}
                  onClick={() => setFormData({ ...formData, doctor: doc.id })}
                >
                  <div className={styles.cardHeader}>
                    <strong>{doc.name}</strong>
                    <span className={styles.docRating}>{doc.rating}</span>
                  </div>
                  <span className={styles.cardDuration}>{doc.role}</span>
                </div>
              ))}
            </div>

            <div className={styles.actionRow}>
              <button className="btn btn-primary" onClick={handleNext}>
                Continue to Date & Info ↗
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className={styles.stepBody}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Preferred Date *</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Preferred Time Slot *</label>
                <div className={styles.timeSlotsGrid}>
                  {timeSlots.map((t) => (
                    <button
                      type="button"
                      key={t}
                      className={`${styles.timeBtn} ${formData.time === t ? styles.timeActive : ''}`}
                      onClick={() => setFormData({ ...formData, time: t })}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Special Requests / Symptoms (Optional)</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Any tooth pain, allergies, or questions..."
                  value={formData.notes}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.actionRowSpace}>
              <button type="button" className="btn btn-outline" onClick={handleBack}>
                ← Back
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm & Book Appointment ↗
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className={styles.confirmationBody}>
            <div className={styles.successBadge}>
              <span className={styles.checkCheck}>✓</span>
            </div>
            <h3 className={styles.confTitle}>Appointment Successfully Confirmed!</h3>
            <p className={styles.confSub}>
              We have reserved your slot at <strong>Shivam Dental Care & Implant Centre</strong>.
            </p>

            <div className={styles.ticketBox}>
              <div className={styles.ticketHeader}>
                <span>BOOKING REFERENCE</span>
                <strong>{bookingRef}</strong>
              </div>
              <div className={styles.ticketGrid}>
                <div>
                  <span className={styles.lbl}>Service</span>
                  <strong>{selectedServiceObj.name}</strong>
                </div>
                <div>
                  <span className={styles.lbl}>Doctor</span>
                  <strong>{selectedDoctorObj.name}</strong>
                </div>
                <div>
                  <span className={styles.lbl}>Date & Time</span>
                  <strong>{formData.date || 'Tomorrow'}, {formData.time}</strong>
                </div>
                <div>
                  <span className={styles.lbl}>Patient Name</span>
                  <strong>{formData.name || 'Valued Patient'}</strong>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" onClick={onClose}>
              Done & Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
