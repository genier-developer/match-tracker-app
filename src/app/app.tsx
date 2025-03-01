import {MatchTracker} from "../pages/match-tracker";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {FC} from "react";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MatchTracker />} />
      </Routes>
    </Router>
  );
};

export default App
