import React, { useContext } from 'react';
import { useCallback, useState, useRef } from "react";
import { FaAlignRight, FaArrowLeft, FaCamera, FaPlusCircle } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import logo from "/logo.svg"
import { FaArrowRight } from 'react-icons/fa6';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AppContext } from '../../Context/AppContext';
import axios from 'axios';
import Swal from 'sweetalert2';


const UploadSong = () => {
    const { token } = useContext(AppContext);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const artWorkInputRef = useRef(null);
    const [uploadStep, setUploadStep] = useState("1 : Basic Information");
    const [progress, setprogress] = useState(0);
    const [artWork, setArtWork] = useState({});
    const [imagePreview, setImagePreview] = useState("");

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setFiles([{ file: acceptedFiles[0], preview: URL.createObjectURL(acceptedFiles[0]) }]);
        }

    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
        }
    };

    const handleArtWorkClick = () => {
        if (artWorkInputRef.current) {
            artWorkInputRef.current.value = "";
            artWorkInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // السماح بملف واحد فقط
        if (selectedFile) {
            setFiles([{ file: selectedFile, preview: URL.createObjectURL(selectedFile) }]);
        }

    };
    const handleArtWorkChenge = (event) => {
        const file = event.target.files[0];
        if (file) {
            setArtWork(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    console.log(files)
    const formik = useFormik({
        initialValues: {
            Artist: "",
            SongTitle: "",
            Genre: "",
            Description: "",
        },
        validationSchema: Yup.object({
            Artist: Yup.string().required(),
            SongTitle: Yup.string().required(),
            Genre: Yup.string().required(),
            Description: Yup.string().required(),
        }),
        onSubmit: async (values) => {

            try {
                if (files.length === 0) {
                    Swal.fire("خطأ", "يجب رفع ملف صوتي قبل المتابعة!", "error");
                    return;
                }


                const Data = new FormData();
                Data.append('file', files[0].file);
                Data.append('artwork', artWork);
                Data.append('artist', values.Artist);
                Data.append('song_title', values.SongTitle);
                Data.append('genre', values.Genre);
                Data.append('description', values.Description);


                const response = await axios.post("http://127.0.0.1:8000/api/songs/upload", Data, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                });


                if (response.status === 200 || response.status === 201) {
                    Swal.fire({
                        title: "تم الرفع بنجاح",
                        text: "تم ارسال البيانات الخاصه بعملك",
                        icon: "success",
                        confirmButtonText: "متابعة",
                        confirmButtonColor: "#3C9829",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            history.push("/dashboard");
                        }
                    });
                } else {
                    Swal.fire({
                        title: "خطأ",
                        text: "حدث خطا في الرفع",
                        icon: "error",
                        confirmButtonText: "تحقق من الاتصال بالانترنت",
                        confirmButtonColor: "#3C9829",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },


    });

    const UploadScendStep = () => {
        setUploadStep("2 : Upload Artwork")
        setprogress(50)
        console.log(progress)
    }

    const backStep = () => {
        setUploadStep("1 : Basic Information")
        setprogress(0)
    }



    return (
        <div className='text-center flex flex-col items-center justify-center'>
            {files.length > 0 && (
                <div className="mt-4 mb-10 w-4/5 m-auto">
                    <h1 className='text-center text-3xl font-bold text-black mb-4'>Your music has uploaded!</h1>
                    <p>Follow these steps to complete your upload</p>
                    <div className="bg-[#1D212E] p-6 text-start mt-8">
                        <ul>
                            {files.map(file => (
                                <li key={file.name} className="text-lg text-white font-bold">
                                    {file.name}
                                </li>
                            ))}
                            <p className='text-[#3C9829]'>{"Completed (Previously uploaded)"}</p>
                        </ul>
                        <div className='mb-10 mt-4 flex flex-col justify-center lg:flex-row lg:justify-between'>
                            <h3 className='text-white font-bold text-2xl'>Step {uploadStep}</h3>
                            <div className='w-72 h-4 bg-white relative'>
                                <span className='flex flex-col items-center justify-center absolute top-1/2 -translate-y-[30%] -translate-x-[50%] left-0'>
                                    <span className={`w-12 h-12 rounded-full bg-[#30B797]`} />
                                    <p className={`mt-4 text-[#30B797]}`}>Basic info</p>
                                </span>
                                <span className='flex flex-col items-center justify-center absolute top-1/2 -translate-y-[30%] left-1/2 -translate-x-[50%]'>
                                    <span className={`w-12 h-12 rounded-full ${progress >= 50 ? "bg-[#30B797]" : "bg-white"}`} />
                                    <p className={`mt-4 ${progress >= 50 ? "text-[#30B797]" : "text-white"}`}>Metadata</p>
                                </span>
                                <span className='flex flex-col items-center justify-center absolute top-1/2 -translate-y-[30%] translate-x-[50%] right-0'>
                                    <span className={`w-12 h-12 rounded-full ${progress === 100 ? "bg-[#30B797]" : "bg-white"}`} />
                                    <p className={`mt-4 ${progress === 100 ? "text-[#30B797]" : "text-white"}`}>Finish</p>
                                </span>
                                <div className={`${progress === 100 ? "w-full" : progress === 50 ? "w-1/2" : "w-0"} h-full bg-[#30B797] rounded-full`}></div>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-center gap-4 mt-14'>
                            <div className="lg:w-1/3 w-full flex flex-col items-center justify-center gap-16">
                                <img src={imagePreview ?
                                    imagePreview
                                    : logo
                                } className='w-full rounded-2xl' alt="songImg" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={artWorkInputRef}
                                    className="hidden"
                                    multiple
                                    onChange={handleArtWorkChenge}
                                />
                                <button className='flex flex-row items-center gap-1.5 text-lg py-2 px-4 rounded-full bg-[#30B797] text-white border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all'
                                    onClick={handleArtWorkClick}
                                >
                                    <span>Add Artwork</span>
                                    <FaCamera />
                                </button>
                                <p className='text-sm text-white'>Minimum 500x500 size,JPG or PNG</p>
                            </div>
                            <div className="lg:w-2/3 w-full">
                                <form action="" onSubmit={formik.handleSubmit}>
                                    {progress === 0 ?
                                        <>
                                            <div className="flex flex-col mb-5">
                                                <label className="text-lg text-white">Artist</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 text-black bg-white focus:outline-none"
                                                    onChange={formik.handleChange} value={formik.values.Artist}
                                                    name="Artist"
                                                />
                                            </div>
                                            <div className="flex flex-col mb-5">
                                                <label className="text-lg text-white">Song Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 text-black bg-white focus:outline-none"
                                                    onChange={formik.handleChange} value={formik.values.SongTitle}
                                                    name="SongTitle"
                                                />
                                            </div>
                                            <div className="flex flex-col mb-5">
                                                <label className="text-lg text-white">Genre</label>
                                                <select
                                                    className="w-full px-4 py-2 text-black bg-white focus:outline-none"
                                                    onChange={formik.handleChange} value={formik.values.Genre}
                                                    name="Genre"
                                                >
                                                    <option value="Pop">Pop</option>
                                                    <option value="Hip-Hop">Hip-Hop</option>
                                                    <option value="Rock">Rock</option>
                                                    <option value="Electronic">Electronic</option>
                                                    <option value="Jazz">Jazz</option>
                                                    <option value="Classical">Classical</option>
                                                    <option value="Folk">Folk</option>
                                                    <option value="R&B">R&B</option>
                                                    <option value="Country">Country</option>
                                                </select>
                                            </div>
                                            <div className='w-full flex justify-end'>
                                                <button className='flex flex-row items-center gap-1.5 text-lg py-2 px-4 rounded-full bg-[#30B797] text-white border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all'
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        UploadScendStep()
                                                    }
                                                    }
                                                >
                                                    <span>Next Step</span>
                                                    <FaArrowRight />
                                                </button>
                                            </div>
                                        </>
                                        : progress === 50 ?
                                            <>
                                                <div className="flex flex-col mb-5">
                                                    <div className='flex flex-row items-center justify-between text-white mb-2'>
                                                        <label className="text-lg">Add caption</label>
                                                        <span>You have 800 characters left</span>
                                                    </div>
                                                    <textarea
                                                        type=""
                                                        rows="5"
                                                        className="w-full px-4 py-2 text-black bg-white focus:outline-none"
                                                        onChange={formik.handleChange} value={formik.values.Description}
                                                        name="Description"
                                                    />
                                                </div>
                                                <div className='w-full flex justify-end gap-6'>

                                                    <button className='flex flex-row items-center gap-1.5 text-lg py-2 px-4 rounded-full bg-[#30B797] text-white border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all'
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            backStep()
                                                        }
                                                        }
                                                    >
                                                        <span>Back</span>
                                                    </button>

                                                    <button className='flex flex-row items-center gap-1.5 text-lg py-2 px-4 rounded-full bg-[#30B797] text-white border border-[#30B797] hover:text-[#30B797] hover:bg-white transition-all'
                                                        type='submit'
                                                    >
                                                        <span>Next Step</span>
                                                        <FaArrowRight />
                                                    </button>
                                                </div>
                                            </>
                                            :
                                            <>
                                                {/* upload sucesse */}
                                            </>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            <h1 className='text-center text-3xl font-bold text-black mb-4'>Upload your music to Cloud. Wave</h1>
            <p>Cloud. Wave gives you unlimited storage.</p>
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg cursor-pointer transition mt-8 bg-[#1D212E] text-white 
                            ${isDragActive ? "border-blue-500" : "border-[#30B797]"}`}
            >
                <input {...getInputProps()} />
                <p className="text-white font-bold text-2xl">
                    {isDragActive ? "Drop Here" : "Browse for files or drag and drop them here"}
                </p>

                <input
                    type="file"
                    accept='audio/*'
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button
                    onClick={handleButtonClick}
                    className="flex flex-row items-center gap-2 mt-4 px-6 py-2 bg-[#30B797] text-white text-2xl cursor-pointer rounded-full hover:bg-white hover:text-[#30B797] border border-[#30B797] transition"
                >
                    <FaPlusCircle />
                    Upload your file
                </button>
                <p className='text-sm mt-8'>Accepted file types are MP3, FLAC, WAV, AIFF, OGG, & M4A. Limit of 500MB per file. </p>
                <p className='text-lg mt-2'>By uploading, you agree to our <a href="/Terms" className='text-[#30B797]'>Terms</a> of Service and <a href='/Privacy-Policy' className='text-[#30B797]'>Privacy Policy</a>. Cloud. Wave is for Artists, DJs, and Labels only. Uploading third-party content will result in an immediate ban.</p>
            </div>
        </div>
    );
}

export default UploadSong;
