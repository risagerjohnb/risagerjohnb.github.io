import Arbejde      from './Arbejde'
import Uddannelse   from './Uddannelse'
import Kurser       from './Kurser'
import Fritid       from './Fritid'
import './CV.css'

export default function Ccontent() {
    return (
        <div className="widthpage">  
            <Arbejde />
            <Uddannelse />
            <Kurser />
            <Fritid />
        </div>
    )
}