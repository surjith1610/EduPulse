import React, {useState} from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';


const Test = () => {
    const [show,setShow] = useState(true)
    const [bck,setBck] = useState('#ffffff')
    return (
        <>
        <button onClick={()=>{
            setBck("#f44336")
        }}>update</button>
         <button onClick={()=>{
            setShow(false)
        }}>remove</button>

        <Animate
            show={show}
            start={{
                backgroundColor: bck,
                width:500,
                height:500,
                opacity:0
            }}
            enter={{
                backgroundColor: bck,
                width:[100],
                height:[100],
                opacity:[1],
                timing: {
                    duration: 1000,
                    delay: 1000,
                    ease: easePolyOut
                }
            }}
            update={{
                backgroundColor:bck,
                opacity:[0.5],
                timing: {
                    duration:2000,
                    ease: easePolyOut
                },
                events: {
                    start:()=> {
                        console.log('started')
                    },
                    end:() => {
                        console.log('ended')
                    },
                }
            }}
            leave={[
                {
                    width:[1000],
                    timing: {
                        duration:500,
                        ease: easePolyOut
                    }},
                    {
                        opacity:[0],
                        timing: {
                            delay:2000,
                            duration:3000,
                            ease: easePolyOut
                        }}
            

            ]}
        >
            {
                ({width, height, backgroundColor,opacity})=> (
                    <div
                        style={{
                            backgroundColor,
                            opacity,
                            width,
                            height
                        }}
                    >

                    </div>
                )
            }
        </Animate>
        </>
    )
}

export default Test;