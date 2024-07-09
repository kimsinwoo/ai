import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import LoginHeader from './components/LoginHeader'
import MainPage from './components/MainPage'
import Upload from './components/Upload'
import Profile from './components/Profile'
import ChatPage from './components/ChatPage'
import Login from './components/Login'
import { useState, useEffect } from 'react';
import ProductDetail from './components/ProductDetail';


function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={
            <div>
              <LoginHeader isLogin={isLogin} setIsLogin={setIsLogin}/>
              <Header isLogin={isLogin} />
              <MainPage />
            </div>
          } />
          <Route path="/upload" element={
            <div>
              <LoginHeader isLogin={isLogin} setIsLogin={setIsLogin}/>
              <Header isLogin={isLogin} />
              <Upload />
            </div>
          } />
          <Route path="/profile" element={
            <div>
              <LoginHeader isLogin={isLogin} setIsLogin={setIsLogin}/>
              <Header isLogin={isLogin} />
              <Profile />
            </div>
          } />
          <Route path="/chat/:roomId" element={
            <div>
              <LoginHeader isLogin={isLogin} setIsLogin={setIsLogin}/>
              <Header isLogin={isLogin} />
              <ChatPage />
            </div>
          } />
          <Route path="/product/:id" element={
            <div>
              <LoginHeader isLogin={isLogin} setIsLogin={setIsLogin}/>
              <Header isLogin={isLogin} />
              <ProductDetail />
            </div>
          } />
          <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
