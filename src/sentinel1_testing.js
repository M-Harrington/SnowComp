var date_loc = ee.FeatureCollection("users/mrh2182/ylabs_dateloc_small1");

var date_loc = date_loc.map(function(feature){
  var date = ee.Date(feature.get('date'));
  return feature.set('date',date);
});

var date_list = ee.FeatureCollection("users/mrh2182/date_list_small");
// var date_list.

// var date_list = date_list.toList(date_list.size());

var images_create = function(date){
  var date_day = ee.Date(date.get('date'));
  
  var start = date_day.advance(-13, 'day');
  var end = date_day.advance(-1, 'day');
    
  //load and process images
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filterDate(start, end);

  var vvVhIw = sentinel1
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'));

  var vvVhIwAsc = vvVhIw.filter(
    ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
  var vvVhIwDesc = vvVhIw.filter(
    ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));

  var vhIwAscMean = vvVhIwAsc.select('VH').mean();
  var vhIwDescMean = vvVhIwDesc.select('VH').mean();
  
  var vvIwAscDescMean = vvVhIwAsc.merge(vvVhIwDesc).select('VV').mean();
  var vhIwAscDescMean = vvVhIwAsc.merge(vvVhIwDesc).select('VH').mean();
  
  var scale = 40;
  var proj = ee.Projection('EPSG:4326');
  vhIwAscMean = vhIwAscMean.reproject(proj, null, scale);
  vhIwDescMean = vhIwDescMean.reproject(proj, null, scale);
  vvIwAscDescMean = vvIwAscDescMean.reproject(proj, null, scale);
  vhIwAscDescMean = vhIwAscDescMean.reproject(proj, null, scale);
  
  var image = ee.Image([vhIwAscMean,vhIwDescMean,vvIwAscDescMean,vhIwAscDescMean]);
  var point =ee.Geometry.Point([-122.631271, 41.083118]);

  var neig = image.neighborhoodToArray(ee.Kernel.square(10));

  var training = neig.reduceRegions({
    collection: point,
    scale: scale,
    reducer: 'first'
  });

  return date.set("points", training);
};


date_list = date_list.map(images_create);
print(date_list);
