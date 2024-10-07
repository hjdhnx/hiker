#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File  : flaskBljxDz.py
# Author: DaShenHan&道长-----先苦后甜，任凭晚风拂柳颜------
# Date  : 2021/11/6
# pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple/
# pip3 install -r requirements.txt -t .
import json
import time
import datetime
from urllib.parse import urljoin,unquote

import ujson
from flask import Flask, jsonify, request,redirect,make_response
import requests
import re
import execjs
import os
from lxml import etree
from base64 import b64encode,b64decode
import base64
import asyncio,aiohttp
# import json
import random

import sys
import codecs
sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

from concurrent.futures._base import TimeoutError
# D:\soft\python\368\Lib\subprocess.py 将init的编码encoding改成utf-8
app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False  # jsonify返回的中文正常显示
MOBILE_UA = 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36'
PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
UA = 'Mozilla/5.0'
headers = {
        'Referer': 'https://www.bilibili.com/video',
        'user-agent': UA,
}
# # 你的年度大会员
# appkey = ''
# access_key = ''
# # 云函数接口key
# Akey = ''
def genSecret():
    """
    生成道长解析动态密码
    :return:
    """
    # 服务器时间要加8个小时
    now = datetime.datetime.now()+datetime.timedelta(hours=8)
    secret = abs(now.hour-now.minute)*3+now.day*10
    return secret

need_secret = False # 全部动态密码

# 道长自己的年度大会员
appkey = '1d8b6e7d45233436'
# access_key = '006f56287f2c709e0c9a3c8f34bb5eb1'
access_key = '9cad220c014c7b6e7fb2854fa21b8981'
Akey = 'daozhangyyds'
#随机json
sjfreeUrls = ['https://jhjx.ptygx.com/tyjx.php/?url=',
              'http://m.auuyruyc.com/json/1194447576.php/?url=',
              'http://jx.kmys.top:1080/api/?key=JMXZuIOr8yr99oB13N&url=',
              'https://json.1920i.com/home/api?type=ys&uid=1605291&key=acfhimortLNQSW0478&url=',
              'https://973.cuan.la:5901/973/api/api_best.php?pltfrom=1100&key=973&url=',
              ]
#随机html
sjUrl = ['http://47.95.28.242/jx/renrenmi/analysis.php?v=',
              'http://jiexi.xbjxw.top/player/analysis.php?v=']
fast_time_out = 5
slow_time_out = 8
async def fetch_async(url):
    # 教程来源 https://www.cnblogs.com/ssyfj/p/9222342.html
    async with aiohttp.ClientSession() as session: #协程嵌套，只需要处理最外层协程即可fetch_async
        try:
            async with session.get(url,headers=headers,timeout=fast_time_out) as r:
                reponse = await r.text(encoding="utf-8") # 或者直接await r.read()不编码，直接读取，适合于图像等无法编码文件
                try:
                    reponse = ujson.loads(reponse)
                except Exception as e:
                    # print(f"请求 {url} 出错:{e}")
                    reponse = None
                finally:
                    return reponse
        except TimeoutError:
            # print(f'超时:{url}')
            return None



def atob(encodeStr):
    """
    base64解码
    :param encodeStr:
    :return:
    """
    return base64.b64decode(encodeStr.encode("utf8")).decode("latin1")

def btoa(Str):
    """
    base64编码
    :param Str:
    :return:
    """
    return base64.b64encode(Str.encode("latin1")).decode("utf8")

def mx_jiexi():
    info_list = [
        # 'http://www.jjsvip.cc/mogai_api.php/v1.vod/detail?vod_id=178715&token=',#锤子，再见时光
        # 'https://app.linzhiyuan.xyz/xgapp.php/v1/video_detail?id=12165&token=',#5060，王牌杀手
        # 'http://api.xiaoysw.com/api.php/v1.vod/detail?vod_id=102214&token=',#小极影视，烧烤之王
        # 'http://3ketv.com/mogai_api.php/v1.vod/detail?vod_id=36534&token=',#小蜻蜓，龙虎风云会
        # 'http://xs.78tv.cc/mogai_api.php/v1.vod/detail?vod_id=395876&token=',#悠悠影院，王牌杀手
        'https://tv.jindcloud.com/api.php/v1.vod/detail?vod_id=4056&token=',#扶风，筋斗云
    ]
    tasks = [fetch_async(url) for url in info_list]
    new_loop = asyncio.new_event_loop()
    asyncio.set_event_loop(new_loop)
    event_loop = asyncio.get_event_loop()
    results = event_loop.run_until_complete(asyncio.gather(*tasks))
    event_loop.close()
    results = list(filter(lambda x:x,results))
    jxs = []
    for ret in results:
        # print(ret)
        # r = re.search('type=ys&uid=(.*?)&key=(.*?)&url=',f'{ret}', re.S).groups()
        r = re.search('https://(.*?)byteamone(.*?)key=(.*?)&url=,',f'{ret}', re.S).groups()
        # print(r)
        # if r and len(r) == 2:
        #     jxs.append(f"https://vip.mengx.vip/home/api?type=ys&uid={r[0]}&key={r[1]}&url=")
        if r and r[-1]:
            jxs.append(f"https://vip.byteamone.cn/api/?key={r[-1]}&url=")
    jx = random.choice(jxs) if len(jxs)>0 else ''
    # print(jxs)
    # print(jx)
    return jx

@app.route("/",methods=['GET'])
def index():
    lists = '蓝莓影视|哔哩哔哩|咪咕|腾讯|爱西瓜|萌新(时好时坏)|淡了(蛋蛋)|影视工厂|扶风买|融兴|淘影|迪迪|奈落麒麟|挚爱江湖|七哥|多多|麒麟道长(麒麟买)|随机免费json(sjfree)|随机免费html(sjfree2)'.split('|')
    tips = ''
    for i in range(1,len(lists)+1):
        tips+=f'{i}.{lists[i-1]}\n'
    msg = f"""
    欢迎使用b站1080p视频解析,道长海阔视界专用
    目前已经自建以下线路\n"""+tips
    html = "<p>" + msg.replace("\n", "<br>") + "</p><p>特别鸣谢!!!大佬提供的融兴，扶风，淘影key,道长魔断专用，请勿盗用</p>"
    return html

@app.route("/plugin",methods=['GET'])
def plugin():
    # name=道长影视模板.js
    args = request.args
    name = args.get('name')
    # if not name or not (name.endswith('.js') or name.endswith('.txt') or name.endswith('.json')):
    if not name or not name.split('.')[-1] in ['js','txt','py','json']:
        return jsonify({'code': -2, 'msg': f'非法威胁,未指定文件名。必须包含js|txt|json|py'})
    try:
        return toJs(name)
    except Exception as e:
        return jsonify({'code': -2, 'msg': f'非法猥亵\n{e}'})

@app.route("/xmftp",methods=['GET'])
def xmftp():
    # name=道长影视模板.js
    args = request.args
    url = args.get('url')
    # if not name or not (name.endswith('.js') or name.endswith('.txt') or name.endswith('.json')):
    if not url or not url.startswith('http'):
        return jsonify({'code': -2, 'msg': f'无效链接{url},必须是http开头'})
    value = xmftp_jiexi(url)
    # print(value)
    # headers = [('Content-Type', 'text/plain;charset=utf-8')]
    response = make_response(value)
    response.headers['Content-Type'] = 'text/plain;charset=utf-8'
    return response

