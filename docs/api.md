---
title: connpass API v2
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: false
highlight_theme: darkula
headingLevel: 2

---

このドキュメントはconnpass API v2のopenapi定義を元に生成したドキュメントです。
AIコード生成用にリポジトリに入れていますが、実際のAPIドキュメントは[こちら](https://connpass.com/about/api/v2/)をご覧ください。

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="connpass-api">connpass API v2</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# 概要
このドキュメントでは connpass API について説明します。

## API利用方法

APIの利用に伴う料金・プランや利用規約につきましてはこちらの [ヘルプページ](https://help.connpass.com/api/) をご覧ください。

## 認証
すべてのAPIエンドポイントでは、APIキーによる認証が必須です。

API利用申請後に発行されるAPIキーを、HTTPリクエストヘッダー `X-API-Key` に指定してください。

例：
```
curl -X GET "https://connpass.com/api/v2/events/?keyword=python" \
-H "X-API-Key: CPaVAKNa.6u0RBKOm2F462P4vDHln8IR2MW5PhR493cFH6UbKyE8OqbsBfEk4p6FF"
```

認証に失敗した場合、HTTPステータスコード `401 Unauthorized` が返されます。

APIキーを紛失した場合や、第三者に漏洩した可能性がある場合は、速やかに再発行をご依頼ください。

## アクセス制限
APIキーごとに、「1秒間に1リクエストまで」 のリクエスト制限 (スロットリング) を設けています。

この制限を超過すると、HTTPステータスコード `429 Too Many Requests` が返されます。

また、提供されているAPI以外の手段（自動化の有無にかかわらず）で、当サービスへクローリング、スクレイピング、その他のアクセスを行う、または試みる行為は、[利用規約](https://connpass.com/term/) により禁止されています。

## API v1 から v2 への移行

[connpass API v1](https://connpass.com/about/api/v1/) は今後非推奨となり、2025年末に廃止される予定です。

API v1とv2の間では、認証方式や入出力仕様の変更が加えられているため、既存のクライアントコードには変更が必要です。

このドキュメントでは、v1からv2への移行にあたり考慮すべき変更点を整理しています。v1は今後非推奨となり、2025年末に廃止される予定であるため、以下に示す内容をもとに、各システムで必要なマイグレーション対応を計画・実施してください。

### 変更点概要

#### 認証の導入

- すべてのAPIエンドポイントで、APIキーによる認証が必須となりました
- そのため、固定IPからの接続が不要となりました
- 詳細は「[認証](#section/概要/認証)」セクションを参照してください

#### アクセス制限の導入

- 各APIキーごとにアクセス制限(スロットリング)が適用されるようになりました
- 詳細は[「アクセス制限」](#section/概要/アクセス制限)セクションを参照してください

#### エンドポイントの変更

- ルートURLが v2 用に変更されました (`/api/v1/` → `/api/v2/`)
- コレクション名が単数形から複数形に変更されました (例: `event` → `events`)

#### パラメーター名・レスポンスフィールド名の整理

- 冗長・旧名称のフィールドを、簡潔・現在の仕様に合わせた名称に変更しました (例: `event_id` → `id`, `series` → `group`)

---

### 各APIの変更点詳細

#### イベント一覧API

- エンドポイント：
  - `/api/v1/event/` → `/api/v2/events/`
- リクエストパラメーター：
  - `series_id` → `group_id`
- レスポンスフィールド：
  - `event_id` → 削除 (代わりに `id` を使用)
  - `event_url` → 削除 (代わりに `url` を使用)
  - `series` → `group`

#### イベント資料API

- エンドポイント：
  - `/api/v1/event/{id}/presentation` → `/api/v2/events/{id}/presentations`

#### グループ一覧API

- エンドポイント：
  - `/api/v1/group/` → `/api/v2/groups/`

#### ユーザー一覧API

- エンドポイント：
  - `/api/v1/user/` → `/api/v2/users/`
- レスポンスフィールド：
  - `user_id` → `id`
  - `user_url` → `url`
  - `user_image_url` → `image_url`

#### ユーザー所属グループAPI

- エンドポイント：
  - `/api/v1/user/{nickname}/group/` → `/api/v2/users/{nickname}/groups/`

#### ユーザー参加イベントAPI

- エンドポイント：
  - `/api/v1/user/{nickname}/attended_event/` → `/api/v2/users/{nickname}/attended_events/`
- レスポンスフィールド：
  - `event_id` → 削除 (代わりに `id` を使用)
  - `event_url` → 削除 (代わりに `url` を使用)

  - `series` → `group`

#### ユーザー発表イベントAPI

- エンドポイント：
  - `/api/v1/user/{nickname}/presenter_event/` → `/api/v2/users/{nickname}/presenter_events/`
- レスポンスフィールド：
  - `event_id` → 削除 (代わりに `id` を使用)
  - `event_url` → 削除 (代わりに `url` を使用)
  - `series` → `group`

Base URLs:

# Authentication

* API Key (APIKeyAuth)
    - Parameter Name: **X-API-Key**, in: header. API利用申請後に発行されるAPIキーを、HTTPリクエストヘッダーに指定してください。

<h1 id="connpass-api--">イベント</h1>

## 一覧

<a id="opIdconnpass_event_event_api_v2_views_event_search"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /api/v2/events/ \
  -H 'Accept: application/json' \
  -H 'X-API-Key: API_KEY'

```

```http
GET /api/v2/events/ HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'X-API-Key':'API_KEY'
};

fetch('/api/v2/events/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'X-API-Key' => 'API_KEY'
}

result = RestClient.get '/api/v2/events/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'X-API-Key': 'API_KEY'
}

r = requests.get('/api/v2/events/', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'X-API-Key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/v2/events/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/v2/events/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "X-API-Key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/v2/events/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v2/events/`

検索クエリの条件に応じたイベント一覧を取得する。

パラメータを複数指定する場合は、`name=value1&name=value2&...` または `name=value1,value2...` のように指定できます。

<h3 id="一覧-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|event_id|query|array[integer]|false|イベント毎に割り当てられた番号で検索します。複数指定可能です。|
|keyword|query|array[string]|false|イベントのタイトル、キャッチ、概要、住所をAND条件部分一致で検索します。複数指定可能です。|
|keyword_or|query|array[string]|false|イベントのタイトル、キャッチ、概要、住所をOR条件部分一致で検索します。複数指定可能です。|
|ym|query|array[string]|false|指定した年月に開催されているイベントを検索します。複数指定可能です。|
|ymd|query|array[string]|false|指定した年月日に開催されているイベントを検索します。複数指定可能です。|
|nickname|query|array[string]|false|指定したニックネームのユーザが参加しているイベントを検索します。複数指定可能です。|
|owner_nickname|query|array[string]|false|指定したニックネームのユーザが管理しているイベントを検索します。複数指定可能です。|
|group_id|query|array[integer]|false|グループ 毎に割り当てられた番号で、ひもづいたイベントを検索します。複数指定可能です。|
|subdomain|query|array[string]|false|グループ 毎に割り当てられたサブドメインで、ひもづいたイベントを検索します。複数指定可能です。|
|prefecture|query|array[string]|false|指定した都道府県で開催されているイベントを検索します。複数指定可能です。|
|order|query|integer|false|検索結果の表示順を、更新日時順、開催日時順、新着順で指定します。|
|start|query|integer|false|検索結果の何件目から出力するかを指定します。|
|count|query|integer|false|検索結果の最大出力データ数を指定します。|

#### Detailed descriptions

**event_id**: イベント毎に割り当てられた番号で検索します。複数指定可能です。

URLが `https://connpass.com/event/364/` のイベントの場合、イベントIDは `364` になります。

**ym**: 指定した年月に開催されているイベントを検索します。複数指定可能です。

`yyyymm` 形式。

**ymd**: 指定した年月日に開催されているイベントを検索します。複数指定可能です。

`yyyymmdd` 形式。

**group_id**: グループ 毎に割り当てられた番号で、ひもづいたイベントを検索します。複数指定可能です。

URLが `https://connpass.com/series/1/` のグループの場合、グループIDは `1` になります

**subdomain**: グループ 毎に割り当てられたサブドメインで、ひもづいたイベントを検索します。複数指定可能です。

URLが `https://bpstudy.connpass.com/` のグループの場合、サブドメインは `bpstudy` になります

**prefecture**: 指定した都道府県で開催されているイベントを検索します。複数指定可能です。

* `online`:  オンライン
* `hokkaido`:  北海道
* `aomori`:  青森県
* `iwate`:  岩手県
* `miyagi`:  宮城県
* `akita`:  秋田県
* `yamagata`:  山形県
* `fukushima`:  福島県
* `ibaraki`:  茨城県
* `tochigi`:  栃木県
* `gunma`:  群馬県
* `saitama`:  埼玉県
* `chiba`:  千葉県
* `tokyo`:  東京都
* `kanagawa`:  神奈川県
* `yamanashi`:  山梨県
* `nagano`:  長野県
* `niigata`:  新潟県
* `toyama`:  富山県
* `ishikawa`:  石川県
* `fukui`:  福井県
* `gifu`:  岐阜県
* `shizuoka`:  静岡県
* `aichi`:  愛知県
* `mie`:  三重県
* `shiga`:  滋賀県
* `kyoto`:  京都府
* `osaka`:  大阪府
* `hyogo`:  兵庫県
* `nara`:  奈良県
* `wakayama`:  和歌山県
* `tottori`:  鳥取県
* `shimane`:  島根県
* `okayama`:  岡山県
* `hiroshima`:  広島県
* `yamaguchi`:  山口県
* `tokushima`:  徳島県
* `kagawa`:  香川県
* `ehime`:  愛媛県
* `kochi`:  高知県
* `fukuoka`:  福岡県
* `saga`:  佐賀県
* `nagasaki`:  長崎県
* `kumamoto`:  熊本県
* `oita`:  大分県
* `miyazaki`:  宮崎県
* `kagoshima`:  鹿児島県
* `okinawa`:  沖縄県

**order**: 検索結果の表示順を、更新日時順、開催日時順、新着順で指定します。

* `1`: 更新日時順
* `2`: 開催日時順
* `3`: 新着順

> Example responses

> 200 Response

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "events": [
    {
      "id": 364,
      "title": "BPStudy#56",
      "catch": "株式会社ビープラウドが主催するWeb系技術討論の会",
      "description": "今回は「Python プロフェッショナル　プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。",
      "url": "https://bpstudy.connpass.com/event/364/",
      "image_url": "string",
      "hash_tag": "bpstudy",
      "started_at": "2012-04-17T18:30:00+09:00",
      "ended_at": "2012-04-17T20:30:00+09:00",
      "limit": 80,
      "event_type": "participation",
      "open_status": "open",
      "group": {
        "id": 1,
        "subdomain": "bpstudy",
        "title": "BPStudy",
        "url": "https://bpstudy.connpass.com/"
      },
      "address": "東京都豊島区東池袋3-1-1",
      "place": "BPオフィス (サンシャイン60 45階)",
      "lat": "35.729402000000",
      "lon": "139.718209000000",
      "owner_id": 8,
      "owner_nickname": "haru860",
      "owner_display_name": "佐藤 治夫",
      "accepted": 80,
      "waiting": 15,
      "updated_at": "2012-03-20T12:07:32+09:00"
    }
  ]
}
```

<h3 id="一覧-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[EventListResponseSchema](#schemaeventlistresponseschema)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
APIKeyAuth
</aside>

## 資料

<a id="opIdconnpass_event_event_api_v2_views_event_presentation"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /api/v2/events/{id}/presentations/ \
  -H 'Accept: application/json' \
  -H 'X-API-Key: API_KEY'

```

```http
GET /api/v2/events/{id}/presentations/ HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'X-API-Key':'API_KEY'
};

fetch('/api/v2/events/{id}/presentations/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'X-API-Key' => 'API_KEY'
}

result = RestClient.get '/api/v2/events/{id}/presentations/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'X-API-Key': 'API_KEY'
}

r = requests.get('/api/v2/events/{id}/presentations/', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'X-API-Key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/v2/events/{id}/presentations/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/v2/events/{id}/presentations/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "X-API-Key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/v2/events/{id}/presentations/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v2/events/{id}/presentations/`

イベントに投稿された資料一覧を取得できます。

<h3 id="資料-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|指定したイベントIDのオブジェクトを取得します。|
|start|query|integer|false|検索結果の何件目から出力するかを指定します。|
|count|query|integer|false|検索結果の最大出力データ数を指定します。|

#### Detailed descriptions

**id**: 指定したイベントIDのオブジェクトを取得します。

URLが `https://connpass.com/event/364/` のイベントの場合、イベントIDは `364` になります。

> Example responses

> 200 Response

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "presentations": [
    {
      "user": {
        "id": 8,
        "nickname": "haru860"
      },
      "url": "https://togetter.com/li/294875",
      "name": "Togetterまとめ",
      "presenter": {
        "id": 8,
        "nickname": "haru860"
      },
      "presentation_type": "blog",
      "created_at": "2012-04-29T19:44:03+09:00"
    }
  ]
}
```

<h3 id="資料-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[PresentationListResponseSchema](#schemapresentationlistresponseschema)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
APIKeyAuth
</aside>

<h1 id="connpass-api--">グループ</h1>

## 一覧

<a id="opIdconnpass_group_group_api_v2_views_group_search"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /api/v2/groups/ \
  -H 'Accept: application/json' \
  -H 'X-API-Key: API_KEY'

```

```http
GET /api/v2/groups/ HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'X-API-Key':'API_KEY'
};

fetch('/api/v2/groups/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'X-API-Key' => 'API_KEY'
}

result = RestClient.get '/api/v2/groups/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'X-API-Key': 'API_KEY'
}

r = requests.get('/api/v2/groups/', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'X-API-Key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/v2/groups/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/v2/groups/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "X-API-Key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/v2/groups/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v2/groups/`

検索クエリの条件に応じたグループ一覧を取得できます。

パラメータを複数指定する場合は、`name=value1&name=value2&...` または `name=value1,value2...` のように指定できます。

<h3 id="一覧-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|subdomain|query|array[string]|false|指定したサブドメインのグループを取得します。複数指定可能です(最大100件)。|
|start|query|integer|false|検索結果の何件目から出力するかを指定します。|
|count|query|integer|false|検索結果の最大出力データ数を指定します。|

> Example responses

> 200 Response

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "groups": [
    {
      "id": 1,
      "subdomain": "bpstudy",
      "title": "BPStudy",
      "sub_title": "株式会社ビープラウドが主催するIT勉強会",
      "url": "https://bpstudy.connpass.com/",
      "description": "string",
      "owner_text": "株式会社ビープラウド",
      "image_url": "string",
      "website_url": "http://www.beproud.jp/",
      "website_name": "株式会社ビープラウド",
      "twitter_username": "bpstudy",
      "facebook_url": "https://www.facebook.com/beproud.inc",
      "member_users_count": "5743"
    }
  ]
}
```

<h3 id="一覧-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[GroupListResponseSchema](#schemagrouplistresponseschema)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
APIKeyAuth
</aside>

<h1 id="connpass-api--">ユーザー</h1>

## 一覧

<a id="opIdconnpass_account_account_api_v2_views_user_search"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /api/v2/users/ \
  -H 'Accept: application/json' \
  -H 'X-API-Key: API_KEY'

```

```http
GET /api/v2/users/ HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'X-API-Key':'API_KEY'
};

fetch('/api/v2/users/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'X-API-Key' => 'API_KEY'
}

result = RestClient.get '/api/v2/users/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'X-API-Key': 'API_KEY'
}

r = requests.get('/api/v2/users/', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'X-API-Key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/v2/users/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/v2/users/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "X-API-Key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/v2/users/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v2/users/`

検索クエリの条件に応じたユーザー一覧を取得できます。

パラメータを複数指定する場合は、`name=value1&name=value2&...` または `name=value1,value2...` のように指定できます。

<h3 id="一覧-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|nickname|query|array[string]|false|指定したニックネームのユーザを検索します。複数指定可能です(最大100件)。|
|start|query|integer|false|検索結果の何件目から出力するかを指定します。|
|count|query|integer|false|検索結果の最大出力データ数を指定します。|

> Example responses

> 200 Response

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "users": [
    {
      "id": 8,
      "nickname": "haru860",
      "display_name": "佐藤 治夫",
      "description": "株式会社ビープラウド代表取締役。connpass企画・開発・運営。\nhttp://twitter.com/haru860\nhttp://shacho.beproud.jp/",
      "url": "https://connpass.com/user/haru860/",
      "image_url": "string",
      "created_at": "2011-10-20T18:23:03+09:00",
      "attended_event_count": 261,
      "organize_event_count": 231,
      "presenter_event_count": 34,
      "bookmark_event_count": 57
    }
  ]
}
```

<h3 id="一覧-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[UserListResponseSchema](#schemauserlistresponseschema)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
APIKeyAuth
</aside>

## 所属グループ

<a id="opIdconnpass_account_account_api_v2_views_user_group"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /api/v2/users/{nickname}/groups/ \
  -H 'Accept: application/json' \
  -H 'X-API-Key: API_KEY'

```

```http
GET /api/v2/users/{nickname}/groups/ HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'X-API-Key':'API_KEY'
};

fetch('/api/v2/users/{nickname}/groups/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'X-API-Key' => 'API_KEY'
}

result = RestClient.get '/api/v2/users/{nickname}/groups/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'X-API-Key': 'API_KEY'
}

r = requests.get('/api/v2/users/{nickname}/groups/', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'X-API-Key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/v2/users/{nickname}/groups/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/v2/users/{nickname}/groups/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "X-API-Key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/v2/users/{nickname}/groups/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v2/users/{nickname}/groups/`

ユーザーが所属しているグループ一覧を取得できます。

<h3 id="所属グループ-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|nickname|path|string|true|指定したニックネームのユーザを検索します。|
|start|query|integer|false|検索結果の何件目から出力するかを指定します。|
|count|query|integer|false|検索結果の最大出力データ数を指定します。|

> Example responses

> 200 Response

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "groups": [
    {
      "id": 1,
      "subdomain": "bpstudy",
      "title": "BPStudy",
      "sub_title": "株式会社ビープラウドが主催するIT勉強会",
      "url": "https://bpstudy.connpass.com/",
      "description": "string",
      "owner_text": "株式会社ビープラウド",
      "image_url": "string",
      "website_url": "http://www.beproud.jp/",
      "website_name": "株式会社ビープラウド",
      "twitter_username": "bpstudy",
      "facebook_url": "https://www.facebook.com/beproud.inc",
      "member_users_count": "5743"
    }
  ]
}
```

<h3 id="所属グループ-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[GroupListResponseSchema](#schemagrouplistresponseschema)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
APIKeyAuth
</aside>

## 参加イベント

<a id="opIdconnpass_account_account_api_v2_views_user_attended_event"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /api/v2/users/{nickname}/attended_events/ \
  -H 'Accept: application/json' \
  -H 'X-API-Key: API_KEY'

```

