import {useState, useEffect} from 'react'
import '../index.css'
import {db} from '../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

const Form = ({setNewCardID, newCardID}) => {

    // input data states
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

    // validation state
    const [validated, setValidated] = useState("")

    const navigate = useNavigate();

    const basicValidation = (str, tailwindClasses) => {
         // checks length of string to ensure input has been filled and return "valid" or "invalid", along with the tailwind classes, for the className
        return (str.length > 0) ? `${tailwindClasses} border-solid border-2 border-green-500` : `${tailwindClasses}`
    }

    const phoneValidation = (str) => {
        // performs regex check for valid uk mobile phone string and return str argument if true or "" if false.
        return (/^[0][7][^0|2]\d{2}(\s|-)?\d{3}(\s|-)?\d{3}$/.test(str) === true) ? str : "";
    }

    const emailValidation = (str) => {
        // performs regex check for valid email string and return str argument if true or "" if false.
        return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str) === true) ? str : "";
    }

    const websiteValidation = (str) => {
        // performs regex check for valid website url string and return str argument if true or "" if false.
        return (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(str) === true) ? str : "";
    }

    const checkIcon = (stateItem) => {
        // Assesses input validity, using length of respective state. Returns an SVG checkmark if valid, to make validity clear to user
        return stateItem.length > 0 &&
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    }

    useEffect(() => {
        // assigns an array of all input data states, excluding logo then filters out any empty strings to assign new validityTest variable which is set to validated state
        const stateArray = [name, job, business, phone, email, website, colourFrontBg, colourFrontText, colourBackBg, colourBackText]
        const validityTest = stateArray.filter(value => value.length > 0)
        setValidated(validityTest)
    }, [name, job, business, phone, email, website, colourFrontBg, colourFrontText, colourBackBg, colourBackText])

    const submitFunc = (e) => {
        // prevents page refresh if invalid submission. If valid returns submitCard function
        e.preventDefault()
        if (validated.length === 10) {
            return (submitCard(e))
        }
    }

    const submitCard = async (e) => {
        e.preventDefault()
        // Accesses 'cards' collection from firebase and creates a new document object, with data from the input states as properties and a timestamp.
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
            // takes the id from the new document reference and sets newCardID state with it
            setNewCardID(() => {
                return docRef.id
            })
            // takes the id from the new document and uses it in the URL path to view the card preview, which is navigated to
            navigate(`/view/${docRef.id}`);
    }
    
    // Each form input will update their respecive state values with onChange, and some will perform validation checks
    // Form is split into nested divs to make layout easier

    return <form className="m-5 lg:flex lg:flex-row lg:flex-wrap lg:justify-between lg:p-5" onSubmit={(e) => submitFunc(e)}>
        <div className="sm:w-10/12 md:w-8/12 sm:m-auto lg:w-full md:flex md:flex-row md:justify-between md:gap-10 md:my-2">
            <div className="lg:justify-self-start md:w-6/12">
                <label className="block text-sm leading-8" htmlFor="name-input">Name</label>
                <input className={basicValidation(name, "bg-stone-100 rounded-3xl text-sm text-left placeholder-stone-400 py-3 pl-4 w-11/12 md:w-full")} value={name} type="text" id="name-input" name="name-input" placeholder="Type your name here" onChange={(e) => setName(e.target.value)} ></input>
                {checkIcon(name)}
            </div>
            <div className="lg:justify-self-end md:w-6/12">
                <label className="block text-sm leading-8" htmlFor="job-input">Job Title</label>
                <input className={basicValidation(job, "bg-stone-100 rounded-3xl text-sm text-left placeholder-stone-400 py-3 pl-4 w-11/12 md:w-full")} type="text"  id="job-input" name="job-input" placeholder="Type your job title here" onChange={(e) => setJob(e.target.value)} ></input>
                {checkIcon(job)} 
            </div>
        </div>
        <div className="sm:w-10/12 md:w-8/12 sm:m-auto md:w-full md:my-2">
            <label className="block text-sm leading-8 md:m-auto md:w-8/12" htmlFor="business-input">Business name</label>
            <input className={basicValidation(business, "block bg-stone-100 rounded-3xl text-sm text-left placeholder-stone-400 py-3 pl-4 w-11/12 md:w-8/12 lg:w-full md:m-auto")} type="text"  id="business-input" name="business-input" placeholder="Type your business name here" onChange={(e) => setBusiness(e.target.value)} ></input>
            {checkIcon(business)}
        </div>
        <div className="sm:w-10/12 md:w-8/12 sm:m-auto lg:w-full md:flex md:flex-row md:justify-between md:gap-10 md:my-2">
            <div className="lg:justify-self-start md:w-6/12">
                <label className="block text-sm leading-8" htmlFor="phone-input">Mobile Phone number</label>
                <input className={basicValidation(phone, "bg-stone-100 rounded-3xl text-sm text-left placeholder-stone-400 py-3 pl-4 w-11/12 md:w-full")} type="text"  id="phone-input" name="phone-input" placeholder="Type your mobile phone number here" onChange={(e) => setPhone(phoneValidation(e.target.value))} ></input>
                {checkIcon(phone)}
            </div>
            <div className="lg:justify-self-end md:w-6/12">
                <label className="block text-sm leading-8" htmlFor="email-input">Email address</label>
                <input className={basicValidation(email, "bg-stone-100 rounded-3xl text-sm text-left placeholder-stone-400 py-3 pl-4 w-11/12 md:w-full")} type="text"  id="email-input" name="email-input" placeholder="Type your email address here" onChange={(e) => setEmail(emailValidation(e.target.value))} ></input>
                {checkIcon(email)}
            </div>
        </div>
        <div className="sm:w-10/12 md:w-8/12 sm:m-auto md:w-full md:my-2">
            <label className="block text-sm leading-8 md:m-auto md:w-8/12" htmlFor="website-input">Your website</label>
            <input className={basicValidation(website, "block bg-stone-100 rounded-3xl text-sm text-left placeholder-stone-400 py-3 pl-4 w-11/12 md:w-8/12 lg:w-full md:m-auto")} type="text"  id="website-input" name="website-input" placeholder="Type your website address here" onChange={(e) => setWebsite(websiteValidation(e.target.value))} ></input>
            {checkIcon(website)}
        </div>
        <div className="sm:w-10/12 md:w-8/12 sm:m-auto md:w-full md:my-2">
            <label className="block text-sm leading-8 md:m-auto md:w-8/12" htmlFor="logo-input">Business Logo</label>
            <input className={basicValidation(logo, "block bg-stone-100 rounded-3xl text-sm text-left placeholder-stone-400 py-3 pl-4 w-11/12 md:w-8/12 lg:w-full md:m-auto")} type="text"  id="logo-input" name="logo-input" placeholder="Paste your logo image URL here" onChange={(e) => setLogo(websiteValidation(e.target.value))} ></input>
            {checkIcon(logo)}
        </div>
        <div className="sm:w-10/12 md:w-8/12 lg:w-full m-auto sm:flex sm:flex-row sm:justify-between sm:gap-1 md:gap-10 my-2">
            <div className="w-full">
                <label className="block text-sm leading-8" htmlFor="color-input-front-bg">Front Background Colour</label>
                <div className="block bg-stone-100 rounded-3xl w-11/12 sm:w-10/12 md:w-full h-10">
                    <input className={basicValidation(colourFrontBg, "w-3/12 h-10")} type="color" id="color-input-front-bg" name="color-input-front-bg" onChange={(e) => setColourFrontBg(e.target.value)} />
                    {checkIcon(colourFrontBg)}
                </div>
            </div>
            <div className="w-full">
                <label className="block text-sm leading-8" htmlFor="color-input-front-text">Front Text Colour</label>
                <div className="block bg-stone-100 rounded-3xl w-11/12 sm:w-10/12 md:w-full h-10">
                    <input className={basicValidation(colourFrontText, "w-3/12 h-10")} type="color" id="color-input-front-text" name="color-input-front-text" onChange={(e) => setColourFrontText(e.target.value)} />
                    {checkIcon(colourFrontText)}
                </div>
            </div>
        </div>
        <div className="sm:w-10/12 md:w-8/12 lg:w-full m-auto sm:flex sm:flex-row sm:justify-between sm:gap-1 md:gap-10 my-2">
            <div className="w-full">
                <label className="block text-sm leading-8" htmlFor="color-input-back-bg">Back Background Colour</label>
                <div className="block bg-stone-100 rounded-3xl w-11/12 sm:w-10/12 md:w-full h-10">
                    <input className={basicValidation(colourBackBg, "w-3/12 h-10")} type="color" id="color-input-back-bg" name="color-input-back-bg" onChange={(e) => setColourBackBg(e.target.value)} />
                    {checkIcon(colourBackBg)}
                </div>
            </div>
            <div className="w-full">
                <label className="block text-sm leading-8" htmlFor="color-input-back-text">Back Text Colour</label>
                <div className="block bg-stone-100 rounded-3xl w-11/12 sm:w-10/12 md:w-full h-10">
                    <input className={basicValidation(colourBackText, "w-3/12 h-10")} type="color" id="color-input-back-text" name="color-input-back-text" onChange={(e) => setColourBackText(e.target.value)} />
                    {checkIcon(colourBackText)}
                </div>
            </div>
        </div>
        <div className="sm:w-10/12 md:w-8/12 sm:m-auto md:w-full md:my-2 m-auto flex">
            <input className="content-center m-auto bg-indigo-600 rounded-3xl text-sm text-slate-50 px-16 py-4 font-semibold  mt-10 hover:underline hover:opacity-90" type="submit" value="CREATE BUSINESS CARD" />
        </div>
    </form>

}

export default Form;