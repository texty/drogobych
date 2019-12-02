/**
 * Created by yevheniia on 15.06.19.
 */

var iconCutted = L.icon({
    iconUrl: 'img/cuted.png',
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

var iconNew = L.icon({
    iconUrl: 'img/new.png',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -40] // point from which the popup should open relative to the iconAnchor
});

var iconOld = L.icon({
    iconUrl: 'img/old.png',
    iconSize:     [30, 40], // size of the icon
    iconAnchor:   [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [5, -40] // point from which the popup should open relative to the iconAnchor
});


var mymap = L.map('map').setView([49.35, 23.51], 14);
mymap.scrollWheelZoom.disable();

var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    minZoom: 14,
    maxZoom: 18

}).addTo(mymap);

var cuttedTrees = new L.LayerGroup();
var removedTrees = new L.LayerGroup();
var newTrees = new L.LayerGroup();
var oldTrees = new L.LayerGroup();
var parks = new L.LayerGroup();

var customLayer = L.geoJson(null, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(
            '<img style="width: 100%; height: auto;" src="'+ 'img/parks/'+ feature.properties.icon + '"/>' +
            "<table><tbody>" +
            "<tr>" +
            "<td style='color:grey'>Тип:</td>"  +
            "<td>" + feature.properties.type + "</td>"+
            "</tr>" +
            "<tr>" +
            "<td style='color:grey'>Назва:</td>"  +
            "<td>" + feature.properties.name + "</td>"+
            "</tr>" +
            "<tr>" +
            "<td style='color:grey'>Адреса:</td>"  +
            "<td>"  + feature.properties.description + "</td>"+
            "</tr>"+
            "<tr>" +
            "<td style='color:grey'>Площа:</td>"  +
            "<td>"  + feature.properties.area + "</td>"+
            "</tr>"+
            "</tbody>" +
            "</table>"
            // '<p>' + feature.properties.name+ '</p><p>' + feature.properties.description+  '</p>'
        )



}
});

omnivore.kml('data/parks_edited.kml', null, customLayer).addTo(parks);


