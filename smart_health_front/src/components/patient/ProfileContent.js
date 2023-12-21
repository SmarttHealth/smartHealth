import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '123-456-7890',
    address: '123 Main St, City',
    birthday: '1990-01-01',
    image: 'https://source.unsplash.com/MP0IUfwrn0A',
  });

  const handleUpdateProfile = () => {
    // Mettez à jour le profil ici (vous pouvez utiliser une API, etc.)
    console.log('Profil mis à jour !', profile);
  };

  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
        <div className="p-4 md:p-12 text-center lg:text-left">
          <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={{ backgroundImage: `url(${profile.image})` }}></div>

          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{`${profile.firstName} ${profile.lastName}`}</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

          <div className="pb-6">
            <label htmlFor="firstName" className="font-semibold text-gray-700 block pb-1">First Name</label>
            <input
              id="firstName"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="lastName" className="font-semibold text-gray-700 block pb-1">Last Name</label>
            <input
              id="lastName"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="phone" className="font-semibold text-gray-700 block pb-1">Phone</label>
            <input
              id="phone"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="address" className="font-semibold text-gray-700 block pb-1">Address</label>
            <input
              id="address"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            />
          </div>

          <div className="pb-6">
            <label htmlFor="birthday" className="font-semibold text-gray-700 block pb-1">Birthday</label>
            <input
              id="birthday"
              className="border-1 rounded-r px-4 py-2 w-full"
              type="date"
              value={profile.birthday}
              onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
            />
          </div>

          {/* <div className="w-full p-8 mx-2 flex justify-center">
            <img id="showImage" className="max-w-xs w-32 items-center border" src={profile.image} alt="Profile" />
          </div> */}

          <div className="pt-12 pb-8">
            <button className="bg-blue-700 hover:bg-blue-900  text-white font-bold py-2 px-4 rounded-full" onClick={handleUpdateProfile}>
              Update Profile
            </button>
          </div>
        </div>
        
      </div>

      <div className="w-full lg:w-2/5">
        <img src={profile.image} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt="Profile" />
      </div>
    </div>
  );
};

export default Profile;
