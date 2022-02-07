var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filterDate('2022-01-25', '2022-02-05');

var proj = ee.Projection('EPSG:4326');

// Filter the Sentinel-1 collection by metadata properties.
var vvVhIw = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'));

// Separate ascending and descending orbit images into distinct collections.
var vvVhIwAsc = vvVhIw.filter(
  ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));

var vvVhIwDesc = vvVhIw.filter(
  ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));

// Calculate temporal means for various observations to use for visualization.
// Mean VH ascending.
var vhIwAscMean = vvVhIwAsc.select('VH').mean();
// Mean VH descending.
var vhIwDescMean = vvVhIwDesc.select('VH').mean();

// Mean VV for combined ascending and descending image collections.
var vvIwAscDescMean = vvVhIwAsc.merge(vvVhIwDesc).select('VV').mean();
// Mean VH for combined ascending and descending image collections.
var vhIwAscDescMean = vvVhIwAsc.merge(vvVhIwDesc).select('VH').mean();


//reproject
var vhIwAscMean = vhIwAscMean.reproject(proj, null,10);
var vhIwDescMean = vhIwDescMean.reproject(proj, null,10);
var vvIwAscDescMean = vvIwAscDescMean.reproject(proj, null,10);
var vhIwAscDescMean = vhIwAscDescMean.reproject(proj, null,10);

// Display the temporal means for various observations, compare them.
Map.addLayer(vvIwAscDescMean, {min: -12, max: -4}, 'vvIwAscDescMean');
Map.addLayer(vhIwAscDescMean, {min: -18, max: -10}, 'vhIwAscDescMean');
Map.addLayer(vhIwAscMean, {min: -18, max: -10}, 'vhIwAscMean');
Map.addLayer(vhIwDescMean, {min: -18, max: -10}, 'vhIwDescMean');

Map.setCenter(-122.631271, 41.083118, 20);  

