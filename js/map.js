/**
 * Created by yevheniia on 15.06.19.
 */

var icon = L.icon({
    iconUrl: 'img/icon.png',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});



var mymap = L.map('map').setView([49.35, 23.51], 14);


var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    minZoom: 14,
    maxZoom: 18

}).addTo(mymap);


d3.csv("data/cutted.csv", function(data) {

    data.forEach(function(d){
        d.longitude = +d.longitude;
        d.latitude = +d.latitude;
    });

    var nestedData = d3.nest()
        .key(function(d) { return d.actIdentifier; })
        .entries(data);
    
    var points = L.layerGroup();

    data.forEach(function(d){
        L.marker([d.latitude, d.longitude],  {icon: icon}).addTo(mymap);
    });





});





