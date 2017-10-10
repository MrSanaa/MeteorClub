import { Mongo } from 'meteor/mongo';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { composeWithTracker } from 'react-komposer';
import { _ } from 'meteor/underscore';

import Pagination from "./Pagination.jsx";

const Pages = new Mongo.Collection(null);

// pages calculation
const generatePages = (pageCount, currentPage) => {
    const w = 4;

    let pages = _.range(1, pageCount + 1);
    let diff;
    let first = pages.slice(0, w);

    const last = pages.slice(-w);

    let currentStart = currentPage - 1 - w;

    if (currentStart < 0) {
        currentStart = 0;
    }

    let currentEnd = currentPage - 1 + w;

    if (currentEnd < 0) {
        currentEnd = 0;
    }

    const current = pages.slice(currentStart, currentEnd);

    pages = [];

    if (_.intersection(first, current).length === 0) {
        pages = pages.concat(first);
        diff = current[0] - _.last(first);

        if (diff === 2) {
            pages.push(current[0] - 1);
        } else if (diff !== 1) {
            pages.push(null);
        }

        pages = pages.concat(current);
    } else {
        pages = _.union(first, current);
    }

    if (_.intersection(current, last).length === 0) {
        diff = last[0] - _.last(pages);

        if (diff === 2) {
            pages.push(last[0] - 1);
        } else if (diff !== 1) {
            pages.push(null);
        }

        pages = pages.concat(last);
    } else {
        diff = _.difference(last, current);
        pages = pages.concat(diff);
    }

    Pages.remove({});

    _.each(pages, (elm, i) => {
        Pages.insert({ order: i, page: elm })
    })
}

// change url page parameter
const goto = (page) => {
    FlowRouter.setQueryParams({ page });
}


// =================== Container
function composer(props, onData) {
    // listen for route change
    FlowRouter.watchPathChange();

    const count = props.count;
    const currentPage = Number(FlowRouter.getQueryParam('page')) || 1;
    const perPage = Number(FlowRouter.getQueryParam('perPage')) || 10;

    let totalPagesCount = parseInt(count / perPage) + 1;

    if (count % perPage === 0) {
        totalPagesCount -= 1;
    }

    // calculate page numbers
    generatePages(totalPagesCount, currentPage);

    onData(null, {
        currentPage,
        isPaginated: totalPagesCount > 1,
        totalPagesCount,
        pages: Pages.find({}, { sort: { order: 1 } }).fetch(),
        goto
    });
}

export default composeWithTracker(composer)(Pagination);