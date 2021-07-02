import '../App.css';
import React,{ useState, useEffect } from 'react';
import ConsoleHelper from '../helper/consolelogger';
const FormData = require('form-data')
const axios = require('axios')
const Apis = require('../config/api-endpoints')


export default function FileUpload(props) {
    const [file, setfile] = useState(null)
    const [store, setStore] = useState("store9"); 

    useEffect(() => {
        fetchDataStoreServer()        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchDataStoreServer() {
        ConsoleHelper("in fetch")
        const response = await axios.get(`${Apis.API_DATA_STORE_INFO}`).catch( err => {
            ConsoleHelper(`Error occured while fetching file server data store : ${err}`)
        });
        ConsoleHelper(response.data)

        if(response.data.status === "ok"){
            setStore(response.data.data.server)
        }
        ConsoleHelper(`store found and selected: ${store}`)
    }  
    
    async function uploadAndGetCode(){
        try{
            ConsoleHelper("Initiating File Upload")
            await fetchDataStoreServer()
            // .catch( (err) => {
            //     ConsoleHelper(`Error occured at fetchDataStoreServer: ${err}`)
            // });
            
            //uploading File 
            const formData = new FormData();
            ConsoleHelper(`File: ${file.name}`)

            formData.append('file', file, file.name);

            let headers = {
                'content-type': 'multipart/form-data; boundary=--------------------------148260722451222140648725'
            }
            ConsoleHelper(`headers: ${JSON.stringify(headers)} filesize: ${file.size} ${file.length}`)
            ConsoleHelper(`https://${store}${Apis.API_FILE_UPLOAD}`)

            const response = await axios.post(`https://${store}${Apis.API_FILE_UPLOAD}`, formData, {headers} )
            .catch ( err => {
                ConsoleHelper(`Error occured while posting file: ${err}`);
                throw err;
                // TODO: Add error msg to span
            });

            ConsoleHelper("file upload response")
            ConsoleHelper(response.data)
            ConsoleHelper(response.data.data.downloadPage)

            //TODO: better error handling
            //Setting file Code 
            if (response.data.status !== "ok") 
            {
                // TODO: Add error msg to span
                ConsoleHelper(`error occured while fetching file code from response: ${response}`);
            }
                
            const res = await axios.post(Apis.API_CLAIR_FETCH, {
                "url": response.data.data.downloadPage,
                "fileName": file.name
            })
            // .catch ( err => {
            //     ConsoleHelper(`Error occured while posting file to clair service : ${err}`);
            //     // TODO: Add error msg to span
            // });
            ConsoleHelper("response from clairs service")
            ConsoleHelper(res)

            props.setFixCode(true);
            props.setCode(res.data.fileCode);
            props.setShowDownload(false);  

        } catch(err) {
            ConsoleHelper(`Error occured at uploadAndGetCode: ${err}`)
        }
        //call scrape

    }
    function handleSubmit(e) {
        e.preventDefault();
        uploadAndGetCode();
    }
    // TODO: reat-hook-form
    // multiple files upload support
    // handle speacialchars

    return (
        <div 
        className = {` file-upload-container ${(!(props.showDownload)) ? "" : " collapsed " }  `}
        >
            <span className="content-header">Please Upload Files Here</span>
            <form onSubmit={handleSubmit}>
                <input 
                onChange={(e) => {
                    ConsoleHelper(e.target.files[0])
                    setfile(e.target.files[0]);
                }} 
                type="file"
                />
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