def xmftp_jiexi(url):
    s = requests.session()
    s.get('https://ftpod.cn/')
    r = s.get(url)
    # r.encoding = r.apparent_encoding
    r.encoding = 'utf-8'
    # print(r.encoding)
    value = r.text
    return value

def getCid(url='https://www.bilibili.com/bangumi/play/ep424178'):
    print(url)
    url = url.split('?')[0]
    if url.endswith('/'):
        url = url[:-1]
    if url.find('bilibili.com/video/') > -1:
        r = requests.get(url, headers=headers)
        # print(r.text)
        # matchStr = re.search('cid=(.*?)&aid=(.*?)&(.*?)bvid=(.*?)&', r.text, re.S)
        # params = matchStr.groups()
        # if len(params) > 3:
        #     cid = params[0]
        #     avid = params[1]
        #     bvid = params[3]
        #     return [cid,avid,bvid]
        # else:
        #     return None

        mtext = re.search('window.__INITIAL_STATE__=(.*?);\(function', r.text, re.S).groups()[0]
        # print(mtext)
        try:
            mtext = json.loads(mtext)
            avid = mtext['aid']
            bvid = mtext['bvid']
            cid = mtext['videoData']['cid']
            return [cid,avid,bvid]
        except Exception as e:
            print(f'获取参数发生错误:{e}')
            return None

    elif url.find('/ep') > 1:
        epid = url.split('ep')[1]
        data_url = f'https://api.bilibili.com/pgc/view/web/season?ep_id={epid}'
        r = requests.get(data_url, headers=headers).json()
        if r.get('code') == 0:
            episodes = r['result']['episodes']
            # print(episodes)
            # print(url)
            furl = url.replace('https://m.bilibili.com', 'https://www.bilibili.com')
            now_ep = list(filter(lambda x: furl in [x['short_link'], x['share_url']] or furl in x['link'], episodes))[0]
            avid = now_ep['aid']
            cid = now_ep['cid']
            return [cid,avid,None]
        else:
            return None
    elif url.find('/ss')>-1:
        epUrl = getEpUrl(url)
        return getCid(epUrl)
    else:
        return None

def getEpUrl(ssUrl):
    html = requests.get(ssUrl, headers=headers).text
    # print(html)
    short_link = re.search('short_link(.*?),',html)
    short_link = (':'.join(short_link.group().split(':')[1:])).split('"')[1]
    epUrl = short_link.encode('latin-1').decode('unicode_escape')
    return epUrl

def bljiexi(url='https://www.bilibili.com/bangumi/play/ep424178',appkey='84956560bc028eb7',access_key='a0fa850310e694bee63f49fc5c4c9ab1'):
    cids = None
    try:
        cids = getCid(url)
        # print(cids)
    except Exception as e:
        return f'{e}'

    if type(cids) == list:
        cid = cids[0]
        avid = cids[1]
        rurl = f"https://api.bilibili.com/x/player/playurl?avid={avid}&cid={cid}&qn=112&type=&otype=json&appkey={appkey}&access_key={access_key}"
        # print(rurl)
        r = requests.get(rurl, headers=headers).json()
        realUrl = r['data']['durl'][0]['url']
        return realUrl
    else:
        return ''

def dlgw_jx(url,jxApi='http://q16.22web.org/api.php'):
    # http://b2.22web.org/jx/index.php
    base_path = os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(base_path,'aes.js')
    # print(js_path)
    with open(js_path, 'r', encoding='UTF-8') as fp:
        ajs = fp.read()
    ajs += """
        function toNumbers(d) {
                var e = [];
                d.replace(/(..)/g, function(d) {
                    e.push(parseInt(d, 16))
                });
                return e
}
function toHex() {
    for (var d = [], d = 1 == arguments.length && arguments[0].constructor == Array ? arguments[0] : arguments, e = "", f = 0; f < d.length; f++)
    {
        e += (16 > d[f] ? "0" : "") + d[f].toString(16);
    }
    return e.toLowerCase()
}
    """
    s = requests.session()
    r = s.get(jxApi,headers={'User-Agent':PC_UA})
    ret = r.text
    html = etree.HTML(ret)
    ecode = 'var document={};' + ''.join(html.xpath('//script[2]/text()')).split('location.href')[
        0] + 'function getCk(){return document.cookie}'
    ajs += ecode
    loader = execjs.compile(ajs)
    ck = loader.call('getCk', '')
    data = {
        # 'url': 'https://www.iqiyi.com/v_1zp7qgh23kg.html'
        'url': url
    }
    ck = ck.split(';')[0]
    print(ck)
    headers = {'Cookie': ck,'User-Agent':PC_UA}
    r = s.post(jxApi, headers=headers, data=data)
    # r = s.get(jxApi, headers=headers, params=data)
    return r.text

def ysgc_jiexi():
    r = requests.get('https://www.ik4.cc/api.php/app/video_detail?id=99&token=',timeout=fast_time_out)
    try:
        ret = r.json()
        return ret['data']['vod_url_with_player'][0]['parse_api']
    except Exception as e:
        return f'{e}'

def ffm_jiexi():
    """
    扶风M解析，m表示买的,money
    :return:
    """
    return 'https://vip.byteamone.cn/api/?key=92o3rsFdRYek842RRw&url='

def sjfree_jiexi(urls=sjfreeUrls):
    """
    随机免费接口
    :return:
    """
    url = random.choice(urls) if type(urls)==list and len(urls)>0 else ''
    return url

def ql_jiexi():
    # 麒麟解析,取自app影视gtcv 红牛影视
    try:
        r = requests.get('http://cmm.218rcw.cn/api.php/gctvapi.vod/detail?vod_id=581499&token=', timeout=slow_time_out)
        ret = r.json()
        return ret['data']['vod_play_list'][0]['player_info']['parse']
    except Exception as e:
        # print(f'{e}')
        return f'{e}'

def qldz_jiexi(vipUrl):
    if not str(vipUrl).startswith('http'):
        return f'滚犊子你'
    # 麒麟道长解析,道长自己买的
    accounts = [
        {'key':'bivyzDFKNQRTXY0149','uid':'7146736'},
        # {'key':'efjlmnqswHMNOV0138','uid':'7403418'},
    ]
    account = random.choice(accounts) if len(accounts) > 0 else {'key':'bivyzDFKNQRTXY0149','uid':'7146736'}
    key = account['key']
    uid = account['uid']
    try:
        url = f'https://api.qilin.best/home/api?type=ys&uid={uid}&key={key}&url={vipUrl}'
        # print(url)
        r = requests.get(url, timeout=slow_time_out).json()
        if str(r['code']) == '200':
            return r['url']
        else:
            return f'解析失败:{r}'
    except Exception as e:
        # print(f'{e}')
        return f'{e}'

