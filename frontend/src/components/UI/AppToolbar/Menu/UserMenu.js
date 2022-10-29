import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Grid, LinearProgress} from "@mui/material";
import {useHistory} from "react-router-dom";
import {logoutUser} from "../../../../store/actions/usersActions";

const UserMenu = ({user}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.users.logoutLoading);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await dispatch(logoutUser());
    history.push('/');
  };

  return (
    <Grid container>
      <Grid item>
        <Button
          id="basic-button"
          color="inherit"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{fontSize: "18px"}}
        >
          Hello, {user.displayName}!
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{marginTop: "15px", marginLeft: "20px"}}
        >
          <MenuItem>My profile</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
          {loading && <LinearProgress/>}
        </Menu>
      </Grid>
    </Grid>
  );
};

export default UserMenu;
