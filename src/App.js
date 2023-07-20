import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MyRoute from './routes/MyRoute';
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook';
import Header from './components/Header/Header';
import { gapi } from 'gapi-script'
import { Provider } from 'react-redux';
import store from './store/store'

const YOUR_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: YOUR_CLIENT_ID,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  })

  const { login, logout, token, userId, isReady, name, avatar } = useAuth()
  const isLogin = !!token

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin, name, avatar }}>
        <BrowserRouter>
          <div className="App">
            <Header />
            {isReady && <MyRoute isLogin={isLogin} />}
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
