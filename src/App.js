import  { useState } from 'react';
import './App.css';
import Code from './Components/Code';
import FileDownloadDiv from './Components/FilesDownloadDiv';
import FileUpload from './Components/FileUpload';
import Nav from './Components/Nav';

//TODO: add selectors as a type rather than hardcoding .download
function App() {
  const [files, setfiles] = useState([])
  const [code, setCode] = useState("")
  const [showDownload, setShowDownload] = useState(false)
  const [fixCode, setFixCode] = useState(false)

  // uploading -> setcode uploaded -> (no downloaddiv)
  // puttingCode -> setcode uploaded no ->(downloaddiv)

    //code        -> setcodeset
    //fileupload  -> uplaoded 0 setcode 0
    //Filedownload    -> uploaded 0 setcode 0

  // TODO: disable input in Code  after setCodeSet
  //button to reset

  return (
      <>
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
