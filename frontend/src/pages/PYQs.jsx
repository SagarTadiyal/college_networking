import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext";
import UploadDrawer from "@/components/UploadDrawer";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const PYQs = () => {
  const { user } = useContext(AuthContext)
  const [open, setOpen] = useState(false)

  const [pyqs, setPyqs] = useState();
  console.log("pyqs", pyqs)

  const fetchPyqs = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/fetch/pyq`);
    setPyqs(res.data.data)
  }

  useEffect(() => {
    fetchPyqs();
  }, [])


  const deletePyq = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete/pyq/${id}`)
      console.log(res.data)
      if (res.data.success) {
        toast.success(res.data.message)
        fetchPyqs();
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
          <h2 className="text-sm md:text-lg lg:text-2xl font-medium">Previous Year Question Papers</h2>
          {
            user?.isAdmin && <UploadDrawer open={open} setOpen={setOpen} fetchPyqs={fetchPyqs} page="pyq" title="Upload Previous Year Questions" desc="Upload PYQ's Efficiently and Easily."><Button className={"bg-white cursor-pointer"} onClick={() => setOpen(true)}>Upload Question Paper</Button></UploadDrawer>
          }

        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search question papers"
                className="pl-8"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="odd">Odd Semester</SelectItem>
                <SelectItem value="even">Even Semester</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dsa">Data Structures</SelectItem>
                <SelectItem value="dbms">DBMS</SelectItem>
                <SelectItem value="cn">Computer Networks</SelectItem>
                <SelectItem value="os">Operating Systems</SelectItem>
                <SelectItem value="toc">Theory of Computation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="2023">2023</TabsTrigger>
            <TabsTrigger value="2022">2022</TabsTrigger>
            <TabsTrigger value="2021">2021</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {pyqs?.map(pyq => (
              <Card key={pyq._id} className={"bg-white border-none"}>
                <CardHeader className="">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 rounded-md">
                        <FileText className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pyq.title}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {pyq?.subject}  {pyq.semester} Semester {pyq.year}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      PDF
                    </Badge>
                  </div>
                  <div className="">
                    {user?.isAdmin && <span onClick={() => deletePyq(pyq._id)}
                      className="float-right w-fit bg-gray-200 px-2 py-1 lg:px-4 lg:py-2 rounded-md text-sm text-gray-700 flex items-center gap-2 cursor-pointer">Delete <MdDelete size={20} /> </span>}
                  </div>
                </CardHeader>
                <CardFooter className="border-t py-3 flex justify-between">
                  <div className="text-sm text-gray-500">
                    {pyq.documentSize} MB • 20{pyq.pages} pages • {pyq.downloads} downloads
                  </div>
                  <a href={pyq.documentUrl} target="_blank">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="2023" className="space-y-4">
            {pyqs?.filter(pyq => pyq.year == "2023").map(pyq => (
              <Card key={pyq._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 rounded-md">
                        <FileText className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pyq.title}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {pyq.subject} • {pyq.sem} Semester {pyq.year}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      PDF
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="border-t py-3 flex justify-between">
                  <div className="text-sm text-gray-500">
                    {pyq.documentSize} MB • 20{pyq.pages} pages • 100{pyq.downloads} downloads
                  </div>

                  <a href={pyq.DocumentUrl} target="_blank">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="2022" className="space-y-4">
            {pyqs?.filter(pyq => pyq.year == "2022").map(pyq => (
              <Card key={pyq._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 rounded-md">
                        <FileText className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pyq.title}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {pyq.subject} • {pyq.sem} Semester {pyq.year}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      PDF
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="border-t py-3 flex justify-between">
                  <div className="text-sm text-gray-500">
                    {pyq.documentSize} MB • 20{pyq.pages} pages • 100{pyq.downloads} downloads
                  </div>

                  <a href={pyq.DocumentUrl} target="_blank">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="2021" className="space-y-4">
            {pyqs?.filter(pyq => pyq.year == "2021").map(pyq => (
              <Card key={pyq._id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-100 rounded-md">
                        <FileText className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pyq.title}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {pyq.subject} • {pyq.sem} Semester {pyq.year}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-gray-100">
                      PDF
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="border-t py-3 flex justify-between">
                  <div className="text-sm text-gray-500">
                    {pyq.documentSize} MB • 20{pyq.pages} pages • 100{pyq.downloads} downloads
                  </div>

                  <a href={pyq.DocumentUrl} target="_blank">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

    </div>
  );
};

export default PYQs;
