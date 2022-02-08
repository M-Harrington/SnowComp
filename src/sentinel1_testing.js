var date_loc = ee.FeatureCollection("users/mrh2182/ylabs_dateloc_small1");

var date_loc = date_loc.map(function(feature){
  var date = ee.Date(feature.get('date'));
  return feature.set('date',date);
});

var date_list = ee.FeatureCollection("users/mrh2182/date_list_small");

print(date_list);
print(date_loc);
// print(date_loc[0]);
// var dates = date_loc.map(function(feature){
  
//   var date = ee.Date(feature.get('date'));
//   var start = date.advance(-13, 'day');
//   var end = date.advance(-1, 'day');
  
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
