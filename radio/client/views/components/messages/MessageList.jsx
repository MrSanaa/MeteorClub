import React from 'react';
import MessageListItem from './MessageListItem.jsx';

export default class MessageList extends React.Component {

	constructor() {
		super();

		this.renderMessages = this.renderMessages.bind(this);
	}

	renderMessages() {
		let list = [], item, messages = this.props.messages;

		if (this.props.isReady == true && messages != undefined) {			
			for (let i = 0; i < messages.length; i++) {
				item = (<MessageListItem message={ messages[i] } key={ i } />);
				list.push(item);
			}
		}
		return list;
	}

	renderTitle(txt) {
		return React.createElement("h1", null, txt);
	}

	render() {
		return (
			<div className="container search-container">
				<div className="message-list-wrapper">
					{
						this.props.messages ? this.renderTitle("Санал хүсэлтүүд:") 
							: this.renderTitle("Санал хүсэлт ирээгүй байна.")
					}
					<div className="row message-list">
						{ 
							this.props.messages ? this.renderMessages() : null
						}
					</div>
				</div>
			</div>
		);
	}
}