import React from 'react';

export default class MobileMenu extends React.Component {

    onClick(event) {
        event.preventDefault();

        $(".mobile-menu").removeClass("expanded");
    }

	render() {
		return (
			<div className="mobile-menu visible-xs">
                <ul>
                    <li>
                        <a href="/" onClick={ this.onClick }>Нүүр хуудас</a>
                    </li>
                    <li>
                        <a href="/playlist" onClick={ this.onClick }>Нэвтрүүлгүүд</a>
                    </li>
                    <li>
                        <a href="/schedule" onClick={ this.onClick }>Нэвтрүүлгийн хуваарь</a>
                    </li>
                    <li>
                        <a href="/about-us" onClick={ this.onClick }>Бидний тухай</a>
                    </li>
                    <li>
                        <a href="/cooperate" onClick={ this.onClick }>Хамтран ажиллах</a>
                    </li>
                    <li>
                        <a href="/contact-us" onClick={ this.onClick }>Холбоо барих</a>
                    </li>
                    <li>
                        <a href="/search" onClick={ this.onClick }>Хайлт хийх</a>
                    </li>
                </ul>
            </div>
		);
	}
}