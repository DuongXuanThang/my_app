import { useFrappeAuth } from 'frappe-react-sdk';

export default function useCookie() {
    const {
        currentUser,
        isValidating,
        isLoading,
        login,
        logout,
        error,
        updateCurrentUser,
        getUserCookie,
      } = useFrappeAuth();
    return {
        isLoading,currentUser
    }
    
}