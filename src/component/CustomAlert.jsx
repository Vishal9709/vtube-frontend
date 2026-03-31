import React, { useEffect, useState } from "react";
let alertHandle;

export const showCustomAlert = (message) =>{
    if(alertHandle){
        alertHandle(message)
    }
}

function CustomAlert() {
    const [mess, setMess] = useState("")
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        alertHandle = (message) =>{
            setMess(message)
            setVisible(true)
        }
    },[])


  return (
    visible && (<div className="fixed flex inset-0 items-start justify-center pt-12.5 bg-black/50 z-50 ">
      <div className="bg-[#202124] text-white rounded-lg shadow-lg p-6 w-80">
        <p className="text-sm">{mess}</p>
        <div className="flex justify-end mt-10">
          <button className=" bg-orange-500 hover:bg-orange-600 text-white px-6 cursor-pointer rounded-4xl p-2 " onClick={()=>setVisible(false)}>
            ok
          </button>
        </div>
      </div>
    </div>)
  );
}

export default CustomAlert;
