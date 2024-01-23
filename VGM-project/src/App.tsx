
import {AuthProvider} from './auth'
import Router from './routes/sections'
const appStyles = `
  body {
    margin: 0;
    padding: 0;
  }
`;
function App() {
  return (
    <AuthProvider>
       <style>{appStyles}</style>
      <Router />
    </AuthProvider>
  )
}

export default App
