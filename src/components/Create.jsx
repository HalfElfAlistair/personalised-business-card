import Form from '../components/Form'

const Create = ({setNewCardID}) => {

    return <div className="mx-auto w-5/12 my-60 h-3/6">
            <h1 className="mx-auto w-full mb-0 p-5 text-center text-3xl">Create your business card</h1>
            <Form setNewCardID={setNewCardID} />
    </div>

}

export default Create;