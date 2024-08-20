const BASE_URL = "https://api.raindrop.io/rest/v1";

export interface Bookmark {
  _id: number;
  link: string;
  title: string;
  excerpt: string;
  note: string;
  type: string;
  user: {
    $ref: string;
    $id: number;
  };
  cover: string;
  media: Array<{
    link: string;
    type: string;
  }>;
  tags: string[];
  important: boolean;
  reminder: {
    date: string | null;
  };
  removed: boolean;
  created: string;
  collection: {
    $ref: string;
    $id: number;
    oid: number;
  };
  highlights: any[];
  lastUpdate: string;
  domain: string;
  creatorRef: {
    _id: number;
    avatar: string;
    name: string;
    email: string;
  };
  sort: number;
  broken: boolean;
  cache: {
    status: string;
    size: number;
    created: string;
  };
  collectionId: number;
}

interface RaindropResponse {
  result: boolean;
  items: Bookmark[];
  count: number;
  collectionId: number;
}

async function fetchRaindropData(endpoint: string): Promise<RaindropResponse> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `${process.env.RAINDROP_AUTHORIZATION}`,
    },
  });
  return await res.json();
}

export async function getAllBookmarks(): Promise<RaindropResponse> {
  return fetchRaindropData(`/raindrops/${process.env.RAINDROP_COLLECTION_ID}`);
}

export async function getBookmarkById(id: string): Promise<RaindropResponse> {
  return fetchRaindropData(`/raindrops/${id}`);
}

export async function getBookmarkByTag(tag: string): Promise<RaindropResponse> {
  return fetchRaindropData(
    `/raindrops/${process.env.RAINDROP_COLLECTION_ID}?search=[{"key":"tag","val":"${tag}"}]`
  );
}

export async function getBookmarkByCollection(
  collection: string
): Promise<RaindropResponse> {
  return fetchRaindropData(`/raindrops/${collection}`);
}

export async function getAllTags(): Promise<string[]> {
  const response = await fetchRaindropData(
    `/tags/${process.env.RAINDROP_COLLECTION_ID}`
  );
  return response.items.map((item: any) => item._id);
}

export async function searchBookmarks(
  query: string
): Promise<RaindropResponse> {
  return fetchRaindropData(
    `/raindrops/${
      process.env.RAINDROP_COLLECTION_ID
    }?search=${encodeURIComponent(query)}`
  );
}

export async function getRecentBookmarks(
  limit: number = 10
): Promise<RaindropResponse> {
  return fetchRaindropData(
    `/raindrops/${process.env.RAINDROP_COLLECTION_ID}?sort=-created&perpage=${limit}`
  );
}

export async function getBookmarksByDomain(
  domain: string
): Promise<RaindropResponse> {
  return fetchRaindropData(
    `/raindrops/${process.env.RAINDROP_COLLECTION_ID}?search=[{"key":"domain","val":"${domain}"}]`
  );
}
