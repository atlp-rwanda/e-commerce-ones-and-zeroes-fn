import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const { token } = useSelector((state: RootState) => state.token);

const isAuthenticated = (token: string) => {
  if (!token) {
    return false;
  }
  return true;
};