```http
GET /api/v2/users/{nickname}/attended_events/ HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'X-API-Key':'API_KEY'
};

fetch('/api/v2/users/{nickname}/attended_events/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'X-API-Key' => 'API_KEY'
}

result = RestClient.get '/api/v2/users/{nickname}/attended_events/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'X-API-Key': 'API_KEY'
}

r = requests.get('/api/v2/users/{nickname}/attended_events/', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'X-API-Key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/v2/users/{nickname}/attended_events/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/v2/users/{nickname}/attended_events/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "X-API-Key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/v2/users/{nickname}/attended_events/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v2/users/{nickname}/attended_events/`

ユーザーが参加したイベント一覧を取得できます。

<h3 id="参加イベント-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|nickname|path|string|true|指定したニックネームのユーザを検索します。|
|start|query|integer|false|検索結果の何件目から出力するかを指定します。|
|count|query|integer|false|検索結果の最大出力データ数を指定します。|

> Example responses

> 200 Response

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "events": [
    {
      "id": 364,
      "title": "BPStudy#56",
      "catch": "株式会社ビープラウドが主催するWeb系技術討論の会",
      "description": "今回は「Python プロフェッショナル　プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。",
      "url": "https://bpstudy.connpass.com/event/364/",
      "image_url": "string",
      "hash_tag": "bpstudy",
      "started_at": "2012-04-17T18:30:00+09:00",
      "ended_at": "2012-04-17T20:30:00+09:00",
      "limit": 80,
      "event_type": "participation",
      "open_status": "open",
      "group": {
        "id": 1,
        "subdomain": "bpstudy",
        "title": "BPStudy",
        "url": "https://bpstudy.connpass.com/"
      },
      "address": "東京都豊島区東池袋3-1-1",
      "place": "BPオフィス (サンシャイン60 45階)",
      "lat": "35.729402000000",
      "lon": "139.718209000000",
      "owner_id": 8,
      "owner_nickname": "haru860",
      "owner_display_name": "佐藤 治夫",
      "accepted": 80,
      "waiting": 15,
      "updated_at": "2012-03-20T12:07:32+09:00"
    }
  ]
}
```

<h3 id="参加イベント-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[EventListResponseSchema](#schemaeventlistresponseschema)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
APIKeyAuth
</aside>

## 発表イベント

<a id="opIdconnpass_account_account_api_v2_views_user_presenter_event"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /api/v2/users/{nickname}/presenter_events/ \
  -H 'Accept: application/json' \
  -H 'X-API-Key: API_KEY'

```

