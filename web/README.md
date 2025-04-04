# Triapprend ウェブアプリケーション

これは[Next.js](https://nextjs.org)プロジェクトで、[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)でブートストラップされています。

## 始め方

まず、依存関係をインストールして開発サーバーを実行します：

```bash
pnpm install
pnpm dev
```

または、他のパッケージマネージャーを使用することもできます：

```bash
# npm
npm install
npm run dev

# yarn
yarn install
yarn dev

# bun
bun install
bun dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開いて結果を確認してください。

## 開発

`app/page.tsx`を変更することでページの編集を開始できます。ファイルを編集すると、ページは自動的に更新されます。

このプロジェクトでは以下を使用しています：
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) - Vercel用のカスタムフォントファミリー[Geist](https://vercel.com/font)を自動的に最適化して読み込む
- [Leaflet](https://leafletjs.com/)と[React Leaflet](https://react-leaflet.js.org/) - 地図の可視化

## もっと学ぶ

Next.jsについて詳しく知るには、以下のリソースをご覧ください：

- [Next.jsドキュメント](https://nextjs.org/docs) - Next.jsの機能とAPIについて学ぶ
- [Next.jsを学ぶ](https://nextjs.org/learn) - インタラクティブなNext.jsチュートリアル

[Next.js GitHubリポジトリ](https://github.com/vercel/next.js)もチェックしてみてください - フィードバックや貢献を歓迎します！

## デプロイ

### Vercelにデプロイ

Next.jsアプリをデプロイする最も簡単な方法は、Next.jsの作成者による[Vercelプラットフォーム](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)を使用することです。

詳細については、[Next.jsデプロイメントドキュメント](https://nextjs.org/docs/app/building-your-application/deploying)をご覧ください。

### GitHub Pagesにデプロイ

このプロジェクトはGitHub Pagesでホストされるように設計されているため、GitHub Actionsを使用してデプロイすることもできます。プロジェクト構造の詳細については、メインの[README.md](../README.md)を参照してください。
