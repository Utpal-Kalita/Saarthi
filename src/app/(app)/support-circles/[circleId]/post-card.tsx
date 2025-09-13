"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { MessageSquare, ThumbsUp } from "lucide-react";

type Post = {
  id: string;
  author: { name: string; avatarColor: string };
  title: string;
  content: string;
  upvotes: number;
  comments: any[];
};

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">{post.title}</CardTitle>
        <p className="text-xs text-muted-foreground">Posted by {post.author.name}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
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
  );
}
