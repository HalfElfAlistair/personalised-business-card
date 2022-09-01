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

    return <div className="mx-auto w-10/12 my-60 h-3/6 flex flex-row flex-wrap justify-between p-5 gap-10 my-2">
        <div className="justify-self-start w-6/12 h-80" id="card-front">
            <div>
                <img></img>
                <p>{cardDetails.business}</p>
            </div>
        </div>
        <div className="justify-self-end w-6/12 h-80" id="card-back">
            <div>
                <p>{cardDetails.name}</p>
                <p>{cardDetails.job}</p>
            </div>
            <div>
                <p>{cardDetails.phone}</p>
                <p>{cardDetails.email}</p>
            </div>
            <div>
                <p>{cardDetails.website}</p>
            </div>
        </div>
        <button onClick={(e) => navigate('/')}>START AGAIN</button>
    </div>

}

export default View;