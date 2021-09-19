import React from 'react'
import { View } from 'react-native'
//import { styles } from './styles'

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 50
    const birdHeight = 60

    
    return (
        <View style={{
            position: 'absolute',
            backgroundColor: 'yellow',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom,
        }} />
    )
}

export default Bird