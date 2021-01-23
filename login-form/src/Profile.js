import React, { useEffect, useState } from "react";
import "./Profile.css";
import Axios from "./axios";

function Profile() {
  const [Data, setData] = useState({});

  const [Name, setName] = useState();
  const [Name1, setName1] = useState();

  const updateInput = (e) => {
    console.log(e.target.value);
  };

  const handleChange1 = (props) => {
    const update = document.getElementsByClassName("update");
    update[0].classList.toggle("update");
    setName(props);
    console.log(props);
  };

  const handleChange = async (value) => {
    await setName(value);
    const update = document.getElementsByClassName("update");
    update[0].classList.toggle("active");
  };

  const Update = ({ name }) => {
    return (
      <div className="update">
        <label htmlFor={name}>{name}</label>
        {name == "Password" ? (
          <input type="password" onChange={updateInput} id={name} />
        ) : (
          <input type="text" onChange={updateInput} id={name} />
        )}
        <button>Change {name}</button>
        <button
          className="close__button"
          onClick={() => {
            handleChange1();
          }}
        >
          X
        </button>
      </div>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log(token);
    Axios.get("/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        alert(err.response.data);
      });
  }, []);

  return (
    <div className="App">
      <div className="main">
        <div>
          <h3>User Profile</h3>
        </div>
        <div className="display__form1">
          <div className="form">
            <label htmlFor="fname">Name </label>
            <input type="text" id="fname" value={Data?.fname} />
            <button
              type="button"
              onClick={() => {
                handleChange("Name");
              }}
            >
              Change Name
            </button>
            <label htmlFor="email">Email </label>
            <input type="text" id="email" value={Data?.email} />
            <button
              type="button"
              onClick={() => {
                handleChange("Email");
              }}
            >
              Change Email
            </button>
            <label htmlFor="password">Password </label>
            <input type="password" id="password" value="11a5sg1161651kasgn" />
            <button
              type="button"
              onClick={() => {
                handleChange("Password");
              }}
            >
              Change Password
            </button>
            <label htmlFor="Mobile">Mobile </label>
            <input type="text" id="Mobile" value={Data?.mobile} />
            <button
              type="button"
              onClick={() => {
                handleChange("Mobile");
              }}
            >
              Change Mobile Number
            </button>
          </div>
        </div>
      </div>
      <Update name={Name} />
    </div>
  );
}

export default Profile;
