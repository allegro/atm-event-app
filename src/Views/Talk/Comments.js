// @flow
import React from 'react';
import {Paper} from 'material-ui';
import ReactDisqusComments from 'react-disqus-comments';
import {PropTypes} from 'prop-types';

/**
 * @param {String} id
 */
const Comments = ({ id }) => {
    return <Paper style={{padding: 30}} zDepth={1}>
        <ReactDisqusComments shortname="atm-1" identifier={id}/>
    </Paper>;
};

Comments.propTypes = {
    id: PropTypes.string.isRequired
};

export default Comments;