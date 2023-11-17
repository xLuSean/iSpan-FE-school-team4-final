import styles from '@/styles/member.module.css';
import 'react-image-crop/dist/ReactCrop.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useRef, useState } from 'react';
import CUIButton from '../customUI/cui-button';
import ReactCrop from 'react-image-crop';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '@/context/auth/useAuth';

export default function ImgUploadModal({ open = false, handleClose }) {
  const fileRef = useRef(null);
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  /*  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0); */
  const { setAuth } = useAuth();
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0].size / (1024 * 1024) > 1) {
      toast.error('圖片size大於1MB');
      return;
    }
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    /*  if (width > 600 || height > 600) {
      toast.error('圖片大於長寬大於 600px 請更換圖片');
      return;
    } */

    setCrop((prev) => {
      console.log(prev);
      return {
        unit: 'px',
        x: 50,
        y: 50,
        width: 50,
        height: 50,
      };
    });
  };
  const getCroppedImg = (image, crop, fileName, setAuth) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As a blob
    // return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        console.log(123);
        blob.name = fileName;
        // resolve(blob);
        const form = new FormData();
        form.append('avatar', blob, fileName);
        axios
          .patch(
            `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/icon`,
            form
          )
          .then((res) => {
            if (res?.data?.filename) {
              toast.success('更新照片成功');
              handleClose();
              setAuth((prev) => {
                const newIcon = `${
                  process.env.NEXT_PUBLIC_BACKEND_PORT +
                  '/imgs/member/' +
                  res?.data?.filename
                }`;
                return { ...prev, user: { ...prev.user, icon: newIcon } };
              });
            }
          });
      },
      'image/jpeg',
      1
    );
    // });
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <input
        accept="image/*"
        onChange={handleFileChange}
        ref={fileRef}
        type="file"
        name="avatar"
        hidden
      />
      <DialogTitle>請上傳圖片</DialogTitle>
      <DialogContent>
        {!!imgSrc && (
          <ReactCrop
            className={`${styles['crop-container']}`}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            keepSelection={true}
            minWidth={100}
          >
            <img
              ref={imgRef}
              alt="裁切圖片"
              src={imgSrc}
              //   style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
      </DialogContent>

      <DialogActions>
        <CUIButton
          color={'main_white'}
          onClick={() => {
            handleClose();
          }}
        >
          取消
        </CUIButton>
        <CUIButton
          color={'steel_grey'}
          onClick={() => {
            fileRef.current.click();
          }}
        >
          預覽圖片
        </CUIButton>
        {completedCrop?.height > 0 && (
          <CUIButton
            color={'steel_grey'}
            onClick={() => {
              getCroppedImg(
                imgRef.current,
                completedCrop,
                fileRef.current.files[0].fileName,
                setAuth
              );
            }}
          >
            上傳圖片
          </CUIButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
