import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: "50mb" }));

  // API Route: Download Standalone HTML Document
  app.get("/api/download-html", (req, res) => {
    const htmlPath = path.join(process.cwd(), "public", "DataLens_Documentacion.html");
    if (fs.existsSync(htmlPath)) {
      res.setHeader("Content-Disposition", 'attachment; filename="DataLens_Documentacion.html"');
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.sendFile(htmlPath);
    } else {
      return res.status(404).json({ error: "Documento HTML no encontrado" });
    }
  });

  // API Route: Get raw HTML content
  app.get("/api/raw-html", (req, res) => {
    const htmlPath = path.join(process.cwd(), "public", "DataLens_Documentacion.html");
    if (fs.existsSync(htmlPath)) {
      const content = fs.readFileSync(htmlPath, "utf-8");
      return res.type("text/html").send(content);
    } else {
      return res.status(404).send("Documento HTML no encontrado");
    }
  });

  // Vite middleware for development vs static for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
