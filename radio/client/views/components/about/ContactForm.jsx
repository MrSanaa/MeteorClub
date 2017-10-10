import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class ContactForm extends React.Component {

    onSubmit(e) {
        e.preventDefault();

        const data = {
            name: $('#name').val().trim(),
            email: $('#email').val().trim(),
            message: $('#message').val().trim(),
            phone: $('#phone').val().trim()
        }

        Meteor.call('insertMessage', data, function(error, success) {
            if (error) {
                toastr.warning('Таны хүсэлтийг илгээхэд алдаа гарлаа. Та түр хүлээгээд дахин оролдоно уу.');
            } else {
                info = {
                    id: success,
                    slug: '/messages/' + success
                }
                Meteor.call('updateSlug', info, function(error2, success2) {
                    if (error2) {
                        console.log('error updating slug');
                    } else {
                        toastr.success('Таны хүсэлт илгээгдлээ. Бид таны цахим шуудангаар эргэн холбогдох болно.');
                        document.getElementById('form-contact').reset();
                    }
                });
            }
        });
    }

    render() {
        return (
            <div className="contact-form">
                <span>Захиа илгээхийн тулд доорх талбаруудыг бөглөнө үү.</span>
                <form id="form-contact" role="form" onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label className="pull-left">Нэр:</label>
                        <div className="input-group">
                            <input className="form-control" id="name" required="required" type="text" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Цахим шуудан:</label>
                        <div className="input-group">
                            <input className="form-control" id="email" required="required" type="email" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Утасны дугаар:</label>
                        <div className="input-group">
                            <input className="form-control" id="phone" required="phone" type="number" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="pull-left">Захиа:</label>
                        <div className="input-group">
                            <textarea className="form-control" id="message" required="required" rows="5"></textarea>
                        </div>
                    </div>
                    <button className="btn btn-submit pull-right" id="submit" name="submit"
                    type="submit">Илгээх</button>
                </form>
            </div>
        );
    }
}
