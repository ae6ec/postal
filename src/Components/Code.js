import '../App.css'
import React, { useState, useRef, useEffect } from 'react';
import ConsoleHelper from '../helper/consolelogger';
const Apis = require('./api-endpoints.js')
const axios = require('axios');


export default function Code(props) {
    const [error, seterror] = useState("")
    const [filecodeinput, setfilecodeinput] = useState("")
    const inputCodeForm = useRef(null);

    useEffect( () => {
            setfilecodeinput(props.code);
            seterror("");        
            inputCodeForm.current.value  = props.code;
            if(props.fixCode === true){
                inputCodeForm.current.disabled = true;
                ConsoleHelper("Input Form Disabled");
            }
            else {
                inputCodeForm.current.disabled = false;
            }        
        ConsoleHelper(`Props.Code changed ${inputCodeForm.current.value}`);
    }, [props.fixCode, props.code])

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
        if(props.fixCode === true){
            return
        }
        
        if( filecodeinput.length === 6) {
            ConsoleHelper("entered else");
            seterror("");        
            getAndSetFiles();
        } 
        else  {seterror("Please ensure length code is 6 characters")}
    }

    return (
        <div 
        className ="code-container div-code-outer"
        >
            <div className="content-header div-code-inner">Please Enter File Code Here</div>
            <form 
            onSubmit={handleSubmit}
            >
                <input 
                ref={inputCodeForm}
                className="input-code"
                onKeyPress={(e) => {if(e.target.value.length === 6) {return false;} } }
                value={filecodeinput} 
                maxLength="6"
                onChange={(e) => {
                    setfilecodeinput(e.target.value);
                    seterror("");
                } } 
                type="text"
                />
                <br/>
                <input type="submit" value="Submit" />
            </form>
            <span className="error-text" >{error}</span>                

        </div>
    )
}
