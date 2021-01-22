import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Axios from "./axios";
import disableBrowserBackButton from 'disable-browser-back-navigation';

function Login() {
    const [Form, setForm] = useState({})

    const history = useHistory();

    const handleSubmit = (e)=>{
      e.preventDefault();
      // console.log(Form)
      Axios.post("/login",Form)
      .then((res)=>{
        if(res.data)
        {
          console.log(res);
          localStorage.setItem("Token",res.data.Token)
          localStorage.setItem("name",res.data.Name)
          localStorage.setItem("email",res.data.Email)
          localStorage.setItem("mobile",res.data.Mobile)
          history.push("/profile/");
          disableBrowserBackButton();
        }
      })
      .catch(err=>{
        console.log(err);
        console.log(err.response);
        alert(err.response.data)
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

              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" placeholder="example@gmail.com" onChange={handleChange} />
              <label htmlFor="password">Enter Password</label>
              <input type="password" name="password" id="password" placeholder="Atleast 7 Characters" onChange={handleChange} />
              <button className="sub__button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }

export default Login
