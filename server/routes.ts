import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { applicationFormSchema } from "@shared/schema";
import multer from "multer";
import { z } from "zod";
import { appendToSheet } from "./utils/sheets";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create new application
  app.post("/api/applications", async (req, res) => {
    try {
      const data = applicationFormSchema.parse(req.body);
      const application = await storage.createApplication(data);

      // Save to Google Sheets
      try {
        await appendToSheet(data);
        console.log("Data saved to Google Sheets successfully");
      } catch (sheetError) {
        console.error("Error saving to Google Sheets:", sheetError);
        // Don't fail the request if Google Sheets save fails
      }

      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error creating application:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Upload student photo
  app.post("/api/applications/:id/photo", upload.single("photo"), async (req, res) => {
    try {
      const { id } = req.params;
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const photoBase64 = req.file.buffer.toString("base64");
      const application = await storage.updateApplication(Number(id), {
        studentPhoto: photoBase64
      });

      res.json(application);
    } catch (error) {
      console.error("Error uploading photo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get application by ID
  app.get("/api/applications/:id", async (req, res) => {
    const application = await storage.getApplication(Number(req.params.id));
    if (!application) {
      res.status(404).json({ error: "Application not found" });
    } else {
      res.json(application);
    }
  });

  // Get application by reference number
  app.get("/api/applications/reference/:ref", async (req, res) => {
    const application = await storage.getApplicationByReference(req.params.ref);
    if (!application) {
      res.status(404).json({ error: "Application not found" });
    } else {
      res.json(application);
    }
  });

  // Update application
  app.patch("/api/applications/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const application = await storage.updateApplication(Number(id), updates);
      res.json(application);
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}