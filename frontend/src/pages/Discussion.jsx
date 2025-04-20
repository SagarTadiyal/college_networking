
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Share, MessageCircle, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const Discussion = () => {
    const { user } = useContext(AuthContext)
    const discussions = [
        {
            id: 1,
            title: "Tips for upcoming Data Structures exam?",
            author: "Priya Singh",
            time: "2 hours ago",
            content: "Hey everyone! The Data Structures exam is next week. Does anyone have good resources or tips to prepare? I'm particularly struggling with Graph algorithms and Dynamic Programming.",
            likes: 24,
            comments: 15,
        },
        {
            id: 2,
            title: "Project group for Web Development",
            author: "Rahul Kumar",
            time: "Yesterday",
            content: "Looking for 2 more members to join our web development project team. We're building a college event management system using React and Node.js. Experience with either would be helpful!",
            likes: 18,
            comments: 32,
        },
        {
            id: 3,
            title: "Internship opportunity at Tech Solutions",
            author: "Amit Patel",
            time: "3 days ago",
            content: "My company is looking for interns in software development. It's a 3-month paid internship with possibility of PPO. DM me if interested and I can refer you.",
            likes: 65,
            comments: 28,
        },
    ];

    return (
        <div className="flex flex-col min-h-screen ">

            <main className="flex-1 container mx-auto px-4 py-8">


                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-medium">Discussion Forum</h2>
                    {
                        user?.isAdmin && <Button className={"bg-white"}>New Post</Button>
                    }

                </div>


                <div className="space-y-4">
                    {discussions.map(discussion => (
                        <Card key={discussion.id} className="overflow-hidden bg-white pb-0">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-lg">{discussion.title}</CardTitle>
                                        <p className="text-sm text-gray-500">
                                            {discussion.author} • {discussion.time}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p>{discussion.content}</p>
                            </CardContent>
                            <CardFooter className="border-t bg-gray-50 py-2">
                                <div className="flex items-center space-x-6 text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <ThumbsUp className="h-4 w-4" />
                                        <span className="text-sm">{discussion.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-sm">{discussion.comments} comments</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Share className="h-4 w-4" />
                                        <span className="text-sm">Share</span>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

        </div>
    );
};

export default Discussion;
