echo "监控网站各个页面访问情况"
sort /data/server.log |  grep "api"  | awk '{print $2}' | uniq -c | sort -nr
