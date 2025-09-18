import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Users, FileText, Ear } from "lucide-react";

const teacherModules = [
  {
    title: "Understanding Adolescent Mental Health Vocabulary",
    description: "Learn the common vocabulary and concepts related to youth mental wellness.",
    icon: BookOpen,
  },
  {
    title: "Creating a Mentally Healthy Classroom Environment",
    description: "Strategies for fostering a supportive and open environment for students.",
    icon: Users,
  },
  {
    title: "Recognizing Early Signs of Distress",
    description: "Identify subtle behavioral changes that may indicate a student is struggling.",
    icon: FileText,
  },
   {
    title: "Effective Communication & Empathetic Listening",
    description: "Learn techniques to listen and validate your child's feelings without judgment.",
    icon: Ear,
  },
  {
    title: "Clear Referral Protocols for School Counselors & Saarthi",
    description: "Understand the clear steps for escalating concerns to counselors and leveraging the platform.",
    icon: Video,
  },
];

const parentResources = [
  {
    title: "Workshop: Reducing Stigma at Home",
    description: "Join our virtual workshop on how to talk openly about mental health with your child.",
    icon: Users,
  },
  {
    title: "Guide: Promoting a Healthy Digital Lifestyle",
    description: "Read our guide on managing screen time and promoting positive internet habits.",
    icon: FileText,
  },
  {
    title: "Article: The Power of Empathetic Listening",
    description: "Learn techniques to listen and validate your child's feelings without judgment.",
    icon: BookOpen,
  },
];

export default function PortalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-headline">Teacher & Parent Portal</h1>
        <p className="text-muted-foreground mt-2">
          Resources to help build a supportive ecosystem for our youth.
        </p>
      </div>

      <Tabs defaultValue="teachers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teachers">For Teachers</TabsTrigger>
          <TabsTrigger value="parents">For Parents</TabsTrigger>
        </TabsList>
        <TabsContent value="teachers">
          <Card>
            <CardHeader>
              <CardTitle>Micro-learning Modules</CardTitle>
              <CardDescription>
                Short, targeted training modules to equip teachers with the skills to support student well-being.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {teacherModules.map((module) => (
                  <Card key={module.title} className="bg-muted/50">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <module.icon className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="parents">
          <Card>
            <CardHeader>
              <CardTitle>Workshops & Resources</CardTitle>
              <CardDescription>
                Engaging content to help parents foster a supportive home environment.
              </CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {parentResources.map((resource) => (
                  <Card key={resource.title} className="bg-muted/50">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <resource.icon className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
