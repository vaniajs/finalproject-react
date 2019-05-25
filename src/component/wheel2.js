import React from 'react';
import {SpinningWheel} from 'react-random-selection-wheel' 

class Wheel extends React.Component{
    displayResult(spinResult) {
        return <img src={`${spinResult}`} alt={"result"} />
      }

      render(){
        const wheelOptions = {
            1: {
              image: "./foo.jpg",
              result: "./foo.jpg"
            },
            2: {
              image: "./bar.jpg",
              result: "./bar.jpg"
            }
          }
          return(
            <SpinningWheel
            sources={wheelOptions}
            displayResult={(result)=>this.displayResult(result)}
          />
          )
      }
}

export default Wheel;
 

