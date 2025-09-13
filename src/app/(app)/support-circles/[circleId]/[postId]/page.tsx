import { SUPPORT_CIRCLES, MOCK_POSTS } from "@/lib/constants";
import { notFound } from "next/navigation";
import { notFound as notFoundNext } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, CornerDownLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PostPage({ params }: { params: { circleId: string; postId: string } }) {
  const circle = SUPPORT_CIRCLES.find((c) => c.id === params.circleId);
  const posts = MOCK_POSTS[params.circleId] || [];
  const post = posts.find((p) => p.id === params.postId);

  if (!circle || !post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Post */}
      <Card>
        <CardHeader>
          <p className="text-sm text-muted-foreground">Posted by {post.author.name}</p>
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base whitespace-pre-wrap">{post.content}</p>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1 mr-4">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.upvotes} Upvotes</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments.length} Comments</span>
          </div>
        </CardFooter>
      </Card>
      
      {/* Add Comment */}
      <Card>
          <CardContent className="pt-6">
              <div className="space-y-2">
                <Textarea placeholder="Write a comment..." rows={3}/>
                <div className="flex justify-end">
                    <Button>
                        <CornerDownLeft className="h-4 w-4 mr-2" />
                        Post Comment
                    </Button>
                </div>
              </div>
          </CardContent>
      </Card>

      <Separator />

      {/* Comments Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Comments</h2>
        {post.comments.length > 0 ? (
          post.comments.map((comment, index) => (
            <Card key={index} className="bg-muted/50">
              <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
                 <Avatar className="h-8 w-8 border">
                  <AvatarFallback className={comment.author.avatarColor}>
                    {comment.author.name.charAt(10)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold">{comment.author.name}</p>
              </CardHeader>
              <CardContent>
                <p>{comment.content}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
