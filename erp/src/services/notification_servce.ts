import { notification } from 'antd';

const openNotification = (title:string, description:string) => {
    notification.open({
      message: title,
      description:
        description,
        onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const NotificationService = {openNotification}
  export default NotificationService