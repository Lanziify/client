import React, { useEffect, useState } from "react";
import CustomerProfiles from "./components/CustomerProfiles";
import axios from "axios";
import { baseURL } from "./utils/constanst";
import SelectAddress from "./components/SelectAddress";

const App = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [clearAddress, setClearAddress] = useState(false);
  const [employment, setEmployment] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState("");

  const handleGenderSelect = (event) => {
    setGender(event.target.value);
  };
  const handleEmploymentSelect = (event) => {
    setEmployment(event.target.value);
  };

  function handlePostProfile() {
    const regex = /^([1-9]|[2-9][0-9])$/;
    if (!age) {
      setError("Age required");
    } else if (!regex.test(age)) {
      setError("Age should range between 1 to 99");
    } else if (!gender) {
      setError("Please select a gender");
    } else if (!address) {
      setError("Please enter address");
    } else if (!employment) {
      setError("Please specify employment status");
    } else {
      postProfile();
    }
  }

  // const handleSelectedAddress = () => {

  // }

  // Fetch all profiles from database

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        setProfiles(res.data);
        // region();
      })
      .catch((err) => setError("Error fetching profiles"));
  }, []);

  async function postProfile() {
    try {
      const res = await axios.post(baseURL, {
        age,
        gender,
        address,
        employment,
      });
      setProfiles([...profiles, res.data]);
      setAge("");
      setGender("");
      setClearAddress(true);
      setEmployment("");
      setError("");
    } catch (err) {
      setError("Error adding profile");
    }
  } // async function updateProfile(profileId) {
  //   const profile = await profiles.find((p) => p._id === profileId);
  //   setEditName(profile.name);
  //   setEditEmail(profile.email);
  //   setEditPhone(profile.phone);
  // }
  // async function clearInput() {
  //   setId("");
  //   setEditName("");
  //   setEditEmail("");
  //   setEditPhone("");
  //   provinces("01").then((province) => console.log(province));
  // }
  // async function updateProfile(profileId) {
  //   const profile = profiles.find((p) => p._id === profileId);
  //   setId(profile._id);
  //   setEditName(profile.name);
  //   setEditEmail(profile.email);
  //   setEditPhone(profile.phone);
  // }
  // async function saveUpdatedProfile(e) {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.put(`${baseURL}/${id}`, {
  //       name: editName,
  //       email: editEmail,
  //       phon: editPhone,
  //     });
  //     setProfiles(profiles.map((p) => (p._id === id ? res.data : p)));
  //     clearInput();
  //   } catch (err) {
  //     setError("Error updating profile");
  //   }
  // }

  async function removeProfile(profileId) {
    try {
      await axios.delete(`${baseURL}/${profileId}`);
      setProfiles(profiles.filter((p) => p._id !== profileId));
    } catch (err) {
      setError("Error deleting profile");
    }
  }

  return (
    <main>
      <div className="m-10 p-5 flex flex-col gap-5 bg-gray-800 text-gray-50 text-center overflow-auto rounded-lg shadow-md">
        <h1 className='text-4xl font-extrabold dark:text-white'>
          Customer Profiles
        </h1>
      </div>

      {/* Add new Data */}
      <CustomerProfiles
        data={profiles}
        onEdit={null}
        onDelete={removeProfile}
      />

      <div className='m-10 p-10 flex flex-col gap-5 bg-gray-800 text-gray-50 text-center overflow-auto rounded-lg shadow-md'>
        <h3 className='text-4xl font-extrabold dark:text-white'>
          Add Customer Profile
        </h3>
        {/* Error Print */}
        {error && (
          <div className='p-2 rounded-md bg-rose-600 border-0 outline-none transition-all'>
            {error}
          </div>
        )}

        <input
          className='p-2 rounded-md bg-gray-700 hover:bg-gray-600 outline-none transition-all'
          type='number'
          placeholder='Age'
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <h1 className='text-lg font-normal text-gray-500 dark:text-gray-400'>
          Gender
        </h1>
        {/* Gender Selection */}
        <select
          value={gender}
          onChange={handleGenderSelect}
          className='p-2 rounded-md bg-gray-700 hover:bg-gray-600 outline-none transition-all'>
          <option value=''>Select a gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Nonbinary'>Non-binary</option>
          <option value='Other'>Other</option>
        </select>
        {/* Location Selection */}
        <h1 className='text-lg font-normal text-gray-500 dark:text-gray-400'>
          Address
        </h1>

        <SelectAddress
          onSelectedAddress={setAddress}
          onClearSelection={clearAddress}
        />

        <h1 className='text-lg font-normal text-gray-500 dark:text-gray-400'>
          Employment
        </h1>

        <select
          value={employment}
          onChange={handleEmploymentSelect}
          className='p-2 rounded-md bg-gray-700 hover:bg-gray-600 outline-none transition-all'>
          <option value=''>Select Employment</option>
          <option value='Employed'>Employed</option>
          <option value='Self-employed/Freelance'>
            Self-employed/Freelance
          </option>
          <option value='Unemployed – Not looking for work'>
            Unemployed – Not looking for work
          </option>
          <option value='Unemployed- Looking for work'>
            Unemployed- Looking for work
          </option>
          <option value='Interning'>Interning</option>
          <option value='Homemaker'>Homemaker</option>
          <option value='Studying'>Studying</option>
          <option value='Military/Forces'>Military/Forces</option>
          <option value='Retired'>Retired</option>
          <option value='Not able to work'>Not able to work</option>
          <option value='Other'>Other</option>
        </select>
        <button
          className='text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-teal-600 dark:hover:bg-teal-700 focus:outline-none dark:focus:ring-teal-800'
          onClick={handlePostProfile}>
          Save details
        </button>
      </div>

      {/* Edit Profiles */}
      {/* <h1 className='title'>Update Profile</h1>
      <div className='input_holder'>
       <input
         disabled={true}
         type='text'
         value={id}
         onChange={(e) => {
           setEditName(e.target.value);
         }}
       />
       <input
         type='text'
         placeholder='Name'
         value={editName}
         onChange={(e) => {
           setEditName(e.target.value);
         }}
       />
       <input
         type='text'
         placeholder='Email'
         value={editEmail}
         onChange={(e) => {
           setEditEmail(e.target.value);
         }}
       />
       <input
         type='text'
         placeholder='Phone'
         value={editPhone}
         onChange={(e) => {
           setEditPhone(e.target.value);
         }}
       />
       <button onClick={saveUpdatedProfile}>Update</button>
       <button onClick={clearInput}>Cancel</button>
      </div> */}
    </main>
  );
};

export default App;
