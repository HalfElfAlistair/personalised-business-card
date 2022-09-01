import {useState, useEffect} from 'react'
import '../index.css'
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

const Form = ({setNewCardID}) => {

    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const [business, setBusiness] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [logo, setLogo] = useState("")
    const [colourFrontBg, setColourFrontBg] = useState("")
    const [colourFrontText, setColourFrontText] = useState("")
    const [colourBackBg, setColourBackBg] = useState("")
    const [colourBackText, setColourBackText] = useState("")
    const [validated, setValidated] = useState("")

    const navigate = useNavigate();

    const basicValidation = (str, tailwindClasses) => {
         // checks length of string to ensure input has been filled and return "valid" or "invalid", along with the tailwind classes, for the className
        return (str.length > 0) ? `valid ${tailwindClasses}` : `invalid ${tailwindClasses}`
    }

    const phoneValidation = (str) => {
        // perform regex check for valid uk mobile phone string and return str argument if true or "" if false.
        return (/^[0][7][^0|2]\d{2}(\s|-)?\d{3}(\s|-)?\d{3}$/.test(str) === true) ? str : "";
    }

    const emailValidation = (str) => {
        // perform regex check for valid email string and return str argument if true or "" if false.
        return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str) === true) ? str : "";
    }

    const websiteValidation = (str) => {
        // perform regex check for valid website url string and return str argument if true or "" if false.
        return (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(str) === true) ? str : "";
    }

    const checkIcon = (stateItem) => {
        // Assesses input validity, using length of respective state. Returns an SVG checkmark if valid, to make validity clear to user
        return stateItem.length > 0 &&
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    }

    const submitFunc = () => {
        if (validated.length === 11) {
            return submitCard
        }
    }

    useEffect(() => {
        let stateArray = [name, job, business, phone, email, website, logo, colourFrontBg, colourFrontText, colourBackBg, colourBackText]
        const validityTest = stateArray.filter(value => value.length > 1)
        setValidated(validityTest)
    }, [name, job, business, phone, email, website, logo, colourFrontBg, colourFrontText, colourBackBg, colourBackText])

    const submitCard = async (e) => {
        e.preventDefault()
        const docRef = await addDoc(collection(db, 'cards'), {
            name: name,
            job: job,
            business: business,
            phone: phone,
            email: email,
            website: website,
            logo: logo,
            colourFrontBg: colourFrontBg,
            colourFrontText: colourFrontText,
            colourBackBg: colourBackBg,
            colourBackText: colourBackText,
            created: Timestamp.now()
            })
            setNewCardID(() => {
                return docRef.id
            })
            navigate('/view');
    }

    
    // each form input will update their respecive state values with onChange, and some will perform validation checks

    return <form onSubmit={submitFunc()}>
        <label htmlFor="name-input">Name</label>
        <input className={basicValidation(name)} value={name} type="text" id="name-input" name="name-input" placeholder="Type your name here" onChange={(e) => setName(e.target.value)} ></input>
        {checkIcon(name)}
        <label htmlFor="job-input">Job Title</label>
        <input className={basicValidation(job)} type="text"  id="job-input" name="job-input" placeholder="Type your job title here" onChange={(e) => setJob(e.target.value)} ></input>
        {checkIcon(job)}
        
        <label htmlFor="business-input">Business name</label>
        <input className={basicValidation(business)} type="text"  id="business-input" name="business-input" placeholder="Type your business name here" onChange={(e) => setBusiness(e.target.value)} ></input>
        {checkIcon(business)}

        <label htmlFor="phone-input">Mobile Phone number</label>
        <input className={basicValidation(phone)} type="text"  id="phone-input" name="phone-input" placeholder="Type your mobile phone number here" onChange={(e) => setPhone(phoneValidation(e.target.value))} ></input>
        {checkIcon(phone)}
        
        <label htmlFor="email-input">Email address</label>
        <input className={basicValidation(email)} type="text"  id="email-input" name="email-input" placeholder="Type your email address here" onChange={(e) => setEmail(emailValidation(e.target.value))} ></input>
        {checkIcon(email)}
        
        <label htmlFor="website-input">Your website</label>
        <input className={basicValidation(website)} type="text"  id="website-input" name="website-input" placeholder="Type your website address here" onChange={(e) => setWebsite(websiteValidation(e.target.value))} ></input>
        {checkIcon(website)}
        
        <label htmlFor="logo-input">Business Logo</label>
        <input className={basicValidation(logo)} type="file" id="logo-input" name="logo-input" onChange={(e) => setLogo(e.target.value)} />
        {checkIcon(logo)}
        
        <label htmlFor="color-input-front-bg">Front Background Colour</label>
        <input className={basicValidation(colourFrontBg)} type="color" id="color-input-front-bg" name="color-input-front-bg" onChange={(e) => setColourFrontBg(e.target.value)} />
        {checkIcon(colourFrontBg)}
        
        <label htmlFor="color-input-front-text">Front Text Colour</label>
        <input className={basicValidation(colourFrontText)} type="color" id="color-input-front-text" name="color-input-front-text" onChange={(e) => setColourFrontText(e.target.value)} />
        {checkIcon(colourFrontText)}
        
        <label htmlFor="color-input-back-bg">Back Background Colour</label>
        <input className={basicValidation(colourBackBg)} type="color" id="color-input-back-bg" name="color-input-back-bg" onChange={(e) => setColourBackBg(e.target.value)} />
        {checkIcon(colourBackBg)}
        
        <label htmlFor="color-input-back-text">Back Text Colour</label>
        <input className={basicValidation(colourBackText)} type="color" id="color-input-back-text" name="color-input-back-text" onChange={(e) => setColourBackText(e.target.value)} />
        {checkIcon(colourBackText)}
        
        <input type="submit" value="CREATE BUSINESS CARD" />       
    </form>

}

export default Form;