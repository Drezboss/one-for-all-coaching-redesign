import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // "admin", "coach", "parent"
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  parentName: text("parent_name"),
  studentName: text("student_name"),
  studentAge: integer("student_age"),
  emergencyContact: text("emergency_contact"),
  emergencyPhone: text("emergency_phone"),
  // GDPR Compliance fields
  gdprConsent: boolean("gdpr_consent").default(false).notNull(),
  gdprConsentDate: timestamp("gdpr_consent_date"),
  dataProcessingConsent: boolean("data_processing_consent").default(false).notNull(),
  marketingConsent: boolean("marketing_consent").default(false),
  dataRetentionDate: timestamp("data_retention_date"), // When to delete data
  lastDataExport: timestamp("last_data_export"), // Track data export requests
  accountStatus: text("account_status").default("active").notNull(), // active, suspended, deletion_requested
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone"),
  serviceType: text("service_type").notNull(),
  date: timestamp("date").notNull(),
  duration: integer("duration").notNull().default(60), // minutes
  status: text("status").notNull().default("scheduled"), // "scheduled", "completed", "cancelled"
  notes: text("notes"),
  coachId: integer("coach_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const availability = pgTable("availability", {
  id: serial("id").primaryKey(),
  coachId: integer("coach_id").references(() => users.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0-6 (Sunday-Saturday)
  startTime: text("start_time").notNull(), // "09:00"
  endTime: text("end_time").notNull(), // "17:00"
  isActive: boolean("is_active").notNull().default(true),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  service: text("service"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookingInquiries = pgTable("booking_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  serviceType: text("service_type").notNull(),
  preferredDate: text("preferred_date"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Student Progress Tracking
export const studentProgress = pgTable("student_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sessionDate: timestamp("session_date").notNull(),
  skillsWorkedOn: text("skills_worked_on").notNull(),
  coachNotes: text("coach_notes"),
  rating: integer("rating"), // 1-5 scale
  nextSessionGoals: text("next_session_goals"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Parent Notifications
export const parentNotifications = pgTable("parent_notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // progress_update, schedule_change, payment_reminder
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Payment Records
export const paymentRecords = pgTable("payment_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  amount: integer("amount").notNull(), // in pence
  serviceType: text("service_type").notNull(),
  stripePaymentId: text("stripe_payment_id"),
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// GDPR Audit Log
export const gdprAuditLog = pgTable("gdpr_audit_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(), // data_export, data_deletion, consent_updated, access_granted
  details: text("details"), // JSON string with action details
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  performedBy: integer("performed_by").references(() => users.id), // Who performed the action
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Data Processing Activities (GDPR Article 30)
export const dataProcessingActivities = pgTable("data_processing_activities", {
  id: serial("id").primaryKey(),
  activity: text("activity").notNull(), // user_registration, session_booking, payment_processing
  purpose: text("purpose").notNull(), // Purpose of processing
  legalBasis: text("legal_basis").notNull(), // consent, contract, legitimate_interest
  dataCategories: text("data_categories").notNull(), // JSON array of data types
  retentionPeriod: integer("retention_period").notNull(), // Days to retain data
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
  parentName: true,
  studentName: true,
  studentAge: true,
  emergencyContact: true,
  emergencyPhone: true,
  gdprConsent: true,
  gdprConsentDate: true,
  dataProcessingConsent: true,
  marketingConsent: true,
});

export const insertStudentProgressSchema = createInsertSchema(studentProgress).omit({
  id: true,
  createdAt: true,
});

export const insertParentNotificationSchema = createInsertSchema(parentNotifications).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentRecordSchema = createInsertSchema(paymentRecords).omit({
  id: true,
  createdAt: true,
});

export const insertGdprAuditSchema = createInsertSchema(gdprAuditLog).omit({
  id: true,
  createdAt: true,
});

export const insertDataProcessingActivitySchema = createInsertSchema(dataProcessingActivities).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookingInquiries).omit({
  id: true,
  createdAt: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAvailabilitySchema = createInsertSchema(availability).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type BookingInquiry = typeof bookingInquiries.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = z.infer<typeof insertAvailabilitySchema>;
export type StudentProgress = typeof studentProgress.$inferSelect;
export type InsertStudentProgress = z.infer<typeof insertStudentProgressSchema>;
export type ParentNotification = typeof parentNotifications.$inferSelect;
export type InsertParentNotification = z.infer<typeof insertParentNotificationSchema>;
export type PaymentRecord = typeof paymentRecords.$inferSelect;
export type InsertPaymentRecord = z.infer<typeof insertPaymentRecordSchema>;
export type GdprAuditLog = typeof gdprAuditLog.$inferSelect;
export type InsertGdprAudit = z.infer<typeof insertGdprAuditSchema>;
export type DataProcessingActivity = typeof dataProcessingActivities.$inferSelect;
export type InsertDataProcessingActivity = z.infer<typeof insertDataProcessingActivitySchema>;
