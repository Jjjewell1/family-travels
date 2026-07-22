export type ImmichAsset = {
  id: string;
  originalFileName?: string;
  originalPath?: string;
  type?: string;
  mimeType?: string;
  [key: string]: unknown;
};

const IMMICH_API_URL = process.env.IMMICH_API_URL?.trim().replace(/\/$/, "");
const IMMICH_API_KEY = process.env.IMMICH_API_KEY?.trim();

function getImmichHeaders() {
  const headers = new Headers();
  headers.set("accept", "application/json");
  if (IMMICH_API_KEY) {
    headers.set("x-api-key", IMMICH_API_KEY);
  }
  return headers;
}

export function getImmichAssetUrl(assetId: string, isThumbnail = false) {
  if (!assetId) {
    return "/placeholder-image.svg";
  }

  const query = isThumbnail ? "?thumbnail=1" : "";
  return `/api/immich/asset/${assetId}${query}`;
}


function extractAssets(payload: unknown): ImmichAsset[] {
  if (Array.isArray(payload)) {
    return payload.filter((asset): asset is ImmichAsset => Boolean((asset as ImmichAsset)?.id));
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const record = payload as Record<string, unknown>;
  const candidateKeys = ["assets", "items", "mediaItems", "photos", "data", "results", "response", "assetIds"];

  for (const key of candidateKeys) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value.filter((asset): asset is ImmichAsset => Boolean((asset as ImmichAsset)?.id));
    }

    if (value && typeof value === "object") {
      const nested = extractAssets(value);
      if (nested.length) {
        return nested;
      }
    }
  }

  const nestedObject = Object.values(record).find((value) => value && typeof value === "object");
  if (nestedObject) {
    return extractAssets(nestedObject);
  }

  return [];
}

export async function getAlbumAssets(albumId: string): Promise<ImmichAsset[]> {
  if (!albumId || !IMMICH_API_URL || !IMMICH_API_KEY) {
    return [];
  }

  const normalizedAlbumId = albumId.trim();

  try {
    const response = await fetch(`${IMMICH_API_URL}/albums/${normalizedAlbumId}`, {
      headers: getImmichHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as unknown;
    return extractAssets(payload);
  } catch {
    return [];
  }
}
