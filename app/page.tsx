import { getAllBookmarks } from "@/lib/raindrop";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function Home() {
  const { items: bookmarks } = await getAllBookmarks();

  return (
    <main className="p-12 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">My Bookmarks</h1>
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
          <a
            href={bookmark.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {bookmark.title}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{bookmark.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {bookmark.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
