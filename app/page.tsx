import { getAllBookmarks, getBookmarkByTag, getAllTags } from "@/lib/raindrop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "@/lib/raindrop";

import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const { items: allBookmarks } = await getAllBookmarks();
  const selectedTag = searchParams.tag || null;

  let bookmarks = allBookmarks;
  if (selectedTag) {
    const { items: filteredBookmarks } = await getBookmarkByTag(selectedTag);
    bookmarks = filteredBookmarks;
  }

  const allTags = await getAllTags();

  return (
    <main className="p-12 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">My Bookmarks</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter by Tag:</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <Link href="/">All</Link>
          </Badge>

          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "secondary"}
              className="cursor-pointer"
            >
              <Link href={selectedTag === tag ? "/" : `/?tag=${tag}`}>
                {tag}
              </Link>
            </Badge>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark._id} bookmark={bookmark} />
        ))}
      </div>
    </main>
  );
}

const BookmarkCard = ({ bookmark }: { bookmark: Bookmark }) => {
  return (
    <Card>
      <img src={bookmark.cover} alt={bookmark.title} width={100} height={100} />
      <CardHeader>
        <CardTitle>
          <Link
            href={`/${bookmark.slug}`}
            className="text-blue-500 hover:underline"
          >
            {bookmark.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{bookmark.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {bookmark.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              <Link href={`/?tag=${tag}`}>{tag}</Link>
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
