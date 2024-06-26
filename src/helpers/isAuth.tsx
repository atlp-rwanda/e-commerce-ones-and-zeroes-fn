import { useSelector } from "react-redux";
import { RootState } from "../redux/store";



  export const isAuthenticated = () => {
  const { token } = useSelector(
    (state: RootState) => state.token
  );
  if(!token) {
    return false;
  }
  return true;
 }

