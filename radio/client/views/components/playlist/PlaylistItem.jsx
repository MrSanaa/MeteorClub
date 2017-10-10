import React from 'react';
import moment from 'moment';

export default class PlaylistItem extends React.Component {
  render() {
    const data = this.props.data;
    const href = `/playlist/${data._id}`;
    const src = data.coverImage ? data.coverImage : '/bg_with_logo_small.jpg';
    let style;

    if (this.props.userId && data.showInList) {
      style = {
        boxShadow: '10px 10px 50px 1px rgba(243, 93, 32, 0.52)'
      }
    }

    return (
      <div className="col-md-5 ths col-sm-3 col-xs-6 content-item">
        <a href={href}>
          <div className="item-thumb">
            <img src={src} alt={data.name} className="content-img" style={style} />
            <div className="overlay">
              {
                this.props.userId ?
                (<p>
                    <i className="ion-clock"></i>
                    { moment(data.publishedAt).format("YYYY-MM-DD HH:mm") }
                </p>) : null
              }
              <span className="group">{data.group}</span>
            </div>
          </div>
        </a>
        <div className="title">
          <h2><a href={href}>{data.name}</a></h2>
        </div>
      </div>
    );
  }
}
