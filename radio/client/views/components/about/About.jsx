import React from 'react';
import ContactForm from './ContactForm.jsx';
import ContactInfo from './ContactInfo.jsx';
import TrackPlayerSmall from '../track/TrackPlayerSmall.jsx';

export default class About extends React.Component {

    renderAds() {
        let list = [], item;
        const tracks = this.props.tracks;

        if (this.props.isReady && tracks) {
            for (let i = 0; i < tracks.length; i++) {
                item = (<TrackPlayerSmall data={ tracks[i] } />);
                list.push(item);
            }
            return list;
        }
    }

    componentDidMount(){

        this.initMap();

        $(".tab-about").click(function() {
            $(".about-rightside-a").show();
            $(".about-rightside-f").hide();
            $(".about-rightside-c").hide();
            $(".tab-about").tab("show");
        });

        $(".tab-further").click(function() {
            $(".about-rightside-f").show();
            $(".about-rightside-a").hide();
            $(".about-rightside-c").hide();
        });

        $(".tab-contact").click(function() {
            $(".about-rightside-c").show();
            $(".about-rightside-a").hide();
            $(".about-rightside-f").hide();

            window.dispatchEvent(new Event('resize'));
        });

        $('#about-select').on('change', function (e) {
            $(".nav-tabs li a").eq($(this).val()).tab('show');
        });

    }

    initMap() {
        var options = [
            {
                "featureType": "all", "elementType": "labels.text.fill",
                "stylers": [
                    { "saturation": 36 },
                    { "color": "#000000" },
                    { "lightness": 40 }
                ]
            },
            {
                "featureType": "all", "elementType": "labels.text.stroke",
                "stylers": [
                    { "visibility": "on" },
                    { "color": "#000000" },
                    { "lightness": 16 }
                ]
            },
            {
                "featureType": "all", "elementType": "labels.icon",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                "featureType": "administrative", "elementType": "geometry.fill",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 20 }
                ]
            },
            {
                "featureType": "administrative", "elementType": "geometry.stroke",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 17 },
                    { "weight": 1.2 }
                ]
            },
            {
                "featureType": "landscape", "elementType": "geometry",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 20 }
                ]
            },
            {
                "featureType": "poi", "elementType": "geometry",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 21 }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 17 }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 29 },
                    { "weight": 0.2 }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 18 }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 16 }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 19 }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#000000" },
                    { "lightness": 17 }
                ]
            }
        ];

        var customMapType = new google.maps.StyledMapType(options, {
            name: 'Dark Map' 
        });

        var customMapTypeId = 'custom_style';

        let myLatLng = { lat: 47.920362, lng: 106.890986 }
        let pos = { lat: 47.933528, lng: 106.874326 }
        let mapDiv = document.getElementById('map');

        let map = new google.maps.Map(mapDiv, {
            zoom: 15,
            center: myLatLng,
            mapTypeId: 'roadmap',
            styles: options
        });

        let marker = new google.maps.Marker({
            position: myLatLng,
            title: 'Business Radio FM 98.9'
        });

        marker.setMap(map);
        map.panTo(pos);
        
        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);
    }

    render() {
        return (
            <div id="about">
                <div className="about-leftside">
                    <div className="main-content">
                        <ul className="nav nav-tabs hidden-sm hidden-xs about-tabs">
                            <li role="presentation" className="active">
                                <a href="#us" className="tab-about" role="tab" data-toggle="tab">
                                    Бидний тухай
                                </a>
                            </li>
                            <li role="presentation">
                                <a href="#further" className="tab-further" role="tab" data-toggle="tab">
                                    Хамтран ажиллах
                                </a>
                            </li>
                            <li role="presentation">
                                <a href="#contact" className="tab-contact" role="tab" data-toggle="tab">
                                    Холбоо барих
                                </a>
                            </li>
                        </ul>
                        <select className="form-control tab-select visible-xs visible-sm" id="about-select">
                            <option value="0">Бидний тухай</option>
                            <option value="1">Хамтран ажиллах</option>
                            <option value="2">Холбоо барих</option>
                        </select>
                        <div className="tab-content about-tab-content">
                            <div role="tabpanel" className="tab-pane fade in active" id="us">
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
                            <div role="tabpanel" className="tab-pane fade" id="further">
                                <img src="/cope-mobile.jpg" alt="Хамтран ажиллах" className="visible-xs img-responsive" />
                                <h4>Бидний хийсэн радио сурталчилгаа:</h4>
                                <div className="ad-container">
                                {
                                    this.renderAds()
                                }
                                </div>
                            </div>
                            <div role="tabpanel" className="tab-pane fade" id="contact">
                                <ContactInfo />
                                <ContactForm />
                            </div>
                        </div>

                        <div className="footer-navigation">
                            <a href="/" className="btn btn-nav">
                                <i className="ion-ios-home"></i>
                                Нүүр хуудас
                            </a>
                        </div>
                    </div>
                </div>
                <div className="about-rightside">
                    <div className="about-rightside-a hidden-xs"></div>
                    <div className="about-rightside-f hidden-a hidden-xs"></div>
                    <div className="about-rightside-c hidden-a hidden-xs">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
        );
    }
}