def xc_jiexi(vipUrl):#星辰解析
    if not str(vipUrl).startswith('http'):
        return f'滚犊子你'
    # 麒麟道长解析,道长自己买的
    accounts = [
        {'key':'eCjS1I3JoLmTNJndQ2'},
    ]
    account = random.choice(accounts) if len(accounts) > 0 else {'key':'eCjS1I3JoLmTNJndQ2'}
    key = account['key']
    headers = {'User-Agent': MOBILE_UA}
    try:
        url = f'https://svip.spchat.top/api/?key={key}&url={vipUrl}'
        print(url)
        requests.packages.urllib3.disable_warnings()
        r = requests.get(url, timeout=slow_time_out,headers=headers,verify=False).json()
        print(r)
        if str(r['code']) == '200':
            return r['url']
        else:
            return f'解析失败:{r}'
    except Exception as e:
        # print(f'{e}')
        return f'{e}'

def ty_jiexi(vipUrl):#淘影解析
    if not str(vipUrl).startswith('http'):
        return f'滚犊子你'
    # 麒麟道长解析,道长自己买的
    accounts = [
        {'key':'zykLjRmuqkAJzyQp02'},
    ]
    account = random.choice(accounts) if len(accounts) > 0 else {'key':'zykLjRmuqkAJzyQp02'}
    key = account['key']
    headers = {'User-Agent': MOBILE_UA}
    try:
        url = f'https://www.vodjx.top/api/?key={key}&url={vipUrl}'
        print(url)
        requests.packages.urllib3.disable_warnings()
        r = requests.get(url, timeout=slow_time_out,headers=headers,verify=False).json()
        print(r)
        if str(r['code']) == '200':
            return r['url']
        else:
            return f'解析失败:{r}'
    except Exception as e:
        # print(f'{e}')
        return f'{e}'

def qg_jiexi(vipUrl):
    headers = {
        'Referer':f'https://jx.mmkv.cn/tv.php?url={vipUrl}',
        'User-Agent': MOBILE_UA
        # 'Referer':f'https://vip.mmkv.cn/tv.php?url={vipUrl}'
    }
    playUrl = f"https://vip.mmkv.cn/jiexiiiii.php?vi={vipUrl}"
    try:
        r = requests.get(playUrl,headers=headers,timeout=slow_time_out)
    except Exception as e:
        return f'解析超时错误:{e}'
    # print(r.text)
    try:
        # realUrl = re.search('var qgur1(.*?);',r.text,re.S)
        realUrl = re.search('video src="(.*?)"',r.text,re.S)
        # return realUrl.groups()[0].split('"')[1].strip()
        return realUrl.groups()[0].strip()
    except Exception as e:
        return f'错误:{e}'

def runJs(jsPath):
    base_path = os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(base_path, jsPath)
    with open(js_path, 'r', encoding='UTF-8') as fp:
        ajs = fp.read()
    # print(ajs)
    loader = execjs.compile(ajs)
    return loader

def toJs(jsPath):
    base_path = os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(base_path, jsPath)
    if not os.path.exists(js_path):
        return jsonify({'code': -2, 'msg': f'非法猥亵,文件不存在'})
    with open(js_path, 'r', encoding='UTF-8') as fp:
        js = fp.read()
    response = make_response(js)
    response.headers['Content-Type'] = 'text/javascript; charset=utf-8'
    return response

def toHtml(jsPath):
    base_path = os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(base_path, jsPath)
    with open(js_path, 'r', encoding='UTF-8') as fp:
        js = fp.read()
    response = make_response(js)
    response.headers['Content-Type'] = 'text/html; charset=utf-8'
    return response

def ff_jiexi(vipUrl):
    headers = {
        'User-Agent': MOBILE_UA
    }
    jxUrl = 'https://q.591zhuiju.com/'
    ref = f"{jxUrl}?url={vipUrl}"
    headers['Referer'] = ref
    api = f"{jxUrl}api.php"
    b64id = b64encode(vipUrl.encode('utf-8')).decode('utf-8')
    loader = runJs('parse.js')
    parseid = loader.call('caesarCipher',b64id,-1)
    # print(parseid)
    r = requests.post(api,headers=headers,data={'url':parseid},timeout=slow_time_out).json()
    # print(r)
    url = b64decode(loader.call('caesarCipher',r.get('url'),-1)).decode('utf-8') if r.get('code') == 200 else ""
    return url

def jh_jiexi(url,pwd='jhyun9521'):
    # url = "LyicZANeaiRbgwU5GB77JWp3jyzjC/w+TJjktXolzoBjn368zS9GdD9NOf0RowNTk0w5hIh1txgpkidM9YVq6S8kh8CIH8ARFDW5T4rxADOM1gzHNt7XVu3LjQ=="
    loader = runJs('parse.js')
    # 传已经atob后的值进去,返回的值就直接能用
    ret = loader.call('jhjx', atob(url),pwd, 1)
    return ret

def didi_jiexi(vipUrl):
    #网站首页 http://dd88.icu:6080/
    # headers = {'User-Agent': UA}
    # http://vv.tv758.com:6688/?url=
    headers = {'User-Agent': MOBILE_UA,'Referer':f'http://vv.tv758.com:6688/?url={vipUrl}'}
    # url = f'http://bp.tv758.com:547/?url={vipUrl}'
    # url = f'http://vv.tv758.com:6688/?url={vipUrl}'
    # print(url)
    url = f'http://vv.tv758.com:6688/analysis.php?v={vipUrl}'
    print(url)
    try:
        r = requests.get(url,headers=headers,timeout=fast_time_out)
        # print(r.text)
        html = etree.HTML(r.text)
        # realUrl = re.search('"url":(.*?)",', r.text, re.S).groups()[0].split('"')[1]
        # realUrl = re.search('var urls =(.*?)";', r.text, re.S).groups()[0].split('"')[1]
        realUrl = html.xpath('//*[@id="video"]/@src')[0]
        # realUrl = jh_jiexi(realUrl)
        # print(realUrl)
        return realUrl
    except Exception as e:
        return f'错误:{e}'

def rx_jiexi_old(vipUrl):
    headers = {"Referer": "https://www.rongxingvr.com",'User-Agent': MOBILE_UA}
    url = f'https://test.rongxingvr.com/test/?url={vipUrl}'
    text = ''
    try:
        r = requests.get(url,headers=headers,timeout=slow_time_out)
        text = r.text
        realUrl = re.search('"url":(.*?)",',text,re.S).groups()[0].split('"')[1]
        return realUrl
    except Exception as e:
        return f'错误:{e}{text}'

def rx_jiexi(vipUrl):
    headers = {"Referer": "https://www.rongxingvr.com",'User-Agent': MOBILE_UA}
    if not str(vipUrl).startswith('http'):
        return f'滚犊子你'
    # 融兴解析,群友!!!自己买的
    key = 'sFPQyQSxZKBVfDzfZ9'
    try:
        url = f'https://fast.rongxingvr.cn:8866/api/?key={key}&url={vipUrl}'
        # print(url)
        r = requests.get(url, timeout=fast_time_out,headers=headers).json()
        if str(r['code']) == '200':
            return r['url']
        else:
            return f'解析失败:{r}'
    except Exception as e:
        # print(f'{e}')
        return f'{e}'

