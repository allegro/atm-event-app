import React from 'react';
import { AppBar, Avatar } from 'material-ui';
import { withRouter } from 'react-router-dom';

const AuthenticatedBar = ({ title, profile, children, history }) => {
    return (
        <AppBar title={title}
                style={{position: 'sticky', top: 0}}
                iconElementLeft={<img src="https://raw.githubusercontent.com/allegro/atm-event-app/master/public/img/logo.svg" alt="logo" style={{height: 30, padding: 8}} />}
                onRightIconButtonTouchTap={() => history.push('/atm-event-app/profile')}
                iconElementRight={<Avatar style={{cursor: 'pointer'}} size={48} src={profile.photoURL}/>}>
            {children}
        </AppBar>
    );
};

export default withRouter(AuthenticatedBar);