```http
GET /api/v2/users/{nickname}/presenter_events/ HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json',
  'X-API-Key':'API_KEY'
};

fetch('/api/v2/users/{nickname}/presenter_events/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json',
  'X-API-Key' => 'API_KEY'
}

result = RestClient.get '/api/v2/users/{nickname}/presenter_events/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json',
  'X-API-Key': 'API_KEY'
}

r = requests.get('/api/v2/users/{nickname}/presenter_events/', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
    'X-API-Key' => 'API_KEY',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/api/v2/users/{nickname}/presenter_events/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/api/v2/users/{nickname}/presenter_events/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
        "X-API-Key": []string{"API_KEY"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/api/v2/users/{nickname}/presenter_events/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /api/v2/users/{nickname}/presenter_events/`

ユーザーが発表したイベント一覧を取得できます。

<h3 id="発表イベント-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|nickname|path|string|true|指定したニックネームのユーザを検索します。|
|start|query|integer|false|検索結果の何件目から出力するかを指定します。|
|count|query|integer|false|検索結果の最大出力データ数を指定します。|

> Example responses

> 200 Response

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "events": [
    {
      "id": 364,
      "title": "BPStudy#56",
      "catch": "株式会社ビープラウドが主催するWeb系技術討論の会",
      "description": "今回は「Python プロフェッショナル　プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。",
      "url": "https://bpstudy.connpass.com/event/364/",
      "image_url": "string",
      "hash_tag": "bpstudy",
      "started_at": "2012-04-17T18:30:00+09:00",
      "ended_at": "2012-04-17T20:30:00+09:00",
      "limit": 80,
      "event_type": "participation",
      "open_status": "open",
      "group": {
        "id": 1,
        "subdomain": "bpstudy",
        "title": "BPStudy",
        "url": "https://bpstudy.connpass.com/"
      },
      "address": "東京都豊島区東池袋3-1-1",
      "place": "BPオフィス (サンシャイン60 45階)",
      "lat": "35.729402000000",
      "lon": "139.718209000000",
      "owner_id": 8,
      "owner_nickname": "haru860",
      "owner_display_name": "佐藤 治夫",
      "accepted": 80,
      "waiting": 15,
      "updated_at": "2012-03-20T12:07:32+09:00"
    }
  ]
}
```

<h3 id="発表イベント-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|[EventListResponseSchema](#schemaeventlistresponseschema)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
APIKeyAuth
</aside>

# Schemas

<h2 id="tocS_EventSearchRequestSchema">EventSearchRequestSchema</h2>
<!-- backwards compatibility -->
<a id="schemaeventsearchrequestschema"></a>
<a id="schema_EventSearchRequestSchema"></a>
<a id="tocSeventsearchrequestschema"></a>
<a id="tocseventsearchrequestschema"></a>

```json
{
  "event_id": [
    0
  ],
  "keyword": [
    "string"
  ],
  "keyword_or": [
    "string"
  ],
  "ym": "201204",
  "ymd": "20120406",
  "nickname": [
    "string"
  ],
  "owner_nickname": [
    "string"
  ],
  "group_id": 1,
  "subdomain": "bpstudy",
  "prefecture": "online",
  "order": 1
}

