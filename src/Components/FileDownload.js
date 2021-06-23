import React from 'react';
import '../App.css'
import ConsoleHelper from '../helper/consolelogger';

export default function FileDownload(props) {

    const fileName = props.file.fileName;
    const fileLink = props.file.fileDownload;
    ConsoleHelper(props.file)

    return (
        <div className="download-container-outer" >
            <a className={"download-container"} href={fileLink} download={fileName} >
                {fileName}
            </a>
        </div>
    )

}
