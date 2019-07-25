/**
 * Created by yevheniia on 15.06.19.
 */

var iconCutted = L.icon({
    iconUrl: 'img/tree.png',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -40] // point from which the popup should open relative to the iconAnchor
});

var iconRemoved = L.icon({
    iconUrl: 'img/deleted.png',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -40] // point from which the popup should open relative to the iconAnchor
});



var mymap = L.map('map').setView([49.35, 23.51], 14);


var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    minZoom: 14,
    maxZoom: 18

}).addTo(mymap);

var cuttedTrees = new L.LayerGroup();
var removedTrees = new L.LayerGroup();


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
        L.marker([d.latitude, d.longitude],  { icon: iconCutted } ).addTo(cuttedTrees)
            // .bindPopup("<img style='width:60%; margin:0 20%;' src='img/icon.png'/> <br>" + d.addressLocality + ", " + d.streetAddress);
        .bindPopup("<span style='font-weight:600'>Адреса:</span> " + d.streetAddress + "<br>" +
                "<span style='font-weight:600'>Номер акту:</span> " +d.actIdentifier + '<br>' +
                "<span style='font-weight:600'>Замовник:</span> " + d.orderIdentifier  + '<br>' +
                "<span style='font-weight:600'>Дата:</span> " + d.orderDate  + '<br>' +
                "<span style='font-weight:600'>Тип дерева:</span> " + d.itemSpecies  + '<br>'
        );

    });

});



d3.csv("data/removed.csv", function(data) {

    data.forEach(function(d){
        d.longitude = +d.longitude;
        d.latitude = +d.latitude;
    });

    var nestedData = d3.nest()
        .key(function(d) { return d.actIdentifier; })
        .entries(data);

    var points = L.layerGroup();

    data.forEach(function(d){
        L.marker([d.latitude, d.longitude],  {icon: iconRemoved } ).addTo(removedTrees)
            // .bindPopup("<img style='width:60%; margin:0 20%;' src='img/icon.png'/> <br>" + d.addressLocality + ", " + d.streetAddress);
            .bindPopup("<span style='font-weight:600'>Адреса:</span> " + d.streetAddress + "<br>" +
                "<span style='font-weight:600'>Номер акту:</span> " +d.actIdentifier + '<br>' +
                "<span style='font-weight:600'>Замовник:</span> " + d.orderIdentifier  + '<br>' +
                "<span style='font-weight:600'>Дата:</span> " + d.orderDate  + '<br>' +
                "<span style='font-weight:600'>Тип дерева:</span> " + d.itemSpecies  + '<br>'
            );

    });

});

cuttedTrees.addTo(mymap);
// removedTrees.addTo(mymap)

const checkCutted = document.getElementById('checkCutted');
checkCutted.addEventListener('change', function(e) {
    if (e.target.checked) {
        cuttedTrees.addTo(mymap);
} else {
        mymap.removeLayer(cuttedTrees);
}
});

const checkRemoved = document.getElementById('checkRemoved');
checkRemoved.addEventListener('change', function(e) {
    if (e.target.checked) {
        removedTrees.addTo(mymap);
    } else {
        mymap.removeLayer(removedTrees);
    }
});