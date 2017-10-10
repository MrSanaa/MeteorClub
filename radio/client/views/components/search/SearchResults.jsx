import React from 'react';

import SearchResultItem from './SearchResultItem.jsx';
import Search from "./Search.jsx";
import PaginationContainer from '../general/PaginationContainer.js';

export default class SearchResults extends React.Component {

	renderItems() {
		const tmpList = [];
		const playlists = this.props.playlists;
		const tracks = this.props.tracks;

		if (playlists && playlists.length > 0) {
			for (let i = 0; i < playlists.length; i++) {
				tmpList.push(<SearchResultItem result={playlists[i]} key={i} />);
			}
		}

		if (tracks && tracks.length > 0) {
			for (let i = 0; i < tracks.length; i++) {
				tmpList.push(<SearchResultItem result={tracks[i]} key={Math.random()} />);
			}
		}
		return tmpList;
	}

	render() {

		const foundPlaylists = this.props.playlists.length > 0;
		const foundTracks = this.props.tracks.length > 0;

		return (
			<div className="search-container container">
				<Search />
				<h2>Хайлтын үр дүн:</h2>
				{
					foundPlaylists || foundTracks ?
					(
						<ul className="search-result-list">
							{ this.renderItems() }
						</ul>
					) : (<h4>Мэдээлэл олдсонгүй.</h4>)
				}
				<div
					className="paginator-container text-center"
					aria-label="Search result pagination">
						<PaginationContainer count={this.props.loadedCount} />
				</div>
				
			</div>
		);
	}
}
