import logo from './logo.svg';
import './App.css';
import Form from "./components/Form/Form";

const USER_NAME = "Alpha123";
const ADDRESS = "lorem ipsim lorem ipsin";
const GENDER = "MALE";

function App() {
  return (
    <div className="App">
      <Form initialValues={{firstName: USER_NAME,gender: GENDER,address: ADDRESS}}/>
    </div>
  );
}

export default App;
