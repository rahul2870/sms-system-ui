import { Routes, Route, BrowserRouter } from "react-router-dom"
import Navbar from "./components/navbar"

// pages
import AllContactList from "./pages/contact-list"
import ContactInfoPageF from "./pages/contact-info"
import SmsHistoryPage from "./pages/sms-history"
import SMSCompose from "./pages/sms-compose"

function App() {
    return <BrowserRouter>
        <Navbar>
            <Routes>
                <Route path="/" element={<AllContactList />} />
                <Route path="/info/:id" element={<ContactInfoPageF />} />
                <Route path="/message-compose/:id" element={<SMSCompose />} />
                <Route path="/history" element={<SmsHistoryPage />} />
            </Routes>
        </Navbar>
    </BrowserRouter>
}

export default App
