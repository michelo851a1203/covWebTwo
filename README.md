# TO JOS 一定要看文件！

## 1. 先檢查 vue.config.js

1.  > publicPath: process.env.NODE_ENV === "production"  
        ? "/covWebTwo/ `『這裡要改，這會指定 js 的跟路徑，改到自己網頁的，如果不指定就把這個改為 "/"，就可以』`"  
        : "/",

## 2. 建置

> \$ `npm run build`  
>  用 yarn 的話  
> \$`yarn build`
## 3. 看 dist 資料夾，
> ``把檔案指定到 dist/index.html 就可以執行``
## 後續. 如果部屬完成路徑有錯回去改 vue.config.js內的設定，可能路徑指定錯誤。