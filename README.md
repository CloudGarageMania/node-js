# CloudGarage Node.js SDK & CLI Client

[CloudGarage - クラウドガレージ | 定額型パブリッククラウド](https://cloudgarage.jp/)

CloudGarageは定額制のIaaSです。

## インストール

```
$ npm i cloudgarage -g
```

## 使い方

### トークンの取得

あらかじめ[コントロールパネル | CloudGarage](https://console.cloudgarage.jp/server/list#!/)にてAPIのクライアントIDとクライアントシークレットを取得しておきます。

```
$ cloudgarage token
```

クライアントIDとクライアントシークレットを入力すると設定ファイルを出力します（デフォルトは ~/.cloudgarage.json）。

```
$ cloudgarage help token
Usage: cloudgarage-token [options]

Options:
  -i, --id [clientId]            This is Client Id that you can get it on Dashboard at CloudGarage
  -s, --secret [clientSecret]    This is Client Secret that you can get it on Dashboard at CloudGarage
  -o, --output [configFilePath]  Output config file path. Default is ~/.cloudgarage.json (default: "~/.cloudgarage.json")
  -h, --help                     output usage information
```

### ディスクイメージの取得

トークンファイルを生成後、実行します。

```
$ cloudgarage images
```

作成されているバックアップイメージを含め、ディスクイメージが一覧で返ってきます。

```
$ node_modules/.bin/cloudgarage images
┌─────────┬────────────────────────────────────────┬───────────────┬──────────────────────────────────┐
│ (index) │                   Id                   │     Type      │               Name               │
├─────────┼────────────────────────────────────────┼───────────────┼──────────────────────────────────┤
│    0    │ '38b60dd1-e374-44ef-b58e-9beaeabf0eaa' │     'OS'      │       'CentOS-6.10-32bit'        │
│    1    │ 'b1e41e1c-1410-4880-aa33-9c83154d3571' │     'OS'      │       'CentOS-6.10-64bit'        │
│   26    │ '38625780-5355-4da5-918f-2bd12abef9b7' │ 'APPLICATION' │   'Redmine/Ubuntu-16.04-64bit'   │
│   27    │ '7761c7de-47a6-47a9-83de-3e6bf57f71b1' │ 'APPLICATION' │  'WordPress/Ubuntu-16.04-64bit'  │
└─────────┴────────────────────────────────────────┴───────────────┴──────────────────────────────────┘
```

`-t` または `--type` でディスク種別をフィルタリングできます。指定できるのは OS / APPLICATION / PRIVATEの3つです。

```
$ cloudgarage help images
Usage: cloudgarage-images [options]

Options:
  -c, --config [configFilePath]  Config file path. Default is ~/.cloudgarage.json (default: "~/.cloudgarage.json")
  -t, --type [type]              Filtering image type. [OS, APPLICATION, PRIVATE]
  -h, --help                     output usage information
```

## License

MIT.
