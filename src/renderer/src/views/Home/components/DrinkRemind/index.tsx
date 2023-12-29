import { Card } from 'antd'
import React from 'react'

type Props = {}

const DrinkRemind = (props: Props) => {
  return (
    <>
      <Card title="别忘了喝水" extra={<a href="#">设置</a>} style={{ width: 300 }}>
        <p>距离下一次喝水提醒还有</p>
        
      </Card>
    </>
  )
}

export default DrinkRemind
