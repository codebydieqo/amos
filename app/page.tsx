import PageHeader from "@/components/page-header";
import { cn } from "@/lib/utils";
import { getPosts } from "@/server/actions";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <PageHeader title="Home" />
      <Suspense
        fallback={
          <div className="w-full h-28 grid place-items-center">
            <Loader2Icon size={20} className="animate-spin" />
          </div>
        }
      >
        <Posts />
      </Suspense>
    </div>
  );
}

async function Posts() {
  const data = await getPosts();

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2">
      {data.map((article, index) => (
        <Link href={`/article/${article.id}`} className="w-full aspect-video">
          <div
            className={cn(
              "w-full h-full px-5 py-2.5 border-b hover:bg-input/50 flex flex-col justify-between",
              (index + 1) % 2 !== 0 && "border-r"
            )}
            key={article.id}
          >
            <div>
              <p className="text-3xl font-semibold">{article.title}</p>
              <p></p>
            </div>
            <div className="w-full flex justify-end">
              <p className="text-sm text-muted-foreground">
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(article.created_at)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
