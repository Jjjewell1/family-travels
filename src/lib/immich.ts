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

export async function getAlbumAssets(albumId: string): Promise<ImmichAsset[]> {
  if (!albumId || !IMMICH_API_URL || !IMMICH_API_KEY) {
    return [];
  }

  const normalizedAlbumId = albumId.trim();

  try {
    const response = await fetch(`${IMMICH_API_URL}/albums/${normalizedAlbumId}/assets`, {
      headers: getImmichHeaders(),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as unknown;

    if (Array.isArray(payload)) {
      return payload.filter((asset): asset is ImmichAsset => Boolean((asset as ImmichAsset)?.id));
    }

    if (payload && typeof payload === "object") {
      const assets = (payload as { assets?: ImmichAsset[] }).assets;
      if (Array.isArray(assets)) {
        return assets.filter((asset): asset is ImmichAsset => Boolean(asset?.id));
      }
    }

    return [];
  } catch {
    return [];
  }
}
