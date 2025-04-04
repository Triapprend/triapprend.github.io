# Triapprend

[connpass.com](https://connpass.com)からイベントデータを収集・可視化するためのツールです。

## 概要

このプロジェクトは主に2つのコンポーネントで構成されています：
- イベントデータを取得するためのRustベースのCLIツール
- イベントを表示するためのNext.jsウェブアプリケーション

## 始め方

### CLIツール

CLIツールを使用すると、日付ごとにconnpass.com APIからイベントデータを取得できます。

```rust
cargo run -- --ymd YYYYMMDD
```

### データ収集スクリプト

または、Pythonスクリプトを使用してイベントデータを収集することもできます：

```python
python scripts/collector.py YYYYMMDD
```

### ウェブアプリケーション

ウェブアプリケーションを実行するには：

```bash
cd web
pnpm install
pnpm dev
```

その後、ブラウザで[http://localhost:3000](http://localhost:3000)を開いてください。

## プロジェクト構造

- `src/` - Rust CLIツールのソースコード
- `scripts/` - データ収集用のPythonスクリプト
- `web/` - Next.jsウェブアプリケーション（詳細は[web/README.md](web/README.md)を参照）

## ライセンス

詳細は[LICENSE](LICENSE)ファイルを参照してください。
