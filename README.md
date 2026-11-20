# TODOリスト

ブラウザー上でTODOの追加・一覧表示・完了・削除ができるシンプルなWebアプリです。TODOはブラウザーの`localStorage`に保存されます。

## 起動方法

リポジトリのルートで次のコマンドを実行し、表示されたURLをブラウザーで開きます。

```sh
python3 -m http.server 8000
```

```text
http://localhost:8000
```

## テスト

Node.js 18以降で、リポジトリのルートから次を実行します。

```sh
node --test
```
