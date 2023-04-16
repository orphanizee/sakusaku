import React from "react";
import { Segment, Header, Icon, Step } from "semantic-ui-react";

const DescriptionUsage = () => (
  <Segment padded textAlign="center">
    <Header size="medium">使い方</Header>
    <Step.Group>
      <Step>
        <Icon name="save" />
        <Step.Content>
          <Step.Title>タスクを登録</Step.Title>
          <Step.Description>タスク名と見積工数を入力</Step.Description>
        </Step.Content>
      </Step>
      <Step>
        <Icon name="hand point up outline" />
        <Step.Content>
          <Step.Title>再生ボタンをクリック</Step.Title>
          <Step.Description>取り掛かるタスクを選ぶ</Step.Description>
        </Step.Content>
      </Step>
      <Step>
        <Icon name="checkmark" />
        <Step.Content>
          <Step.Title>進捗率に合わせてバーを操作</Step.Title>
          <Step.Description>全部100%になったら完了！</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  </Segment>
);

export default DescriptionUsage;
