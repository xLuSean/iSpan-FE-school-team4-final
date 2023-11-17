import { toast } from 'react-hot-toast';

const getToast = () => ({
  toastId: null,
  loading() {
    this.toastId = toast.loading('請稍候...');
  },
  success(message) {
    toast.success(message, {
      id: this.toastId,
    });
  },
  error(message) {
    toast.error(message || '發生錯誤請稍後再試', {
      id: this.toastId,
    });
  },
  hint() {
    toast('請先登入會員!', {
      icon: '🔔',
    });
  },
});

export default getToast;
