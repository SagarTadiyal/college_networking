import React, { useContext, useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer"
import { Button } from './ui/button'
import Upload from '@/lib/Upload'
import { AuthContext } from '@/context/authContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const UploadDrawer = ({ children, title, page, desc, open, setOpen, fetchPyqs, fetchStudyMaterial }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [uploadData, setUploadData] = useState(null);
    const [subjectTitle, setSubjectTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [sem, setSem] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [year, setYear] = useState();


    const handleSubmit = async () => {
        console.log(page)
        if (page === "pyq" && (!uploadData || !subjectTitle || !subject || !sem || !subjectCode || !year)) {
            toast.error("All Fields are neccessary ");
            return
        } else if (page == "study-material" && (!uploadData || !subjectTitle || !subject)) {
            toast.error("All Fields are neccessary");
            return
        }

        try {
            console.log({ subjectTitle, subject, uploadData, user, sem, subjectCode });

            let res;
            page == "pyq" ? (res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/upload/pyq`, { subjectTitle, subject, uploadData: uploadData, user, sem, subjectCode, year })) : (
                res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/upload/studyMaterial`, { subjectTitle, subject, uploadData: uploadData, user }))

            console.log(res);
            if (res.data.success) {
                toast.success(res.data.message)
                setUploadData(null)
                setSubjectTitle("")
                setSubject("")
                setSem("")
                setSubjectCode("")
                setYear()
                page == "pyq" ? fetchPyqs() : fetchStudyMaterial()
            } else {
                toast.error(res.data.message)
            }

            setOpen(false);
        } catch (error) {
            console.log(error.message)
            alert("Something Went Wrong!")
        }
    }
    return (

        <Drawer open={open} onOpenChange={setOpen} className="bg-black">
            <DrawerTrigger asChild>
                <Button variant="outline" className="border-none">
                    {children}
                </Button>
            </DrawerTrigger>

            <DrawerContent className="max-h-screen px-4 ">
                {/* Full-height container */}
                <div className="h-[90vh] max-h-[90vh] w-full max-w-md mx-auto flex flex-col pb-20 ">

                    {/* Header - Fixed */}
                    <DrawerHeader className="shrink-0">
                        <DrawerTitle className="text-lg lg:text-2xl my-2">{title}</DrawerTitle>
                        <DrawerDescription>{desc}</DrawerDescription>
                    </DrawerHeader>

                    {/* Scrollable Body */}
                    <div className="overflow-y-auto flex-1 ">
                        <Upload
                            loading={loading}
                            setLoading={setLoading}
                            setUploadData={setUploadData}
                            setSubjectTitle={setSubjectTitle}
                            setSubject={setSubject}
                            user={user}
                            subjectTitle={subjectTitle}
                            uploadData={uploadData}
                            page={page}
                            setSem={setSem}
                            setSubjectCode={setSubjectCode}
                            setYear={setYear}
                        />

                        {/* Footer - Fixed */}
                        <DrawerFooter className="shrink-0">
                            <Button
                                className={`bg-red-800 ${loading ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" className="cursor-pointer" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>

    )
}

export default UploadDrawer