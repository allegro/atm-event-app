import React from 'react';
import { AppBar, Avatar } from 'material-ui';
import { withRouter } from 'react-router-dom';
import logo from './logo';

const AuthenticatedBar = ({ title, profile, children, history }) => {
    return (
        <AppBar title={title}
                style={{position: 'sticky', top: 0}}
                iconElementLeft={logo}
                onRightIconButtonTouchTap={() => history.push('/atm-event-app/profile')}
                iconElementRight={<Avatar style={{cursor: 'pointer'}} size={48} src={profile.photoURL}/>}>
            {children}
        </AppBar>
    );
};

export default withRouter(AuthenticatedBar);