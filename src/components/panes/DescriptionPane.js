import React from "react";
import { Tab, Message } from "semantic-ui-react";

const DescriptionPane = () => {
  return (
    <Tab.Pane>
      <Message
        icon="calendar check outline"
        header="進捗率とともにタスクを管理するアプリ"
        content="このアプリは、タスクを予定工数、進捗率、完了までにかかった時間と一緒に管理できるアプリです。"
      />
      <Message
        icon="window maximize outline"
        header="登録したタスクをCookieに保存"
        content="登録したタスクはブラウザのCookieに保存され、ブラウザを閉じても再度実行可能です。"
      />
      <Message
        icon="cloud download"
        header="CSVインポート/エクスポートもできる"
        content="登録したタスク情報を、CSV形式でエクスポートすることも可能です。エクスポートしたCSVから、タスク情報を読み込むことも出来ます。"
      />
    </Tab.Pane>
  );
};

export default DescriptionPane;
