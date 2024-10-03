import React from 'react'
import { AppWrapper } from '.'

const GlobalProvider = ({ children }) => {
    return (
        <AppWrapper>
                {children}
        </AppWrapper>
    )
}


export default GlobalProvider