import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const ref = useRef(null);
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([])  // array of objects

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        if (ref.current.src.includes("hide.png")) {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eye.png";
        } else {
            ref.current.src = "icons/hide.png";
            passwordRef.current.type = "password";
        }
    };

    const savePassword = () => {
        let updatedArray = [...passwordArray, { ...form, id: uuidv4() }];
        setpasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
        setform({ site: "", username: "", password: "" })
    };

    const deleteDetails = (id) => {
        let updatedArray = passwordArray.filter((item) => item.id !== id)
        setpasswordArray(updatedArray)
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
    }

    const editDetails = (id) => {
        let item = passwordArray.filter((item) => item.id == id)[0]
        setform(item)
        let updatedArray = passwordArray.filter((item) => item.id !== id)  // delete the selected one
        setpasswordArray(updatedArray)

    }



    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }


    return (


        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            
           
            <div class="absolute inset-0 -z-10 h-full w-full bg-green-200 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className=" py-6 md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">Me/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center md:font-bold'>Your own Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-5 items-center md:p-8">
                    <input onChange={handleChange} placeholder="Enter the Website URL" className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="text" name="site" value={form.site} />

                    <div className="flex flex-col justify-between gap-5 w-full md:flex-row md:gap-8">

                        <input onChange={handleChange} placeholder="Enter the Username" className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="text" name="username" id="" value={form.username} />

                        <div className="relative w-full">
                            <input ref={passwordRef} onChange={handleChange} placeholder="Enter the Password" className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="password" name="password" id="" value={form.password} />
                            <span className="absolute right-1 top-1 cursor-pointer pr-2">
                                <img ref={ref} onClick={showPassword} width={26} src="icons/hide.png" alt="" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} disabled={form.site.length<5 || form.password.length<5} className=' bg-green-500 rounded-full w-fit py-2 px-6 flex gap-2 justify-center items-center hover:bg-green-400 disabled:cursor-not-allowed'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>


                </div>
            </div>



            <div className="pb-2 md:py-16 md:px-28 md:pt-0 passwords">

            {passwordArray.length > 0 && <div className='font-bold text-lg py-4 md:text-2xl text-center'>Your Passwords</div>}
                
                

                {passwordArray.length === 0 && <div className='text-center'>No Passwords to display</div>}

                {passwordArray.length != 0 &&
                    <div className='mx-2'>
                        <table className="table w-full overflow-hidden rounded-2xl">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='md:py-2'>Site</th>
                                    <th className='md:py-2'>Username</th>
                                    <th className='md:py-2'>Password</th>
                                    <th className='md:py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='p-1 md:p-2 border border-white'>

                                                <div className="flex justify-center items-center gap-2">
                                                    <a href={item.site} target='_blank' className="w-20 md:w-64 break-words text-center">{item.site}</a>
                                                    <div onClick={() => copyText(item.site)} className='size-4 cursor-pointer'><img src="/icons/copy.png" alt="" /></div>
                                                </div>

                                            </td>
                                            <td className='p-1 md:p-2 border border-white'>
                                                <div className="flex justify-center items-center gap-2">
                                                    <div className="w-16 md:w-40 break-words text-center">{item.username}</div>
                                                    <div onClick={() => copyText(item.username)} className='size-4 cursor-pointer'><img src="/icons/copy.png" alt="" /></div>
                                                </div>
                                            </td>
                                            <td className='p-1 md:p-2 border border-white'>
                                                <div className="flex justify-center items-center gap-2">
                                                    <div className="w-16 md:w-40 break-words text-center">{item.password}</div>
                                                    <div onClick={() => copyText(item.password)} className='size-4 cursor-pointer'><img src="/icons/copy.png" alt="" /></div>
                                                </div>
                                            </td>
                                            <td className='p-1 md:p-2 border border-white text-center'>
                                                <span onClick={() => editDetails(item.id)} className="cursor-pointer mx-1">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/oqaajvyl.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#4be1ec,secondary:#0a5c15"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span onClick={() => deleteDetails(item.id)} className="cursor-pointer mx-1">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/vlnvqvew.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#4be1ec,secondary:#0a5c15"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                }
            </div>



        </>
    )
}

export default Manager
