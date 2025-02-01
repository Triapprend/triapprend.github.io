import requests
import json
import sys
import time

ymd = sys.argv[1]

headers = {
    "user-agent": "triapprend"
}

results = []
start = 1

while True:
    url = f"https://connpass.com/api/v1/event/?ymd={ymd}&start={start}"
    print(f"requestings {url}")
    res = requests.get(url, headers=headers)
    obj = res.json()
    results += obj["events"]
    if obj["results_start"] + obj["results_returned"] > obj["results_available"]:
        break
    start += obj["results_returned"]

    time.sleep(5)

with open(f"{ymd}.json", "w", encoding="utf-8") as f:
    json.dump(results, f)
