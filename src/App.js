import { Routes, Route, useLocation } from 'react-router-dom';
import Create from './components/Create'
import View from './components/View'
import {useState, useEffect} from 'react'

function App() {

  const [newCardID, setNewCardID] = useState("")

  let location = useLocation();

  useEffect(() => {
    // takes the path from useLocation and splits it to provide the id part of a unique URL and setNewCardID with it (if present)
    let currentPath = location.pathname.split("view/")
    if (currentPath.length > 1) {
      setNewCardID(currentPath[1])
    }
}, [])

  return (
    <Routes>
      <Route path={"/"} element={<Create setNewCardID={setNewCardID} newCardID={newCardID} />} />
      <Route path={`/view/${newCardID}`} element={<View newCardID={newCardID} />} />
    </Routes>
  );
}

export default App;
