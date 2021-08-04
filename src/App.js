import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoding] = useState(false);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random Person");

  const fetchPerosn = async () => {
    try {
      setLoding(true);
      const res = await fetch(url);
      const data = await res.json();
      const obj = data.results[0];
      const { phone, email } = obj;
      const { large: image } = obj.picture; // large: image means giving an alias to large
      const {
        login: { password }
      } = obj; // {} it will give to get nested property inside that object

      const { first, last } = obj.name;
      const {
        dob: { age }
      } = obj;
      const {
        street: { number, name }
      } = obj.location;
      const newPerson = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} - ${name}`,
        name: `${first} ${last}`
      };
      setPerson(newPerson);
      setTitle("name");
      setValue(newPerson.name);
      setLoding(false);
    } catch (error) {
      setPerson(null);
      setLoding(false);
    }
  };
  useEffect(() => {
    fetchPerosn();
  }, [url]);

  const handleValue = e => {
    if (e.target.classList.contains("icon")) {
      // console.log(e.target.classList.contains("icon"));
      const newvalue = e.target.dataset.label;
      setTitle(newvalue);
      setValue(person[newvalue]);
    }
    // console.log(e.target);
  };
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            className="user-img"
            src={(person && person.image) || defaultImage}
            alt={value}
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              data-label="name"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaUser />
            </button>
            <button
              data-label="email"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaEnvelopeOpen />
            </button>
            <button data-label="age" onMouseOver={handleValue} className="icon">
              <FaCalendarTimes />
            </button>
            <button
              data-label="street"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaMap />
            </button>
            <button
              data-label="phone"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaPhone />
            </button>
            <button
              data-label="password"
              onMouseOver={handleValue}
              className="icon"
            >
              <FaLock />
            </button>
          </div>
          <button onClick={() => !loading && fetchPerosn()} className="btn">
            {loading ? "loading" : " Random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
