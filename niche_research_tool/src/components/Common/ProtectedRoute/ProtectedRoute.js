import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from '../../../Store/context/user.context'


const ProtectedRoute = ({
 
  component: Component,
  ...rest
}) => {
 const { isAuthenticated } = React.useContext(UserContext)
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute