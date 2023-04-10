import { useEffect, useState } from "react"
import Auth from "./components/Auth"
import ListHeader from "./components/ListHeader"
import ListItem from "./components/ListItem"
import {useCookies} from 'react-cookie'
import Sidenav from './components/Sidenav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Explore from "./Pages/Explore";
import Home from "./Pages/Home";
import Settings from "./Pages/Settings";
import Statistics from "./Pages/Statistics";
// import Navbar from './components/navBar2';
import Reports from './Pages/Reports';
import Products from './Pages/Products';
import Navbar from './components/Navbar';

const App = () => {
  const [cookies, setCookies, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const[tasks, setTasks] = useState(null)


  const getData = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }}
    , [])

  //sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      {!authToken && 
      <>
      <div className="testingAuth">
      <Auth/>
      </div>
      </>
      }

      {authToken && 
      <>
      <ListHeader listName={'Leads'} getData={getData} />
      {/* <p>Welcome back {userEmail}</p> */}
      {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
      {/* <BrowserRouter>
        <Navbar />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter> */}
      </>}
    </div>
  )
}

export default App
