# demo-1-A

シンプルなTODOリストアプリです。TODOの追加・一覧表示・完了・削除ができ、内容はブラウザの`localStorage`に保存されます。

## 起動方法

リポジトリのルートで次のコマンドを実行し、ブラウザで <http://localhost:8000> を開いてください。

```sh
python3 -m http.server 8000
```

## テスト

Node.js 18以降で、リポジトリのルートから次を実行します。

```sh
node --test
```
