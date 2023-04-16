# sakusaku
- 見積工数/実績工数が記録できるタスク管理アプリです。
- 登録したタスクはWebブラウザのlocalStorageに保存されます。
- CSV形式でエクスポートも可能です。
- [Web API](https://github.com/orphanizee/csv_to_json_converter)と併用することで、エクスポートしたCSVからタスクをインポートできます。

# Supported Versions
- @reduxjs/toolkit@1.9.3
- @testing-library/jest-dom@5.16.5
- @testing-library/react@13.4.0
- @testing-library/user-event@14.4.3
- axios@1.3.5
- react-dom@18.2.0
- react-redux@8.0.5
- react-scripts@2.1.8
- react@18.2.0
- semantic-ui-css@2.5.0
- semantic-ui-react@2.1.4
- web-vitals@2.1.4

# Installation
1. プロジェクトをダウンロード
    ```bash
    git clone https://github.com/orphanizee/sakusaku.git
    ```

1. CSVインポート用のWeb APIエンドポイントを設定(OPTIONAL)

    .env
    ```ini
    REACT_APP_API_ENDPOINT="http://127.0.0.1:8000/csv-to-json/"
    ```

1. 起動
    ```bash
    cd sakusaku
    npm run start sakusaku
    ```

# Note
- CSVインポート用のWeb APIが起動していない場合、サンプルデータからタスク情報をインポートします。

# License
This project is licensed under the MIT License.

# Backlog
- [ ] テストコードを書く
- [ ] レスポンシブ対応

# CHANGELOG
## 1.0.0 - 2023/04/16
新規作成
