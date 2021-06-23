import React from 'react';
import FileDownload from './FileDownload';
import '../App.css';

export default function FilesDownloadDiv(props) {
    // const testFile = {
    //     fileName: "fresh Prince.jpg",
    //     FileDownload: "https://wallpapercave.com/wp/wp3154297.jpg"
    // }
    // console.log(`files: ${JSON.stringify(props.files)}`)
    return (
        <div 
        className = {` file-download-container ${((props.showDownload)) ? " ": " collapsed"} `} 
        >
            <span className="content-header">Files </span>
            { props.files.map ( file => <FileDownload key={file.fileName} file={file} /> )
        }
        </div>
    )
}
