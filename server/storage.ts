import { applications, type Application, type InsertApplication } from "@shared/schema";
import { nanoid } from "nanoid";

export interface IStorage {
  createApplication(application: InsertApplication): Promise<Application>;
  getApplication(id: number): Promise<Application | undefined>;
  getApplicationByReference(reference: string): Promise<Application | undefined>;
  updateApplication(id: number, application: Partial<Application>): Promise<Application>;
  listApplications(): Promise<Application[]>;
}

export class MemStorage implements IStorage {
  private applications: Map<number, Application>;
  private currentId: number;

  constructor() {
    this.applications = new Map();
    this.currentId = 1;
  }

  async createApplication(insertApp: InsertApplication): Promise<Application> {
    const id = this.currentId++;
    const referenceNumber = nanoid(10).toUpperCase();
    
    const application: Application = {
      id,
      referenceNumber,
      status: "draft",
      ...insertApp
    };

    this.applications.set(id, application);
    return application;
  }

  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationByReference(reference: string): Promise<Application | undefined> {
    return Array.from(this.applications.values()).find(
      (app) => app.referenceNumber === reference
    );
  }

  async updateApplication(id: number, updates: Partial<Application>): Promise<Application> {
    const existing = await this.getApplication(id);
    if (!existing) throw new Error("Application not found");

    const updated = { ...existing, ...updates };
    this.applications.set(id, updated);
    return updated;
  }

  async listApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }
}

export const storage = new MemStorage();
