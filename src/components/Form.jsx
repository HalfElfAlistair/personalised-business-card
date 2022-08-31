import {useState} from 'react'
import '../index.css'

const Form = () => {

    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const [business, setBusiness] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const basicValidation = (str) => {
         // checks length of string to ensure input has been filled and return "valid" or "invalid" for the className
        return (str.length > 0) ? "valid" : "invalid"
    }

    const phoneValidation = (str) => {
        // perform regex check for valid uk mobile phone string and return "valid" or "invalid" for the className
        return (/^[0][7][^0|2]\d{2}(\s|-)?\d{3}(\s|-)?\d{3}$/.test(str) === true) ? "valid" : "invalid";
    }

    const emailValidation = (str) => {
        // perform regex check for valid email string and return "valid" or "invalid" for the className
        return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str) === true) ? "valid" : "invalid";
    }

    
    // each form input will update their respecive state values with onChange, and some will perform validation checks

    return <form>
        <label htmlFor="name-input">Name</label>
        <input className={basicValidation(name)} type="text" id="name-input" name="name-input" placeholder="Type your name here" onChange={(e) => setName(e.target.value)} ></input>

        <label htmlFor="job-input">Job Title</label>
        <input className={basicValidation(job)} type="text"  id="job-input" name="job-input" placeholder="Type your job title here" onChange={(e) => setJob(e.target.value)} ></input>
        
        <label htmlFor="business-input">Business name</label>
        <input className={basicValidation(business)} type="text"  id="business-input" name="business-input" placeholder="Type your business name here" onChange={(e) => setBusiness(e.target.value)} ></input>
        
        <label htmlFor="phone-input">Mobile Phone number</label>
        <input className={phoneValidation(phone)} type="text"  id="phone-input" name="phone-input" placeholder="Type your mobile phone number here" onChange={(e) => setPhone(e.target.value)} ></input>
        
        <label htmlFor="email-input">Email address</label>
        <input className={emailValidation(email)} type="text"  id="email-input" name="email-input" placeholder="Type your email address here" onChange={(e) => setEmail(e.target.value)} ></input>
        
        <label htmlFor="website-input">Your website</label>
        <input type="text"  id="website-input" name="website-input" placeholder="Type your website address here" ></input>
        
        <label htmlFor="logo-input">Business Logo</label>
        <input type="file" id="logo-input" name="logo-input" />
        
        <label htmlFor="color-input-front-bg">Front Background Colour</label>
        <input type="color" id="color-input-front-bg" name="color-input-front-bg" />
        
        <label htmlFor="color-input-front-text">Front Text Colour</label>
        <input type="color" id="color-input-front-text" name="color-input-front-text" />
        
        <label htmlFor="color-input-back-bg">Back Background Colour</label>
        <input type="color" id="color-input-back-bg" name="color-input-back-bg" />
        
        <label htmlFor="color-input-back-text">Back Text Colour</label>
        <input type="color" id="color-input-back-text" name="color-input-back-text" />
        
        <input type="submit" value="CREATE BUSINESS CARD" />       
    </form>

}

export default Form;