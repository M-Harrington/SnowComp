  var date_loc = ee.FeatureCollection("users/mrh2182/testfeat_dateloc");
  
  var date_loc = date_loc.map(function(feature){
    var date = ee.Date(feature.get('date'));
    return feature.set('date',date);
  });
  
  
  
  var date_list = ee.FeatureCollection("users/mrh2182/date_list_testfeat");
  
  var images_create = function(date){
    var date_day = ee.Date(date.get('date'));
  
    var start = date_day.advance(-30, 'day');
    var end = date_day.advance(1, 'day');
    
    
    var points = date_loc.filter(ee.Filter.eq('date', date_day));
      
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
  
    return training.map(function(f){return f.set("date", date_day)});
  };
  
  
  // date_list = date_list.map(images_create).flatten();
  // print(date_list);
  
  Export.table.toDrive({
    collection: date_list.map(images_create).flatten(),
    description:'sentinel_testfeat',
    fileFormat: 'CSV'
  });
  
