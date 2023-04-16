import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const HeaderExampleSettingsIcon = () => (
  <Header as='h2'>
    <Icon name='tasks' />
    <Header.Content>
      サクサクくん
      <Header.Subheader>進捗率を管理できるTODOアプリ</Header.Subheader>
    </Header.Content>
  </Header>
)

export default HeaderExampleSettingsIcon