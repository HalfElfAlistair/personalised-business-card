import Form from '../components/Form'

const Create = ({setNewCardID}) => {

    return <div>
            <h1>Create your business card</h1>
            <Form setNewCardID={setNewCardID} />
    </div>

}

export default Create;