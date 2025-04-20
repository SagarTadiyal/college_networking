import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Check } from 'lucide-react';
import { AuthContext } from '@/context/authContext';
import { useRef } from "react";

const Upload = ({ loading, setLoading, setSubjectTitle, setUploadData, setSubject, uploadData, subjectTitle, page, setSubjectCode, setSem, setYear }) => {

    const inputRef = useRef(null);

    const handleUpload = async (event) => {
        try {
            const file = event.target.files[0];
            if (!file || file.type !== "application/pdf") {
                alert("Please select a valid PDF.");
                return;
            }

            setLoading(true);

            // Get ImageKit auth params from your backend
            const res = await fetch("http://localhost:3000/authUpload");
            const auth = await res.json();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", file.name);
            formData.append("publicKey", "public_8nVtT/3HQHMbtctTrzsgalBp9YE="); // Replace with yours
            formData.append("signature", auth.signature);
            formData.append("expire", auth.expire);
            formData.append("token", auth.token);

            const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
                method: "POST",
                body: formData,
            });

            const data = await uploadRes.json();
            console.log("Uploaded:", data);

            setUploadData(data); // Set the URL for download

            setLoading(false)
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    };


    return (
        <div Name="space-y-4 mx-4">
            {/* title */}
            <div className="">
                <label>Title:</label>
                <input type='text' value={subjectTitle} placeholder='Study Title' className='border w-full p-2 rounded-md ' onChange={(e) => setSubjectTitle(e.target.value)} />
            </div>
            {/* select */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2">
                {/* select subject */}
                <div className="">
                    <label >Select Subject:</label>
                    <Select className="" onValueChange={(value) => setSubject(value)}>
                        <SelectTrigger className="w-[180px] text-white">
                            <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Data Structures & Algorithms">Data Structures & Algorithms </SelectItem>
                                <SelectItem value="DBMS">DBMS </SelectItem>
                                <SelectItem value="Computer Networks">Computer Networks</SelectItem>
                                <SelectItem value="Database Management Systems">Database Management Systems</SelectItem>
                                <SelectItem value="Operating Systems">Operating Systems</SelectItem>
                                <SelectItem value="Theory of Computation">Theory of Computation</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* select sem */}
                {
                    page == "pyq" && <div className="mt-2">
                        <label >Select Sem:</label>
                        <Select className="w-fit" onValueChange={(value) => setSem(value)}>
                            <SelectTrigger className="w-[180px] text-white">
                                <SelectValue placeholder="Sem" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Even">Even</SelectItem>
                                    <SelectItem value="Odd">Odd </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                }

            </div>

            {/* Subject Code */}
            {
                page == "pyq" && <div className="flex flex-col md:flex-row md:items-center gap-4 my-2">

                    <div >
                        <label>Paper Code:</label>
                        <input type="text" placeholder="Enter Paper Code" className="w-full border px-4 py-2 rounded-md" onChange={(e) => setSubjectCode(e.target.value)} />
                    </div>
                    <div className="">
                        <label >Year:</label>
                        <Select className="w-fit" onValueChange={(value) => setYear(value)}>
                            <SelectTrigger className="w-[180px] text-white">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="2024">2024</SelectItem>
                                    <SelectItem value="2023">2023 </SelectItem>
                                    <SelectItem value="2022">2022 </SelectItem>
                                    <SelectItem value="2021">2021</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            }

            {/* upload pdf */}
            <label>Upload Your Document:</label>
            <div className=' my-2 rounded-lg cursor-pointer w-[150px] flex gap-4 items-center' onClick={() => inputRef.current.click()} >
                {loading ? <span className="loader"></span> : <img src='/upload.jpg' alt='img' className='object-cover rounded-lg' />}
                <input type="file" accept="application/pdf" onChange={handleUpload} ref={inputRef} hidden />{uploadData?.url && <span><Check size={50} className='text-green-600' /></span>}
            </div>

        </div>
    );
}


export default Upload