def ixg_jiexi(vipUrl,mflag=None):
    """
    爱西瓜
    :param vipUrl:
    :return:
    """
    headers = {'User-Agent': PC_UA, 'referer': 'https://www.ixigua.com'}
    s = requests.session()
    r = s.get('https://www.ixigua.com/',allow_redirects=False)
    print(r.text)
    print(r.cookies)
    ck = 'ttwid=1%7Ce392ogVf4q4BaIFspoYmsbWtv9_iQd_XxB02tVSD9Tk%7C1634577856%7Caeb02095cc5a6e96454aa690e038a3439b6836ffd11a501ca1e3488bcf2c6d54; __ac_nonce=060d6a4a10085906c6a97; __ac_signature=_02B4Z6wo00f01fFH3ZgAAIDAkk0d8qIntt3xY9kAAByJ8d'
    print(ck)
    # print(vipUrl)
    # vipUrl = 'https://www.ixigua.com/6915990035812581896?logTag=9db16949bf1c9bf9332b'
    headers = {'User-Agent': PC_UA, 'Cookie': ck, 'referer': 'https://www.ixigua.com'}
    if vipUrl.find('?logTag=') > -1:
        vipUrl = vipUrl.split('?logTag=')[0]
    elif vipUrl.find('cinema/')>-1:
        r = requests.get(vipUrl, headers=headers, timeout=fast_time_out, allow_redirects=False)
        vipUrl = urljoin(vipUrl,r.headers['Location'])
    text = ''
    try:
        # print(vipUrl)
        r = requests.get(vipUrl,headers=headers,timeout=fast_time_out)
        r.encoding = r.apparent_encoding
        text = r.text
        # print(text)
        html = etree.HTML(text)
        js = ''.join(html.xpath('//*[@id="SSR_HYDRATED_DATA"]/text()')).replace('window._SSR_HYDRATED_DATA','function getJson(){return json};var json')
        # print(js)
        loader = execjs.compile(js)
        jsd = loader.eval('json.anyVideo.gidInformation.packerData')
        # print(jsd)
        flag = loader.eval('json.anyVideo.gidInformation.packerData.albumInfo.totalEpisodes')
        # print('flag:',flag)
        # print(vipUrl)
        if flag == 1 or mflag or '?id=' in vipUrl:
            data = loader.eval('json.anyVideo.gidInformation.packerData.videoResource.normal.video_list')
            data = list(data.values()) # 取所有播放列表
            data = max(data, key=lambda x: int(x['definition'].replace('p','').replace('k','0000'))) # 筛选视频里最高清晰度的
            realUrl = atob(data['main_url'])
            # print(realUrl)
            return realUrl
        else:
            # print(f'第二种情况:{flag}')
            url = f'https://www.ixigua.com/api/albumv2/details?_signature=_02B4Z6wo00f01CHX1VQAAIBBcFEZFjy-qvghx9HAAFcod1&albumId={vipUrl.split("com/")[1]}&blockOnly=1'
            # print(url)
            r = requests.get(url,headers={'referer':'https://www.ixigua.com','User-Agent':MOBILE_UA},timeout=fast_time_out)
            # print(r.text)
            r = r.json()
            playlist = r['data']['playlist']
            # 综艺类所有列表
            playlist = list(map(lambda i:(i['rank'],vipUrl+'?id='+i['episodeId']),playlist))
            # 取其中的一个
            first = playlist[0][1]
            return ixg_jiexi(first,True)
    except Exception as e:
        # print(f'{e}')
        return f'错误:{e}{text[:120] if len(text)>120 else text}'

def ndkj_jiexi(vipUrl):
    headers = {'User-Agent': UA}
    url = f'http://cache.languang.icu:88/didi.php?url={vipUrl}'
    try:
        r = requests.get(url,headers=headers,timeout=fast_time_out).json()
        realUrl = r.get('url') or ''
        return realUrl.replace('/cache/did/','/cache/didi/')
    except Exception as e:
        return f'错误:{e}'

def nlql_jiexi(vipUrl):
    headers = {"Referer": "https://jx.manmankan.top/",'User-Agent': MOBILE_UA}
    data = {
        'url': vipUrl,
        'ac': 'jx',
    }
    try:
        r = requests.post('https://jx.manmankan.top/api.php',data=data,headers=headers,timeout=fast_time_out).json()
        realUrl = r.get('url') or ''
        return realUrl
    except Exception as e:
        return f'错误:{e}'


def zajh_jiexi(vipUrl):
    # headers = {"Referer": "http://jx.zhiaiyy.top/?url=",'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045714 Mobile Safari/537.36'}
    # PC_UA需要解密江湖模板。手机UA直接取
    headers = {'User-Agent': MOBILE_UA}
    # headers = {'User-Agent': PC_UA}
    # url = f'http://jx.zhiaiyy.top/?url={vipUrl}' # 江湖D
    # url = f'https://123.xxgcx.cn:4433/jianghu.php?url={vipUrl}' #江湖B
    url = f'http://jf.jisutuku.top/api/?key=TVDrWfMwbn1IUtLLWY&url={vipUrl}' #江湖1080直解
    # print(url)
    try:
        """
        r = requests.get(url,headers=headers,timeout=fast_time_out)
        # # print(r.text)
        # realUrl = re.search('url(.*?):(.*?)"(.*?)"',r.text,re.S).groups()[2] #PC写法
        # # print(realUrl)
        # realUrl = jh_jiexi(realUrl,'928395479')
        realUrl = re.search('source src="(.*?)"',r.text,re.S).groups()[0] #手机写法
        print('realUrl:',realUrl)
        return realUrl
        """

        r = requests.get(url, timeout=fast_time_out, headers=headers).json()
        if str(r['code']) == '200':
            return r['url']
        else:
            return f'解析失败:{r}'
    except Exception as e:
        # print(f'{e}')
        return f'错误:{e}'

def dd_jiexi(vipUrl):
    headers = {"Referer": "https://www.xhqyy.com/",
               'User-Agent': UA
               }
    url = f'https://dp.dd520.cc/analysis.php?v={vipUrl}'
    print(url)
    try:
        r = requests.get(url, headers=headers, timeout=fast_time_out)
        realUrl = re.search('var url = "(.*?)"', r.text, re.S).groups()[0]
        return realUrl
    except Exception as e:
        return f'错误:{e}'

@app.route("/bl",methods=['GET', 'POST'])
def bl_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = bljiexi(url, appkey, access_key)
    if realUrl.startswith('https:'):
        return jsonify({'url': realUrl,'code': 0,'msg':'解析成功'})
    else:
        return jsonify({'url': '','code': -2,'msg': '解析失败','detail': realUrl})

@app.route("/dl",methods=['GET', 'POST'])
def dl_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = dlgw_jx(url)
    return realUrl

@app.route("/ysgc",methods=['GET', 'POST'])
def ysgc_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    # jxUrl = ysgc_jiexi()
    # if jxUrl.startswith('http'):
    #     try:
    #         r = requests.get(jxUrl+url).json()
    #         print(r)
    #         url = r.get('url') or ''
    #         if url.find('http') == -1:
    #             url = atob(url)
    #         return jsonify({'url': url, 'code': 0, 'msg': f'自建影视工厂解析完毕'})
    #     except Exception as e:
    #         return jsonify({'url': '', 'code': -2, 'msg': f'自建影视工厂线路错误:{e}'})
    jxUrl = 'https://jx.ysgc.xyz/?url='
    playUrl = jxUrl+url
    headers = {
        # 'Referer': jxUrl,
        'user-agent': MOBILE_UA,
    }
    try:
        r = requests.get(playUrl,headers=headers)
        url = re.search('url:(.*?)",',r.text,re.S).groups()[0].split('"')[1]
        if url.startswith('http'):
            return jsonify({'url': url, 'code': 0, 'msg': f'自建影视工厂解析成功'})
        else:
            return jsonify({'url': '', 'code': -2, 'msg': f'解析失败','detail':url})
    except Exception as e:
        # print(f'{e}')
        return jsonify({'url': '', 'code': -3, 'msg': f'自建影视工厂线路错误:{playUrl}'})

