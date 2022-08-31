const Form = () => {

    return <form>
        <label htmlFor="name-input">Name</label>
        <input type="text" id="name-input" name="name-input" placeholder="Type your name here"></input>
        <label htmlFor="job-input">Job Title</label>
        <input type="text"  id="job-input" name="job-input" placeholder="Type your job title here"></input>
        <label htmlFor="business-input">Business name</label>
        <input type="text"  id="business-input" name="business-input" placeholder="Type your business name here" ></input>
        <label htmlFor="phone-input">Phone number</label>
        <input type="text"  id="phone-input" name="phone-input" placeholder="Type your phone number here" ></input>
        <label htmlFor="email-input">Email address</label>
        <input type="text"  id="email-input" name="email-input" placeholder="Type your email address here" ></input>
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