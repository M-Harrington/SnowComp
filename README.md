# SnowComp
The below follows the order of operations for reconstructing the repo and the models. Note that two referenced paths are `path_git = "SnowComp/dat/"` and `path_dbx = "Dropbox/SnowComp/"`

## Data collection
### Modis
1. Run `path_git + "ModisProcessingActual.ipynb"
2. This saves intermediary outputs `ModisSnowImages_*.npy` to `path_dbx` and metadata `cell_snow_ids*.pkl`

### Sentinel
1. Run `path_git + "SentinelHelper.ipynb"
2. This saves intermediary helpers `*_date_loc.csv` and date metadata `date_list_*.csv` to `path_dbx +"SentinelHelper/"`
3. For all of the `path_git + sentinel1_*.js` files, run in code editor on Google Earth Engine
4. This saves `sentinel_*.csv` to user's Google Drive
5. Download files and place in `path_dbx +"SentinelHelper/"`
6. Run `path_git + "sentinel_preprocessing.ipynb"`
7. This saves files `sent_pp_*.npy` and metadata `sent_*_meta.csv` to `path_dbx +"SentinelHelper/"`

### Other data
TODO: Isabella

## Training 
### Sentinel CNN
1. Run `path_git + "sentinel_cnn.ipynb"
2. Model weights are saved as `"modelsent*"` to `path_dbx +"RunGraphs/"`
3. Predictions for downstream training can be found as`sentpreds.npy` in `path_dbx +"preds/"`
4. Submission data and metadata can be found in `path_dbx +"SentinelHelper/"`

### MODIS CNN
1. Run `path_git + "CNN.ipynb"
2. Model weights are saved as `"model*"` to `path_dbx +"RunGraphs/"`
3. Predictions for downstream training can be found as `"preds.npy"` in `path_dbx +"preds/"`
4. Submission data and metadata can be found in `"subpreds.npy"` in `path_dbx +"preds/"`

### Meta aggregator (linear model)
TODO: 

## Realtime Predictions
1. Define `DATE`
2. Run `path_git + "SentinelHelper-realtime.ipynb"`
3. saves `sub_dateloc*+DATE` to `path_dbx +"SentinelHelper/realtime/"`
4. Run `path_git + "sentinel1_subRealtime.js"`
5. saves to drive `"sub_dateloc*_rt_"+DATE`
6. Run `path_git + "sentinel_preprocessing-realtime.ipynb"`
7. saves to `path_dbx + "realtimeData/"`
8. Run `path_git + "ModisProcessingRealtime.ipynb"`
9. saves `"Modis_sub_"+str(DATE)` to  `path_dbx + "realtimeData/"`

TODO: Meta pipeline
