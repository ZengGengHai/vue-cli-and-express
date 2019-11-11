#!/bin/bash
echo "server start"
nohup node bin/www 
#>> /data/server.log 2>&1 &