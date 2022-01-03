- import image files
    - check locations within tile(s)
    - grab bands and square around points

Depending on compute costs vs storage costs, probably more efficient to import and process once and store in seperate blob (or hard drive).  
Note that this process needs to be able to run relatively quickly for realtime predictions (somewhere between 1-7 days), with potentially multiple days of images with MODIS.
