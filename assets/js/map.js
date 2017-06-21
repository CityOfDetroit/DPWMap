var bounds = [
    [		-83.3437, 	42.2102], // Southwest coordinates
    [		-82.8754, 	42.5197]  // Northeast coordinates
];
mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/slusarskiddetroitmi/ciymfavyb00072sqe0bu9rwht', //stylesheet location
  center: [-83.1, 42.36], // starting position
  zoom: 10.5, // starting zoom
  maxBounds: bounds
});
map['dragPan'].disable();
map.on('load', function(window) {
  // use waste districts
  map.addSource('waste', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/DPW/All_Services/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('trash', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/DPW/DPW_Services/MapServer/2/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('recycle', {
    type: 'geojson',
    data: 'https://gis.detroitmi.gov/arcgis/rest/services/DPW/DPW_Services/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('bulk', {
    type: 'geojson',
    data: 'http://gis.detroitmi.gov/arcgis/rest/services/DPW/DPW_Services/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('main-roads', {
    type: 'geojson',
    data: 'http://gis.detroitmi.gov/arcgis/rest/services/DPW/2017RoadsProgram/MapServer/0/query?where=road_type%3D%27Major%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addSource('residential-roads', {
    type: 'geojson',
    data: 'http://gis.detroitmi.gov/arcgis/rest/services/DPW/2017RoadsProgram/MapServer/0/query?where=road_type%3D%27Residential%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson'
  });

  map.addLayer({
    "id": "advance-fill",
    "type": "fill",
    "source": "waste",
        'minzoom': 9,
        'maxzoom': 20,
    "layout": {},
    "paint": {
      "fill-color": '#377eb8',
      "fill-opacity": 0,
    },
    "filter": ["==", "contractor", "advanced"],
    "filter": ["==", "services", "trash"],
    "filter": ["==", "services", "recycle"],
    "filter": ["==", "services", "bulk"]
  });
  map.addLayer({
    "id": "gfl-fill",
    "type": "fill",
    "paint": {
      "fill-color": '#377eb8',
      "fill-opacity": 0,
    },
    "source": "waste",
        'minzoom': 9,
        'maxzoom': 20,
    "layout": {},
    "filter": ["==", "contractor", "gfl"]
  });
  //========== trash days ==================
  map.addLayer({
    "id": "trash-monday",
    "type": "fill",
    "source": "trash",
    "layout": {},
    "paint": {
      "fill-color": '#377eb8',
      "fill-opacity": 0.6,
    },
    "filter": ["==", "day", "monday"],

  });
  map.addLayer({
    "id": "trash-tuesday",
    "type": "fill",
    "source": "trash",
    "layout": {},
    "paint": {
      "fill-color": '#4daf4a',
      "fill-opacity": 0.6,
    },
    "filter": ["==", "day", "tuesday"],

  });
  map.addLayer({
    "id": "trash-wednesday",
    "type": "fill",
    "source": "trash",
    "layout": {},
    "paint": {
      "fill-color": '#984ea3',
      "fill-opacity": 0.6,
    },
    "filter": ["==", "day", "wednesday"],

  });
  map.addLayer({
    "id": "trash-thursday",
    "type": "fill",
    "source": "trash",
    "layout": {},
    "paint": {
      "fill-color": '#ff7f00',
      "fill-opacity": 0.6,
    },
    "filter": ["==", "day", "thursday"],

  });
  map.addLayer({
    "id": "trash-friday",
    "type": "fill",
    "source": "trash",
    "layout": {},
    "paint": {
      "fill-color": '#e41a1c',
      "fill-opacity": 0.6,
    },
    "filter": ["==", "day", "friday"],

  });

  map.addLayer({
    "id": "trash-lines",
    "type": "line",
    "source": "trash",
    "layout": {},
    "paint": {
      "line-color": "#FFFFFF",
      "line-width": 1
    }
  });
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    bbox: [
        -83.3437,42.2102,
        -82.8754, 42.5197
      ]
  });
  map.addControl(geocoder, 'top-left');
  document.querySelector('.mapboxgl-ctrl-geocoder input[type="text"]').placeholder = "Type your street address.";
  map.addSource('single-point', {
      "type": "geojson",
      "data": {
          "type": "FeatureCollection",
          "features": []
      }
  });

  map.addLayer({
      "id": "point",
      "source": "single-point",
      "type": "circle",
      "paint": {
          "circle-radius": 10,
          "circle-color": "#007cbf"
      }
  });
  geocoder.on('result', function(ev) {
      console.log(ev.result.geometry);
      let tempAddr = document.querySelector('.mapboxgl-ctrl-geocoder.mapboxgl-ctrl > input').value.split(',')[0];
      tempAddr = tempAddr.split(' ');
      let newTempAddr = '';
      let size = tempAddr.length;
      tempAddr.forEach(function(item, index) {
        newTempAddr += item;
        ((index < size) && (index + 1) !== size) ? newTempAddr += '+': 0;
      });
      console.log(newTempAddr);
      //=================== street sweeping ========================
      // $.getJSON('http://gis.detroitmi.gov/arcgis/rest/services/DPW/Weeks/MapServer/0/query?where=&text=&objectIds=&time=&geometry='+ev.result.geometry.coordinates[0]+'%2C+'+ev.result.geometry.coordinates[1]+'&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson' , function( data ) {
      //   console.log(data.features[0].attributes.VISIBLE);
      //   console.log();
      //   console.log(moment('2017-05-01').add(((data.features[0].attributes.VISIBLE * 7)-7), 'days').format('MMM,DD'));
      //   console.log(moment('2017-05-01').add(((data.features[0].attributes.VISIBLE * 7)-3), 'days').format('MMM,DD'));
      //   document.querySelector('.info-container > .district').innerHTML = '<span>Street Sweeping</span> ' + moment('2017-05-01').add(((data.features[0].attributes.VISIBLE * 7)-7), 'days').format('MMM DD') + ' - ' + moment('2017-05-01').add(((data.features[0].attributes.VISIBLE * 7)-3), 'days').format('MMM DD');
      // });
      //================ pick up services ==========================
      $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/DPW/All_Services/MapServer/0/query?where=&text=&objectIds=&time=&geometry='+ev.result.geometry.coordinates[0]+'%2C+'+ev.result.geometry.coordinates[1]+'&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson' , function( data ) {
        console.log(data);
        console.log(ev.result.geometry);
        map.getSource('single-point').setData(ev.result.geometry);
        let todaysMonth =  moment().month() + 1;
        let todaysYear = moment().year();
        if(data.features.length > 1){
          console.log('new layout');
          document.querySelector('.info-container > .street-name').innerHTML = document.querySelector('.mapboxgl-ctrl-geocoder.mapboxgl-ctrl > input').value.split(',')[0];
          document.querySelector('.info-container > .provider').innerHTML = '<span>Provider:</span> <a href="http://www.advanceddisposal.com/mi/detroit/detroit-residential-collection" target="_new">' + capitalizeFirstLetter(data.features[0].attributes.contractor) + '</a> - (844) 233-8764';
          $.ajax({
            url : 'http://apis.detroitmi.gov/waste_schedule/details/' + data.features[0].attributes.FID + ',' + data.features[1].attributes.FID + ',' + data.features[2].attributes.FID + '/year/' + todaysYear + '/month/' + todaysMonth + '/',
            type : 'GET',
            dataType:'json',
            success : function(response) {
              console.log(response);
              document.querySelector('.info-container > .garbage').innerHTML = '<span>Garbage:</span> ' + capitalizeFirstLetter(data.features[0].attributes.day) + ' - ' + moment(response.next_pickups.trash.next_pickup).format('MMM Do');
              document.querySelector('.info-container > .recycle').innerHTML = '<span>Curbside Recycle:</span> ' + capitalizeFirstLetter(data.features[1].attributes.day) + ' - ' + moment(response.next_pickups.recycling.next_pickup).format('MMM Do');
              document.querySelector('.info-container > .bulk').innerHTML = '<span>Bulk:</span> ' + capitalizeFirstLetter(data.features[2].attributes.day) + ' - ' + moment(response.next_pickups.bulk.next_pickup).format('MMM Do');
              document.querySelector('.info-container > .yard').innerHTML = '<span>Yard Waste:</span> ' + capitalizeFirstLetter(data.features[2].attributes.day) + ' - ' + moment(response.next_pickups['yard waste'].next_pickup).format('MMM Do');
            }
          });
          document.querySelector('.info-container > input[name="route-id"]').value = data.features[0].attributes.FID + ',' + data.features[1].attributes.FID + ',' + data.features[2].attributes.FID;
          document.querySelector('.service-check > #garbage-checkbox').value = data.features[0].attributes.FID;
          document.querySelector('.service-check > #recycle-checkbox').value = data.features[1].attributes.FID;
          document.querySelector('.service-check > #bulk-yard-checkbox').value = data.features[2].attributes.FID;
          document.querySelector('.info-container > input[name="lng"]').value = ev.result.geometry.coordinates[0];
          document.querySelector('.info-container > input[name="lat"]').value = ev.result.geometry.coordinates[1];
          (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
        }else{
          document.querySelector('.info-container > .street-name').innerHTML = document.querySelector('.mapboxgl-ctrl-geocoder.mapboxgl-ctrl > input').value.split(',')[0];
          document.querySelector('.info-container > .provider').innerHTML = '<span>Provider:</span> <a href="http://gflusa.com/residential/detroit/" target="_new">' + capitalizeFirstLetter(data.features[0].attributes.contractor) + '</a> - (844) 464-3587';
          $.ajax({
            url : 'http://apis.detroitmi.gov/waste_schedule/details/' + data.features[0].attributes.FID  + '/year/' + todaysYear + '/month/' + todaysMonth + '/',
            type : 'GET',
            dataType:'json',
            success : function(response) {
              console.log(response);
              document.querySelector('.info-container > .garbage').innerHTML = '<span>Garbage:</span> ' + capitalizeFirstLetter(data.features[0].attributes.day) + ' - ' + moment(response.next_pickups.trash.next_pickup).format('MMM Do');
              document.querySelector('.info-container > .recycle').innerHTML = '<span>Curbside Recycle:</span> ' + capitalizeFirstLetter(data.features[0].attributes.day) + ' - ' + moment(response.next_pickups.recycling.next_pickup).format('MMM Do');
              document.querySelector('.info-container > .bulk').innerHTML = '<span>Bulk:</span> ' + capitalizeFirstLetter(data.features[0].attributes.day) + ' - ' + moment(response.next_pickups.bulk.next_pickup).format('MMM Do');
              document.querySelector('.info-container > .yard').innerHTML = '<span>Yard Waste:</span> ' + capitalizeFirstLetter(data.features[0].attributes.day) + ' - ' + moment(response.next_pickups['yard waste'].next_pickup).format('MMM Do');
            }
          });
          document.querySelector('.info-container > input[name="route-id"]').value = data.features[0].attributes.FID;
          document.querySelector('.service-check > #garbage-checkbox').value = data.features[0].attributes.FID;
          document.querySelector('.service-check > #recycle-checkbox').value = data.features[0].attributes.FID;
          document.querySelector('.service-check > #bulk-yard-checkbox').value = data.features[0].attributes.FID;
          document.querySelector('.info-container > input[name="lng"]').value = ev.result.geometry.coordinates[0];
          document.querySelector('.info-container > input[name="lat"]').value = ev.result.geometry.coordinates[1];
          (document.querySelector('#info').className === 'active') ? 0 : document.querySelector('#info').className = 'active';
        }
      //   $.getJSON('https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=&text=&objectIds=&time=&geometry='+ev.result.geometry.coordinates[0]+'%2C+'+ev.result.geometry.coordinates[1]+'&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson' , function( data ) {
      //     console.log(data.features[0].attributes.districts);
      //     let tempHtml = '<span>District ' + data.features[0].attributes.districts + '</span> ';
      //     switch (data.features[0].attributes.districts) {
      //       case '1':
      //         tempHtml += 'Council: <a href="http://www.detroitmi.gov/Government/City-Council/James-Tate" target="_new">James Tate</a><br>District Manager: <a href="http://www.detroitmi.gov/Neighborhoods#dt-district1" target="_new"> Stephanie Young</a>';
      //         break;
      //
      //       case '2':
      //         tempHtml += 'Council: <a href="http://www.detroitmi.gov/Government/City-Council/George-Cushingberry" target="_new">George Cushingberry Jr.</a><br>District Manager: <a href="http://www.detroitmi.gov/Neighborhoods#dt-district2" target="_new"> Kim Tandy</a>';
      //         break;
      //
      //       case '3':
      //         tempHtml += 'Council: <a href="http://www.detroitmi.gov/Government/City-Council/Scott-Benson" target="_new">Scott Benson</a><br>District Manager: <a href="http://www.detroitmi.gov/Neighborhoods#dt-district3" target="_new"> Erinn Harris</a>';
      //         break;
      //
      //       case '4':
      //         tempHtml += 'Council: <a href="http://www.detroitmi.gov/Government/City-Council/Andre-Spivey" target="_new">André L. Spivey</a><br>District Manager: <a href="http://www.detroitmi.gov/Neighborhoods#dt-district4" target="_new"> Letty Azar</a>';
      //         break;
      //
      //       case '5':
      //         tempHtml += 'Council: <a href="http://www.detroitmi.gov/Government/City-Council/Mary-Sheffield" target="_new">Mary Sheffield</a><br>District Manager: <a href="http://www.detroitmi.gov/Neighborhoods#dt-district5" target="_new"> Vince Keenan</a>';
      //         break;
      //
      //       case '6':
      //         tempHtml += 'Council: <a href="http://www.detroitmi.gov/Government/City-Council/Raquel-Castaneda-Lopez" target="_new">Raquel Castañeda-López</a><br>District Manager: <a href="http://www.detroitmi.gov/Neighborhoods#dt-district6" target="_new"> Ray Solomon II</a>';
      //         break;
      //
      //       default:
      //         tempHtml += 'Council: <a href="http://www.detroitmi.gov/Government/City-Council/Gabe-Leland" target="_new">Gabe Leland</a><br>District Manager: <a href="http://www.detroitmi.gov/Neighborhoods#dt-district7" target="_new"> Ray Solomon II</a>';
      //     }
      //     document.querySelector('.info-container > .district').innerHTML = tempHtml;
      //   });
      });
  });
  document.getElementById('trash-layer-button').checked = true;
});
var closeInfo = function closeInfo() {
  (document.querySelector('#info').className === 'active') ? document.querySelector('#info').className = '' : document.querySelector('#info').className = 'active';
  map.flyTo({
      center: [-83.1, 42.367],
      zoom: 11.05,
      bearing: 0,

      // These options control the flight curve, making it move
      // slowly and zoom out almost completely before starting
      // to pan.
      speed: 2, // make the flying slow
      curve: 1, // change the speed at which it zooms out

      // This can be any easing function: it takes a number between
      // 0 and 1 and returns another number between 0 and 1.
      easing: function (t) {
          return t;
      }
  });
};
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
var toggleMapLayers = function toggleMapLayers(e){
  console.log(e);
  console.log(e.target.id);
  console.log(e.target.checked);
  if(e.target.id == 'trash-layer-button'){
    if(e.target.checked === false){
      e.target.checked = true;
    }else{
      try {
        map.removeLayer('point');
      } catch (e) {
        console.log('No point');
        console.log(e);
      }

      if(document.getElementById('recycle-layer-button').checked){
        map.removeLayer('recycle-lines');
        map.removeLayer('recycle-monday');
        map.removeLayer('recycle-tuesday');
        map.removeLayer('recycle-wednesday');
        map.removeLayer('recycle-thursday');
        map.removeLayer('recycle-friday');
        document.getElementById('recycle-layer-button').checked = false;
      }else if(document.getElementById('road-layer-button').checked){
        map.removeLayer('main-roads');
        map.removeLayer('residential-roads');
        document.getElementById('road-layer-button').checked = false;
      }else{
        map.removeLayer('bulk-lines');
        map.removeLayer('bulk-monday');
        map.removeLayer('bulk-tuesday');
        map.removeLayer('bulk-wednesday');
        map.removeLayer('bulk-thursday');
        map.removeLayer('bulk-friday');
        document.getElementById('bulk-layer-button').checked = false;
      }
      document.querySelector('#legend').innerHTML = "<strong>GARBAGE PICK UP DAY</strong><nav class='legend clearfix'><span style='background:#377eb8;'></span><span style='background:#4daf4a;'></span><span style='background:#984ea3;'></span><span style='background:#ff7f00;'></span><span style='background:#e41a1c;'></span><label>Monday</label><label>Tuesday</label><label>Wednesday</label><label>Thursday</label><label>Friday</label></nav>";

      map.addLayer({
        "id": "trash-monday",
        "type": "fill",
        "source": "trash",
        "layout": {},
        "paint": {
          "fill-color": '#377eb8',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "monday"],

      });
      map.addLayer({
        "id": "trash-tuesday",
        "type": "fill",
        "source": "trash",
        "layout": {},
        "paint": {
          "fill-color": '#4daf4a',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "tuesday"],

      });
      map.addLayer({
        "id": "trash-wednesday",
        "type": "fill",
        "source": "trash",
        "layout": {},
        "paint": {
          "fill-color": '#984ea3',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "wednesday"],

      });
      map.addLayer({
        "id": "trash-thursday",
        "type": "fill",
        "source": "trash",
        "layout": {},
        "paint": {
          "fill-color": '#ff7f00',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "thursday"],

      });
      map.addLayer({
        "id": "trash-friday",
        "type": "fill",
        "source": "trash",
        "layout": {},
        "paint": {
          "fill-color": '#e41a1c',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "friday"],

      });

      map.addLayer({
        "id": "trash-lines",
        "type": "line",
        "source": "trash",
        "layout": {},
        "paint": {
          "line-color": "#FFFFFF",
          "line-width": 1
        }
      });
      map.addLayer({
          "id": "point",
          "source": "single-point",
          "type": "circle",
          "paint": {
              "circle-radius": 10,
              "circle-color": "#007cbf"
          }
      });
    }
  }else if(e.target.id == 'recycle-layer-button'){
    if(e.target.checked === false){
      e.target.checked = true;
    }else{
      try {
        map.removeLayer('point');
      } catch (e) {
        console.log('No point');
        console.log(e);
      }
      if(document.getElementById('trash-layer-button').checked){
        map.removeLayer('trash-lines');
        map.removeLayer('trash-monday');
        map.removeLayer('trash-tuesday');
        map.removeLayer('trash-wednesday');
        map.removeLayer('trash-thursday');
        map.removeLayer('trash-friday');
        document.getElementById('trash-layer-button').checked = false;
      }else if(document.getElementById('road-layer-button').checked){
        map.removeLayer('main-roads');
        map.removeLayer('residential-roads');
        document.getElementById('road-layer-button').checked = false;
      }else{
        map.removeLayer('bulk-lines');
        map.removeLayer('bulk-monday');
        map.removeLayer('bulk-tuesday');
        map.removeLayer('bulk-wednesday');
        map.removeLayer('bulk-thursday');
        map.removeLayer('bulk-friday');
        document.getElementById('bulk-layer-button').checked = false;
      }
      document.querySelector('#legend').innerHTML = "<strong>RECYCLE PICK UP DAY</strong><nav class='legend clearfix'><span style='background:#377eb8;'></span><span style='background:#4daf4a;'></span><span style='background:#984ea3;'></span><span style='background:#ff7f00;'></span><span style='background:#e41a1c;'></span><label>Monday</label><label>Tuesday</label><label>Wednesday</label><label>Thursday</label><label>Friday</label></nav>";

      map.addLayer({
        "id": "recycle-monday",
        "type": "fill",
        "source": "recycle",
        "layout": {},
        "paint": {
          "fill-color": '#377eb8',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "monday"],

      });
      map.addLayer({
        "id": "recycle-tuesday",
        "type": "fill",
        "source": "recycle",
        "layout": {},
        "paint": {
          "fill-color": '#4daf4a',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "tuesday"],

      });
      map.addLayer({
        "id": "recycle-wednesday",
        "type": "fill",
        "source": "recycle",
        "layout": {},
        "paint": {
          "fill-color": '#984ea3',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "wednesday"],

      });
      map.addLayer({
        "id": "recycle-thursday",
        "type": "fill",
        "source": "recycle",
        "layout": {},
        "paint": {
          "fill-color": '#ff7f00',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "thursday"],

      });
      map.addLayer({
        "id": "recycle-friday",
        "type": "fill",
        "source": "recycle",
        "layout": {},
        "paint": {
          "fill-color": '#e41a1c',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "friday"],

      });

      map.addLayer({
        "id": "recycle-lines",
        "type": "line",
        "source": "recycle",
        "layout": {},
        "paint": {
          "line-color": "#FFFFFF",
          "line-width": 1
        }
      });
      map.addLayer({
          "id": "point",
          "source": "single-point",
          "type": "circle",
          "paint": {
              "circle-radius": 10,
              "circle-color": "#007cbf"
          }
      });
    }
  }else if(e.target.id == 'bulk-layer-button'){
    if(e.target.checked === false){
      e.target.checked = true;
    }else{
      try {
        map.removeLayer('point');
      } catch (e) {
        console.log('No point');
        console.log(e);
      }
      if(document.getElementById('trash-layer-button').checked){
        map.removeLayer('trash-lines');
        map.removeLayer('trash-monday');
        map.removeLayer('trash-tuesday');
        map.removeLayer('trash-wednesday');
        map.removeLayer('trash-thursday');
        map.removeLayer('trash-friday');
        document.getElementById('trash-layer-button').checked = false;
      }else if(document.getElementById('road-layer-button').checked){
        map.removeLayer('main-roads');
        map.removeLayer('residential-roads');
        document.getElementById('road-layer-button').checked = false;
      }else{
        map.removeLayer('recycle-lines');
        map.removeLayer('recycle-monday');
        map.removeLayer('recycle-tuesday');
        map.removeLayer('recycle-wednesday');
        map.removeLayer('recycle-thursday');
        map.removeLayer('recycle-friday');
        document.getElementById('recycle-layer-button').checked = false;
      }
      document.querySelector('#legend').innerHTML = "<strong>BULK PICK UP DAY</strong><nav class='legend clearfix'><span style='background:#377eb8;'></span><span style='background:#4daf4a;'></span><span style='background:#984ea3;'></span><span style='background:#ff7f00;'></span><span style='background:#e41a1c;'></span><label>Monday</label><label>Tuesday</label><label>Wednesday</label><label>Thursday</label><label>Friday</label></nav>";

      map.addLayer({
        "id": "bulk-monday",
        "type": "fill",
        "source": "bulk",
        "layout": {},
        "paint": {
          "fill-color": '#377eb8',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "monday"],

      });
      map.addLayer({
        "id": "bulk-tuesday",
        "type": "fill",
        "source": "bulk",
        "layout": {},
        "paint": {
          "fill-color": '#4daf4a',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "tuesday"],

      });
      map.addLayer({
        "id": "bulk-wednesday",
        "type": "fill",
        "source": "bulk",
        "layout": {},
        "paint": {
          "fill-color": '#984ea3',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "wednesday"],

      });
      map.addLayer({
        "id": "bulk-thursday",
        "type": "fill",
        "source": "bulk",
        "layout": {},
        "paint": {
          "fill-color": '#ff7f00',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "thursday"],

      });
      map.addLayer({
        "id": "bulk-friday",
        "type": "fill",
        "source": "bulk",
        "layout": {},
        "paint": {
          "fill-color": '#e41a1c',
          "fill-opacity": 0.6,
        },
        "filter": ["==", "day", "friday"],

      });

      map.addLayer({
        "id": "bulk-lines",
        "type": "line",
        "source": "bulk",
        "layout": {},
        "paint": {
          "line-color": "#FFFFFF",
          "line-width": 1
        }
      });
      map.addLayer({
          "id": "point",
          "source": "single-point",
          "type": "circle",
          "paint": {
              "circle-radius": 10,
              "circle-color": "#007cbf"
          }
      });
    }
  }else{
    console.log('detecting road');
    if(e.target.checked === false){
      e.target.checked = true;
    }else{
      console.log('activate roads');
      if(document.getElementById('trash-layer-button').checked){
        map.removeLayer('trash-lines');
        map.removeLayer('trash-monday');
        map.removeLayer('trash-tuesday');
        map.removeLayer('trash-wednesday');
        map.removeLayer('trash-thursday');
        map.removeLayer('trash-friday');
        document.getElementById('trash-layer-button').checked = false;
      }else if (document.getElementById('recycle-layer-button').checked) {
        map.removeLayer('recycle-lines');
        map.removeLayer('recycle-monday');
        map.removeLayer('recycle-tuesday');
        map.removeLayer('recycle-wednesday');
        map.removeLayer('recycle-thursday');
        map.removeLayer('recycle-friday');
        document.getElementById('recycle-layer-button').checked = false;
      }else{
        map.removeLayer('bulk-lines');
        map.removeLayer('bulk-monday');
        map.removeLayer('bulk-tuesday');
        map.removeLayer('bulk-wednesday');
        map.removeLayer('bulk-thursday');
        map.removeLayer('bulk-friday');
        document.getElementById('bulk-layer-button').checked = false;
      }
      document.querySelector('#legend').innerHTML = "<strong>ROAD TYPES</strong><nav class='legend roads clearfix'><span style='background:#377eb8;'></span></span><span style='background:#ff7f00;'></span><label>Residential Roads</label><label>Main Roads</label></nav>";
      map.addLayer({
          'id': 'main-roads',
          'type': 'line',
          'source': 'main-roads',
          'layout': {
              'visibility': 'visible',
              'line-join': 'round',
              'line-cap': 'round'
          },
          'paint': {
              'line-color': '#ff7f00',
              'line-width': 4
          }
      });
      map.addLayer({
          'id': 'residential-roads',
          'type': 'line',
          'source': 'residential-roads',
          'layout': {
              'visibility': 'visible',
              'line-join': 'round',
              'line-cap': 'round'
          },
          'paint': {
              'line-color': '#007cbf',
              'line-width': 4
          }
      });
    }
  }
};
// document.querySelectorAll('.filter-group input[type=checkbox]').forEach(function(item) {
//   item.addEventListener('click',function(e){
//     toggleMapLayers(e);
//   });
// });
var filtersList = document.querySelectorAll('.filter-group input[type=checkbox]');
for (var i = 0; i < filtersList.length; i++) {
  filtersList[i].addEventListener('click', function(e){
    toggleMapLayers(e);
  });
}
document.getElementById('close-emergency-modal-btn').addEventListener('click', closeInfo);
var phoneFormater = function phoneFormater(obj){
  var numbers = obj.value.replace(/\D/g, ''),
  char = {0:'(',3:')',6:'-'};
  obj.value = '';
  for (var i = 0; i < numbers.length; i++) {
      obj.value += (char[i]||'') + numbers[i];
  }
};