#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : cms_edit.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2022/7/12

import re

from flask import Flask, request, jsonify

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False  # jsonify返回的中文正常显示
import requests

cms_config_path = r'E:\Users\dashen\Downloads\maccms10-master\maccms10-master\application\extra\maccms.php'

MOBILE_UA = 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36'
PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
UA = 'Mozilla/5.0'
headers = {
    'Referer': 'https://www.bilibili.com/video',
    'user-agent': UA,
}


def updateCms(ipText=''):
    with open(cms_config_path, encoding='utf-8') as f:
        config = f.read()
    # print(config)
    # ret = re.findall("'auth' => '(.*?)',",config,re.M)
    # print(ret) # 查看所有满足条件的匹配结果

    ret = re.finditer("'auth' => '(.*?)',", config, re.M)
    # for r in ret:
    #     print(r.span(),r.group())
    ip = list(ret)[-2]
    # print(ip)
    start, end = ip.span()
    r = ip.groups()[0]
    r1 = ip.group()
    # print(start,end)
    # print(r1)
    # print(r)
    before = config[:start + 11]
    # print('结束')
    after = config[end - 2:]
    # print(before)
    # print(after)
    config = before + ipText + after
    # print(config)
    with open(cms_config_path, 'w+', encoding='utf-8') as f:
        f.write(config)
    return config


def checkParmas():
    args = {}
    if request.method == 'POST':
        args = request.json or args
    elif request.method == 'GET':
        args = request.args or args
    params = ['url']
    ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    for key in params:
        if not args.get(key):
            return jsonify({'url': '', 'code': 404, 'msg': f'缺少必传参数:{key}!','ip':ip})
    url = args.get('url') or ''
    if not url or len(url) < 10:
        return jsonify({'url': '', 'code': 404, 'msg': f'请求失败，错误的url值','ip':ip})
    return url


@app.route('/', methods=['GET'])
def index():
    return "<a href='/api/update_ip'>更新授权ip接口</a><br><a href='/jx/wmkk?url='>完美看看西瓜解析</a>"


def assign_result(fn, url):
    if type(url) != str:
        return url
    realUrl = fn(url)
    ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 200, 'msg': f'自建道长解析成功','ip':ip})
    else:
        return jsonify({'url': '', 'code': 404, 'msg': f'自建道长解析失败:{realUrl}','ip':ip})


@app.route('/jx/wmkk', methods=['GET', 'POST'])
def jx_wmkk():
    return assign_result(jiexi_wmkk, checkParmas())


def jiexi_wmkk(url):
    r = requests.get(f'https://www.wanmeikk.film/dplayer.php?url={url}', headers=headers)
    # r = requests.get(f'https://www.wanmeikk.me/dplayer.php?url={url}', headers=headers)
    urls = re.search("var urls = '(.*?)'", r.text, re.M)
    ret = urls.groups()[0]
    return ret


@app.route('/api/update_ip', methods=['POST'])
def update_ip():
    args = request.json or {}
    ips = args.get('ips') or ''
    if not ips:
        return f'更新失败,参数ips异常:{ips}'
    print(ips)
    updateCms(ips)
    return '更新完毕'


if __name__ == '__main__':
    # updateCms('127.0.0.1#192.168.0.1')
    # app.run(debug=True, host='127.0.0.1', port=5702)
    # lm.jx.mudery.com
    app.run(debug=True, host='0.0.0.0', port=5702)
    # print(jiexi_wmkk('YXzEIuxRYrW3ID5VZsTkAv5nZFW4Mf5kONDqQo05MnjiQszaMJj6RRh6NCzXk31yNLWjILxPYRTxAS4WNZmmMTO0O0Oq'))
