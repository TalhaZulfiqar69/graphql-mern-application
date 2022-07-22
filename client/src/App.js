import { Routes, Route } from 'react-router-dom';
import Navbar from './common/Navbar';

import { routes } from './routes/index';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {routes &&
          routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={<route.component />}
            />
          ))}
      </Routes>
    </>
  );
};

export default App;
