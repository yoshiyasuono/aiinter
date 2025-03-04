import { pgTable, text, serial, date, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  referenceNumber: varchar("reference_number").notNull().unique(),
  status: varchar("status", { enum: ["draft", "submitted"] }).notNull().default("draft"),
  
  // Student Info
  studentFirstName: varchar("student_first_name").notNull(),
  studentLastName: varchar("student_last_name").notNull(),
  studentPhoto: text("student_photo"),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: varchar("gender", { enum: ["male", "female", "other"] }).notNull(),
  nationality: varchar("nationality").notNull(),
  languages: text("languages").array().notNull(),
  bloodType: varchar("blood_type", { 
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] 
  }),
  
  // Address Info
  currentAddress: jsonb("current_address").notNull(),
  permanentAddress: jsonb("permanent_address"),

  // Parent Info
  parents: jsonb("parents").notNull(),
  
  // Medical Info
  physicianDetails: jsonb("physician_details"),
  medicalConditions: text("medical_conditions"),
  allergies: text("allergies"),
  
  // Education History
  previousSchools: jsonb("previous_schools").notNull(),
  
  // Emergency Contacts
  emergencyContacts: jsonb("emergency_contacts").notNull(),
  bankingDetails: jsonb("banking_details").notNull(),
  
  // Terms Agreement
  termsAccepted: jsonb("terms_accepted").notNull()
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  referenceNumber: true,
  status: true
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

// Extended validation schema for frontend
export const applicationFormSchema = insertApplicationSchema.extend({
  studentPhoto: z.string().optional(),
  dateOfBirth: z.date(),
  languages: z.array(z.string()).min(1),
  currentAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    postalCode: z.string().min(1)
  }),
  parents: z.array(z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    relationship: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    occupation: z.string().optional()
  })).min(1),
  emergencyContacts: z.array(z.object({
    name: z.string().min(1),
    relationship: z.string().min(1),
    phone: z.string().min(1)
  })).min(1),
  bankingDetails: z.object({
    accountHolder: z.string().min(1),
    bankName: z.string().min(1),
    accountNumber: z.string().min(1),
    branchCode: z.string().min(1)
  }),
  termsAccepted: z.object({
    medical: z.boolean(),
    photo: z.boolean(),
    fieldTrip: z.boolean(),
    policies: z.boolean()
  })
});