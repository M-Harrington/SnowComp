var date_loc = ee.FeatureCollection("users/mrh2182/ylabs_dateloc_small");

var date_loc = date_loc.map(function(feature){
  var date = ee.Date(feature.get('date'));
  return feature.set('date', date);
});


var date_day = ee.Date('2014-12-02');
var start = date_day.advance(-30, 'day');
var end = date_day.advance(1, 'day');
var date_range = ee.Filter.date(start, end);


var points = date_loc.filter(ee.Filter.eq('date', date_day));

// print("date_loc", date_loc.filter(ee.Filter.eq('date', date_day)));



// '2014-12-02', '2014-12-09'
// var points =ee.FeatureCollection([ee.Feature(ee.Geometry.Point([-122.631271, 41.083118], 'EPSG:4326')),
//       ee.Feature(ee.Geometry.Point([-123.080274, 47.874210	], 'EPSG:4326'))]);

// var points = ee.Geometry.Point([-122.631271, 41.083118], 'EPSG:4326');      
// var points = ee.Geometry.Point([-123.080274, 47.874210	], 'EPSG:4326');

print(date_day)
print(start);
print(end);



var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filter(date_range).filterBounds(points);



print(sentinel1.size())


var proj = ee.Projection('EPSG:4326');

// Filter the Sentinel-1 collection by metadata properties.
var vvIw = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'));


print("VV size", vvIw.size()); // sometimes 0

print(ee.String(
    ee.Algorithms.If(
      vvIw.size(),
      'The collection is NOT empty',
      'The collection is empty'
      )
  ));


// Calculate temporal means and reproject (clunky if)
var scale = 40;
var vvIwMean = vvIw.select('VV').mean().reproject(proj, null, scale);


var neig = vvIwMean.neighborhoodToArray(ee.Kernel.square(10));

var training = neig.reduceRegions({
  collection: points,
  scale: scale,
  reducer: 'first'
});


Map.addLayer(vvIwMean, {min: -12, max: -4}, 'vvIwMean');
Map.setCenter(-123.080274, 47.874210, 18);  

print(training);
print(points);
// // Note outputs are flipped (y, x)

// Export.table.toDrive({
//   collection: training,
//   description:'test_points_dates',
//   fileFormat: 'CSV'
// });
