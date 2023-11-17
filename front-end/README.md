# This is the final project frontend for mfee36 group4.  

### The backend for final project - https://github.com/LQTjim/g4-final-project-backend
  
---
  
## 使用你的客製 Layout

### 為你的 page 元件添加 getLayout 屬性 :

```
// 在這裡加入你的客製 Layout
YourPage.getLayout = (page) => (
    <YourLayout>
        {page}
    </YourLayout>
)

// 你的頁面元件
export default function YourPage() { 
    return (<>
        ...
    </>)
}
```

<br />

## 使用 Color Theme

### 使用預設的 Color Theme

```
// 引入主紅色的 color theme
import RedTheme from '@/context/Theme/red-theme';

// 包裹在需要套用的元件外層
export default function myComponent() {
    return (<>
        ...
        <RedTheme>
            ...
            <Component1 />
            ...
        </RedTheme>
        ...
        <Component2 />
        ...
    </>);
}
```
 - 被 color theme 包裹的 mui component 使用的主色 (main) 會被替換為 color theme 的顏色

### 使用你的客製 Color Theme

#### 引入 createColorTheme : 

```
import createColorTheme from '@/libs/CreateColorTheme';
```

#### 製作客製的 Color Theme : 

```
const MyColorTheme = createColorTheme(myColor);
```

#### createColorTheme 參數 : 

| type | format |
| --- | :---: |
| String |  ```#nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()```

#### 使用客製的 Color Theme : 

```
...
<MyColorTheme>
    <Component />
</MyColorTheme>
...
```

<br />

## 使用通用客製元件 CUI (custom ui) component

### 引入 CUI component :

```
import CUIComponent from '@/components/customUI/cui-component';
```

### 使用引入的 CUI component :

```
export default function myComponent() {
    return (<>
        ...
        <CUIComponent1 />
        ...
        <CUIComponent2 />
        ...
    </>);
}
```

<br />

## 卡片 (CUICard)

### 使用 CUICard :
 - #### 等同使用 MUI \<Paper elevation={4}>\</Paper> 元件

```
import CUICard from '@/components/customUI/cui-card';

export default function myComponent() {
    return (<>
        ...
        <CUICard>
            ...
        </CUICard>
        ...
    </>);
}
```

### CUICard 參數 :
 - #### 此元件支援所有 MUI Paper 的可用參數

<br />

## 按鈕 (CUIButton)

### 使用 CUIButton :

```
import CUIButton from '@/components/customUI/cui-button';

export default function myComponent() {
    return (<>
        ...
        <CUIButton btncolor={btncolor}>
            按鈕文字
        </CUIButton>
        ...
    </>);
}
```

### CUIButton 參數 :

 - #### 此元件支援所有 MUI Button 的可用參數

| 名稱 | 類型 | 說明 |
| --- | :---: | :---: |
| btncolor | String | 按鈕顏色(文字不會自動調整可視度)

<br />

## 搜尋列 (CUISearch)

### 使用 CUISearch :

```
import CUISearch from '@/components/customUI/cui-search';

export default function myComponent() {
    return (<>
        ...
        <CUISearch 
            label={label}
            placeholder={placeholder}
        />
        ...
    </>);
}
```

### CUISearch 參數 :

| 名稱 | 類型 | 說明 |
| --- | :---: | :---: |
| name | String | 
| label | String | 搜尋列名稱
| placeholder | String | 搜尋列提示
| value | String | 
| color | String | mui theme color
| sx | Object | sx 樣式物件
| onClick | Function | 
| onChange | Function |

<br />

## 下拉式選單 (CUISelect)

### 使用 CUISelect :

```
import CUISelect from '@/components/customUI/cui-select';

export default function myComponent() {
    return (<>
        ...
        <CUISelect 
            label={label}
            options={[
                {key: optionsKey1, value: optionsValue1, label: optionsLabel1},
                {key: optionsKey2, value: optionsValue2, label: optionsLabel2},
                ...
            ]}
        />
        ...
    </>);
}
```

### CUISelect 參數 :

| 名稱 | 類型 | 說明 |
| --- | :---: | :---: |
| name | String | 
| label | String | 選單名稱
| value | Any | 
| color | String | mui theme color
| sx | Object | sx 樣式物件
| defaultValue | String | 選單元件預設值
| helperText | String | 說明文字
| options | Array[ Object \| String ] | 項目陣列
| onChange | Function |


