import { useState } from 'react'
import { FrappeProvider } from 'frappe-react-sdk'
function App() {
  const [count, setCount] = useState(0)

  return (
	<div className="App">
	  <FrappeProvider>
	
	  </FrappeProvider>
	</div>
  )
}

export default App
