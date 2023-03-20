import React, {useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import useUnloadBeacon from "./Beacon.js";
import axios from 'axios'

const Slicer = (props) => {
    const [searchParams] = useSearchParams();

    const handleStart = () => {
        axios.get("http://localhost:8000/run-command/tint2").then((res) => {console.log("res", res)}).catch((err)=>{console.log("err",err)})
    }

    useUnloadBeacon({
        url: "http://localhost:8000/stop-container",
      });
      useEffect(() => {
        const warningText = "Yoooooooooooo";
        const handleWindowClose = (e) => {
          console.log("react window closing");
          e.preventDefault();
          e.returnValue = warningText;
          return "2222222222222222";
        };
        window.addEventListener("beforeunload", handleWindowClose);
        return () => {
          window.removeEventListener("beforeunload", handleWindowClose);
        };
      }, []);
      console.log("url", `http://localhost:${searchParams.get('port')}`)
    return(
        <>
        <a href={`http://localhost:${searchParams.get('port')}`} target="slicer-frame" onClick={handleStart}>Start</a>
        <iframe title="slicer-frame" name="slicer-frame" style={{height: "100vh", width: "100vw"}}></iframe>
        </>
    )
}

export default Slicer;