@app.route("/ffm",methods=['GET', 'POST'])
def ffm_jx():
    # return mx_jx()
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    # jxUrl = ffm_jiexi()
    jxUrl = mx_jiexi()
    if jxUrl.startswith('http'):
        return redirect(jxUrl+url)
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建扶风m线路错误:{jxUrl}'})

@app.route("/sjfree",methods=['GET', 'POST'])
def sjfree_jx():
    # 随机免费json
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    jxUrl = sjfree_jiexi()
    if jxUrl.startswith('http'):
        return redirect(jxUrl+url)
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建随机json免费线路错误:{jxUrl}'})

@app.route("/sjfree2",methods=['GET', 'POST'])
def sjfree2_jx():
    # 随机免费html
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    jxUrl = sjfree_jiexi(sjUrl)
    if jxUrl.startswith('http'):
        return redirect(jxUrl+url)
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建随机html免费线路错误:{jxUrl}'})

@app.route("/mx",methods=['GET', 'POST'])
def mx_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    jxUrl = mx_jiexi()
    if jxUrl.startswith('http'):
        return redirect(jxUrl+url)
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建萌新线路错误:{jxUrl}'})

@app.route("/ql",methods=['GET', 'POST'])
def ql_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    jxUrl = ql_jiexi()
    if jxUrl.startswith('http'):
        return redirect(jxUrl+url)
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自麒麟线路错误:{jxUrl}'})

@app.route("/qldzc",methods=['GET', 'POST'])
def qldz_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = qldz_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建道长麒麟解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建道长麒麟线路错误:{realUrl}'})

@app.route("/xc",methods=['GET', 'POST'])
def xc_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = xc_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建道长星辰解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建道长星辰线路错误:{realUrl}'})

@app.route("/ty",methods=['GET', 'POST'])
def ty_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = ty_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建道长淘影解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建道长淘影线路错误:{realUrl}'})

@app.route("/qg",methods=['GET', 'POST'])
def qg_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = qg_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建七哥解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建线路错误:{realUrl}'})

@app.route("/ff",methods=['GET', 'POST'])
def ff_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = ff_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建扶风解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建扶风线路解析失败:{realUrl}'})


def checkParmas(single=False):
    args = {}
    if request.method == 'POST':
        args = request.json
    elif request.method == 'GET':
        args = request.args
    params = ['url','key']
    if need_secret or single:
        params.append('secret')
    for key in params:
        if not args.get(key):
            return jsonify({'url': '', 'code': -1, 'msg': f'缺少必传参数:{key}!'})
    url = args.get('url')
    key = args.get('key')
    secret = args.get('secret')
    if key != Akey:
        return jsonify({'url': '', 'code': -2, 'msg': f'请求失败，错误的key值'})
    if need_secret or single:
        newSecret = str(genSecret())
        if secret != newSecret:
            return jsonify({'url': '', 'code': -3, 'msg': f'请求失败，你{secret}无权访问此接口，仅限海阔视界用户使用,联系qq 434857{newSecret}'})
    return url

def xmly_jiexi(ts,muid):
    cookie = '_xmLog=h5&de87f56a-64f5-4a73-ba79-b75a7cecd4e3&process.env.sdkVersion; fds_otp=5312034439796635050; 1&remember_me=y; 1&_token=224172391&194E5D60340N09077D1C91309BE9E2832D019915FE1355322DBA364FB501021D60FAC6E51966248M8C77074ADBFFD88_; login_type=code_mobile; xm-page-viewid=ximalaya-web; x_xmly_traffic=utm_source%253A%2526utm_medium%253A%2526utm_campaign%253A%2526utm_content%253A%2526utm_term%253A%2526utm_from%253A; Hm_lvt_4a7d8ec50cfd6af753c4f8aee3425070=1648041209,1648041310; Hm_lpvt_4a7d8ec50cfd6af753c4f8aee3425070=1648041319'
    ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
    headers = {'User-Agent': ua, 'Cookie': cookie, 'Content-Type': 'application/x-www-form-urlencoded'}
    base_url = 'https://mobile.ximalaya.com/mobile-playpage/track/v3/baseInfo/'
    url = f'{base_url}{ts}?device=web&trackId={muid}'
    r = requests.get(url, headers=headers)
    return r.text

def checkXmly():
    args = {}
    if request.method == 'POST':
        args = request.json
    elif request.method == 'GET':
        args = request.args
    params = ['ts','muid']
    for key in params:
        if not args.get(key):
            return jsonify({'url': '', 'code': -1, 'msg': f'缺少必传参数:{key}!'})
    ts = args.get('ts')
    muid = args.get('muid')
    return ts,muid

@app.route("/xmly",methods=['GET', 'POST'])
def xmly_jx():
    ret = checkXmly()
    if type(ret) not in [str,list,tuple]:
        return ret
    ts, muid = ret
    if not any([ts,muid]):
        return {'url': '', 'code': 404, 'msg': f'未填写正确参数'}
    ret = xmly_jiexi(ts,muid)
    return jsonify(json.loads(ret))

def lmys_jiexi(url):
    playUrl = f'https://hikerfans.com/jx27/?url={url}'
    try:
        r = requests.get(playUrl,timeout=fast_time_out).json()
        return r.get('url') or ''
    except Exception as e:
        return f'错误:{e}'

@app.route("/lmys",methods=['GET', 'POST'])
def lmys_jx():
    url = checkParmas(True) # 蓝莓影视解析
    # if type(url) != str or not url.startswith('http'):
    if type(url) != str:
        return url
    elif not url or url.startswith('错误'):
        return jsonify({'url': '', 'code': -3, 'msg': f'自建蓝莓超强解析失败:{url}'})
    realUrl = lmys_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建蓝莓影视解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建蓝莓影视解析失败:{realUrl}'})

def lmys_jiexi_vip(url):
    playUrl = f'https://hikerfans.com/jx27/nbjx.php/?url={url}'
    try:
        r = requests.get(playUrl,timeout=fast_time_out).json()
        return r.get('url') or ''
    except Exception as e:
        return f'错误:{e}'

