import { readFile } from "fs/promises";
import path from "path";

const uploadsDirectory = path.join(process.cwd(), ".data", "uploads");
const outputsDirectory = path.join(process.cwd(), ".data", "outputs");

function pickDirectory(type: string | null) {
  return type === "output" ? outputsDirectory : uploadsDirectory;
}

function pickContentType(fileName: string, type: string | null) {
  if (fileName.endsWith(".json")) {
    return "application/json; charset=utf-8";
  }

  if (fileName.endsWith(".mp3")) {
    return "audio/mpeg";
  }

  if (fileName.endsWith(".srt")) {
    return "application/x-subrip; charset=utf-8";
  }

  if (fileName.endsWith(".vtt")) {
    return "text/vtt; charset=utf-8";
  }

  if (type === "output" && fileName.endsWith(".txt")) {
    return "text/plain; charset=utf-8";
  }

  if (fileName.endsWith(".mp4")) {
    return "video/mp4";
  }

  if (fileName.endsWith(".mov")) {
    return "video/quicktime";
  }

  if (fileName.endsWith(".mkv")) {
    return "video/x-matroska";
  }

  return "application/octet-stream";
}

export async function GET(
  request: Request,
  context: { params: Promise<{ fileName: string }> },
) {
  const { fileName } = await context.params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const directory = pickDirectory(type);
  const target = path.join(directory, fileName);

  try {
    const file = await readFile(target);

    return new Response(file, {
      headers: {
        "Content-Type": pickContentType(fileName, type),
        "Content-Disposition": `inline; filename="${fileName}"`,
      },
    });
  } catch {
    return Response.json({ error: "File not found" }, { status: 404 });
  }
}