d3.csv("data/cutted.csv", function(data) {

    data.forEach(function(d){
        d.longitude = +d.longitude;
        d.latitude = +d.latitude;
    });

    // var nestedData = d3.nest()
    //     .key(function(d) { return d.actIdentifier; })
    //     .entries(data);
    //
    // var points = L.layerGroup();

    data.forEach(function(d){
        L.marker([d.latitude, d.longitude],  { icon: iconCutted } ).addTo(cuttedTrees)
            // .bindPopup("<img style='width:60%; margin:0 20%;' src='img/icon.png'/> <br>" + d.addressLocality + ", " + d.streetAddress);
        .bindPopup(
            "<table><tbody>" +
            "<tr>" +
            "<td style='color:grey'>Адреса:</td>"  +
            "<td>" + d.streetAddress + "</td>"+
            "</tr>" +
            "<tr>" +
            "<td style='color:grey'>Номер акту:</td>"  +
            "<td>"  + d.actIdentifier + "</td>"+
            "</tr>"+
            "<tr>" +
            "<td style='color:grey'>Замовник:</td>"  +
            "<td>" + d.customerName  + "</td>"+
            "</tr>"+
            "<tr>" +
            "<td style='color:grey'>Дата:</td>"  +
            "<td>" + d.orderDate  + "</td>"+
            "</tr>"+
            "<tr>" +
            "<td style='color:grey'>Тип дерева:</td>"  +
            "<td>" + (d.itemSpecies).toLowerCase() + "</td>"+
            "</tr>"+
            "</tbody>" +
            "</table>"
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
            .bindPopup(
                "<table><tbody>" +
                "<tr>" +
                    "<td style='color:grey'>Адреса:</td>"  +
                    "<td>" + d.streetAddress + "</td>"+
                "</tr>" +
                "<tr>" +
                    "<td style='color:grey'>Номер акту:</td>"  +
                    "<td>"  + d.actIdentifier + "</td>"+
                "</tr>"+
                "<tr>" +
                    "<td style='color:grey'>Замовник:</td>"  +
                    "<td>" + d.customerName  + "</td>"+
                "</tr>"+
                "<tr>" +
                    "<td style='color:grey'>Дата:</td>"  +
                    "<td>" + d.orderDate  + "</td>"+
                "</tr>"+
                "<tr>" +
                    "<td style='color:grey'>Тип дерева:</td>"  +
                    "<td>" + (d.itemSpecies).toLowerCase() + "</td>"+
                "</tr>"+
                "</tbody>" +
                "</table>"
            );
    });

});

d3.csv("data/new.csv", function(data) {
    data.forEach(function(d){
        d.longitude = +d.longitude;
        d.latitude = +d.latitude;
    });

    var nestedData = d3.nest()
        .key(function(d) { return d.actIdentifier; })
        .entries(data);

    var points = L.layerGroup();

    data.forEach(function(d){
        L.marker([d.latitude, d.longitude],  {icon: iconNew } ).addTo(newTrees)
        // .bindPopup("<img style='width:60%; margin:0 20%;' src='img/icon.png'/> <br>" + d.addressLocality + ", " + d.streetAddress);
            .bindPopup(
                "<table><tbody>" +
                "<tr>" +
                "<td style='color:grey'>Адреса:</td>"  +
                "<td>" + d.streetAddress + "</td>"+
                "</tr>" +
                "<tr>" +
                "<td style='color:grey'>Номер акту:</td>"  +
                "<td>"  + d.actIdentifier + "</td>"+
                "</tr>"+
                "<tr>" +
                "<td style='color:grey'>Замовник:</td>"  +
                "<td>" + d.customerName  + "</td>"+
                "</tr>"+
                "<tr>" +
                "<td style='color:grey'>Дата:</td>"  +
                "<td>" + d.orderDate  + "</td>"+
                "</tr>"+
                "<tr>" +
                "<td style='color:grey'>Тип дерева:</td>"  +
                "<td>" + (d.itemSpecies).toLowerCase() + "</td>"+
                "</tr>"+
                "</tbody>" +
                "</table>"
            );
    });

});


d3.csv("data/old.csv", function(data) {
    data.forEach(function(d){
        d.longitude = +d.longitude;
        d.latitude = +d.latitude;
    });

    // var nestedData = d3.nest()
    //     .key(function(d) { return d.actIdentifier; })
    //     .entries(data);
    //
    // var points = L.layerGroup();

    data.forEach(function(d){
        console.log(d);
        L.marker([d.latitude, d.longitude],  {icon: iconOld } ).addTo(oldTrees)
            .bindPopup(
                '<img style="width: 100%; height: auto;" src="'+ d.url + '"/>' +
                "<table><tbody>" +
                "<tr>" +
                "<td style='color:grey'>Тип:</td>"  +
                "<td>" + d.type + "</td>"+
                "</tr>" +
                "<tr>" +
                "<td style='color:grey'>Назва:</td>"  +
                "<td>"  + d.name + " ("+ d.amount +") </td>"+
                "</tr>"+
                "<tr>" +
                "<td style='color:grey'>Адреса:</td>"  +
                "<td>"  + d.address + "</td>"+
                "</tr>"+
                "<tr>" +
                "<td style='color:grey'>Статус надано:</td>"  +
                "<td>" + d.status_from  + "року </td>"+
                "</tr>"+
                "<tr>" +
                "<td style='color:grey'>Площа:</td>"  +
                "<td>" + d.area  + "</td>"+
                "</tr>"+
                "</tbody>" +
                "</table>"
            );
    });

});



//по дефолту показуємо обрізані
cuttedTrees.addTo(mymap);
parks.addTo(mymap);


//шар з обрізаними деревами
const checkCutted = document.getElementById('checkCutted');
checkCutted.addEventListener('change', function(e) {
    if (e.target.checked) {
        cuttedTrees.addTo(mymap);
} else {
        mymap.removeLayer(cuttedTrees);
}
});

//шар з видаленими деревами
const checkRemoved = document.getElementById('checkRemoved');
checkRemoved.addEventListener('change', function(e) {
    if (e.target.checked) {
        removedTrees.addTo(mymap);
    } else {
        mymap.removeLayer(removedTrees);
    }
});

//шар з новими деревами
const checkNew = document.getElementById('checkNew');
checkNew.addEventListener('change', function(e) {
    if (e.target.checked) {
        newTrees.addTo(mymap);
    } else {
        mymap.removeLayer(newTrees);
    }
});

//шар зі старими деревами
const checkOld = document.getElementById('checkOld');
checkOld.addEventListener('change', function(e) {
    if (e.target.checked) {
        oldTrees.addTo(mymap);
    } else {
        mymap.removeLayer(oldTrees);
    }
});

const checkParks = document.getElementById('parks');
checkParks.addEventListener('change', function(e) {
    if (e.target.checked) {
        parks.addTo(mymap);
    } else {
        mymap.removeLayer(parks);
    }
});