@app.route("/lmys-ltvip",methods=['GET', 'POST'])
def lmys_jx_vip():
    url = checkParmas(True) # 蓝莓影视解析
    # if type(url) != str or not url.startswith('http'):
    if type(url) != str:
        return url
    elif not url or url.startswith('错误'):
        return jsonify({'url': '', 'code': -3, 'msg': f'自建蓝莓超强解析失败:{url}'})
    realUrl = lmys_jiexi_vip(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建蓝莓超强解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建蓝莓超强解析失败:{realUrl}'})

def lm_dz_jiexi_svip(url):
    # resp = re.compile(url)
    global vflag
    vflag = '未知'
    def test(text):
        searchObj = re.search(rf'{text}', url, re.M | re.I)
        global vflag
        if searchObj:
            vflag = searchObj.group()
        return searchObj

    if test('iqiyi.com|youku.com|mgtv.com|sohu.com|ixigua.com|pptv.com|le.com|1905.com|fun.tv'):  #正版
        ret =  getUrl('https://hikerfans.com/jx27/jhjx.php/?url=',url)
    elif test('qq.com'): # 腾讯
        ret = getUrl('https://hikerfans.com/jx27/qq.php/?url=',url)
    elif test('miguvideo.com'):  # 咪咕
        ret =  getUrl('https://hikerfans.com/jx27/migu.php/?url=',url)
    elif test('bilibili.com'):  # 哔哩
        ret =  getUrl('https://hikerfans.com/jx27/bb.php/?url=',url)
    elif test('LT'): # 龙腾
        ret =  getUrl('https://hikerfans.com/jx27/ltjx.php/?url=',url)
        # ret =  getUrl('http://json.nokia.press/svip?key=daozhangyyds&url=',url)
    elif test('ruifenglb'): # 苍蓝
        ret = getUrl('https://hikerfans.com/jx27/cl.php/?url=',url)
    elif test('suoyo'): # 多多资源
        ret =  getUrl('https://hikerfans.com/jx27/duoduo.php/?url=',url)
    elif test('xfy'): # 旋风
        ret = getUrl('https://hikerfans.com/jx27/xfy.php/?url=',url)
    elif test('renrenmi'): # 人人线路
        ret =  getUrl('https://hikerfans.com/jx27/rrm.php/?url=',url)
    elif test('RongXingVR'): # 融兴
        ret =  getUrl('https://hikerfans.com/jx27/rx.php/?url=',url)
    elif test('xueren'):  # 雪人
        ret =  getUrl('https://hikerfans.com/jx27/xueren.php/?url=',url)
    elif test('wuduyun'):  # 五毒云
        ret =  getUrl('https://hikerfans.com/jx27/wudu.php/?url=',url)
    elif test('laodi'):  # 老弟
        ret =  getUrl('https://hikerfans.com/jx27/laodi.php/?url=',url)
    elif test('Naifeimi'):  # 奈非
        ret =  getUrl('https://hikerfans.com/jx27/naifei.php/?url=',url)
    elif test('daodm|XMMT|v020c'):  # 其他
        ret =  getUrl('https://hikerfans.com/jx27/qita.php/?url=',url)

    elif test('duoduozy|leduo'):
        ret =  f'错误:暂不支持的切片:{vflag}'
    else:
        ret =  f'错误:未知标志的链接:{url}'

    return ret,vflag

def dz_buy_jiexi_svip(url):
    # 道长买的解析
    global vflag
    vflag = '未知'
    def test(text):
        searchObj = re.search(rf'{text}', url, re.M | re.I)
        global vflag
        if searchObj:
            vflag = searchObj.group()
        return searchObj
    api = 'https://svip.daina.hk/api/?uid=11235&key=KUNQFsOGSHzKDtHe55&url='

    if test('iqiyi.com|youku.com|mgtv.com|sohu.com|ixigua.com|pptv.com|le.com|1905.com'):  #正版
        ret = getUrl(api, url)
    elif test('qq.com'): # 腾讯
        # ret = getUrl('http://jx.nokia.press/api6/tx-svip?key=daozhangyyds&url=',url)  #
        ret = tencent_jiexi(url)
    elif test('miguvideo.com'):  # 咪咕
        ret = getUrl('http://jx.nokia.press/api6/migu?key=daozhangyyds&url=',url)
    elif test('bilibili.com'):  # 哔哩
        ret = getUrl('http://jx.nokia.press/api6/bl?key=daozhangyyds&url=',url)
    elif test('LT|ruifenglb|suoyo|xfy|renrenmi|RongXingVR|xueren|wuduyun|laodi|Naifeimi'): # 常规切片
        ret = getUrl(api,url)
        # ret =  getUrl('http://json.nokia.press/svip?key=daozhangyyds&url=',url)
    elif test('daodm|XMMT|v020c'):  # 其他
        ret = getUrl('https://hikerfans.com/jx27/qita.php/?url=',url)

    elif test('duoduozy|leduo'):
        ret = f'错误:暂不支持的切片:{vflag}'
    else:
        ret = f'错误:未知标志的链接:{url}'

    return ret,vflag

def getUrl(jiexi,url):
    # 根据解析和url或者播放地址
    min_len = 10
    if len(url) < min_len:
        return f'错误:url参数太短,小于{min_len}，疑似非正常地址'
    playUrl = f'{jiexi}{url}'
    try:
        r = requests.get(playUrl, timeout=slow_time_out).json()
        return r.get('url') or ''
    except Exception as e:
        return f'错误:{e}'

@app.route("/dz-lm-svip",methods=['GET', 'POST'])
def lm_dz_jx_svip(check=True):
    url = checkParmas(check) # 蓝莓影视+道长自建万能解析
    if type(url) != str:
        return url
    elif not url or url.startswith('错误'):
        return jsonify({'url': '', 'code': -3, 'msg': f'自建万能解析失败:{url}'})
    realUrl,vflag = lm_dz_jiexi_svip(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建万能解析成功','from':vflag})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建万能解析失败:{realUrl}','from':vflag})

@app.route("/dz-lm-supersvip",methods=['GET', 'POST'])
def lm_dz_jx_ssvip():
    return lm_dz_jx_svip(False)

@app.route("/dz-buy-svip",methods=['GET', 'POST'])
def dz_buy_jx_svip(check=True):
    url = checkParmas(check) # 道长飞云万能解析
    if type(url) != str:
        return url
    elif not url or url.startswith('错误'):
        return jsonify({'url': '', 'code': -3, 'msg': f'道长万能解析失败:{url}'})
    realUrl,vflag = dz_buy_jiexi_svip(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'道长万能解析成功','from':vflag})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'道长万能解析失败:{realUrl}','from':vflag})

@app.route("/dz-buy-supersvip",methods=['GET', 'POST'])
def dz_buy_jx_ssvip():
    return dz_buy_jx_svip(False)

@app.route("/dz-lm-ssvip",methods=['GET', 'POST'])
def lm_dz_jx_ssvip_drop():
    realUrl = "http://42.192.233.141/v/3.mp4"
    url = checkParmas(False)  # 蓝莓影视+道长自建万能解析
    if type(url) != str:
        return url
    elif not url or url.startswith('错误'):
        return jsonify({'url': '', 'code': -3, 'msg': f'自建万能解析失败:{url}'})
    return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建万能解析成功:{realUrl}','from':'qq'})

@app.route("/rx",methods=['GET', 'POST'])
def rx_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = rx_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建融兴解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建融兴线路解析失败:{realUrl}'})

@app.route("/ixg",methods=['GET', 'POST'])
def ixg_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = ixg_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建爱西瓜解析成功'})
    else:
        realUrl = realUrl[:120] if len(realUrl)>120 else realUrl
        return jsonify({'url': '', 'code': -3, 'msg': f'自建爱西瓜线路解析失败:{realUrl}'})

@app.route("/ndkj",methods=['GET', 'POST'])
def ndkj_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = ndkj_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建你爹科技解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建你爹科技线路解析失败:{realUrl}'})

@app.route("/didi",methods=['GET', 'POST'])
def didi_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = didi_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建迪迪你爹科技解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建迪迪你爹科技线路解析失败:{realUrl}'})

