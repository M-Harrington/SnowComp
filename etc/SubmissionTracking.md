|Date/Sub#|		RMSE Train|	RMSE Test|	RMSE Holdout|	RMSE CV	|	Stratified RMSE CV	| Actual RMSEs	|	Model Description|
|----------|----------|------|-------|-----------|----------|----------|-----------------------------|
|1/10/2022 - 1	|	11.2054 |	7.8364 | -	|	11.2108	| 11.4191 | 10.7437 |	RF, all data, fuzz=0.3, lat lon + day of season |
|1/17/2022	|	11.406	|	7.919	|	8.243	|	10.3241	|	- | 10.3993		|	By region, fuzz, no holdout, quadratic?|
|1/18/2022 - 1	|	12.645	|	9.144	|	-	|	11.4126	|	- | 11.3226	|		1/17 but no ground truth - CV calibration		|
|1/18/2022 - 2	|	11.4794 |	8.7318 | -	|	11.51	| 11.56 | 10.7002 |	RF, all data, state dummies + day of season		|
|1/19/2022 - 1	|	11.4870 |	8.4292 | -	|	11.51	| 11.56 | 9.7753 |	RF, all data including test, state dummies + day of season		|
|1/29/2022 - 1	|	15.3637 |	- | -	|	15.3644 | 15.3854 | 11.8648 |	RF, only data with MODIS imagery, state dummies + day of season	|
|1/30/2022 - 2	|	13.1548 |	- | -	|	13.5582 | 13.5787 | 9.1539 |	RF, only data with MODIS imagery, state dummies + day of season + MODIS prediction for CNN (32_18_8_3_0.13_50_44)	|
|2/04/2022 - 1	| 9.5228 | 8.2486 | -	| 9.7126 | 9.7573 | 8.3817 |	RF, all data, state dummies + MODIS prediction for CNN from 2/4	|
|2/07/2022 - 1	| 9.0158 | 8.1114 | -	| 9.4568 | 9.4604 | 8.0771 |	RF, all data, day of season + MODIS prediction for CNN from 2/4	|
|2/09/2022 - 1	| 7.4634 | 5.0854 | -	| 7.5993 | 7.6044 | 10.9255 |	RF, all data, day of season + MODIS prediction for CNN from 2/8	|
