
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Calendar, Bell, TrendingUp, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState();

  const fetchDashboardData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/fetch/dashboardData`);
    setDashboardData(res.data.data)
    console.log(res.data)
  }

  useEffect(() => {
    fetchDashboardData();

  }, [])
  const stats = [
    {
      title: "Total Students",
      value: dashboardData?.totalUser,
      description: "Active users in the network",
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      growth: "+12%",
    },
    {
      title: "Study Resources",
      value: dashboardData?.noOfStudyMaterial,
      description: "Available learning materials",
      icon: BookOpen,
      iconColor: "text-green-500",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      growth: "+8%",
    },
    {
      title: "Upcoming Events",
      value: dashboardData?.noOfNotice,
      description: "Events in the next 30 days",
      icon: Calendar,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
      growth: "+3",
    },
    {
      title: "New Notices",
      value: dashboardData?.noOfNotice,
      description: "Unread announcements",
      icon: Bell,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200",
      growth: "+5",
    },
  ];

  const activities = [
    {
      title: "New study material uploaded",
      description: "Data Structures and Algorithms - Graph Theory",
      time: "2 hours ago",
      icon: BookOpen,
      iconColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Discussion forum activity",
      description: "15 new responses to your post about Web Development",
      time: "Yesterday",
      icon: MessageSquare,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Important notice posted",
      description: "End Semester Exam Schedule Released",
      time: "2 days ago",
      icon: Bell,
      iconColor: "text-red-500",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border-l-4 rounded-lg bg-white py-2" style={{ borderLeftColor: `var(--${stat.iconColor.split('-')[1]}-500)` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-full`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                  <div className="ml-2 flex items-center text-xs font-medium text-green-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.growth}
                  </div>
                </div>
                <CardDescription className="mt-1">{stat.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Recent Activity</h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-5">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`flex-shrink-0 h-12 w-12 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                  <activity.icon className={`h-6 w-6 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
