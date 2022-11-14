import picture from '../img/CVbillede.jpeg'
import './Cheader.css'
function Cheader() {
    return (
        <div>
            <ul>
                <img className="foto" src={picture}></img>
                <h2>John Risager</h2>
                <li>Rundhøj Allé 73, 2. 3</li>
                <li>Højbjerg, 8270</li>
                <div className="contacts">
                <b><li>+45 50 36 54 33</li>
                <li>risagerjohnb@gmail.com</li></b>
                <a href="www.linkedin.com/in/john-risager-409898232">www.linkedin.com/in/john-risager-409898232</a>
                </div>
            </ul>
        </div>
    )
}

export default Cheader;