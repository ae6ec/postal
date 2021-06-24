import React from 'react';
import { ReactComponent as Logosvg } from '../assets/icon.svg';
import '../App.css';

export default function Nav({reset}) {
    return (
        <div className={"nav"} >
            <div  onClick={reset} >
                <Logosvg  className={"nav-logo"} width={64} height={64}/>
            </div>
        </div>
    )
}
