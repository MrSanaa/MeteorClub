import React from 'react';

import PlaylistItem from './PlaylistItem.jsx';

export default class PlaylistsAll extends React.Component {
	renderList() {
		const list = [];
		const programs = this.props.list;

		if (this.props.isReady && programs) {
			for (let i = 0; i < programs.length; i++) {
				list.push(
					<PlaylistItem data={programs[i]} key={i} userId={this.props.userId} />
				);
			}
		}
		return list;
	}

	render() {
		return (
			<div className="playlists">
				{this.renderList()}
			</div>
		);
	}
}
