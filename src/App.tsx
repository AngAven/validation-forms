import { LoginFormComponent } from './components/LoginForm'
import { TarjetaFormComponent } from './components/TarjetaForm'
import { ContrasenaFormComponent } from './components/ContrasenaForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <LoginFormComponent />
      <TarjetaFormComponent />
      <ContrasenaFormComponent />
    </div>
  )
}

export default App