```

EventSearchRequestSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_id|[integer]|false|none|イベント毎に割り当てられた番号で検索します。複数指定可能です。<br><br>URLが `https://connpass.com/event/364/` のイベントの場合、イベントIDは `364` になります。|
|keyword|[string]|false|none|イベントのタイトル、キャッチ、概要、住所をAND条件部分一致で検索します。複数指定可能です。|
|keyword_or|[string]|false|none|イベントのタイトル、キャッチ、概要、住所をOR条件部分一致で検索します。複数指定可能です。|
|ym|[string]|false|none|指定した年月に開催されているイベントを検索します。複数指定可能です。<br><br>`yyyymm` 形式。|
|ymd|[string]|false|none|指定した年月日に開催されているイベントを検索します。複数指定可能です。<br><br>`yyyymmdd` 形式。|
|nickname|[string]|false|none|指定したニックネームのユーザが参加しているイベントを検索します。複数指定可能です。|
|owner_nickname|[string]|false|none|指定したニックネームのユーザが管理しているイベントを検索します。複数指定可能です。|
|group_id|[integer]|false|none|グループ 毎に割り当てられた番号で、ひもづいたイベントを検索します。複数指定可能です。<br><br>URLが `https://connpass.com/series/1/` のグループの場合、グループIDは `1` になります|
|subdomain|[string]|false|none|グループ 毎に割り当てられたサブドメインで、ひもづいたイベントを検索します。複数指定可能です。<br><br>URLが `https://bpstudy.connpass.com/` のグループの場合、サブドメインは `bpstudy` になります|
|prefecture|[string]|false|none|指定した都道府県で開催されているイベントを検索します。複数指定可能です。<br><br>* `online`:  オンライン<br>* `hokkaido`:  北海道<br>* `aomori`:  青森県<br>* `iwate`:  岩手県<br>* `miyagi`:  宮城県<br>* `akita`:  秋田県<br>* `yamagata`:  山形県<br>* `fukushima`:  福島県<br>* `ibaraki`:  茨城県<br>* `tochigi`:  栃木県<br>* `gunma`:  群馬県<br>* `saitama`:  埼玉県<br>* `chiba`:  千葉県<br>* `tokyo`:  東京都<br>* `kanagawa`:  神奈川県<br>* `yamanashi`:  山梨県<br>* `nagano`:  長野県<br>* `niigata`:  新潟県<br>* `toyama`:  富山県<br>* `ishikawa`:  石川県<br>* `fukui`:  福井県<br>* `gifu`:  岐阜県<br>* `shizuoka`:  静岡県<br>* `aichi`:  愛知県<br>* `mie`:  三重県<br>* `shiga`:  滋賀県<br>* `kyoto`:  京都府<br>* `osaka`:  大阪府<br>* `hyogo`:  兵庫県<br>* `nara`:  奈良県<br>* `wakayama`:  和歌山県<br>* `tottori`:  鳥取県<br>* `shimane`:  島根県<br>* `okayama`:  岡山県<br>* `hiroshima`:  広島県<br>* `yamaguchi`:  山口県<br>* `tokushima`:  徳島県<br>* `kagawa`:  香川県<br>* `ehime`:  愛媛県<br>* `kochi`:  高知県<br>* `fukuoka`:  福岡県<br>* `saga`:  佐賀県<br>* `nagasaki`:  長崎県<br>* `kumamoto`:  熊本県<br>* `oita`:  大分県<br>* `miyazaki`:  宮崎県<br>* `kagoshima`:  鹿児島県<br>* `okinawa`:  沖縄県|
|order|integer|false|none|検索結果の表示順を、更新日時順、開催日時順、新着順で指定します。<br><br>* `1`: 更新日時順<br>* `2`: 開催日時順<br>* `3`: 新着順|

