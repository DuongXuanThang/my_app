
import {AuthProvider} from './auth'
import Router from './routes/sections'
const appStyles = `
  body {
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
  ::-webkit-scrollbar {
    width: 10px; /* Chiều rộng của thanh cuộn */
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Màu nền của cảm ứng thanh cuộn */
  }
  
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Màu nền của phần track thanh cuộn */
  }
  
  /* Thiết lập thanh cuộn cho Firefox */
  /* Bạn cũng có thể thêm các thuộc tính tương ứng cho thanh cuộn của Firefox nếu cần */
  * {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
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
