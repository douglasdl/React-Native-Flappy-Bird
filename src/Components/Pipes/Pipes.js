import React from 'react'
import { View } from 'react-native'
//import { styles } from './styles'

const Pipes = ({ 
    pipesLeft, 
    pipeWidth, 
    pipeHeight, 
    gap, 
    color, 
    randomBottom 
}) => {
    

    
    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: pipeWidth,
                height: pipeHeight,
                left: pipesLeft,
                bottom: randomBottom + pipeHeight + gap,
            }} />

            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: pipeWidth,
                height: pipeHeight,
                left: pipesLeft,
                bottom: randomBottom,
            }} />
        </>
    )
}

export default Pipes