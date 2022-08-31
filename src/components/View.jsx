import { useNavigate } from 'react-router-dom';

const View = ({newCardID}) => {

    const navigate = useNavigate();
    const [cardDetails, setCardDetails] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    return <div>
        <div id="card-front">
            <p>Business</p>
            <img></img>
        </div>
        <div id="card-back">
            <p>Name</p>
            <p>Job</p>
            <p>Phone</p>
            <p>Email</p>
            <p>Website</p>
        </div>
        <button onClick={(e) => navigate('/')}>START AGAIN</button>
    </div>

}

export default View;