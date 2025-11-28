import './App.css';
import MainRoute from './routes/MainRoute';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="">
      
      <Navbar/>
      <MainRoute/>
      <Footer/>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