### CUISelect 項目 :

| 名稱 | 類型 | 說明 | 
| --- | :---: | :---: | 
| key | String \| Number
| value | String \| Number | 選單元件選取值
| label | String | 項目名稱

- #### 選單項目建議使用 Object 類型, 使用 String 類型則項目內 key, value, label 皆會使用該字串作為屬性值

- #### 使用 Object 類型未給定屬性值時會依序套用 :

| key | value | label |
| :---: | :---: | :---: |
| 陣列索引值 | label | value |
|  | 空字串 | 空字串 |

<br />

## 滑動條 (CUISlider)

### 使用 CUISlider :

```
import CUISlider from '@/components/customUI/cui-slider';

export default function myComponent() {
    return (<>
        ...
        <CUISlider 
            label={label}
            max={max}
            min={min}
            value={[firstThumb, secondThumb]}
            distance={distance}
        />
        ...
    </>);
}
```

### CUISlider 參數 :

 - 此元件設計為可控元件, 做為不可控元件時無法使用 ``onChange`` 參數取值

| 名稱 | 類型 | 說明 |
| --- | :---: | :---: |
| name | String | 
| label | String | 滑動條名稱
| max | Number \| String | 滑動條最大值
| min | Number \| String | 滑動條最小值
| value | Array[ Number \| String, Number \| String ] | 滑鈕位置 (範圍值)
| distance | Number \| String | 步進值
| color | String | mui theme color
| onChange | Function | 傳入參數為滑鈕位置 (範圍值), 類型為 Array[ Number, Number ]

<br />

## 篩選器 (CUIFilter)

### 使用 CUIFilter :

```
import CUIFilter from '@/components/customUI/cui-filter';

export default function myComponent() {
    return (<>
        ...
        <CUIFilter 
            label={label}
            items={[
                <Component1 />,
                <Component2 />,
                ...
            ]}
        />
        ...
    </>);
}
```

### CUIFilter 參數 :

| 名稱 | 類型 | 說明 |
| --- | :---: | :---: |
| label | String | 篩選器名稱, 未設定時不渲染標題區
| noButton |  | 不渲染篩選器按鈕
| items | Array[ \<Component /> ] | 子元件陣列
| sx | Object | sx 樣式物件
| sxLabel | Object | sx 樣式物件, 套用於篩選器標題區
| sxBody | Object | sx 樣式物件, 套用於篩選器內容區
| color | String | mui theme color
| onClick | Function | 點擊篩選器按鈕執行的回呼函式

<br />

## 日期選擇器 (CUIDatePicker)

### 使用 CUIDatePicker :

```
import CUIDatePicker from '@/components/customUI/cui-date-picker';

export default function myComponent() {
    return (<>
        ...
        <CUIDatePicker 
            label={label}
            format={format}
        />
        ...
    </>);
}
```

### CUIDatePicker 參數 :

 - 此元件可傳入所有 MUI Date Picker 的可用參數
 - 此元件設計為可控元件, 做為不可控元件時無法使用 ``onChange`` 參數取值

| 名稱 | 類型 | 說明 |
| --- | :---: | :---: |
| label | String | 日期選擇器名稱
| format | String | 日期格式, 選擇器上顯示的日期與回傳的日期都會套用此格式 (dayjs format)
| value | Any | 預設顯示日期
| minDate | Any | 日期最小值
| maxDate | Any | 日期最大值
| sx | Object | sx 樣式物件
| onChange | Funtion | 改變日期時會執行的回呼函式, 傳入參數為套用 format 格式的字串
 - ``value, defaultValue, minDate, maxDate`` 參數會經過 ``dayjs()`` 套用 ``format`` 參數給予的格式進行轉換為字串

### 示例 :

```
import CUIDatePicker from '@/components/customUI/cui-date-picker';

export default function myComponent() {
    return (<>
        ...
        <CUIDatePicker 
            label={"訓練日期"}
            format={"YYYY-MM-DD"}

            defaultValue={"2023/07/10"}
            // 日期預設顯示 2023-07-10

            value={new Date()}
            // 日期預設顯示當天日期

            minDate={dayjs()}
            // 日期最小值為當天日期 (需引入 dayjs 套件)

            onChange={(date) => console.log(date)} 
            // 若使用者選擇 2022年2月25日 ===> 輸出 2022-02-25
        />
        ...
    </>);
}
```

<br />
