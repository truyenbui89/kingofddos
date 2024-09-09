import requests
import threading
from termcolor import colored
from datetime import datetime
import os, sys
import time
import random
import re

def clear():
    os.system("cls") if os.name == "nt" else os.system("clear")

clear()

class ProxyInfo:
    def __init__(self, proxy):
        self.proxy = proxy
        self.location = None
        self.type = None
        self.response_time = None

    def determine_location(self):
        try:
            response = requests.get('https://ipinfo.io/json', proxies={"http": self.proxy, "https": self.proxy}, timeout=5)
            self.location = response.json().get("city", "Unknown")
            return True
        except:
            self.location = "Unknown"
            return False

    def determine_type(self):
        types = ["http", "https"]
        for t in types:
            try:
                response = requests.get("http://www.google.com", proxies={t: self.proxy}, timeout=5)
                if response.status_code == 200:
                    self.type = t.upper()
                    return
            except:
                pass
        self.type = "Unknown"

    def measure_response_time(self):
        try:
            response = requests.get("http://www.google.com", proxies={"http": self.proxy, "https": self.proxy}, timeout=5)
            self.response_time = response.elapsed.total_seconds()
        except:
            self.response_time = float('inf')

    def get_info(self):
        is_live = self.determine_location()
        if is_live:
            self.determine_type()
            self.measure_response_time()
        return is_live

def check_live_proxies(filename, num_threads):
    live_proxies = {"HTTP": [], "HTTPS": [], "Unknown": []}
    proxy_pattern = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$')
    lock = threading.Lock()

    def check_proxy_thread(proxy):
        proxy_info = ProxyInfo(proxy)
        if proxy_info.get_info():
            if proxy_pattern.match(proxy):
                live_proxies[proxy_info.type].append(proxy_info.proxy)
                print(colored(f" {proxy} - Live | Location: {proxy_info.location} | Type: {proxy_info.type} | Response Time: {proxy_info.response_time}s", "green"))
                with lock:
                    with open("live2.txt", "a") as file:
                        file.write(proxy + "\n")
            else:
                print(colored(f" {proxy} - Định dạng không hợp lệ", "yellow"))
        else:
            print(colored(f" {proxy} - Die", "red"))

    with open(filename, 'r', encoding='ISO-8859-1') as file:
        proxies = file.readlines()
        threads = []

        for proxy in proxies:
            proxy = proxy.strip()
            thread = threading.Thread(target=check_proxy_thread, args=(proxy,))
            thread.start()
            threads.append(thread)

            if len(threads) >= num_threads:
                for thread in threads:
                    thread.join()
                threads = []

        for thread in threads:
            thread.join()

    with open("live2.txt", "r") as f:
        lines = f.read().splitlines()

    print("ALL is Done Total Proxy Live:", len(lines))
    print("Đã lưu vào file live2.txt")
def typing_effect(text, speed=0):
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(speed + random.uniform(-0, 0))
    print()

if __name__ == "__main__":
    try:
        time.sleep(0)
        clear()
        typing_effect("Nhập tên file proxy để kiểm tra (VD: proxy.txt): ")
        filename = input("> \033[0m")
        num_threads = 1500
        check_live_proxies(filename, num_threads)
    except KeyboardInterrupt:
        print("Đang dừng tool vui lòng chờ giây lát....")
        time.sleep(1)
        exit()

