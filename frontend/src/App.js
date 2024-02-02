import { ToastContainer } from 'react-toastify';
import MainRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
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
