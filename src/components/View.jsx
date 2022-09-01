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
        <div className="w-full flex flex-row justify-between p-5 gap-10 my-2">
            <div className="justify-self-start w-6/12 h-80" id="card-front" style={{"background-color": `${cardDetails.colourFrontBg}`, color: `${cardDetails.colourFrontText}`}}>
                <div className="m-10">
                    <img></img>
                    <p className="inline text-3xl font-bold">{cardDetails.business}</p>
                </div>
            </div>
            <div className="justify-self-end w-6/12 h-80" id="card-back" style={{"background-color": `${cardDetails.colourBackBg}`, color: `${cardDetails.colourBackText}`}}>
                <div className="m-10">
                    <p className="text-3xl font-semibold">{cardDetails.name}</p>
                    <p className="text-2xl font-bold">{cardDetails.job}</p>
                </div>
                <div className="m-10">
                    <p className="text-2xl">{cardDetails.phone}</p>
                    <p className="text-2xl">{cardDetails.email}</p>
                </div>
                <div className="m-10">
                    <p className="text-1xl font-bold">{cardDetails.website}</p>
                </div>
            </div>
        </div>
        <button className="bg-indigo-600 rounded-3xl text-sm text-slate-50 px-16 py-4 font-semibold mx-auto mt-10 hover:underline hover:opacity-90" onClick={(e) => navigate('/')}>START AGAIN</button>
    </div>

}

export default View;