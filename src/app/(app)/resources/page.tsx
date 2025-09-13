import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const articles = [
  { id: "1", title: "Managing Exam Stress", category: "Academic", imageId: "1", lang: "en" },
  { id: "2", title: "Introduction to Mindfulness", category: "Well-being", imageId: "2", lang: "en" },
  { id: "3", title: "Healthy Digital Habits", category: "Lifestyle", imageId: "3", lang: "en" },
  { id: "4", title: "Communicating with Family", category: "Relationships", imageId: "4", lang: "en" },
  { id: "1", title: "পৰীক্ষাৰ মানসিক চাপৰ ব্যৱস্থাপনা", category: "शैक्षिक", imageId: "1", lang: "as" },
  { id: "2", title: "সচেতনতাৰ পৰিচয়", category: "স্বাস্থ্য", imageId: "2", lang: "as" },
  { id: "3", title: "সুস্থ ডিজিটেল অভ্যাস", category: "জীৱনশৈলী", imageId: "3", lang: "as" },
  { id: "4", title: "পৰিয়ালৰ সৈতে ആശയ разদান", category: "সম্পৰ্ক", imageId: "4", lang: "as" },
];

function ResourceCard({ articleId, title, category, imageId }: { articleId: string; title: string; category: string; imageId: string; }) {
  const image = PlaceHolderImages.find(img => img.id === imageId);
  if (!image) return null;

  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative w-full h-48">
        <Image
          src={image.imageUrl}
          alt={image.description}
          fill
          className="object-cover"
          data-ai-hint={image.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{image.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Resources Hub</h1>
        <p className="text-muted-foreground">
          Culturally relevant articles and guides to support your well-being journey.
        </p>
      </div>

      <Tabs defaultValue="english" className="w-full">
        <TabsList>
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="assamese">Assamese (অসমীয়া)</TabsTrigger>
        </TabsList>
        <TabsContent value="english">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {articles.filter(a => a.lang === 'en').map((article) => (
              <ResourceCard
                key={`en-${article.id}`}
                articleId={article.id}
                title={article.title}
                category={article.category}
                imageId={article.imageId}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="assamese">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
            {articles.filter(a => a.lang === 'as').map((article) => (
              <ResourceCard
                key={`as-${article.id}`}
                articleId={article.id}
                title={article.title}
                category={article.category}
                imageId={article.imageId}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
