---
name: pnpm
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
- pnpm
---

pnpmを使用してパッケージをインストールする際、対話型シェルを使用することができず、操作を確認するのが難しい場合があります。
代替手段として、Unixの "yes" コマンドの出力をパイプで渡して操作を確認することができます。
