import {db} from './firebase'
import { Routes, Route } from 'react-router-dom';
import Create from './components/Create'
import View from './components/View'

function App() {

  return (
    <Routes>
      <Route path={"/"} element={<Create />} />
      <Route path={"/view"} element={<View />} />
    </Routes>
  );
}

export default App;
