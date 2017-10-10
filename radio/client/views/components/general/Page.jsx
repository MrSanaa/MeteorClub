import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";

// per page component
export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        FlowRouter.setQueryParams({ page: this.props.page });
    }

    render() {
        const { currentPage, page } = this.props;

        if (page) {
            let className = '';

            if (page === currentPage) {
                className += ' active disabled';
            }

            return (
                <li className={ className } onClick={ this.onClick }>
                    <a href=''>{ page }</a> 
                </li>
            );
        }

        return (
            <li className='disabled'>
                <span> ... </span>
            </li>
        );
    }
}