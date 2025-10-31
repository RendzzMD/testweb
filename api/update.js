import fetch from "node-fetch";

export default async function handler(req, res) {
  // Batasi hanya POST request
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Gunakan POST method!" });
  }

  const { message } = await req.json();

  // ====== SETTING DI SINI BRO ======
  const GITHUB_USER = "RendzzMD"; // ganti dengan username GitHub lo
  const REPO = "testweb";       // ganti dengan nama repo lo
  const FILE_PATH = "data.json";
  const TOKEN = "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";      // ganti dengan token GitHub lo
  // =================================

  const fileUrl = `https://api.github.com/repos/${GITHUB_USER}/${REPO}/contents/${FILE_PATH}`;

  // Ambil data.json lama
  const oldData = await fetch(fileUrl, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  }).then(r => r.json());

  // Decode base64 → ubah → encode lagi
  const content = Buffer.from(oldData.content, "base64").toString();
  const json = JSON.parse(content);
  json.notif.message = message;

  const updatedContent = Buffer.from(JSON.stringify(json, null, 2)).toString("base64");

  // Update file di GitHub
  await fetch(fileUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: `Update notif: ${message}`,
      content: updatedContent,
      sha: oldData.sha
    })
  });

  res.status(200).json({ success: true, message: "Notifikasi dikirim ke semua user!" });
    }
