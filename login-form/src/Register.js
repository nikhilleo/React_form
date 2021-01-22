

import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Register.css';
import Axios from "./axios"
import disableBrowserBackButton from 'disable-browser-back-navigation';

function Register() {


  const history = useHistory();

  const [Form, setForm] = useState({})

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(Form)
    Axios.post("/adduser",Form)
    .then((res)=>{
      if(res.data=="User Created")
      {
        history.push("/login")
        disableBrowserBackButton();
      }
    })
    .catch((err)=>{
      alert(err.response.data);
    })
  }


  const handleChange = (e)=>{
    console.log(e.target.value);
    setForm((prevdata)=>({
      ...prevdata,
      [e?.target?.name]:e.target.value
    }))
    console.log(Form);
  }


  return (
    <div className="App">
      <div className="display__form" >
        <form className="register" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="fname" id="name" placeholder="Enter Name" onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" placeholder="example@gmail.com" onChange={handleChange} />
            <label htmlFor="password">Enter Password</label>
            <input type="password" name="password" id="password" placeholder="Atleast 7 Characters" onChange={handleChange} />
            <label htmlFor="mobile">Mobile Number</label>
            <input type="text" maxLength="10" name="mobile" id="mobile" placeholder="Enter Mobile Number" onChange={handleChange} />
            <button className="sub__button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
