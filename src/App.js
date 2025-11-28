import './App.css';
import MainRoute from './routes/MainRoute';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="">
      
      <Navbar/>
      <MainRoute/>
      <Footer/>
    </div>
  );
}

export default App;
