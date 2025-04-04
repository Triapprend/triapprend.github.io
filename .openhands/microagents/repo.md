---
name: repo
version: 1.0.0
type: repo
agent: CodeActAgent
---

リポジトリ：triapprend.github.io
説明：Triapprendという勉強会地理情報でバトルするゲームのバックエンド・フロントエンド

ディレクトリ構造：
- docs/：ドキュメント
- src/：バックエンドアプリケーションコード
- web/：フロントエンドコード

セットアップ：
- `pnpm install`で依存関係をインストール
- 開発には`pnpm run dev`を使用
- テストには`pnpm run test`を実行
- lintには`pnpm run lint`を実行
- フォーマッタには`pnpm run fmt`を実行

ガイドライン：
- ESLint設定に従う
- 開発の節目にはprettierでフォーマットし、lint、テストを実行する
- すべての新機能にテストを書く
- 新しいコードにはTypeScriptを使用
- コンポーネント確認にはstorybookを使用

web/componentsに新しいコンポーネントを追加する場合は、必ずtests/components/に適切なユニットテストとstorybookの定義を書くこと