import Form from '../components/Form'

const Create = ({setNewCardID}) => {

    return <div className="w-full m-2 lg:w-5/12 lg:my-60 lg:h-3/6 m-auto">
            <h1 className="text-center text-2xl sm:text-3xl lg:mb-0 lg:p-5 lg:">Create your <b>business card</b></h1>
            <Form setNewCardID={setNewCardID} />
    </div>

}

export default Create;