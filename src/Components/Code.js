import '../App.css'
import React, { useState } from 'react';
import ConsoleHelper from '../helper/consolelogger';
const Apis = require('./api-endpoints.js')
const axios = require('axios');


export default function Code(props) {
    const [error, seterror] = useState("")
    const [filecodeinput, setfilecodeinput] = useState("")

    // useEffect(() => {
    //     ConsoleHelper(`${Apis.API_FILE_INFO}`)
    //     ConsoleHelper(`In useEffect ${props.fixCode} ${inputCodeForm.current.value}`);
    //     setfilecodeinput(props.code);
    //     inputCodeForm.current.value  = props.code;

    //     if(props.fixCode === true){
    //         inputCodeForm.current.disabled = true;
    //         ConsoleHelper("disabled");
    //     }
    //     else {
    //         inputCodeForm.current.disabled = false;
    //     }
    //     ConsoleHelper(`In useEffect ${props.fixCode} ${inputCodeForm.current.value}`);
    // }, [props.fixCode])

    // TODO: useeffect maybe setfilecodeinput(props.code);

    //https://getpantry.cloud/apiv1/pantry/c16c5b39-06dc-4377-bb0e-5a9b821dc65b/basket/test
    async function getAndSetFiles(){
        ConsoleHelper(`code is ${filecodeinput}`)
        
        ConsoleHelper(`${Apis.API_FILE_INFO}${filecodeinput}`)
        try{
            const res = await axios.get(`${Apis.API_FILE_INFO}${filecodeinput}`)
            ConsoleHelper(`Retreiving file ${JSON.stringify(res)}`)
            props.setfiles([...props.files,res.data])      
            ConsoleHelper(`current files data ${props.files}`)
            props.setCode(filecodeinput);
            props.setShowDownload(true);
            props.setFixCode(true);
        } catch(err){
            ConsoleHelper(`Error Occured while posting data to DB: ${err}`);
            seterror("Some error occured. Please rechecking your code");              
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        // ConsoleHelper(filecodeinput.length === 6)
        // ConsoleHelper(filecodeinput.length)
        if( filecodeinput.length === 6) {
            ConsoleHelper("entered else");
            seterror("");        
            getAndSetFiles();
        } 
        else  {seterror("Please ensure length code is 6 characters")}
    }

    return (
        <div 
        className = "code-container div-code-outer"
        >
            <div className="content-header div-code-inner">Please Enter File Code Here</div>
            <form 
            onSubmit={handleSubmit}
            >
                <input 
                ref={props.inputCodeForm}
                className="input-code"
                onKeyPress={(e) => {if(e.target.value.length === 6) {ConsoleHelper("NO");return false;} } }
                // oninput={(e) => {e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');} }
                value={filecodeinput} 
                maxLength="6"
                onChange={(e) => {
                    setfilecodeinput(e.target.value);
                    seterror("");
                } } 
                type="text"
                />
                <input type="submit" value="Submit" />
            </form>
            <span className="error-text" >{error}</span>                

        </div>
    )
}