<h2 id="tocS_PaginationRequestSchema">PaginationRequestSchema</h2>
<!-- backwards compatibility -->
<a id="schemapaginationrequestschema"></a>
<a id="schema_PaginationRequestSchema"></a>
<a id="tocSpaginationrequestschema"></a>
<a id="tocspaginationrequestschema"></a>

```json
{
  "start": 1,
  "count": 10
}

```

PaginationRequestSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|start|integer|false|none|検索結果の何件目から出力するかを指定します。|
|count|integer|false|none|検索結果の最大出力データ数を指定します。|

<h2 id="tocS_EventListResponseSchema">EventListResponseSchema</h2>
<!-- backwards compatibility -->
<a id="schemaeventlistresponseschema"></a>
<a id="schema_EventListResponseSchema"></a>
<a id="tocSeventlistresponseschema"></a>
<a id="tocseventlistresponseschema"></a>

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "events": [
    {
      "id": 364,
      "title": "BPStudy#56",
      "catch": "株式会社ビープラウドが主催するWeb系技術討論の会",
      "description": "今回は「Python プロフェッショナル　プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。",
      "url": "https://bpstudy.connpass.com/event/364/",
      "image_url": "string",
      "hash_tag": "bpstudy",
      "started_at": "2012-04-17T18:30:00+09:00",
      "ended_at": "2012-04-17T20:30:00+09:00",
      "limit": 80,
      "event_type": "participation",
      "open_status": "open",
      "group": {
        "id": 1,
        "subdomain": "bpstudy",
        "title": "BPStudy",
        "url": "https://bpstudy.connpass.com/"
      },
      "address": "東京都豊島区東池袋3-1-1",
      "place": "BPオフィス (サンシャイン60 45階)",
      "lat": "35.729402000000",
      "lon": "139.718209000000",
      "owner_id": 8,
      "owner_nickname": "haru860",
      "owner_display_name": "佐藤 治夫",
      "accepted": 80,
      "waiting": 15,
      "updated_at": "2012-03-20T12:07:32+09:00"
    }
  ]
}

