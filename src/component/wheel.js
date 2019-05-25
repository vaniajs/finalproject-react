import React from 'react';
import ReactDOM from 'react-dom';
import RandomWheel from 'react-random-wheel';

export default () => {
	const segments = [
		{
			name: 'Red',
			color: 'red'
		},
		{
			name: 'Green',
			color: 'green'
		},
		{
			name: 'Blue',
			color: 'blue'
		},
	];

	let wheel;

	const onSpinClick = () => {
		wheel.spinWheel();
	};
	const onSpinComplete = ( result ) => {
		console.log( 'spin complete', result );
	};

	return (
		<div>
			<RandomWheel
				segments={segments}
				onComplete={onSpinComplete}
				ref={( wheelRef ) => {
					wheel = wheelRef;
				}}
			/>
			<button onClick={onSpinClick}>
				Spin
			</button>
		</div>
	);
};

// const init = () => {
// 	const appRoot = document.createElement( 'div' );
// 	document.body.appendChild( appRoot );

// 	ReactDOM.render(
// 		<App/>,
// 		appRoot
// 	)
// };

// init();

// import React from 'react';
// import RandomWheel from 'react-random-wheel';

// export default class Wheel extends React.Component{
//     constructor(props) {
//         super(props);
    
//         this.wheel = null;
    
//         // this.RandomWheel = element => {
//         //   this.wheel = element;
//         // };
//     }
    
//     onSpinComplete = () => {
//         alert('Congratulations!')
//     }

//     onSpinClick = () => {
//         this.wheel.spinWheel()
//     }

//     render(){
//         // let wheel = React.createRef()
//         return (
//             <div>
//                 <RandomWheel
//                     segments={[
//                         {
//                         name: 'The Skincare Set',
//                         color: 'red',
//                         },{
//                         name: 'Zit Stick',
//                         color: 'blue'
//                         }

//                 ]}
//                     onComplete={this.onSpinComplete}
//                     ref={( wheelRef ) => {
//                         this.wheel = wheelRef;
//                     }}
//                 />
//                 <button onClick={this.onSpinClick}>
//                     Spin
//                 </button>
//             </div>
//         );
//     }
// }



// // const init = () => {
// // 	const appRoot = document.createElement( 'div' );
// // 	document.body.appendChild( appRoot );

// // 	ReactDOM.render(
// // 		<App/>,
// // 		appRoot
// // 	)
// // };

// // init();