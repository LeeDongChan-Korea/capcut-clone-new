import './App.css';
import picture from './assets/free-icon-font-picture.png';
import React, {useEffect} from 'react';
import UploadBoard from "./features/export/UploadBoard";
import UploadComponent from './components/UploadComponent';

function App(){

    // const menuItem = [
    //     { id: 1, title: '1', link: '#' , pic : picture},
    //     { id: 2, title: '2', link: '#' , pic : picture},
    //     { id: 3, title: '3', link: '#' , pic : picture},
    //     { id: 4, title: '4', link: '#' , pic : picture}
    // ];
    return (
        <div className="main">
            <UploadComponent />
            {/* <div className="left-menu">
                <ul>
                    {menuItem.map(menuItem => (
                        <li key={menuItem.id}>
                            <a href={menuItem.link}>
                                <img src={menuItem.pic} alt=""></img>
                            </a>
                        </li>
                    ))}
                </ul>
            </div> */}
            {/* <div>
                <div className="main-board">
                    <div className="dropzone">
                        <UploadBoard />
                    </div>
                </div>
                <div className="sub-board">

                </div>
            </div> */}
        </div>
    );
}

export default App;