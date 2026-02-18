import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './App.css';

export default function App() {
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}
