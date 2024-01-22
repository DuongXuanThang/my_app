
import {AuthProvider} from './auth'
import Router from './routes/sections'
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
