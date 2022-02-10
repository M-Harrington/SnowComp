var date_day = ee.Date('2014-12-02');
var start = date_day.advance(-30, 'day');
var end = date_day.advance(-1, 'day');
var date_range = ee.Filter.date(start, end);

// '2014-12-02', '2014-12-09'
var point =ee.Geometry.Point([-122.631271, 41.083118]);

print(date_day)
print(start);
print(end);



var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filter(date_range).filterBounds(point);

print(sentinel1.size())

var proj = ee.Projection('EPSG:4326');

// Filter the Sentinel-1 collection by metadata properties.
var vvIw = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'));

var vhIw = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'));

var vv_size = vvIw.size();
var vh_size = vhIw.size();

print("VV size", vv_size); // sometimes 0
print(vv_size > 0);
print("VH size",vh_size); // sometimes 0

print(sentinel1);
print(vvIw);
print(vhIw);


// Calculate temporal means and reproject (clunky if)
var scale = 40;

var vvIwMean = ee.Algorithms.If(vvIw,
 vvIw.select('VV').mean().reproject(proj, null, scale),
 ee.List([])
);


var vhIwMean =  ee.Algorithms.If(vhIw,
  vhIw.select('VH').mean().reproject(proj, null, scale),
  ee.List([]));


print("vv mean", vhIwMean);
print("vh mean", vhIwMean);  

Map.addLayer(vhIwMean, {min: -18, max: -10}, 'vhIwcMean');
Map.addLayer(vvIwMean, {min: -12, max: -4}, 'vvIwMean');



// var image = ee.Image([vhIwAscMean,vhIwDescMean,vvIwAscDescMean,vhIwAscDescMean]);
// //vvIwAscDescMean.addBands({srcImg: reflBands, overwrite: true});
// var point =ee.Geometry.Point([-122.631271, 41.083118]);


// var neig = image.neighborhoodToArray(ee.Kernel.square(10));

// var training = neig.reduceRegions({
//   collection: point,
//   scale: scale,
//   reducer: 'first'
// });



Map.setCenter(-122.631271, 41.083118, 18);  

// print(training);
// // Note outputs are flipped (y, x)

// // Export.table.toDrive({
// //   collection: training,
// //   description:'test_points',
// //   fileFormat: 'CSV'
// // });
