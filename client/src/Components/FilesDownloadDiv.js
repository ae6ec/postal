import React from 'react';
import FileDownload from './FileDownload';
import '../App.css';

export default function FilesDownloadDiv(props) {

    return (
        <div 
        className = {` file-download-container ${((props.showDownload)) ? " ": " collapsed"} `} 
        >
            <span className="content-header">Files </span>
            { props.files.map ( fileobj => <FileDownload key={fileobj.file.fileName} file={fileobj.file} /> )
        }
        </div>
    )
}
