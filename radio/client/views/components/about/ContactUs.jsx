import React from 'react';
import ContactForm from './ContactForm.jsx';
import ContactInfo from './ContactInfo.jsx';
import AboutLinks from './AboutLinks.jsx';

export default class ContactUs extends React.Component {

    componentDidMount(){

        let height = $(".contact-us .contact-left").height(), ul;

        $(".contact-us .contact-right").css("height", height);

        this.initMap();

        window.dispatchEvent(new Event('resize'));

        ul = $(".contact-us .contact-left .main-content ul");
        ul.children("li").each(function() {
            $(this).removeClass("active");
        });
        ul.children("li:last-child").addClass("active");

        // set hidden select value
        $("#about-select").val("2");
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
        let mapDiv = document.getElementById('map2');

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
        
        map.mapTypes.set(customMapTypeId, customMapType);
        map.setMapTypeId(customMapTypeId);
    }

    render() {
        return (
            <div className="contact-us">
                <div className="contact-left">
                    <div className="main-content">
                        <AboutLinks />
                        <div className="info-form">
                                <ContactInfo />
                                <ContactForm />
                        </div>

                        <div className="footer-navigation">
                            <a href="/" className="btn btn-nav">
                                <i className="ion-ios-home"></i>
                                Нүүр хуудас
                            </a>
                        </div>
                    </div>
                </div>
                <div id="map2" className="contact-right hidden-xs"></div>
            </div>
        );
    }
}