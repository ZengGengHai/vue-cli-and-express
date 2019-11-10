#!/bin/bash
echo "update"
rm -rf ../../blog-backup
cp -r  ../../vue-cli-and-express ../../blog-backup
cd ../
git pull
cd back
bin/stop.sh
bin/start.sh