@app.route("/nlql",methods=['GET', 'POST'])
def nlql_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = nlql_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建奈落麒麟解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建奈落麒麟线路解析失败:{realUrl}'})

@app.route("/zajh",methods=['GET', 'POST'])
def zajh_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = zajh_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建挚爱江湖解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建挚爱江湖D线路解析失败:{realUrl}'})

@app.route("/dd",methods=['GET', 'POST'])
def dd_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = dd_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建多多解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建多多线路解析失败:{realUrl}'})

def migu_jiexi(url):
    if not (url.find('cid=') > -1):
        return '未能获取链接中的cid'
    cid = re.search('cid=(\d+)',url,re.S).groups()[0]
    # print(cid)
    rateType = 4 # 4蓝光 2 540p 3 720p
    playUrl = f'https://webapi.miguvideo.com/gateway/playurl/v3/play/playurl?contId={cid}&rateType={rateType}'
    userToken = 'nlps205D581C20785BA7CA91' # token
    sign = '3AE29D360D7481D3B7FAFAC6DB05190E' # 签名
    expiredOn = '1664627709007' # 过期时间
    user_info = {"userId": "21437802", "userNum": "8618720012723", "mobile": "18720012723", "areaId": "791",
                 "cityId": "0795", "carrierCode": "CM", "passId": "3992895383478",
                 "userToken": userToken, "expiredOn": expiredOn}
    headers = {
        # 'Referer':'https://www.miguvideo.com/',
        'terminalId': 'www',
        # 'appId':'miguvideo',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        # 'userId':'21437802',
        'userInfo': json.dumps(user_info, ensure_ascii=True),
        'userToken': userToken,
        'sign': sign,
    }
    try:
        r = requests.get(playUrl, headers=headers).json()
        realUrl = r['body']['urlInfos'][0]['url']
        loader = runJs('咪咕直链.js')
        realUrl = loader.call('getRealUrl',realUrl)
        return realUrl
    except Exception as e:
        return f'{e}'

def js_test(text,origin):
    searchObj = re.search(rf'{text}', origin, re.M | re.I)
    return searchObj

def rx_tencent(vid):
    # RX大佬的腾讯解析，输入vid直接出链接
    infoUrl = f"https://service-2bc23q7g-1308088590.gz.apigw.tencentcs.com/release/TXSP?vid={vid}"
    try:
        r = requests.get(infoUrl,timeout=(2,2))
        code = r.text[1:-1].replace('\\','')
        # print(code)
        # ['vl']['vi'][0]['ul']['ui'][-1]['url']
        videos = json.loads(code)['vl']['vi'][0]['ul']['ui'][-1]
        # print(videos)
        pt = videos['hls']['pt']
        url = videos['url']
        realUrl = url + pt
        print(f'真实直链已经获取:{realUrl}')
        if js_test('.m3u8|.mp4', realUrl):
            return realUrl
        return f'发生错误:解析结果不正确:{realUrl}'
    except Exception as e:
        return f'发生错误:{e}'

def get_tx_vid_old(url):
    headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36',
    }
    r = requests.get(url, headers=headers, timeout=fast_time_out)
    ret = r.text
    mt1 = re.search("var vid = '(.*?)'", ret)
    mt2 = re.search(";vid=(.*?)&", ret)
    mt3 = re.search("&vid=(.*?)&", ret)
    mt4 = re.search('"srcid":"(.*?)"', ret)
    mt5 = re.search('vid":\["(.*?)"', ret)
    vid = mt1 or mt2 or mt3 or mt4 or mt5
    if not vid:
        return '获取失败,未能获取待解析视频的vid'
    vid = vid.groups()[0]
    print(f'成功匹配到vid:{vid}')
    return vid

def get_tx_vid_new(url):
    headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'user-agent': 'Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36',
    }
    def test(text):
        searchObj = re.search(rf'{text}', url, re.M | re.I)
        global vflag
        if searchObj:
            vflag = searchObj.group()
        return searchObj
    vid = None
    if url.find('v.qq.com/x/cover/')>-1:
        _type = url.split('v.qq.com/x/cover/')[1].split('.html')[0]
        if _type.find('/') > -1:
            vid = _type.split('/')[1]
        else:
            r = requests.get(url, headers=headers, timeout=fast_time_out)
            ret = r.text
            jump = unquote(ret.split("jumpData=")[1].split("\"")[0])
            # print(jump)
            vid = jump.split("vid=")[1].split("&")[0]
            # vid = ret.split("<link rel=\"canonical\" href=\"https://v.qq.com/x/cover/")[1].split("/")[1].split(".")[0]
    elif test('/page/(.*?).html'):
            vid = url.split("/page/")[1].split(".html")[0]
    elif test('&vid='):
            vid = url.split('&vid=')[1].split('&')[0]
    return vid

def tencent_jiexi(url):
    print(f'开始解析:{url}')
    if not url.find('v.qq.com') > -1:
        return '被解析地址错误!必须是腾讯的视频播放页地址'
    # lskey = "luin=o2235543283;uin=o2235543283;lskey=00030000579ec42cc27f35e3a549645f65e22cbf6c938c2958175855d07e7ad5497b2931d45e8e1226f26625;"
    # lskey = "vqq_vusession=-Lm6tIzEASV456N2Xx7P3w..;vqq_vuserid=406929409;vqq_appid=101795054;vqq_openid=40C8A00F7283A82EE50314AEDDF2936D;vqq_access_token=65179BF9819261D551A06E27458C942A;"
    # lskey = "luin=o0872298454;lskey="
    # lskey = "luin=o0872298454;lskey=000300008a547e8450ef9191818430e57d66cd10a850ad4a0e806b832bb76e4e96644985dcc8f6a8a35b97b3"
    lskey = "luin=o1640492349;uin=o1640492349;lskey=0003000025f29f694dee1bd2d016cefca933d5654c304447429321deefd1bc4c4fdcf4e37f9429ab2b054251"
    headers = {
        'Content-Type':'application/json;charset=utf-8',
        'user-agent':'Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36',
    }
    # vid = get_tx_vid_old(url)
    vid = get_tx_vid_new(url)
    if not vid:
        return '获取失败,未能获取待解析视频的vid'
    print(f'成功匹配到vid:{vid}')
    return rx_tencent(vid) # 调用rx的腾腾云，不讲武德
    pUrl = 'https://vv.video.qq.com/getinfo'
    # pUrl = 'https://vv.video.qq.com/getvinfo'
    infoUrl = f'{pUrl}?defn=fhd&platform=10801&otype=ojson&sdtfrom=v4138&appVer=7&vid={vid}&newnettype=1&fhdswitch=1&show1080p=1&dtype=3&sphls=2'
    print(f'播放地址获取链接:{infoUrl}')
    headers.update({
        'cookie':lskey,
        'user-agent':'qqlive',
    })
    try:
        r = requests.get(infoUrl,headers=headers,timeout=(2,2)).json()
        # print(r)
        # if r.get('tstid'):
        #     return f'发生错误:无法解析付费视频'
        realUrl = r['vl']['vi'][0]['ul']['ui'][-1]['url']
        print(r['fl']['fi'][-1]['cname'])
        print(f'真实直链已经获取:{realUrl}')
        if js_test('.m3u8|.mp4',realUrl):
            return realUrl
        return f'发生错误:解析结果不正确:{realUrl}'
    except Exception as e:
        return f'发生错误:{e}'

