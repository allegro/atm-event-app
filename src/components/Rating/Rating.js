import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import ToggleStar from "@material-ui/icons/Star";
import ToggleStarBorder from "@material-ui/icons/StarBorder";
import classnames from "classnames";

const styles = {
    root: {
        display: "flex",
        justifyContent: "center"
    },
    disabled: {
        pointerEvents: "none"
    },
};

class Rating extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hoverValue: props.value
        };
    }

    renderIcon (i) {
        const filled = i <= this.props.value;
        const hovered = i <= this.state.hoverValue;

        if ((hovered && !filled) || (!hovered && filled)) {
            return <ToggleStarBorder color="secondary" />;
        } else if (filled) {
            return <ToggleStar color="secondary" />;
        } else {
            return <ToggleStarBorder />;
        }
    }

    handleStarClick = event => {
        const { disabled, onChange } = this.props;

        if (!disabled) {
            const i = event.currentTarget.dataset.value;
            onChange(parseInt(i, 10));
        }
    };

    handleStarOver = event => {
        const { disabled } = this.props;

        if (!disabled) {
            const hoverValue = event.currentTarget.dataset.value;
            this.setState({ hoverValue });
        }
    };

    handleStarLeave = () => {
        this.setState({ hoverValue: this.props.value });
    };

    render () {
        const { classes, disabled, max } = this.props;

        const starValues = [...new Array(max)].map((_, i) => i + 1);


        return (
            <div className={classnames(classes.root, { [classes.disabled]: this.props.disabled })}>
                {starValues.map(i => <IconButton
                    key={i}
                    data-value={i}
                    disabled={disabled}
                    onMouseEnter={this.handleStarOver}
                    onMouseLeave={this.handleStarLeave}
                    onClick={this.handleStarClick}
                >
                    {this.renderIcon(i)}
                </IconButton>)}
            </div>
        );
    }
}

Rating.defaultProps = {
    disabled: false,
    onChange: () => {},
    max: 5,
    readOnly: false,
    value: 0
};

Rating.propTypes = {
    classes: PropTypes.object,
    disabled: PropTypes.bool,
    max: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.number
};

export default withStyles(styles)(Rating);
