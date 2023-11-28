import { useState, useEffect } from 'react'
import './App.css'
import './styles.css'
import Header from './components/Header.tsx' 
import ReactSlider from 'react-slider'
function App() {
    return (
        <>
            <Header></Header>
            <Mat></Mat>
        </>
    )
}

function Mat() {
    const [run, setRun] = useState(false)
    const [time, setTime] = useState(200)
    const [tick, setTick] = useState(false)
    const [mat, setMat] = useState(
        [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]
    )   

    useEffect(() => {
        if (run) {
            const interval = setInterval(() => {
                handleMat() 
            }, time)
            console.log(run);
            return () => clearInterval(interval);
        } 

    }, [mat,run, tick]);



    function handleMat() {
        let M = mat.length
        let N = mat[0].length
        let future = new Array(M);
        for(let i = 0; i < M; i++){
            future[i] = new Array(N).fill(0);
        }
        for(let l=0;l<M;l++){
            for(let m=0;m<N;m++){
                let aliveNeighbours = 0
                for(let i = -1; i < 2; i++)
            {
                    for(let j = -1; j < 2; j++)
                {
                        if ((l + i >= 0 && l + i < M) && (m + j >= 0 && m + j < N))
                        aliveNeighbours += mat[l + i][m + j]
                    }
                }
                aliveNeighbours -= mat[l][m]
                if ((mat[l][m] == 1) && (aliveNeighbours < 2))
                future[l][m] = 0
                else if ((mat[l][m] == 1) && (aliveNeighbours > 3))
                future[l][m] = 0
                else if ((mat[l][m] == 0) && (aliveNeighbours == 3))
                future[l][m] = 1
                else
                future[l][m] = mat[l][m]
            }
        }        
        setMat(future)
    }

    const change = () => {
        setRun(a => !a) 
        // setMat(mat => mat)
    }

    const changeSquare = (i: number, j: number) => {
        let temp = mat
        temp[i][j] = mat[i][j] == 1 ? 0 : 1
        setMat(temp)
        setTick(a => !a)
    } 

    const listMap = mat.map((row, ind) => 
        <div
            key={ind}
        >
            {
                row.map((square:number, ind2:number) => 
                    <button 
                        key={ind2}
                        className={square === 1 ? "alive" : "dead"}
                        onClick={() => {changeSquare(ind, ind2)}}
                    >
                        A. 
                    </button>
                )
            }
        </div>
    ); 

    return (
        <>
            {listMap}
            <br></br>
            <button
                onClick = {change}
            >
                { run ? (
                    <>Stop Running</>
                ) : (
                        <>Start Running</>
                    )} 
            </button>
        </>
    )
}

export default App
