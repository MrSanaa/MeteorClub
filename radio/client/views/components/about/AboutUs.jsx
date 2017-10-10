import React from 'react';
import AboutLinks from './AboutLinks.jsx';

export default class AboutUs extends React.Component {

    componentDidMount(){
        let height = $(".about-us .about-left").height(), ul;

        $(".about-us .about-right").css("height", height);

        ul = $(".about-us .about-left .main-content ul");
        ul.children("li").each(function() {
            $(this).removeClass("active");
        });
        ul.children("li:first-child").addClass("active");

        // set hidden select value
        $("#about-select").val("0");
    }

    render() {
        return (
            <div className="about-us">
                <div className="about-left">
                    <div className="main-content">
                        <AboutLinks />
                        <div className="about-text">
                            <p>Бизнес Радио ФМ 98.9 нь бизнес, эдийн засгийн чиглэлээр төрөлжсөн Монголын анхны радио 
                            болж 2014 оны 2 сарын 12-ны өдөр эфирээ цацаж эхлүүлсэн.
                            </p>
                            <p>Бизнес эдийн засгийн зөвлөгөө сургалт илтгэлүүд, мэргэжлийн шинжээчдийн тайлбар дүгнэлт, 
                            өөрийн оронд болон дэлхий даяарх бизнес, эдийн засгийн онцлох мэдээллүүдийг таны сонорт хүргэнэ. 
                            Энэ бүхнийг танд хүргэхээр мэргэжлийн шинжээч зөвлөх, сэтгүүлчид болон дотоод, гадаадын шилдэг 
                            агентлагууд хамтран ажиллаж байна.
                            </p>
                            <br /><br /><br /><br />
                            <p>Бид тэргүүлэгч байгууллагын зөв шийдвэр гаргалтанд тусална.</p>
                            <p>Бизнес Радио 98.9</p>
                        </div>

                        <div className="footer-navigation">
                            <a href="/" className="btn btn-nav">
                                <i className="ion-ios-home"></i>
                                Нүүр хуудас
                            </a>
                        </div>
                    </div>
                </div>
                <div className="about-right hidden-xs">
                </div>
            </div>
        );
    }
}