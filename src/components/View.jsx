import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {getDoc, doc} from "firebase/firestore"
import {db} from '../firebase'

const View = ({newCardID}) => {

    const navigate = useNavigate();
    const [cardDetails, setCardDetails] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const docRef = doc(db, "cards", newCardID);
        getDoc(docRef)
            .then((data) => {
                setCardDetails(data.data())
                setIsLoading(false)
            })
            .catch((err) => {
                setError({ err });
            });
    }, [newCardID])

    if (error) {
        return (
          <div>
            <p>Error: {error}</p>
          </div>
        ) 
    }

    if (isLoading) {
        return <div className="loading">
                <p>Creating your business card...</p>
            </div>
    }    

    return <div>
        <div id="card-front">
            <p>Business</p>
            <img></img>
        </div>
        <div id="card-back">
            <p>name</p>
            <p>Job</p>
            <p>Phone</p>
            <p>Email</p>
            <p>Website</p>
        </div>
        <button onClick={(e) => navigate('/')}>START AGAIN</button>
    </div>

}

export default View;