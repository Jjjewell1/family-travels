import { NextRequest, NextResponse } from "next/server";

const IMMICH_API_URL = process.env.IMMICH_API_URL?.trim().replace(/\/$/, "");
const IMMICH_API_KEY = process.env.IMMICH_API_KEY?.trim();

function getImmichProxyHeaders() {
  const headers = new Headers();
  headers.set("accept", "application/octet-stream");
  if (IMMICH_API_KEY) {
    headers.set("x-api-key", IMMICH_API_KEY);
  }
  return headers;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ assetId: string }> }) {
  const { assetId } = await params;

  if (!IMMICH_API_URL || !IMMICH_API_KEY || !assetId) {
    return NextResponse.json({ error: "Immich configuration missing" }, { status: 500 });
  }



    const isThumbnail = request.nextUrl.searchParams.get("thumbnail") === "1";
  const targetUrl = `${IMMICH_API_URL}/asset/${isThumbnail ? "thumbnail" : "file"}/${assetId}`;


  try {
        const response = await fetch(targetUrl, {
      headers: getImmichProxyHeaders(),
    });

    if (!response.ok) {
      console.error(`Immich API error: ${response.status} ${response.statusText} for URL: ${targetUrl}`);
      return NextResponse.json({ 
        error: "Failed to fetch asset from Immich", 
        status: response.status,
        url: targetUrl 
      }, { status: response.status });
    }


    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await response.arrayBuffer();
    return new NextResponse(Buffer.from(arrayBuffer), {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Immich proxy request failed" }, { status: 502 });
  }
}
