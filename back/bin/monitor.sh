echo "监控网站各个页面访问情况"
cat ./log/statistics.log |  grep "2019-11-11" | grep "GET"  | awk '{print $5}' | sort |  uniq -c | sort -nr

