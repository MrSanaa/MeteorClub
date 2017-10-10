import React from 'react';

export default class MobileApps extends React.Component {
	render() {
		const conf = this.props.conf;
		const google = 'https://play.google.com/store/apps/details?id=com.nmma.businessradio';
		const apple = 'https://itunes.apple.com/us/app/business-radio-98.9/id1168956455';

		return(
			<div className="mobile-apps text-center hidden-sm hidden-xs">
				<ul>
					<li>
						<a href={conf.length > 0 ? conf[0].googleLink : google}
							title="Google Play Store-с апп татах" target="_blank">
							<img src="/android.png" alt="Google Play Store-с апп татах" />
						</a>
					</li>
					<li>
						<a href={conf.length > 0 ? conf[0].appleLink : apple}
							title="AppStore-с апп татах" target="_blank">
							<img src="/ios.png" alt="AppStore-с апп татах" />
						</a>
					</li>
				</ul>
			</div>
		);
	}
}
