from datetime import datetime, timedelta

from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/fetch/')
def fetchdata():
    session = requests.session()
    session.get('https://archive.org/account/login.php')
    post_data = {'username': 'contact@aoswebsolutions.com',
                 'password': '##########',
                 'action': 'login'}
    headers = {'User-Agent': 'Mozilla/5.0'}
    session.post(
        'https://archive.org/account/login.php',
        data=post_data, headers=headers)

    inittime = datetime.strptime(request.args['inittime'], '%Y-%m-%d')
    endtime = datetime.strptime(request.args['endtime'], '%Y-%m-%d')
    counter = 0
    result = {}
    while endtime >= inittime + timedelta(days=counter):
        w_publicdate = '>%s AND <%s' % (
            datetime.strftime(inittime + timedelta(days=counter), '%Y-%m-%d'),
            datetime.strftime(inittime + timedelta(days=counter + 1), '%Y-%m-%d'))
        url = 'http://archive.org/metamgr.php?fs_imagecount=on&fs_size=on&w_mediatype=web&w_collection={p[collection]}*&w_publicdate={s}&mode=more&output_format=json&lim=0'.format(
            p=request.args, s=w_publicdate)
        data = session.get(url).json()
        print url, data
        imgcount = size = 0
        if data:
            for row in data['rows']:
                imgcount += row[0] or 0
                size += row[1] or 0
        result[datetime.strftime(inittime + timedelta(days=counter), '%Y-%m-%d')] = [imgcount, size]
        counter += 1
    return json.dumps(result)
