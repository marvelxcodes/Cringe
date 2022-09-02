import { ClerkProvider as Provider } from "@clerk/clerk-react"
import { useNavigate } from 'react-router-dom'
const API_KEY = import.meta.env.VITE_CLERK_API_KEY

export default function ClerkProvider({children}) {
    const navigate = useNavigate()
    return (
    <Provider
        frontendApi={API_KEY}
        navigate={to => navigate(to)}>
        {children}
    </Provider>
    )
}