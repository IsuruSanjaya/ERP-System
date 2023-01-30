import { Button } from 'antd'
import React from 'react'
import { PlusCircleOutlined} from '@ant-design/icons';

interface Props{
   onClick : ()=> void
}

const AddButton = ({onClick}:Props) => {
  return (
    <Button icon={<PlusCircleOutlined />} onClick = {onClick} shape={"circle"}>
      
   </Button>
  )
}

export default AddButton