```

EventListResponseSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|results_returned|integer|true|none|none|
|results_available|integer|true|none|none|
|results_start|integer|true|none|none|
|events|[[EventSchema](#schemaeventschema)]|true|none|[イベント詳細]|

<h2 id="tocS_EventSchema">EventSchema</h2>
<!-- backwards compatibility -->
<a id="schemaeventschema"></a>
<a id="schema_EventSchema"></a>
<a id="tocSeventschema"></a>
<a id="tocseventschema"></a>

```json
{
  "id": 364,
  "title": "BPStudy#56",
  "catch": "株式会社ビープラウドが主催するWeb系技術討論の会",
  "description": "今回は「Python プロフェッショナル　プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。",
  "url": "https://bpstudy.connpass.com/event/364/",
  "image_url": "string",
  "hash_tag": "bpstudy",
  "started_at": "2012-04-17T18:30:00+09:00",
  "ended_at": "2012-04-17T20:30:00+09:00",
  "limit": 80,
  "event_type": "participation",
  "open_status": "open",
  "group": {
    "id": 1,
    "subdomain": "bpstudy",
    "title": "BPStudy",
    "url": "https://bpstudy.connpass.com/"
  },
  "address": "東京都豊島区東池袋3-1-1",
  "place": "BPオフィス (サンシャイン60 45階)",
  "lat": "35.729402000000",
  "lon": "139.718209000000",
  "owner_id": 8,
  "owner_nickname": "haru860",
  "owner_display_name": "佐藤 治夫",
  "accepted": 80,
  "waiting": 15,
  "updated_at": "2012-03-20T12:07:32+09:00"
}

