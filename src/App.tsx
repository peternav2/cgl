import { useState, useEffect } from 'react'
import './App.css'
import './styles.css'
import Header from './components/Header.tsx' 

function App() {
    return (
        <>
            <Header></Header>
            <Mat></Mat>
        </>
    )
}

function Mat() {
//const [style, setStyle] = useState(Array<Array<string>>)
//let future = new Array(style.length)
//for(let i = 0; i < style.length; i++) {
    //future[i] = new Array(style.length).fill("dead")
//}
//setStyle(future);
    const [run, setRun] = useState(false)
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

    function loadMat() {
        let temp = mat
        setMat(temp)
    }
    useEffect(() => {
        if (run) {
            const interval = setInterval(() => {
                handleMat() 
            }, 200)
            console.log(run);
            return () => clearInterval(interval);
        } else {
            loadMat()
            // const interval = setInterval(() => {
            //     console.log()
            // }, 250)
            // console.log(run);
            // return () => clearInterval(interval);
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
        console.log(mat[i][j]);
        console.log(temp[i][j]);
        setMat(temp)
        setTick(a => !a)
        console.log(mat);
        
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
                        {square} 
                    </button>
                )
            }
        </div>
    ); 

    return (
        <>
            {listMap}
            <button
                onClick = {change}
            >
                Toggle 
            </button>
        </>
    )
}

export default App
