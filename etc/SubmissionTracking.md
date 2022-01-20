|Date/Sub#|		RMSE Train|	RMSE Test|	RMSE Holdout|	RMSE CV	|	Stratified RMSE CV	| Actual RMSEs	|	Model Description|
|----------|----------|------|-------|-----------|----------|----------|-----------------------------|
|1/10/2022 - 1	|	11.2054 |	7.8364 | -	|	11.2108	| 11.4191 | 10.7437 |	RF, all data, fuzz=0.3, lat lon + day of season |
|1/17/2022	|	11.406	|	7.919	|	8.243	|	10.3241	|	- | 10.3993		|	By region, fuzz, no holdout, quadratic?|
|1/18/2022 - 1	|	12.645	|	9.144	|	-	|	11.4126	|	- | 11.3226	|		1/17 but no ground truth - CV calibration		|
|1/18/2022 - 2	|	11.4794 |	8.7318 | -	|	11.51	| 11.56 | 10.7002 |	RF, all data, state dummies + day of season		|

