import routerConfig from './route';
import {RouterProvider} from 'react-router-dom';
import './index.css';

function App() {
  return <RouterProvider router={routerConfig} />;
}

export default App;
