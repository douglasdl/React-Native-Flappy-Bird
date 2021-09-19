import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Bird from './src/Components/Bird/Bird'
import Pipes from './src/Components/Pipes/Pipes'


export default function App() {
    const screenWidth = Dimensions.get("screen").width
    const screenHeight = Dimensions.get("screen").height
    const birdLeft = screenWidth / 2
    const pipeWidth = 60
    const pipeHeight = 400
    const gap = 200
    const [birdBottom, setBirdBottom] = useState(screenHeight/2)
    const [pipesLeft, setPipesLeft] = useState(screenWidth)
    const [pipesLeft2, setPipesLeft2] = useState(screenWidth + screenWidth/2 + pipeWidth/2)
    const [pipesNegativeHeight, setPipesNegativeHeight] = useState(0)
    const [pipesNegativeHeight2, setPipesNegativeHeight2] = useState(0)
    const [score, setScore] = useState(0)
    const gravity = 6
    const speed = 5
    let gameTimerId
    let pipesLeftTimerId
    let pipesLeftTimerId2
    const [hasStarted, setHasStarted] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)

    const handleStartGame = () => {
        setHasStarted(true)
        setBirdBottom(screenHeight/2)
        setPipesLeft(screenWidth)
        setPipesLeft2(screenWidth + screenWidth/2 + pipeWidth/2)
        setPipesNegativeHeight(0)
        setPipesNegativeHeight2(0)
        setScore(0)
        setIsGameOver(false)
    }

    // Make the bird start falling
    useEffect(() => {
        if(birdBottom > 0 && hasStarted) {
            gameTimerId = setInterval(() => {
                setBirdBottom(birdBottom => birdBottom - gravity )
            }, 30)

            return () => {
                clearInterval(gameTimerId)
            }
        } 
    }, [birdBottom])
    //console.log(birdBottom)


    const handleJump = () => {
        if(!isGameOver && (birdBottom < screenHeight)) {
            setBirdBottom(birdBottom =>birdBottom + 50)
            console.log('Jump!')
        }
    }

    
    // Start the first pipes
    useEffect(() => {
        if(hasStarted) {
            if(pipesLeft > - pipeWidth) {
                pipesLeftTimerId = setInterval(() => {
                    setPipesLeft(pipesLeft => pipesLeft - speed )
                }, 30)
    
                return () => {
                    clearInterval(pipesLeftTimerId)
                }
            } else {
                setPipesLeft(screenWidth)
                setPipesNegativeHeight(- Math.random() * 100)
                setScore(score => score + 1)
            }
        }
    },[pipesLeft, hasStarted])


    // Start the second pipes
    useEffect(() => {
        if(hasStarted) {
            if(pipesLeft2 > - pipeWidth) {
                pipesLeftTimerId2 = setInterval(() => {
                    setPipesLeft2(pipesLeft2 => pipesLeft2 - speed )
                }, 30)
    
                return () => {
                    clearInterval(pipesLeftTimerId2)
                }
            } else {
                setPipesLeft2(screenWidth)
                setPipesNegativeHeight2(- Math.random() * 100)
                setScore(score => score + 1)
            }
        }
    },[pipesLeft2, hasStarted])


    // Check for collisions
    useEffect(() => {
        if(
        ((birdBottom < (pipesNegativeHeight + pipeHeight + 30) ||
        birdBottom > (pipesNegativeHeight + pipeHeight + gap - 30)) &&
        (pipesLeft > screenWidth/2 - 30 && pipesLeft < screenWidth/2 + 30) 
        ) 
        ||
        ((birdBottom < (pipesNegativeHeight2 + pipeHeight + 30) ||
        birdBottom > (pipesNegativeHeight2 + pipeHeight + gap - 30)) &&
        (pipesLeft2 > screenWidth/2 - 30 && pipesLeft2 < screenWidth/2 + 30)        
        )) {
            console.log('GAME OVER!')
            gameOver()
        }
    })


    const gameOver = () => {
        clearInterval(gameTimerId)
        clearInterval(pipesLeftTimerId)
        clearInterval(pipesLeftTimerId2)
        setIsGameOver(true)
    }

    
    return (
        <TouchableWithoutFeedback
            onPress={handleJump}
        >
            <View style={styles.container}>
                <Text style={styles.score}>Score: {score}</Text>
                {
                    isGameOver && 
                    <Text 
                        style={styles.gameOver}
                    >
                        GAME OVER!
                    </Text>
                }

                {
                    (!hasStarted || isGameOver) && 
                    <TouchableOpacity
                        style={styles.startGame}
                        onPress={handleStartGame}
                        
                    >
                    <Text style={styles.buttonTitle}>START</Text>  
                    </TouchableOpacity>
                }


                <Bird 
                    birdBottom={birdBottom}
                    birdLeft={birdLeft}
                />

                <Pipes
                    pipeWidth={pipeWidth}
                    pipeHeight={pipeHeight}
                    pipesLeft={pipesLeft}
                    gap={gap}
                    randomBottom={pipesNegativeHeight}
                    color={"#0CC620"}
                />

                <Pipes
                    pipeWidth={pipeWidth}
                    pipeHeight={pipeHeight}
                    pipesLeft={pipesLeft2}
                    randomBottom={pipesNegativeHeight2}
                    gap={gap}
                    color={"#07A217"}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A2E8FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 100,
    },

    startGame: {

        backgroundColor: 'blue',
        width: 200,
        borderRadius: 20,
        padding: 20,
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
    },

    gameOver: {
        fontSize: 44,
        fontWeight: 'bold',
        color: 'red',
        backgroundColor: 'black',
        padding: 15,
        zIndex:1000,
        margin: 30,

    }
})