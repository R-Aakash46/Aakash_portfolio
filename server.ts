import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// In-memory contact messages log (reloads on restart, perfect for preview demoing)
const contactMessages: Array<{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}> = [];

// Initialize Gemini SDK with User-Agent telemetry as mandated
const getGeminiClient = (): GoogleGenAI => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined. Resume parsing will rely on high-fidelity offline fallbacks.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "MOCK_KEY_FOR_BUILD",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Endpoint: Parse Resume using Gemini AI
app.post("/api/resume/parse", async (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length === 0) {
    return res.status(400).json({ error: "Resume text content is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Gemini API is unavailable because the GEMINI_API_KEY secret is not configured. Please add your GEMINI_API_KEY in Settings > Secrets."
    });
  }

  try {
    const ai = getGeminiClient();

    const prompt = `You are an expert talent acquisition assistant and software developer portfolio builder. 
Parse the following raw resume/profile text and structure it exactly into the specified JSON schema.
Ensure you expand upon the content to make it look professional, sleek, and highly descriptive if the input is sparse. 
Make sure project descriptions and bullet points are written in an action-oriented, professional engineering tone.
Categorize skills logically into groups like Frontend, Backend, AI & Cloud, or Tools.
Guess or approximate values where appropriate (e.g. skill proficiency levels between 70 and 98 based on relative seniority/use).

Resume Content to Parse:
"""
${resumeText}
"""`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You extract resume text into highly structured JSON portfolios. Return the precise JSON conforming strictly to the requested schema. Do not include markdown wraps or additional descriptions outside the JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["name", "title", "bio", "longBio", "location", "email", "skills", "experience", "projects", "education"],
          properties: {
            name: { type: Type.STRING, description: "Full name of the developer" },
            title: { type: Type.STRING, description: "Professional header/title (e.g., Lead Full Stack Engineer)" },
            bio: { type: Type.STRING, description: "A high-impact 1-sentence tagline biography" },
            longBio: { type: Type.STRING, description: "A rich, professional multi-sentence paragraph outlining background, expertise, and core passions." },
            location: { type: Type.STRING, description: "City and Country/State (e.g., Bangalore, India)" },
            email: { type: Type.STRING, description: "Email address" },
            github: { type: Type.STRING, description: "GitHub url snippet (e.g., github.com/vimalakumar202)" },
            linkedin: { type: Type.STRING, description: "LinkedIn url snippet (e.g., linkedin.com/in/vimalakumar)" },
            skills: {
              type: Type.ARRAY,
              description: "List of skill categories (aim for 2-4 categories like Frontend, Backend, etc.)",
              items: {
                type: Type.OBJECT,
                required: ["category", "items"],
                properties: {
                  category: { type: Type.STRING, description: "Name of the skill category (e.g., Frontend Development)" },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ["name", "level"],
                      properties: {
                        name: { type: Type.STRING, description: "Name of the skill/tech" },
                        level: { type: Type.INTEGER, description: "Proficiency level from 0 to 100" }
                      }
                    }
                  }
                }
              }
            },
            experience: {
              type: Type.ARRAY,
              description: "Professional job history",
              items: {
                type: Type.OBJECT,
                required: ["role", "company", "period", "description", "tags"],
                properties: {
                  role: { type: Type.STRING, description: "Job title / role" },
                  company: { type: Type.STRING, description: "Company name" },
                  period: { type: Type.STRING, description: "Employment period (e.g., 2022 - Present)" },
                  description: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "High-impact, action-oriented bullet points outlining accomplishments"
                  },
                  tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Tech keywords used in this role (e.g., React, Go, Docker)"
                  }
                }
              }
            },
            projects: {
              type: Type.ARRAY,
              description: "Main projects or open-source software built",
              items: {
                type: Type.OBJECT,
                required: ["title", "subtitle", "description", "tags", "detailedHighlights", "featured"],
                properties: {
                  title: { type: Type.STRING, description: "Name of the project" },
                  subtitle: { type: Type.STRING, description: "Short descriptive subtitle" },
                  description: { type: Type.STRING, description: "High-level summary of the project purpose" },
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
                  githubUrl: { type: Type.STRING, description: "GitHub repository URL or sample snippet" },
                  liveUrl: { type: Type.STRING, description: "Live deploy URL or sample snippet" },
                  detailedHighlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Detailed bullet points explaining how it was built and specific technical achievements"
                  },
                  featured: { type: Type.BOOLEAN, description: "Whether to feature this prominently in the hero highlights" }
                }
              }
            },
            education: {
              type: Type.ARRAY,
              description: "Degrees or academic background",
              items: {
                type: Type.OBJECT,
                required: ["degree", "school", "period"],
                properties: {
                  degree: { type: Type.STRING, description: "Degree / Course (e.g., B.E. Computer Science)" },
                  school: { type: Type.STRING, description: "University or institution name" },
                  period: { type: Type.STRING, description: "Years attended" },
                  description: { type: Type.STRING, description: "Brief notes on honors or specialization" }
                }
              }
            },
            certifications: {
              type: Type.ARRAY,
              description: "Professional industry certificates",
              items: {
                type: Type.OBJECT,
                required: ["title", "issuer", "date"],
                properties: {
                  title: { type: Type.STRING, description: "Certification title" },
                  issuer: { type: Type.STRING, description: "Issuing body (e.g., Google Cloud)" },
                  date: { type: Type.STRING, description: "Year of certification" }
                }
              }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text.trim());
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Resume parsing failed:", error);
    return res.status(500).json({
      error: "Could not parse the resume. Please check the content structure or try again.",
      details: error.message
    });
  }
});

// API Endpoint: Contact submissions
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message fields are required." });
  }

  const newMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name,
    email,
    subject: subject || "No Subject",
    message,
    timestamp: new Date().toISOString(),
  };

  contactMessages.unshift(newMessage);

  return res.json({
    success: true,
    message: "Message sent successfully!",
    loggedMessage: newMessage,
  });
});

// API Endpoint: Get list of submitted messages (for portfolio dashboard demonstration)
app.get("/api/contact/messages", (req, res) => {
  return res.json(contactMessages);
});

// API Endpoint: Upload profile image
app.post("/api/profile/upload", (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: "No image content provided." });
  }

  try {
    const matches = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: "Invalid image format." });
    }
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    // Ensure public folder exists
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Save to all locations to ensure immediate availability
    fs.writeFileSync(path.join(process.cwd(), "1000147191.png"), buffer);
    fs.writeFileSync(path.join(publicDir, "1000147191.png"), buffer);
    
    // Also save as profile.png
    fs.writeFileSync(path.join(process.cwd(), "profile.png"), buffer);
    fs.writeFileSync(path.join(publicDir, "profile.png"), buffer);

    const distDir = path.join(process.cwd(), "dist");
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, "1000147191.png"), buffer);
      fs.writeFileSync(path.join(distDir, "profile.png"), buffer);
    }

    return res.json({ success: true, message: "Image uploaded and saved successfully." });
  } catch (err: any) {
    console.error("Profile image upload failed:", err);
    return res.status(500).json({ error: "Failed to write image file", details: err.message });
  }
});

// Vite server orchestration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    // Serve from root & public as fallback in dev
    app.use(express.static(path.join(process.cwd(), "public")));
    app.use(express.static(process.cwd()));
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const publicPath = path.join(process.cwd(), "public");
    app.use(express.static(distPath));
    app.use(express.static(publicPath));
    app.use(express.static(process.cwd()));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