@app.route("/migu",methods=['GET', 'POST'])
def migu_jx():
    url = checkParmas()
    if type(url) != str or not url.startswith('http'):
        return url
    realUrl = migu_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建咪咕解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建咪咕线路解析失败:{realUrl}'})

@app.route("/tx",methods=['GET', 'POST'])
def tencent_jx(check=True):
    url = checkParmas(check)
    if type(url) != str:
        return url
    elif not url or url.startswith('错误'):
        return jsonify({'url': '', 'code': -3, 'msg': f'自建腾讯解析失败:{url}'})
    realUrl = tencent_jiexi(url)
    if realUrl.startswith('http'):
        return jsonify({'url': realUrl, 'code': 0, 'msg': f'自建腾讯解析成功'})
    else:
        return jsonify({'url': '', 'code': -3, 'msg': f'自建腾讯线路解析失败:{realUrl}'})

@app.route("/tx-svip",methods=['GET', 'POST'])
def tencent_svip_jx():
    return tencent_jx(False)

def test():
    # https://api.bilibili.com/x/player/playurl?cid=433273496&qn=0&type=&otype=json&fourk=1&bvid=BV1eR4y1775P&fnver=0&fnval=976&session=6c7de40a2214d38229cf9d9d6ea05bc1
    # realUrl = dlgw_jx('https://www.iqiyi.com/v_1zp7qgh23kg.html','http://b2.22web.org/jx/index.php')
    # realUrl = dlgw_jx('https://www.iqiyi.com/v_1zp7qgh23kg.html','http://q16.22web.org/api.php')
    # print(realUrl)
    realUrl = bljiexi('https://www.bilibili.com/video/av336348663')
    print(realUrl)
    print(ysgc_jiexi())
    print(qg_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    t1 = time.time()
    print(qg_jiexi('https://www.mgtv.com/b/372061/12193558.html'))
    print(time.time() - t1)
    print(ff_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    print(rx_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    print(rx_jiexi('https://v.youku.com/v_show/id_XNTE4NTgxMTY2MA==.html'))
    print(dd_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    print(mx_jiexi())
    print(nlql_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    print(rx_jiexi('https://www.bilibili.com/bangumi/play/ss33434'))
    zajh_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html')
    zajh_jiexi('https://www.mgtv.com/b/363286/14295823.html')
    print(zajh_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    print(didi_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    print(ixg_jiexi('https://www.ixigua.com/6696046514952733188'))
    print(qldz_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    # print(ixg_jiexi('https://www.ixigua.com/6853724975560393230?id=6853791252623098382'))
    # print(ixg_jiexi('https://www.ixigua.com/6915961845761180173?id=6915961900954518024&logTag=f2c38973312e75e61f55'))
    # print(ixg_jiexi('https://www.ixigua.com/6963491699926499871?utm_source=douban'))
    # print(ixg_jiexi('https://www.ixigua.com/cinema/album/8ioRGnodMOb?utm_source=douban'))
    # print(getCid('https://www.bilibili.com/video/av336348663'))
    # print(getCid('https://www.bilibili.com/bangumi/play/ss33434'))
    # print(getCid('https://www.bilibili.com/bangumi/play/ep424178'))
    # print(bljiexi('https://www.bilibili.com/bangumi/play/ep424178'))
    # print(bljiexi('https://www.bilibili.com/bangumi/play/ss33434',appkey,access_key))
    # print(bljiexi('https://www.bilibili.com/video/av336348663'))
    # getEpUrl('https://www.bilibili.com/bangumi/play/ss33434')
    # print(bljiexi(getEpUrl('https://www.bilibili.com/bangumi/play/ss33434')))
    # print(bljiexi('https://m.bilibili.com/bangumi/play/ep424328?bsource=douban',appkey,access_key))

    # print(ixg_jiexi('https://www.ixigua.com/6696046514952733188'))
    # zajh_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html')
    # test()
    # vipUrl = 'https://www.ixigua.com/cinema/album/8eX4G587lr2?utm_source=douban'
    # jxUrl = ysgc_jiexi()
    # if jxUrl.startswith('http'):
    #     print(jxUrl)
    # print(jxUrl+vipUrl)
    # print(ql_jiexi()+'https://www.iqiyi.com/v_2bc8tk8r6ug.html')

def handler(environ, start_response):
    # 阿里云专业云函数
    return app(environ, start_response)

def test2(text,url):
    searchObj = re.search(rf'{text}', url, re.M | re.I)
    global vflag
    if searchObj:
        vflag = searchObj.group()
        print(vflag)
    return searchObj

if __name__ == '__main__':
    # print(test2('/page/(.*?).html','/page/c0041h9gzv9.html'))
    # print(genSecret())
    # print(mx_jiexi())

    # print(bljiexi('https://www.bilibili.com/video/av336348663'))
    # print(bljiexi('https://www.bilibili.com/bangumi/play/ep424178'))
    # print(bljiexi('https://www.bilibili.com/bangumi/play/ep381217'))
    # print(bljiexi('https://www.bilibili.com/bangumi/play/ss33434',appkey,access_key))
    # print(tencent_jiexi('https://v.qq.com/x/cover/mzc002005oxij54.html'))
    # print(tencent_jiexi('https://v.qq.com/x/cover/mzc002005oxij54/y0043hamjnu.html'))
    app.run(host="0.0.0.0", port=9000)

    # print(lm_dz_jiexi_svip('renrenmi-'))

    # print(xmftp_jiexi('https://a.y8j5.top/s/Vgo9yuz'))
    # print(qldz_jiexi('https://www.iqiyi.com/v_2bc8tk8r6ug.html'))
    # t1 = time.time()
    # loader = runJs('parse.js')
    # parseid = loader.call('MD5', '123456')
    # parseid = loader.call('tools.nowDate', '')
    # parseid = loader.call('tools.toJSON', {"a":'12334'})
    # parseid = loader.call('tools.toVNum', '31.002313')
    # print(parseid)
    # t2 = time.time()
    # print(t2-t1)
    # loader = runJs('咪咕直链.js')
    # url = loader.call('getRealUrl','http://gslbmgspvod.miguvideo.com/depository_yqv/asset/zhengshi/5103/516/639/5103516639/media/5103516639_5011250523_92.mp4.m3u8?msisdn=18720012723&mdspid=&spid=800033&netType=0&sid=5700135348&pid=2028597139&timestamp=20211231110100&Channel_ID=0116_25000000-99000-100300010010001&ProgramID=718211640&ParentNodeID=-99&assertID=5700135348&client_ip=110.191.252.123&SecurityKey=20211231110100&mvid=5103516639&mcid=1001&mpid=130000159472&playurlVersion=SJ-A1-4.12.2.1-RELEASE&userid=21437802&jmhm=18720012723&videocodec=h264&bean=mgspwww&puData=06f3cdcb60d65bcff2701a787779efaa')
    # print(url)
    # migu_jiexi('https://www.miguvideo.com/mgs/website/prd/detail.html?cid=718211640')

    # tencent_jiexi('https://v.qq.com/x/cover/m441e3rjq9kwpsc/p0040gim4fz.html')
    # tencent_jiexi('https://v.qq.com/x/cover/mzc0020020cyvqh/c0041h9gzv9.html')
