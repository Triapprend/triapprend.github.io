---
name: github
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
- github
- git
---

環境変数 `GITHUB_TOKEN` を使用して、GitHub APIとやり取りすることができます。

`curl` を使用して `GITHUB_TOKEN` を使い、GitHubのAPIとやり取りできます。
操作を行う際は、必ずGitHub APIを使用し、ウェブブラウザは使用しないでください。

GitHubへのプッシュ時に認証の問題（パスワードのプロンプトや権限エラーなど）が発生した場合、古いトークンが期限切れになっている可能性があります。その場合、リモートURLを現在のトークンを含むように更新してください：
`git remote set-url origin https://${GITHUB_TOKEN}@github.com/username/repo.git`

プルリクエストブランチを作成するときは `openhands/{作業名}` という名前を使用してください。例えば、`openhands/create-new-feature` のようにします。

以下はプッシュの手順ですが、ユーザーから指示があった場合のみ実行してください：
* `main` または `master` ブランチに直接プッシュしないでください。
* Gitの設定（ユーザー名とメールアドレス）は事前に設定されています。変更しないでください。
* すでに `openhands-workspace` で始まるブランチにいる可能性があります。プッシュする前に、より適切な名前の新しいブランチを作成してください。
* GitHub APIを使用してプルリクエストを作成してください（まだ作成していない場合）。
* 一度ブランチまたはプルリクエストを作成したら、それを更新し続けてください。明示的な指示がない限り、新しいものを作成しないでください。プルリクエストのタイトルと説明を必要に応じて更新しますが、ブランチ名は変更しないでください。
* 基本ブランチとして `main` ブランチを使用してください（ユーザーが別のブランチを要求しない限り）。
* プルリクエストを開いたり更新した後、短いメッセージとプルリクエストへのリンクをユーザーに送信してください。
* 可能な限り「ドラフト」プルリクエストを使用してください。
* 上記のすべてを可能な限り少ない手順で実行してください。例えば、以下のbashコマンドを実行することで、1ステップでプルリクエストを開くことができます：
```bash
git remote -v && git branch # 現在の組織、リポジトリ、ブランチを確認する
git checkout -b create-widget && git add . && git commit -m "Create widget" && git push -u origin create-widget
curl -X POST "https://api.github.com/repos/$ORG_NAME/$REPO_NAME/pulls" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -d '{"title":"Create widget","head":"create-widget","base":"openhands-workspace"}'
```
