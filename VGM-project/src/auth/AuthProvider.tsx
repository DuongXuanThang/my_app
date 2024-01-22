import { useFrappeAuth } from 'frappe-react-sdk';
type Props = {
    children: React.ReactNode;
  };
export function AuthProvider({children}:Props) {
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
    return <>{children}</>

}