import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import { PhotosContext } from '../context/photoContext';

const Message = ({ msg, type }) => {
    
    const [ showMessage, setShowMessage ] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowMessage(false);
        }, 2500)
    }, [])

  return (
    <div className={`message ${type === 'error' ? 'error' : 'success'}`}>
        {showMessage && (
            <p className="contentMsg">
                {msg}
            </p>
        )}
    </div>
  )
}

export default Message;