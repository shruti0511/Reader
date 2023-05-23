import { useSelector } from 'react-redux'
import { selectCurrentToken } from 'redux/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let status = "User"

    if (token) {
        const decoded = jwtDecode(token)
        const { email,name, roles } = decoded.UserInfo

        isAdmin = roles.includes('Admin')

        if (isAdmin) status = "Admin"

        return { name, roles, status, email, isAdmin }
    }

    return { name: '',email:'', roles: [],  isAdmin, status }
}
export default useAuth