import React from 'react';
import { FlowRouter } from "meteor/kadira:flow-router";

import Page from "./Page.jsx";

// main pagination component
export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        // bind events
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
    }

    onPrev() {
        const page = this.props.currentPage - 1;

        if (page > 0) {
            FlowRouter.setQueryParams({ page: page });
        }
    }

    onNext() {
        const { totalPagesCount, currentPage } = this.props

        const page = currentPage + 1;

        if (page <= totalPagesCount) {
            FlowRouter.setQueryParams({ page: page });
        }
    }

    renderBar() {
        const { totalPagesCount, pages, currentPage, isPaginated } = this.props

        if (isPaginated) {
            let prevClass = '';
            let nextClass = '';

            if (currentPage <= 1) {
                prevClass = 'disabled';
            }

            if (currentPage >= totalPagesCount) {
                nextClass = 'disabled';
            }

            return (
                <nav>
                    <ul className='pagination'>
                        <li>
                            <a href='' className={ prevClass } onClick ={ this.onPrev }>
                                <i className='fa fa-chevron-left' />
                            </a>
                        </li>

                    {
                        pages.map((page, index) =>
                            <Page key={ index } currentPage={ currentPage } page={ page.page }/>
                        )
                    }

                        <li>
                            <a href = '' className={ nextClass } onClick={ this.onNext }>
                                <i className='fa fa-chevron-right' />
                            </a>
                        </li>
                    </ul>
                </nav>
            );
        }
    }

    render() {
        return (
            <div className='pagination-container'>
                <div> { this.renderBar() } </div>
                <div className='clearfix' />
            </div>
        );
    }
}