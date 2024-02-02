import { ToastContainer } from 'react-toastify';
import MainRoutes from './Routes';
import "react-toastify/dist/ReactToastify.css";
import './index.css'

function App() {
  return (
    <>
      <ToastContainer autoClose={1000} theme="dark" position="bottom-center" />
      <MainRoutes />
    </>
  );
}

export default App;
