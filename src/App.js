import  { useState } from 'react';
import './App.css';
import Code from './Components/Code';
import FileDownloadDiv from './Components/FilesDownloadDiv';
import FileUpload from './Components/FileUpload';
import Nav from './Components/Nav';
import ConsoleHelper from './helper/consolelogger';

//TODO: add selectors as a type rather than hardcoding .download
function App() {
  const [files, setfiles] = useState([])
  const [code, setCode] = useState("")
  const [showDownload, setShowDownload] = useState(false)
  const [fixCode, setFixCode] = useState(false)

  function reset(){
    ConsoleHelper("Reseting all")
    setfiles([])
    setCode("")
    setShowDownload(false)
    setFixCode(false)
  }

  return (
      <>
      <Nav reset={reset}/>
        <div className = "main-container" >
          <Code 
          fixCode={fixCode}
          setFixCode={setFixCode}
          code = {code} 
          setCode = {setCode} 
          setShowDownload = {setShowDownload} 
          files={files}
          setfiles = {setfiles}
          />
          <FileUpload 
          setFixCode={setFixCode}
          showDownload={showDownload} 
          setShowDownload={setShowDownload}
          setCode={setCode}
          /> 
          <FileDownloadDiv 
          files={files} 
          showDownload={showDownload} 
          />
        </div>
      </>
  );
}



export default App;
