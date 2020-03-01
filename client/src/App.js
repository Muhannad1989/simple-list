import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
function App() {
  // set variables
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [allData, setAllData] = useState([]);

  // function get data
  async function getMyData() {
    try {
      const result = await axios.get('http://localhost:3000/list');
      setAllData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  // auto run
  useEffect(() => {
    getMyData();
  }, [allData]);

  async function handelSubmit(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/register_student', {
        first: first,
        last: last,
      });
      setFirst('');
      setLast('');
    } catch (error) {
      console.log(error);
    }
  }

  function handelChange1(event) {
    setFirst(event.target.value);
  }

  function handelChange2(event) {
    setLast(event.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          name="first"
          placeholder="write your first name"
          value={first}
          onChange={handelChange1}
        ></input>
        <input
          type="text"
          name="last"
          placeholder="write your first name"
          value={last}
          onChange={handelChange2}
        ></input>
        <input type="submit" value="submit"></input>
      </form>
      <div className="form">
        {allData.length !== 0 ? (
          <ul>
            {allData.map(item => (
              <li key={item._id}>{item.first}</li>
            ))}
          </ul>
        ) : (
          <img
            src="https://www.tmogroup.asia/wp-content/uploads/2018/05/001gif.gif?x65796"
            alt="loading"
          />
        )}
      </div>
    </div>
  );
}

export default App;
