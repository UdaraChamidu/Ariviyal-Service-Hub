import { Users, MessageSquare, Heart, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/LanguageContext";

// todo: remove mock functionality - integrate with Firebase

const communityPosts = [
  {
    id: "1",
    author: "Kavitha P.",
    avatar: "KP",
    time: "2 hours ago",
    content: "Anyone know where I can find good photocopying services near the Science faculty? Need to copy notes urgently!",
    likes: 12,
    replies: 5,
    tags: ["question", "science-faculty"],
  },
  {
    id: "2",
    author: "Nuwan J.",
    avatar: "NJ",
    time: "5 hours ago",
    content: "Just found an amazing kottu place on Stanley Road! Rs. 400 for a massive portion. Highly recommend for fellow foodies.",
    likes: 34,
    replies: 8,
    tags: ["food", "recommendation"],
  },
  {
    id: "3",
    author: "Amaya S.",
    avatar: "AS",
    time: "1 day ago",
    content: "PSA: The library will be closed this Saturday for maintenance. Plan your study sessions accordingly!",
    likes: 56,
    replies: 3,
    tags: ["announcement", "library"],
  },
];

export default function Community() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 rounded-full p-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t("communityTitle")}</h1>
            <p className="text-muted-foreground">
              {t("communityDescription")}
            </p>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="flex-1 justify-start text-muted-foreground">
                {t("sharePlaceholder")}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {communityPosts.map((post) => (
            <Card key={post.id} className="hover-elevate" data-testid={`card-post-${post.id}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{post.author}</CardTitle>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-3 border-t">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Heart className="h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {post.replies}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                    <Share2 className="h-4 w-4" />
                    {t("share")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
