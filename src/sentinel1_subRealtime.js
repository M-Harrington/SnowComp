var date_og = "2022-02-10";
var date = ee.Date(date_og);
print(date);

  var images_create = function(date_day){
  
    var start = date_day.advance(-30, 'day');
    var end = date_day.advance(1, 'day');
    
    
    var points = date_loc;
      
    //load and process images
    var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filterDate(start, end);
    var vvIw = sentinel1
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
      .filter(ee.Filter.eq('instrumentMode', 'IW'));
  
    
    var proj = ee.Projection('EPSG:4326');
    var scale = 25;
    var vvIwMean = vvIw.select('VV').mean().reproject(proj, null, scale);
    
    // var points =ee.FeatureCollection([ee.Feature(ee.Geometry.Point([-122.631271, 41.083118], 'EPSG:4326')),
    //     ee.Feature(ee.Geometry.Point([-123.080274, 47.874210	], 'EPSG:4326'))]);
        
  
    var neig = vvIwMean.neighborhoodToArray(ee.Kernel.square(20));
  
    var training = neig.reduceRegions({
      collection: points,
      scale: scale,
      reducer: 'first',
      crs: proj
    });
  
    return training.map(function(f){return f.set("date", date)});
  };
  
  //var date_locsmall  = date_loc.filterlt();
  
  var date_loc = ee.FeatureCollection("users/mrh2182/sub_dateloc1of4_rt");
  
  
  Export.table.toDrive({
    collection: images_create(date),
    description:'sentinel_sub1of4_'+date_og,
    fileFormat: 'CSV'
  });
  
  ///////
  var date_loc = ee.FeatureCollection("users/mrh2182/sub_dateloc2of4_rt");
  
  Export.table.toDrive({
    collection: images_create(date),
    description:'sentinel_sub2of4_'+date_og,
    fileFormat: 'CSV'
  });
      
    ///////
  var date_loc = ee.FeatureCollection("users/mrh2182/sub_dateloc3of4_rt");
  
  Export.table.toDrive({
    collection: images_create(date),
    description:'sentinel_sub3of4_'+date_og,
    fileFormat: 'CSV'
  });
      
    ///////
  var date_loc = ee.FeatureCollection("users/mrh2182/sub_dateloc4of4_rt");
  
  Export.table.toDrive({
    collection: images_create(date),
    description:'sentinel_sub4of4_'+date_og,
    fileFormat: 'CSV'
  });