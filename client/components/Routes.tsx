'use client'
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/session";
import moment from "moment";

interface AdminRouteProps {
  children: React.ReactNode;
  role: string;
}

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children, role }) => {
  const router = useRouter()
  const isLoggedIn = checkIsLoggedIn();
  const isAdminRole = isAdmin(role);

  if (isLoggedIn && isAdminRole) {
    return (
      <>
        {children}
      </>
    );
  } else if (isLoggedIn && !isAdminRole) {
    router.push('/');
  } else {
    router.push('/login');
  }
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = checkIsLoggedIn();
  const router = useRouter()


  return <>{(isLoggedIn) ? router.push('/admin') : children}</>;
};

const isAdmin = (role: string | undefined): boolean => {
  if (!role) return true;
  // CHECK JWT TOKEN (Private)
  const token = getToken();
  console.log(token)
  if (!token) return false;
  // check for access token duration
  // @ts-ignore
  const { data } = jwtDecode(token as string);
  console.log('pugyo')
  console.log(data, 'dataSSSSSSSSSSSSSSSSSSSSSS')
  const isValid = data.roles.includes(role);
  return isValid;
};

const checkIsLoggedIn = (): boolean => {
  // check for access token
  const token = getToken();
  if (!token) return false;
  // check for access token duration
  const { exp } = jwtDecode(token as string);
  const now = new Date().valueOf();
  const isValid = moment.unix(exp as number) > moment(now);
  return isValid;
};
