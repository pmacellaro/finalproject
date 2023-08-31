import { useEffect, useState } from 'react';
import Signup from './Signup';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Header from './Header'
import Home from './Home';
import SquishList from './SquishList';
import FavoriteSquishList from './FavoriteSquishList';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
function App() {
  const [squish, setSquish] = useState([])
  const [favoriteSquishes, setFavoriteSquishes] = useState([])
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState([]);

  const updateUser = (user) => setUser(user);

  const updateUserProfile = (updatedProfile) => {
    setUser(updatedProfile);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await fetchUser();
      if (userResponse) {
        fetchUserProfile(userResponse.id);
      }
    };
  
    fetchUserData();
    fetchSquish();
  }, []);
  console.log(user)
  const fetchUserProfile = () => {
    fetch(`/users/${user.id}`)
      .then((resp) => resp.json())
      .then((userProfile) => setUserProfile(userProfile))
      .catch((error) => console.error('Error fetching users:', error));
  };
  console.log(userProfile)



  function fetchSquish() {
    fetch('/squishes')
    .then((resp) => resp.json())
    .then((squish) => setSquish(squish))
  }
  console.log(squish)

  const handleLogout = () => {
    try {
      const response = fetch('/logout', {
        method: 'DELETE',
      });

      // if (response.ok) {
        console.log('Logged out') 
        setUser(null);
      // } else {
      //   console.error('Logout failed');
      // }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };




  const fetchUser = () => {
    fetch("/authorized").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => setUser(user));
      }
    });
  };

  
  
  console.log(user)
  if (user) {
    return (
      <BrowserRouter>
      <>
          <Header updateUser={updateUser} handleLogout={handleLogout} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/squish">
              <SquishList squish={squish} favoriteSquishes={favoriteSquishes} setFavoriteSquishes={setFavoriteSquishes}/> 
            </Route>
            <Route path="/profile">
              <Profile user={user}/>
            </Route>
            <Route path="/editprofile">
              <ProfileEdit user={user} updateUserProfile={updateUserProfile}/>
            </Route>
            <Route path="/favorites">
              <FavoriteSquishList setFavoriteSquishes={setFavoriteSquishes} favoriteSquishes={favoriteSquishes} squish={squish} />
            </Route>
          </Switch>
      </>
  </BrowserRouter>
    );
  }

  else
  return (<BrowserRouter>
    <div className="App">
    <Signup updateUser={updateUser} />

    </div>
    </BrowserRouter>
  );

}


export default App;
