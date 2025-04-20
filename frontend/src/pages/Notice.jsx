import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calendar, Clock, Delete, DeleteIcon, FileText, Users } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Switch } from "@/components/ui/switch";
import { AuthContext } from "@/context/authContext";
import { MdDelete } from "react-icons/md";

const Notice = () => {
    const { user } = useContext(AuthContext)
    const [formData, setFormData] = useState({ title: "", description: "", tag: "" });
    const [isPinned, setIsPinned] = useState(false)
    const [open, setOpen] = useState(false);
    const [notices, setNotices] = useState([{
        id: 1,
        title: "End Semester Examination Schedule",
        category: "Academic",
        date: "Nov 15, 2023",
        content: "The End Semester Examinations for all departments will commence from December 10, 2023. The detailed schedule is available on the college website. Students are advised to clear all dues before collecting their admit cards.",
        important: true,
    }]);

    const getCategoryColor = (category) => {
        switch (category) {
            case "Academic":
                return "bg-blue-100 text-blue-800";
            case "Event":
                return "bg-purple-100 text-purple-800";
            case "Administrative":
                return "bg-gray-100 text-gray-800";
            case "Placement":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const fetchNotices = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/fetch/notices`);
        setNotices(res.data.data)
    }

    useEffect(() => {
        fetchNotices();
    }, [])

    const handleSubmit = async (e) => {
        if (!formData.title || !formData.description || !formData.tag) {
            toast.error("All Fields are neccessary")
            return
        }

        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/upload/notice`, { ...formData, user, isPinned })
            if (res.data.success) {
                toast.success(res.data.message)
                setFormData({ title: "", description: "", tag: "" })
                setIsPinned(false)
                setOpen(false)
                fetchNotices();
            } else {
                toast.error(res.data.message)
            }


        } catch (error) {
            console.log(error)
        }
    }

    const deleteNotice = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete/notice/${id}`)
            if (res.data.success) {
                toast.success(res.data.message)
                fetchNotices();
            } else {
                toast.error(res.data.message)
            }


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-1 container mx-auto px-4 py-8">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm md:text-lg lg:text-2xl font-medium">Notices & Announcements</h2>
                    {/* UploadDrawer */}
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            {user?.isAdmin && <Button className={"bg-white cursor-pointer"}>Upload Notice</Button>}
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader>
                                    <DrawerTitle className={"text-md md:text-lg lg:text-2xl"}>Post New Notice</DrawerTitle>
                                    <DrawerDescription>Keep students notified with updates.</DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 pb-0 space-y-2">
                                    <div className="flex flex-col gap-2">
                                        <label>Title:</label>
                                        <input type="text" value={formData.title} name="title" placeholder="Enter your title" className="border w-full p-2 rounded-md" onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label>Description:</label>
                                        <textarea placeholder="Enter Description" value={formData.description} name="description" className="border w-full p-2 rounded-md"
                                            onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                                        />
                                    </div>

                                    <div className="flex flex-col md:justify-between md:flex-row gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label>Tags:</label>
                                            <Select value={formData.tag} onValueChange={(value) => setFormData(prev => ({ ...prev, tag: value }))}>
                                                <SelectTrigger className={"text-white"}>
                                                    <SelectValue placeholder="Select Tag" />
                                                </SelectTrigger>
                                                <SelectContent className={"text-white"}>
                                                    <SelectItem value="General">General</SelectItem>
                                                    <SelectItem value="Academics">Academics</SelectItem>
                                                    <SelectItem value="Event">Event</SelectItem>
                                                    <SelectItem value="Administrative">Administrative
                                                    </SelectItem>
                                                    <SelectItem value="Placement">Placement
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex flex-col gap-2 ">
                                            <label htmlFor="isPinned">Pin this Notice</label>
                                            <Switch id="isPinned" onCheckedChange={setIsPinned} />
                                        </div>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button className={"bg-red-600 cursor-pointer"} onClick={handleSubmit}>Submit</Button>
                                    <DrawerClose asChild >
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>

                </div>

                <div className="space-y-4">
                    {notices?.map(notice => (
                        <Card key={notice._id} className={notice.isPinned ? "border-l-4 border-l-red-500 bg-white border-none" : "bg-white border-none"}>
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <CardTitle className="text-md lg:text-lg">{notice.title}</CardTitle>
                                            {notice.isPinned && (
                                                <Badge variant="destructive" className="flex items-center gap-1">
                                                    <AlertCircle className="h-3 w-3" />
                                                    Important
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <Badge variant="outline" className={getCategoryColor(notice.tag)}>
                                                {notice.tag}
                                            </Badge>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(notice.createdAt)?.toDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* delete button */}
                                    {user?.isAdmin && <span onClick={() => deleteNotice(notice._id)}
                                        className="float-right bg-gray-200 px-2 py-1 lg:px-4 lg:py-2 rounded-md text-sm text-gray-700 flex items-center gap-2 cursor-pointer">Delete <MdDelete size={20} /> </span>}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">{notice.description}</p>
                            </CardContent>
                            <CardFooter className="border-t py-2 text-sm text-gray-500">
                                {notice.category === "Event" && (
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        <span>Registration required</span>
                                    </div>
                                )}
                                {notice.tag === "Academic" && (
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4" />
                                        <span>View full schedule</span>
                                    </div>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

        </div>
    );
};

export default Notice;
