var date_loc = ee.FeatureCollection("users/mrh2182/ylabs_dateloc_small1");

var date_loc = date_loc.map(function(feature){
  var date = ee.Date(feature.get('date'));
  return feature.set('date',date);
});

var date_list = ee.FeatureCollection("users/mrh2182/date_list_small1");
// var date_list.

// var date_list = date_list.toList(date_list.size());

var images_create = function(date){
  var date_day = ee.Date(date.get('date'));
  
  var start = date_day.advance(-30, 'day');
  var end = date_day.advance(-1, 'day');
    
  //load and process images
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                    .filterDate(start, end);
  var vvIw = sentinel1
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('instrumentMode', 'IW'));


  var proj = ee.Projection('EPSG:4326');
  var scale = 40;
  var vvIwMean = vvIw.select('VV').mean().reproject(proj, null, scale);
  
  var points =ee.FeatureCollection([ee.Feature(ee.Geometry.Point([-122.631271, 41.083118], 'EPSG:4326')),
      ee.Feature(ee.Geometry.Point([-123.080274, 47.874210	], 'EPSG:4326'))]);
      

  var neig = vvIwMean.neighborhoodToArray(ee.Kernel.square(10));

  var training = neig.reduceRegions({
    collection: points,
    scale: scale,
    reducer: 'first',
    crs: proj
  });

  return training.map(function(f){return f.set("date", date_day)});
};


date_list = date_list.map(images_create).flatten();
print(date_list);


Export.table.toDrive({
  collection: date_list,
  description:'test_points_try4',
  fileFormat: 'CSV'
});

// print(date_loc);
// print(date_loc[0]);
// var dates = date_loc.map(function(feature){
  


//   var dateRange = ee.DateRange(date.advance(-(dayRange/2), 'day'), date.advance(dayRange/2, 'day'));
//   var image = rrs.filterDate(dateRange).mean();


//   // Get image and sum for the time interval
//   var precImage = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
//                     .filterBounds(coord)
//                     .filterDate(start, end) 
//                     .select('precipitation')
//                     .sum();

  //   return feature.set( num);
  // });
  

// print(dates.first());

//get date, define range


// var results = coord.map(function(feature){


                     
//   // Extract precipitation for the sampling sites
//   var summed = precImage.reduceRegion({
//       reducer: ee.Reducer.sum(),
//       geometry: feature.geometry(),
//       scale: 30
//   });

//   return feature.set(summed)
// })
