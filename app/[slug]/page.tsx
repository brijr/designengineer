import { getBookmarkBySlug, getAllBookmarks } from "@/lib/raindrop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export async function generateStaticParams() {
  const { items: bookmarks } = await getAllBookmarks();
  return bookmarks.map((bookmark) => ({
    slug: bookmark.slug,
  }));
}

export default async function BookmarkPage({
  params,
}: {
  params: { slug: string };
}) {
  const { items } = await getBookmarkBySlug(params.slug);
  const bookmark = items[0];

  if (!bookmark) {
    return <div>Bookmark not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{bookmark.title}</h1>
      <div className="flex items-center mb-4">
        <img
          src={bookmark.cover}
          alt={bookmark.title}
          width={100}
          height={100}
          className="mr-4"
        />
        <div>
          <h2 className="text-lg font-semibold">{bookmark.title}</h2>
          <p className="mt-2">{bookmark.excerpt}</p>
          <div className="mt-2">
            {bookmark.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Tags</h2>
        <div className="flex flex-wrap">
          {bookmark.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
