import { Modal } from 'antd';
import React from 'react';


interface Props {
   isModalOpen: boolean,
   handleOk: () => void,
   handleCancel: () => void,
   text: string,
}

const DeleteModal = ({ isModalOpen, handleOk, handleCancel, text }: Props) => {

   return (

      <Modal title={text} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <p> Do you want to delete this item </p>
      </Modal>


   )
}

export default DeleteModal