```

EventSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|title|string|true|none|none|
|catch|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|description|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|url|string|true|none|none|
|image_url|any|true|none|**このURLはある程度の時間で失効されます。外部サイトでの直接参照などはご遠慮ください。**|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|hash_tag|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|started_at|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string(date-time)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ended_at|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string(date-time)|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|limit|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|event_type|string|true|none|* `participation`: connpassで参加受付あり<br>* `advertisement`: 告知のみ|
|open_status|string|true|none|* `preopen`: 開催前<br>* `open`: 開催中<br>* `close`: 終了<br>* `cancelled`: 中止|
|group|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[GroupSummarySchema](#schemagroupsummaryschema)|false|none|グループ概要|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|address|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|place|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lat|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|lon|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|owner_id|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|owner_nickname|string|true|none|none|
|owner_display_name|string|true|none|none|
|accepted|integer|true|none|none|
|waiting|integer|true|none|none|
|updated_at|string(date-time)|true|none|none|

<h2 id="tocS_GroupSummarySchema">GroupSummarySchema</h2>
<!-- backwards compatibility -->
<a id="schemagroupsummaryschema"></a>
<a id="schema_GroupSummarySchema"></a>
<a id="tocSgroupsummaryschema"></a>
<a id="tocsgroupsummaryschema"></a>

```json
{
  "id": 1,
  "subdomain": "bpstudy",
  "title": "BPStudy",
  "url": "https://bpstudy.connpass.com/"
}

```

グループ

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|subdomain|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|url|string|true|none|none|

<h2 id="tocS_EventIDRequestSchema">EventIDRequestSchema</h2>
<!-- backwards compatibility -->
<a id="schemaeventidrequestschema"></a>
<a id="schema_EventIDRequestSchema"></a>
<a id="tocSeventidrequestschema"></a>
<a id="tocseventidrequestschema"></a>

```json
{
  "id": 364
}

```

EventIDRequestSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|指定したイベントIDのオブジェクトを取得します。<br><br>URLが `https://connpass.com/event/364/` のイベントの場合、イベントIDは `364` になります。|

<h2 id="tocS_PresentationListResponseSchema">PresentationListResponseSchema</h2>
<!-- backwards compatibility -->
<a id="schemapresentationlistresponseschema"></a>
<a id="schema_PresentationListResponseSchema"></a>
<a id="tocSpresentationlistresponseschema"></a>
<a id="tocspresentationlistresponseschema"></a>

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "presentations": [
    {
      "user": {
        "id": 8,
        "nickname": "haru860"
      },
      "url": "https://togetter.com/li/294875",
      "name": "Togetterまとめ",
      "presenter": {
        "id": 8,
        "nickname": "haru860"
      },
      "presentation_type": "blog",
      "created_at": "2012-04-29T19:44:03+09:00"
    }
  ]
}

```

PresentationListResponseSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|results_returned|integer|true|none|none|
|results_available|integer|true|none|none|
|results_start|integer|true|none|none|
|presentations|[[PresentationSchema](#schemapresentationschema)]|true|none|[イベント資料詳細]|

<h2 id="tocS_PresentationSchema">PresentationSchema</h2>
<!-- backwards compatibility -->
<a id="schemapresentationschema"></a>
<a id="schema_PresentationSchema"></a>
<a id="tocSpresentationschema"></a>
<a id="tocspresentationschema"></a>

```json
{
  "user": {
    "id": 8,
    "nickname": "haru860"
  },
  "url": "https://togetter.com/li/294875",
  "name": "Togetterまとめ",
  "presenter": {
    "id": 8,
    "nickname": "haru860"
  },
  "presentation_type": "blog",
  "created_at": "2012-04-29T19:44:03+09:00"
}

```

PresentationSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|user|[UserSummarySchema](#schemausersummaryschema)|true|none|資料を投稿したユーザー|
|url|string|true|none|none|
|name|string|true|none|none|
|presenter|any|true|none|資料を発表したユーザー|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[UserSummarySchema](#schemausersummaryschema)|false|none|ユーザー概要|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|presentation_type|string|true|none|* `slide`: スライド<br>* `movie`: 動画<br>* `blog`: ブログなど|
|created_at|string(date-time)|true|none|none|

<h2 id="tocS_UserSummarySchema">UserSummarySchema</h2>
<!-- backwards compatibility -->
<a id="schemausersummaryschema"></a>
<a id="schema_UserSummarySchema"></a>
<a id="tocSusersummaryschema"></a>
<a id="tocsusersummaryschema"></a>

```json
{
  "id": 8,
  "nickname": "haru860"
}

```

ユーザー

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|nickname|string|true|none|none|

<h2 id="tocS_GroupSearchRequestSchema">GroupSearchRequestSchema</h2>
<!-- backwards compatibility -->
<a id="schemagroupsearchrequestschema"></a>
<a id="schema_GroupSearchRequestSchema"></a>
<a id="tocSgroupsearchrequestschema"></a>
<a id="tocsgroupsearchrequestschema"></a>

```json
{
  "subdomain": [
    "string"
  ]
}

```

GroupSearchRequestSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subdomain|[string]|false|none|指定したサブドメインのグループを取得します。複数指定可能です(最大100件)。|

<h2 id="tocS_GroupListResponseSchema">GroupListResponseSchema</h2>
<!-- backwards compatibility -->
<a id="schemagrouplistresponseschema"></a>
<a id="schema_GroupListResponseSchema"></a>
<a id="tocSgrouplistresponseschema"></a>
<a id="tocsgrouplistresponseschema"></a>

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "groups": [
    {
      "id": 1,
      "subdomain": "bpstudy",
      "title": "BPStudy",
      "sub_title": "株式会社ビープラウドが主催するIT勉強会",
      "url": "https://bpstudy.connpass.com/",
      "description": "string",
      "owner_text": "株式会社ビープラウド",
      "image_url": "string",
      "website_url": "http://www.beproud.jp/",
      "website_name": "株式会社ビープラウド",
      "twitter_username": "bpstudy",
      "facebook_url": "https://www.facebook.com/beproud.inc",
      "member_users_count": "5743"
    }
  ]
}

```

GroupListResponseSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|results_returned|integer|true|none|none|
|results_available|integer|true|none|none|
|results_start|integer|true|none|none|
|groups|[[GroupSchema](#schemagroupschema)]|true|none|[グループ詳細]|

<h2 id="tocS_GroupSchema">GroupSchema</h2>
<!-- backwards compatibility -->
<a id="schemagroupschema"></a>
<a id="schema_GroupSchema"></a>
<a id="tocSgroupschema"></a>
<a id="tocsgroupschema"></a>

```json
{
  "id": 1,
  "subdomain": "bpstudy",
  "title": "BPStudy",
  "sub_title": "株式会社ビープラウドが主催するIT勉強会",
  "url": "https://bpstudy.connpass.com/",
  "description": "string",
  "owner_text": "株式会社ビープラウド",
  "image_url": "string",
  "website_url": "http://www.beproud.jp/",
  "website_name": "株式会社ビープラウド",
  "twitter_username": "bpstudy",
  "facebook_url": "https://www.facebook.com/beproud.inc",
  "member_users_count": "5743"
}

```

GroupSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|subdomain|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|sub_title|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|url|string|true|none|none|
|description|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|owner_text|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|image_url|any|true|none|**このURLはある程度の時間で失効されます。外部サイトでの直接参照などはご遠慮ください。**|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|website_url|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|website_name|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|twitter_username|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|facebook_url|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|member_users_count|integer|true|none|none|

<h2 id="tocS_UserSearchRequestSchema">UserSearchRequestSchema</h2>
<!-- backwards compatibility -->
<a id="schemausersearchrequestschema"></a>
<a id="schema_UserSearchRequestSchema"></a>
<a id="tocSusersearchrequestschema"></a>
<a id="tocsusersearchrequestschema"></a>

```json
{
  "nickname": [
    "string"
  ]
}

```

UserSearchRequestSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|nickname|[string]|false|none|指定したニックネームのユーザを検索します。複数指定可能です(最大100件)。|

<h2 id="tocS_UserListResponseSchema">UserListResponseSchema</h2>
<!-- backwards compatibility -->
<a id="schemauserlistresponseschema"></a>
<a id="schema_UserListResponseSchema"></a>
<a id="tocSuserlistresponseschema"></a>
<a id="tocsuserlistresponseschema"></a>

```json
{
  "results_returned": 1,
  "results_available": 91,
  "results_start": 1,
  "users": [
    {
      "id": 8,
      "nickname": "haru860",
      "display_name": "佐藤 治夫",
      "description": "株式会社ビープラウド代表取締役。connpass企画・開発・運営。\nhttp://twitter.com/haru860\nhttp://shacho.beproud.jp/",
      "url": "https://connpass.com/user/haru860/",
      "image_url": "string",
      "created_at": "2011-10-20T18:23:03+09:00",
      "attended_event_count": 261,
      "organize_event_count": 231,
      "presenter_event_count": 34,
      "bookmark_event_count": 57
    }
  ]
}

```

UserListResponseSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|results_returned|integer|true|none|none|
|results_available|integer|true|none|none|
|results_start|integer|true|none|none|
|users|[[UserSchema](#schemauserschema)]|true|none|[ユーザー詳細]|

<h2 id="tocS_UserSchema">UserSchema</h2>
<!-- backwards compatibility -->
<a id="schemauserschema"></a>
<a id="schema_UserSchema"></a>
<a id="tocSuserschema"></a>
<a id="tocsuserschema"></a>

```json
{
  "id": 8,
  "nickname": "haru860",
  "display_name": "佐藤 治夫",
  "description": "株式会社ビープラウド代表取締役。connpass企画・開発・運営。\nhttp://twitter.com/haru860\nhttp://shacho.beproud.jp/",
  "url": "https://connpass.com/user/haru860/",
  "image_url": "string",
  "created_at": "2011-10-20T18:23:03+09:00",
  "attended_event_count": 261,
  "organize_event_count": 231,
  "presenter_event_count": 34,
  "bookmark_event_count": 57
}

```

UserSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|nickname|string|true|none|none|
|display_name|string|true|none|none|
|description|string|true|none|none|
|url|string|true|none|none|
|image_url|any|true|none|**このURLはある程度の時間で失効されます。外部サイトでの直接参照などはご遠慮ください。**|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|created_at|string(date-time)|true|none|none|
|attended_event_count|integer|true|none|none|
|organize_event_count|integer|true|none|none|
|presenter_event_count|integer|true|none|none|
|bookmark_event_count|integer|true|none|none|

<h2 id="tocS_UserNicknameRequestSchema">UserNicknameRequestSchema</h2>
<!-- backwards compatibility -->
<a id="schemausernicknamerequestschema"></a>
<a id="schema_UserNicknameRequestSchema"></a>
<a id="tocSusernicknamerequestschema"></a>
<a id="tocsusernicknamerequestschema"></a>

```json
{
  "nickname": "haru860"
}

```

UserNicknameRequestSchema

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|nickname|string|true|none|指定したニックネームのユーザを検索します。|

