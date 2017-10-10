import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Slingshot } from 'meteor/edgee:slingshot';
import moment from 'moment';

export default class PlaylistForm extends React.Component {
	constructor() {
		super();

		this.cancel = this.cancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		$('#goal').redactor({
			minHeight: 250,
		});

		const published = $('#published');

		published.datetimepicker({
			format: 'YYYY-MM-DD HH:mm',
			sideBySide: true,
		});
		published.val(moment(new Date()).format('YYYY-MM-DD HH:mm'));
		
		$('#group').selectize({
			create: true,
		});

		$('#featured').bootstrapSwitch();
		$('.loading-gif').hide();
	}

	cancel(e) {
		e.preventDefault();
		FlowRouter.go('playlists');
	}

	onPlaceholderClick(e) {
		e.preventDefault();
		$('#file-chooser').click();
	}

	onChangeFileChooser(e) {
		e.preventDefault();

		const attachment = document.getElementById('file-chooser').files[0];
		const uploader = new Slingshot.Upload("playlists");
		const thumb = $('.thumb');
		const loader = $('.loading-gif');
		
		if (attachment) {
			// show loader & hide thumb 
			thumb.hide();
			loader.show();
			uploader.send(attachment, Meteor.bindEnvironment(function(error, downloadUrl) {
				if (uploader.status() === 'done') {
					loader.hide();
					if (uploader.isImage()) {
						thumb.prop('src', downloadUrl);
					} else {
						thumb.prop('src', '/logo.png');
					}
					thumb.show();
					toastr.info('Хавсралт файл илгээгдлээ.');
				}
			  	if (error) {
				    // Log service detailed response
				    console.error('Error:', error);
				    toastr.error(error.message);
			  	}
			  	else {
			  		$('#attachment').val(downloadUrl);	  		
			  	}
			}));
		} else {
			toastr.warning('Хавсралт файл сонгоогүй байна.');
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const data = {
			group: $('#group').val().trim(),
			name: $('#name').val().trim(),
			goal: $('#goal').redactor('get'),
			authorId: this.props.userId,
			modifiedUserId: this.props.userId,
			publishedAt: new Date($('#published').val()),
			showInList: $('#featured').bootstrapSwitch('state'),
			coverImage: $('#attachment').val(),
			permalinkUrl: $('#permalink').val().trim(),
		};

		this.props.savePlaylist(data);
	}

	render() {
		return (
			<div className="admin-container">
				<h1>Playlist бүртгэх</h1>
				<input id="file-chooser" type="file" onChange={this.onChangeFileChooser} 
					className="hidden" />
				<form id="form-program" onSubmit={this.onSubmit}>
					<div className="row">
		        <div className="form-group col-sm-6 col-xs-12">
		            <label htmlFor="attachment">Cover зураг:</label>
		            <a href="#" className="image-placeholder" onClick={this.onPlaceholderClick}>
		                <img className="thumb" src="/logo.png" />
		                <img className="loading-gif" src="/loader2.gif" />
		                <input type="text" id="attachment" className="form-control hidden" />
		            </a>
		            <div className="info-message"> / Дээрх зурган дээр дарж 5 MB-с ихгүй хэмжээтэй зураг сонгоно уу. /</div>
		        </div>
						<div className="form-group col-sm-6 col-xs-12">
							<label htmlFor="featured">Жагсаалтанд харагдах эсэх:</label>
							<input id="featured" className="form-control" type="checkbox" />
						</div>
						<div className="form-group col-sm-6 col-xs-12">
							<label htmlFor="permalink">Soundcloud permalink url:</label>
							<input id="permalink" className="form-control" type="text" required="required" />
						</div>
				        <div className="clearfix"></div>
				    </div>
					<div className="row">
						<div className="form-group col-md-3 col-sm-4 col-xs-12">
							<label htmlFor="group">Нэвтрүүлгийн бүлэг:</label>
							<select id="group" className="form-control">
								<option value="Нийтлэл">Нийтлэл</option>
								<option value="Хамтарсан">Хамтарсан</option>
								<option value="Бизнесийн мэдлэг">Бизнесийн мэдлэг</option>
								<option value="Практик ба онол">Практик ба онол</option>
								<option value="Чөлөөт цаг">Чөлөөт цаг</option>
								<option value="Бизнесийг дотроос нь">Бизнесийг дотроос нь</option>
								<option value="Экспертийн зөвлөгөө">Экспертийн зөвлөгөө</option>
								<option value="Мэдээлэл">Мэдээлэл</option>
							</select>
						</div>
						<div className="form-group col-md-6 col-sm-8 col-xs-12">
							<label htmlFor="name">Playlist-н нэр:</label>
							<input id="name" className="form-control" type="text" 
								placeholder="Playlist-н нэр оруулна уу" required="required" />
						</div>
						<div className="form-group col-md-3 col-sm-4 col-xs-12">
							<label htmlFor="published">Нийтлэх огноо:</label>
							<input id="published" className="form-control" type="text" 
							required="required" />
						</div>
						<div className="clearfix"></div>
					</div>
					<div className="row">
						<div className="form-group col-md-12 col-sm-12 col-xs-12">
							<label htmlFor="goal">Нэвтрүүлгийн зорилго:</label>
							<textarea id="goal"></textarea>
						</div>
						<div className="clearfix"></div>
					</div>
					<div className="form-group submit-buttons">
						<div className="row">
							<div className="col-sm-6">
								<button type="submit" className="form-control submit">Хадгалах</button>
							</div>
							<div className="col-sm-6">
								<button type="button" className="form-control cancel" 
									onClick={this.cancel}>Цуцлах</button>
							</div>
						</div>
						<div className="clearfix"></div>
					</div>
				</form>
			</div>
		);
	}
}
