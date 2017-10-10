import React from 'react';
import { FlowRouter } from "meteor/kadira:flow-router";

export default class AboutLinks extends React.Component {

    componentDidMount() {
        let select = $("#about-select");
        select.on('change', function (e) {
            let val = $(this).val();

            switch(val) {
                case "0":
                    FlowRouter.go("/about-us");
                    select.val("0");
                    break;
                case "1":
                    FlowRouter.go("/cooperate");
                    break;
                case "2":
                    FlowRouter.go("/contact-us");
                    break;
                default:
                    FlowRouter.go("/about-us");
                    break;
            }
        });
    }

    render() {
        return (
            <div className="about-links">
                <ul className="nav nav-tabs hidden-sm hidden-xs about-tabs">
                    <li>
                        <a href="/about-us">
                            Бидний тухай
                        </a>
                    </li>
                    <li>
                        <a href="/cooperate">
                            Хамтран ажиллах
                        </a>
                    </li>
                    <li>
                        <a href="/contact-us">
                            Холбоо барих
                        </a>
                    </li>
                </ul>
                <select className="form-control tab-select visible-xs visible-sm" id="about-select">
                    <option value="0">Бидний тухай</option>
                    <option value="1">Хамтран ажиллах</option>
                    <option value="2">Холбоо барих</option>
                </select>
            </div>
        );
    }
}