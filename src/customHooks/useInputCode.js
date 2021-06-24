import { useState, useEffect } from 'react';
import ConsoleHelper from '../helper/consolelogger';


export default function useInputCode(initialvalue,code,inputCodeForm) {
    const [value, setvalue] = useState(initialvalue)

    useEffect(() => {        
        // setfilecodeinput(code);
        inputCodeForm.current.value  = code;

        if(value === true){
            inputCodeForm.current.disabled = true;
            ConsoleHelper("disabled");
        }
        else {
            inputCodeForm.current.disabled = false;
        }
        ConsoleHelper(`In useEffect ${value} ${inputCodeForm.current.value}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return [value, setvalue]
}
