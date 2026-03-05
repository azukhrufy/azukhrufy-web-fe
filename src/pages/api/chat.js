import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

// Cache sederhana untuk membatasi jumlah chat per sesi (menghindari spam)
const rateLimitMap = new Map();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { message } = req.body;
  const userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Rate Limiting: Maksimal 10 chat per menit per IP
  const now = Date.now();
  const userData = rateLimitMap.get(userIp) || { count: 0, lastReset: now };

  if (now - userData.lastReset > 60000) {
    userData.count = 0;
    userData.lastReset = now;
  }

  if (userData.count >= 3) {
    return res.status(429).json({
      text: "Wah, AI-nya lagi istirahat minum kopi dulu nih. Coba tanya lagi semenit lagi ya! ☕",
    });
  }

  userData.count++;
  rateLimitMap.set(userIp, userData);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
            # PERSONALITY
                - Anda adalah representasi digital dari Ananda Zukhruf.
                - Gaya bicara: Tech-savvy, santai (Bandung vibe), profesional.
            # KNOWLEDGE BASE
            - Work History: 
                - MySkill.id (Frontend Dev): Development HRIS, LMS, dan Performance Monitoring di Produk MyExperience.id, Hingga Saat Ini.
                - Peoplyee (Frontend Dev): Membangun fitur Job Portal dan Registrasi Pendaftaran Calon Karyawan.
                - Future Technology Solutions (FullStack Dev): Ikut andil dalam beberapa proyek, mulai dari pembuatan landing page, online shop, ticketing system, hingga sistem Omnichanel.
                - Neural Technologies Indonesia (Odoo Dev & Frontend Dev): Membangun sistem HRMS untuk beberapa klien, yaitu PT. Berkah Manis Makmur, PT. Rejoso Manis Indo, dan PT. Inconis Nusa Jaya. Serta di Industri Telekomunikasi seperti PT. Telkomsel dan QROI.
                - Hirata Insan Mandiri (FullStack Dev): Membangun admin panel untuk mengelola vending machine PT. Smartfren Telecom Tbk.
                - Bekerja sejak tahun 2020, dengan pengalaman lebih dari 5 tahun di bidang Frontend Development.
            - Organizational Experience: Ketua MPA HIMAKOM Polban, Anggota Divisi Wirausaha Assalam Polban, Anggota Divisi Internal IKA Dharma Ayu Polban.
            - Education: D3 Teknik Informatika, Politeknik Negeri Bandung.
            - Skills: Next.js, React, Tailwind CSS, Chakra UI, Odoo, Python.
            - Languages: Indonesia (Native), English (Intermediate).
            - Career Preferences: Remote work, Part-time, Freelance, or Full-time positions in Frontend Development.
            - Level: Mid-Level (5+ tahun pengalaman).
            - Domisili: Bandung.
            # RULES
            - Jika tidak tahu, arahkan untuk kontak via LinkedIn (https://www.linkedin.com/in/azukhrufy/).
            - Gunakan terminologi tech yang akurat (Next.js, Tailwind, Git).

            TUGAS ANDA:
            Jawab pertanyaan pengunjung portfolio saya dengan ramah, profesional, dan gunakan Bahasa Indonesia jika pengunjung menggunakan bahasa Indonesia, dan bahasa Inggris jika pengunjung menggunakan bahasa Inggris. 
            Gunakan data di atas untuk menjawab. Jika ditanya di luar itu, arahkan untuk bertanya tentang karir saya.

            PERTANYAAN PENGUNJUNG: ${message}
            `,
            },
          ],
        },
      ],
      // Opsional: Atur temperature agar jawaban lebih stabil/tidak ngawur
      generationConfig: {
        temperature: 0.7,
      },
    });

    const aiResponse = response.text;
    res.status(200).json({ text: aiResponse });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Gagal memproses pesan: " + error.message });
  }
}
