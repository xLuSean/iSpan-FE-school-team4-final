import { useEffect, useState } from 'react';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';
// 中文路徑對照陣列，到configs/index.js中設定
import { pathsLocaleMap } from './config.js';
// 額外樣式檔案
import { useRouter } from 'next/router.js';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Typography } from '@mui/material';

export default function NextBreadCrumb({
  omitRoot = true,
  homeIcon = <HomeIcon fontSize="small" />,
  isHomeIcon = true,
  isChevron = false,
  bgClass = 'bg-body-tertiary',
}) {
  // 得到目前的網址的路徑
  const router = useRouter();
  const { isReady, asPath } = router;
  const pathname = asPath.split('?')[0];

  //const [display, setDisplay] = useState(null)
  const [showChild, setShowChild] = useState(false);

  const getPathFormatLocale = (isReady, pathname) => {
    // 1. 拆解 ex. '/product/baby/birth' -> ['','product','baby', 'birth']
    const paths = pathname.split('/');
    // 檢查是否是有動態路由`/[xxx]`，如果有先暫時不呈現，
    // 等再次渲染決定後再呈現，不這樣作可能會造成畫面有閃爍呈現
    if (!isReady) return <MuiLink></MuiLink>;

    // 2. 轉換字詞 to ['','產品','嬰兒', '初生兒']
    const pathsLocale = paths.map((v, i) => {
      const path = v.includes('#') ? v.replaceAll('#', '') : v;
      console.log(path);
      if (i === 3) return pathsLocaleMap[path] || path;
      // 不存在(例如空字串) 或 數字類型(例如id)的最後結尾參數會忽略
      if (!v || Number(v)) return '';

      // replace '#' to ''

      // 回傳對照後的中文字串
      return pathsLocaleMap[path] || path;
    });

    const pathsDisplay = pathsLocale.map((v, i, array) => {
      // 第一個 與 數字類型(例如id)的最後結尾要忽略, 首頁不需要(首頁樣式要在render時獨立處理)
      if (i === 0 || v === '') return '';

      // 最後一個
      if (i === array.length - 1) {
        return <Typography key={i}>{v}</Typography>;
      }
      console.log(paths.slice(0, i + 1).join('/'));
      // 其它中間樣式
      return (
        <MuiLink key={i}>
          <Link href={paths.slice(0, i + 1).join('/')}>{v}</Link>
        </MuiLink>
      );
    });

    return pathsDisplay;
  };

  useEffect(() => {
    setShowChild(true);
  }, []);

  return (
    <>
      <nav aria-label="breadcrumb">
        <Breadcrumbs>
          <Link href="/">
            <HomeIcon fontSize="small" />
          </Link>

          {showChild && getPathFormatLocale(isReady, pathname)}
        </Breadcrumbs>
      </nav>
    </>
  );
}
