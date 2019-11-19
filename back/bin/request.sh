#!/bin/bash
echo "request test"
ab -n 1000 -c 100 http://localhost:3000/index >> /data/stress-test-report.txt 2>&1 &
