import { SUPPORT_CIRCLES, MOCK_POSTS } from "@/lib/constants";
import { notFound } from "next/navigation";
import { ShieldCheck, PlusCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PostCard } from "./post-card";

export default function SupportCirclePage({ params }: { params: { circleId: string } }) {
  const circle = SUPPORT_CIRCLES.find((c) => c.id === params.circleId);
  const posts = MOCK_POSTS[params.circleId] || [];

  if (!circle) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-muted rounded-full">
            <circle.icon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">{circle.title}</h1>
        </div>
        <p className="text-muted-foreground">{circle.description}</p>
      </header>
      
      <Alert variant="default" className="bg-primary/10 border-primary/20">
        <ShieldCheck className="h-4 w-4" />
        <AlertTitle className="font-semibold">Community Guidelines</AlertTitle>
        <AlertDescription>
          This is a safe and anonymous space. Please be respectful and supportive. Harmful content will be removed by moderators.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link href={`/support-circles/${params.circleId}/${post.id}`} key={post.id} className="block">
              <PostCard post={post} />
            </Link>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No posts in this circle yet.</p>
            <p>Be the first to start a conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
}
