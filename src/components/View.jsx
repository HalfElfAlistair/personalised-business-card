import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import {getDoc, doc} from "firebase/firestore"
import {db} from '../firebase'

const View = ({newCardID}) => {

    const navigate = useNavigate();

    // assigns state for retrieved data to be set as well as error and loading states
    const [cardDetails, setCardDetails] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // accesses cards collection and document id matching newCardID, assigns to document reference
        const docRef = doc(db, "cards", newCardID);
        getDoc(docRef)
            .then((data) => {
                // uses data from document reference to set cardDetails state
                setCardDetails(data.data())
                // once data has been retrieved, isLoading state changes to false so that the data can be presented
                setIsLoading(false)
            })
            .catch((err) => {
                // sets error state with caught error, to enable displayed error message
                console.log(err)
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

    return <div className="mx-auto my-2 lg:w-10/12 lg:my-60 lg:h-3/6 lg:flex lg:flex-row lg:flex-wrap lg:justify-between lg:p-5 lg:gap-10">
        <div className="my-2 lg:w-full lg:flex lg:flex-row lg:justify-between lg:p-5 lg:gap-10">
            <div className="m-2 p-2 h-72 shadow-lg sm:m-auto sm:mt-5 sm:justify-self-start sm:w-10/12 sm:h-80 md:w-8/12 lg:w-8/12 hover:border-solid hover:border-stone-300 hover:border-2" id="card-front" style={{backgroundColor: `${cardDetails.colourFrontBg}`, color: `${cardDetails.colourFrontText}`}}>
                <div className="m-5">
                    <img className="inline w-10 h-10 lg:w-24 lg:h-24" id="logo-image" alt={`The ${cardDetails.business} logo`} src={cardDetails.logo}></img>
                    <p className="inline text-3xl font-bold ml-5">{cardDetails.business}</p>
                </div>
            </div>
            <div className="m-2 p-2 h-72 shadow-lg sm:m-auto sm:mt-5 sm:justify-self-start sm:w-10/12 sm:h-80 md:w-8/12 lg:w-8/12 hover:border-solid hover:border-stone-300 hover:border-2" id="card-back" style={{backgroundColor: `${cardDetails.colourBackBg}`, color: `${cardDetails.colourBackText}`}}>
                <div className="m-5">
                    <p className="text-3xl font-semibold">{cardDetails.name}</p>
                    <p className="text-2xl font-bold">{cardDetails.job}</p>
                </div>
                <div className="m-5">
                    <p className="text-2xl">{cardDetails.phone}</p>
                    <p className="text-2xl">{cardDetails.email}</p>
                </div>
                <div className="m-5">
                    <p className="text-1xl font-bold">{cardDetails.website}</p>
                </div>
            </div>
        </div>
        <div className="m-auto flex sm:w-10/12 md:w-8/12 md:my-2 lg:w-full">
            <button className="content-center m-auto bg-indigo-600 rounded-3xl text-sm text-slate-50 px-16 py-4 font-semibold mx-auto mt-10 hover:underline hover:opacity-90" onClick={(e) => navigate('/')}>START AGAIN</button>
        </div>
        
    </div>

}

export default View;