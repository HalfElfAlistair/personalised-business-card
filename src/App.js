import {db} from './firebase'
import { Routes, Route } from 'react-router-dom';
import Create from './components/Create'
import View from './components/View'

function App() {

  const [newCardID, setNewCardID] = useState("")

  return (
    <Routes>
      <Route path={"/"} element={<Create setNewCardID={setNewCardID} />} />
      <Route path={"/view"} element={<View newCardID={newCardID} />} />
    </Routes>
  );
}

export default App;
