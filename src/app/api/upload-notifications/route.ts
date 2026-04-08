import { NextResponse } from "next/server";
import { sendAdminUploadNotification } from "@/lib/adminNotifications";

type RequestPayload = {
  uploadId?: string;
};

export async function POST(request: Request) {
  let payload: RequestPayload;

  try {
    payload = (await request.json()) as RequestPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload.uploadId) {
    return NextResponse.json({ error: "uploadId is required" }, { status: 400 });
  }

  try {
    const result = await sendAdminUploadNotification({
      uploadId: payload.uploadId,
      appBaseUrl: new URL(request.url).origin,
    });

    return NextResponse.json(result, {
      status: result.notified ? 200 : 202,
    });
  } catch (error) {
    console.error("Failed to send admin upload notification", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}