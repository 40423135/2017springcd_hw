var tipuesearch = {"pages":[{"title":"About","tags":"misc","url":"./pages/about/","text":"2016Fall 修課成員網誌"},{"title":"第十五周作業","tags":"hw","url":"./di-shi-wu-zhou-zuo-ye.html","text":"請以 W15 練習為網誌標題, 800x600 為畫布大小, 在畫布正中央畫一個半徑為 250 畫素, 壓力角 20, 齒數為 36 齒, 且只有上半齒形的漸開線正齒輪輪廓. 完成後, 請在正齒輪中央寫上自己的學號, 並建立第二個 800x600 的畫布, 請畫出只有一齒輪廓, 且充滿畫布 80% 範圍的正齒輪, 且該齒輪廓下方水平線, 連接兩端齒根圓點交的直線以紅色繪製, 且在齒輪下方以藍色字元寫上自己的學號. 請各學員在各自 github 倉儲中的 data/py 目錄中, 編寫一個可以採圓心座標, 節圓半徑, 齒數, 壓力角與定位角度作為輸入的齒輪程式函式, 交由組長從各組員的 submodule 設定中呼叫導入, 以便在各分組的網頁中完成一個畫出所有組員協同繪圖的齒輪減速組圖, 且各齒輪正中心必須寫上組員學號, 各組按照學號大小排序, 分別由最右邊齒數 16 齒開始囓合, 依序增加 2 齒, 當排至平面四齒囓合後, 第五位組員則以垂直方向向下囓合兩個齒輪後, 轉由右至左水平排列, 直至所有組員均各提供一個協同囓合用的齒輪為止. 請依照上述規劃, 在 Onshape 完成相同齒輪組的囓合協同繪圖. 各組員與組員請同時用 Youtube 與 vimeo, 紀錄上述各階段程式編寫與繪圖配置的 mp4 影片檔案, 標題為\"協同產品設計實習第十五週練習\". 1.請以 W15 練習為網誌標題, 800x600 為畫布大小, 在畫布正中央畫一個半徑為 250 畫素, 壓力角 20, 齒數為 36 齒, 且只有上半齒形的漸開線正齒輪輪廓. window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=22, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 畫出 rp 圓, 畫圓函式尚未定義 # create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 250 # 齒數 n = 36 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") ctx.beginPath() ctx.lineWidth = \"600\" ctx.strokeStyle = \"white\" ctx.moveTo(0,600) ctx.lineTo(800,600) ctx.stroke() 2.第二個 800x600 的畫布, 請畫出只有一齒輪廓, 且充滿畫布 80% 範圍的正齒輪, 且該齒輪廓下方水平線, 連接兩端齒根圓點交的直線以紅色繪製, 且在齒輪下方以藍色字元寫上自己的學號. window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx+rp, midy-rp, midx-rp, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear1'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2+2400 r = 8*(canvas.height/2) # 齒數 n = 20 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"black\") ctx.beginPath() ctx.fillStyle = \"#0000FF\" ctx.font = \"20px ScriptS\" ctx.fillText(\"40423135 \",360,620) ctx.stroke() 3. 請各學員在各自 github 倉儲中的 data/py 目錄中, 編寫一個可以採圓心座標, 節圓半徑, 齒數, 壓力角與定位角度作為輸入的齒輪程式函式, 交由組長從各組員的 submodule 設定中呼叫導入, 以便在各分組的網頁中完成一個畫出所有組員協同繪圖的齒輪減速組圖, 且各齒輪正中心必須寫上組員學號, 各組按照學號大小排序, 分別由最右邊齒數 16 齒開始囓合, 依序增加 2 齒, 當排至平面四齒囓合後, 第五位組員則以垂直方向向下囓合兩個齒輪後, 轉由右至左水平排列, 直至所有組員均各提供一個協同囓合用的齒輪為止. window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy+rp) # 畫出 rp 圓, 畫圓函式尚未定義 # create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear2'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 100 # 齒數 n = 22 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"green\")"},{"title":"第十三周作業","tags":"hw","url":"./di-shi-san-zhou-zuo-ye.html","text":"繪製2D 正齒輪 繪製2D 正齒輪 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=17, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear1'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 y1=(canvas.height)/1.435 r = 0.8*(canvas.height/2) # 齒數 n17 = 17 n11 = 11 n13 = 13 n14 = 14 canvas_size = canvas.height*0.4 r17 = canvas_size*n17/(n17+n11+n13+n14) r11 = canvas_size*n11/(n17+n11+n13+n14) r13 = canvas_size*n13/(n17+n11+n13+n14) r14 = canvas_size*n14/(n17+n11+n13+n14) x17 = x-5 - r17 x11 = x-5 + r11 x13 = x-5+ 2*r11 + r13 x14 = x-5+ 2*r11 + r13 y17 = y y11 = y y13 = y y14 = y1 # 壓力角 pa = 20 gear17 = Spur(ctx).Gear(x17, y17, r17, n17, pa, \"blue\") gear11 = Spur(ctx).Gear(x11, y11, r11, n11, pa, \"red\") gear13 = Spur(ctx).Gear(x13, y13, r13, n13, pa, \"blue\") gear14 = Spur(ctx).Gear(x14, y14, r14, n14, pa, \"red\") div = doc[\"onegear_div\"] 分別為17t-11t-13t-14t"},{"title":"第十二周作業","tags":"hw","url":"./di-shi-er-zhou-zuo-ye.html","text":"1.為何需要減速機? 2.何謂漸開線? 3.如何畫漸開線正齒輪輪廓? 4.如何模擬 2D 正齒輪組囓合？ 5.如何模擬 3D 正齒輪組囓合？ 介紹齒輪 節面：虛擬之滾動圓筒（或錐）表面，其上可以代換不同輪齒。 節圓：節面之正剖面。 齒頂圓：齒端所構成之圓，在齒輪之正剖面。 齒根圓：齒間所構成之圓，在齒輪之正剖面。 齒高：分度圓與齒冠圓間之徑向距離。 齒根：分度圓與齒根圓間之徑向距離。 頂隙：某齒輪之齒根與搭配齒輪之齒冠間之距離。 齒面：在節面以外部份之齒面。 齒腹：在節面以內部份之齒面。 圓周齒厚（亦稱齒厚）：齒在分度圓上之厚度，它是弧長，不是直線長度。 齒距：在節圓上相鄰兩齒之距離。 側隙：為齒輪圓周齒厚與配對之齒輪之齒間之差。理論上側隙應為零，但在實際上為克服製造上之誤差及熱脹的問題，防止運轉時，配對的齒與齒間發生排擠，仍必須存在某程度之空隙。側隙之調整可加大中心矩或在切削時多切除一部份。 周節（齒距，p）：齒寬度與齒間寬度，在節圓上量取。 徑節（P）：以英制為單位，即為節徑上每吋之齒數。齒輪上之齒數不一定為整數，一般常取整數。 模數（m）：分度圓直徑除以齒數，採用SI公制。m=d/z，d以毫米為單位。節徑通常以吋表示；故前面的狀況模數為徑節之倒數，不過所用之單位必須經過轉換。 過渡曲線：輪齒與齒根圓連接過渡處的曲線（端面上看）。 小齒輪：任何相配齒輪之最小齒輪。較大之齒輪則稱為齒輪。 傳動比：單位時間內，驅動（或輸入）齒輪與被動齒輪（輸出）之迴轉數比。 節點：一對相配齒輪之節圓之相切點。 共切點：在節點處與節圓相切之線。 作用線：相配齒輪外形在接觸點之法線。 接觸線：相配齒輪外形接觸點之軌跡。 壓力角（α）：齒輪上某個圓之共切線與通過齒接觸點法線之交角。亦即作用線與共同切線之交角。通常取分度圓上的壓力角為標準值，並稱為分度圓壓力角。 中心距（a）：兩軸之中心距離，以前例a=（d1+d2）/2。【未變位時的中心距】 基圓（Base circle）：虛擬圓，漸開線的發生圓，決定了漸開線的形狀。 3.如何畫漸開線正齒輪輪廓? (17T的齒輪) window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=17, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/4) # 齒數 n = 17 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") (17T、11T、13T齒輪嚙合) window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=17, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear1'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/2) # 齒數 n17 = 17 n11 = 11 n13 = 13 canvas_size = canvas.height*0.4 r17 = canvas_size*n17/(n17+n11+n13) r11 = canvas_size*n11/(n17+n11+n13) r13 = canvas_size*n13/(n17+n11+n13) x17 = x-5 - r17 x11 = x-5 + r11 x13 = x-5+ 2*r11 + r13 y17 = y y11 = y y13 = y # 壓力角 pa = 20 gear17 = Spur(ctx).Gear(x17, y17, r17, n17, pa, \"blue\") gear11 = Spur(ctx).Gear(x11, y11, r11, n11, pa, \"red\") gear13 = Spur(ctx).Gear(x13, y13, r13, n13, pa, \"black\") div = doc[\"onegear_div\"] 4.如何模擬 2D 正齒輪組囓合？ # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window import math # 主要用來取得畫布大小 canvas = doc[\"cango_gear\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx ctx = canvas.getContext(\"2d\") cango = window.Cango.new # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 #cobj = window.Cobj.new shape = window.Shape.new path = window.Path.new creategeartooth = window.createGearTooth.new tweener = window.Tweener.new # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"cango_gear\" 的 canvas 上 cgo = cango(\"cango_gear\") ###################################### # 畫正齒輪輪廓 ##################################### # n 為齒數 n = 11 # pa 為壓力角 pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth m = 0.4*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = shape(data, { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = path(shapedefs.circle(hr)) shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path # setup the animation # backlash (mm) bklsh = 0.04*m # centre shift to make backlash dC = bklsh/(3*math.tan(math.pi*pa/180)) # np 為小齒輪齒數 np = 13 # gear ratio gr = n/np gearConfig = {'cx':-pr, 'cy':0, 'degs':[0, 360]} # gr*0.666 rpm #pinionConfig = {'cx':pr+dC, 'cy':0, 'degs':[0, -gr*360]} # 0.666 rpm twnr = tweener(0, 90000, \"loop\") cx = canvas.width/2 cy = canvas.height/2 #gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 #cgo.render(gear) #cgo.render(gear2) #cgo.render(gear3) # 利用 gear 資料複製一份, 命名為 gear gear1 = gear.dup() gear2 = gear1.dup() gear3 = gear1.dup() from time import time from browser.timer import request_animation_frame as raf from browser.timer import set_interval deg = math.pi/180 def draw(): cgo.clearCanvas() gear.rotate(2*deg) # 在特定位置, 以特定 scale, 特定 degs 執行 render cgo.render(gear, {'x':cx-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear1.rotate(-2*deg) cgo.render(gear1, {'x':cx+pr*2*0.5-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear2.rotate(2*deg) cgo.render(gear2, {'x':cx+pr*2*0.5*2-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear3.rotate(-2*deg) cgo.render(gear3, {'x':cx+pr*2*0.5*2-pr/2, 'y':1.43*cy, 'scl':0.5, 'degs':147}) set_interval(draw, 2)"},{"title":"第十一周作業","tags":"hw","url":"./di-shi-yi-zhou-zuo-ye.html","text":"協同 2D 正齒輪傳動繪圖 2D 靜態網際繪圖 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=17, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 0.8*(canvas.height/4) # 齒數 n = 17 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") 3D 減速齒輪組動態模擬 # 將 導入的 document 設為 doc 主要原因在於與舊程式碼相容 from browser import document as doc # 由於 Python3 與 Javascript 程式碼已經不再混用, 因此來自 Javascript 的變數, 必須居中透過 window 物件轉換 from browser import window import math # 主要用來取得畫布大小 canvas = doc[\"cango_gear\"] # 此程式採用 Cango Javascript 程式庫繪圖, 因此無需 ctx ctx = canvas.getContext(\"2d\") cango = window.Cango.new # 針對變數的轉換, shapeDefs 在 Cango 中資料型別為變數, 可以透過 window 轉換 shapedefs = window.shapeDefs # 目前 Cango 結合 Animation 在 Brython 尚無法運作, 此刻只能繪製靜態圖形 # in CangoAnimation.js #interpolate1 = window.interpolate # Cobi 與 createGearTooth 都是 Cango Javascript 程式庫中的物件 #cobj = window.Cobj.new shape = window.Shape.new path = window.Path.new creategeartooth = window.createGearTooth.new tweener = window.Tweener.new # 經由 Cango 轉換成 Brython 的 cango, 指定將圖畫在 id=\"cango_gear\" 的 canvas 上 cgo = cango(\"cango_gear\") ###################################### # 畫正齒輪輪廓 ##################################### # n 為齒數 n = 11 # pa 為壓力角 pa = 25 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 # Module = mm of pitch diameter per tooth m = 0.4*canvas.width/n # pr 為節圓半徑 pr = n*m/2 # gear Pitch radius # generate gear data = creategeartooth(m, n, pa) # Brython 程式中的 print 會將資料印在 Browser 的 console 區 #print(data) gearTooth = shape(data, { \"fillColor\":\"#ddd0dd\", \"border\": True, \"strokeColor\": \"#606060\" }) gearTooth.rotate(180/n) # rotate gear 1/2 tooth to mesh # 單齒的齒形資料經過旋轉後, 將資料複製到 gear 物件中 gear = gearTooth.dup() # gear 為單一齒的輪廓資料 #cgo.render(gearTooth) # 利用單齒輪廓旋轉, 產生整個正齒輪外形 for i in range(1, n): # 將 gearTooth 中的資料複製到 newTooth newTooth = gearTooth.dup() # 配合迴圈, newTooth 的齒形資料進行旋轉, 然後利用 appendPath 方法, 將資料併入 gear newTooth.rotate(360*i/n) # appendPath 為 Cango 程式庫中的方法, 第二個變數為 True, 表示要刪除最前頭的 Move to SVG Path 標註符號 gear.appendPath(newTooth, True) # trim move command = True # 建立軸孔 # add axle hole, hr 為 hole radius hr = 0.6*pr # diameter of gear shaft shaft = path(shapedefs.circle(hr)) shaft.revWinding() gear.appendPath(shaft) # retain the 'moveTo' command for shaft sub path # setup the animation # backlash (mm) bklsh = 0.04*m # centre shift to make backlash dC = bklsh/(3*math.tan(math.pi*pa/180)) # np 為小齒輪齒數 np = 13 # gear ratio gr = n/np gearConfig = {'cx':-pr, 'cy':0, 'degs':[0, 360]} # gr*0.666 rpm #pinionConfig = {'cx':pr+dC, 'cy':0, 'degs':[0, -gr*360]} # 0.666 rpm twnr = tweener(0, 90000, \"loop\") cx = canvas.width/2 cy = canvas.height/2 #gear.translate(cx, cy) # render 繪出靜態正齒輪輪廓 #cgo.render(gear) #cgo.render(gear2) # 利用 gear 資料複製一份, 命名為 gear gear1 = gear.dup() gear2 = gear1.dup() from time import time from browser.timer import request_animation_frame as raf from browser.timer import set_interval deg = math.pi/180 def draw(): cgo.clearCanvas() gear.rotate(2*deg) # 在特定位置, 以特定 scale, 特定 degs 執行 render cgo.render(gear, {'x':cx-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear1.rotate(-2*deg) cgo.render(gear1, {'x':cx+pr*2*0.5-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) gear2.rotate(2*deg) cgo.render(gear2, {'x':cx+pr*2*0.5*2-pr/2, 'y':cy, 'scl':0.5, 'degs':0}) set_interval(draw, 2)"},{"title":"期中自評作業","tags":"hw","url":"./qi-zhong-zi-ping-zuo-ye.html","text":"心得: 透過老師的上課影片教學,可以讓我了解到 v-rep如何分解零件、設置旋轉軸 看老師上課做滿難的，自己看影片實際跟著做練習了一次!"},{"title":"第五周作業","tags":"hw","url":"./di-wu-zhou-zuo-ye.html","text":"利用v-rep設定單連桿運動 利用v-rep設定單連桿運動影片 v rep單連桿影片 from 40423135 on Vimeo . 心得: 透過老師的上課影片教學,可以讓我了解到 v-rep如何分解零件、設置旋轉軸 看老師上課做滿難的，自己看影片實際跟著做練習了一次!"},{"title":"第四周作業","tags":"hw","url":"./di-si-zhou-zuo-ye.html","text":"利用網誌與簡報說明安裝或使用 Hyperworks 套件過程與心得 - 課程結束前, 希望能夠使用 Hyperworks 進行連桿機構零件的應力分析與機構運動模擬. 平面四連桿機構的運動路徑方程式推導與網際 2D 繪圖, 方程式推導以 sympy 完成, 而 2D 繪圖則以 Brython 在各組網誌中完成. 先了解如何推導四連桿機構的運動方程式, 然後在各組網誌中完成靜態繪圖與動態模擬. 為各班各組在 https://mde2a2.kmol.info 主機上建立 cdbg1~ cdbg8, 以及 cdag1 ~ cdag8 等線上 Fossil SCM 倉儲, 用來管理各組協同產品設計實習過程中的純文件檔案 單連桿製作及導入v-rep 單連桿零件一 單連桿零件一繪製影片 導入v-rep 零件一 from 40423135 on Vimeo . 單連桿零件二 單連桿零件二繪製影片 導入v-rep 零件二 from 40423135 on Vimeo . 單連桿零件三 單連桿零件三繪製影片 導入v-rep 零件三.mp4 from 40423135 on Vimeo . 單連桿組裝完成圖 單連桿組裝影片 組合 from 40423135 on Vimeo . 單連桿導入v-rep影片 導入v-rep from 40423135 on Vimeo . 網際動態模擬 window.onload=function(){ brython({debug:1, pythonpath:['./../data/py']}); } from browser import window cango2d = window.Cango2D.new shapedefs = window.shapeDefs obj2d = window.Obj2D.new tweener = window.Tweener.new cgo = cango2d(\"robot\") # 清除畫面 cgo.clearCanvas(\"lightyellow\") cgo.setWorldCoords(-50, -50, 300) # 加上基軸與第一桿 # 畫筆移到 -20, -10, 畫直線到 -10,-10 以及 -10,0 standData = ['M', -20,-10, 'L', -10,-10, -10,0, 'A', 10,10,0,0,0,10,0, 'L',10,-10, 20,-10, 20,-40, -20,-40,'z'] stand = obj2d(standData, \"SHAPE\", { \"fillColor\":'darkgray', \"border\": True, \"strokeColor\": \"#222222\" }) axle0 = obj2d(shapedefs.circle(10), \"SHAPE\", { \"fillColor\":'gray', \"border\": True, \"strokeColor\": \"#222222\" }) armGrp = cgo.createGroup2D(stand, axle0) segData = ['M',0,-8, 'A',8,8,0,0,0,0,8, 'L',50,8, 'A',8,8,0,0,0,50,-8, 'Z'] seg1 = obj2d(segData, \"SHAPE\", { \"fillColor\":'darkGray', \"border\": True, \"strokeColor\": \"#222222\", \"zIndex\": -1 }) # 利用 zIndex 決定疊層的先後次序 axle1 = obj2d(shapedefs.circle(8), \"SHAPE\", { \"fillColor\":'gray', \"border\": True, \"strokeColor\": \"#222222\", \"zIndex\": 1 }) axle1.translate(50, 0) seg1Grp = cgo.createGroup2D(seg1, axle1) armGrp.addObj(seg1Grp) # 加上第二軸 seg2 = obj2d(segData, \"SHAPE\", { \"fillColor\":'darkGray', \"border\": True, \"strokeColor\": \"#222222\", \"zIndex\": -1 }) axle2 = obj2d(shapedefs.circle(8), \"SHAPE\", { \"fillColor\":'gray', \"border\": True, \"strokeColor\": \"#222222\", \"zIndex\": 1 }) axle2.translate(50, 0) seg2Grp = cgo.createGroup2D(seg2, axle2) cgo.render(seg2Grp) # 請注意 seg2Grp 加上 seg1Grp 物件上 seg1Grp.addObj(seg2Grp) seg3 = obj2d(segData, \"SHAPE\", { 'fillColor':'darkGray', 'border': True, 'strokeColor': \"#222222\", 'zIndex': -1 }) axle3 = obj2d(shapedefs.circle(6), \"SHAPE\", { 'fillColor':'gray', 'border': True, 'strokeColor': \"#222222\", 'zIndex': 1 }) axle3.translate(50, 0) seg3Grp = cgo.createGroup2D(seg3, axle3) seg2Grp.addObj(seg3Grp) seg4Data = ['M',0,-6, 'A',6,6,0,0,0,0,6, 'L',40,6, 40,12, 50,12, 50,-12, 40,-12, 40,-6, 'Z'] seg4 = obj2d(seg4Data, \"SHAPE\", { 'fillColor':'darkGray', 'border': True, 'strokeColor': \"#222222\", 'zIndex': -1 }) seg3Grp.addObj(seg4) # setup animation animData = {'s1': [0, 80, 45, 0], 's2': [0, -60, -60, 0], 's3': [0, -90, 0, 90, 0], 's4': [0, 30, -90, 0]} armTwnr = tweener(0, 3500, 'loop') def initArm(opts): seg2Grp.transform.translate(50,0) seg3Grp.transform.translate(50,0) seg4.transform.translate(50,0) def armPathFn(time, opts): seg1Rot = armTwnr.getVal(time, opts.s1) seg2Rot = armTwnr.getVal(time, opts.s2) seg3Rot = armTwnr.getVal(time, opts.s3) seg4Rot = armTwnr.getVal(time, opts.s4) seg1Grp.transform.rotate(seg1Rot) seg2Grp.transform.rotate(seg2Rot) seg2Grp.transform.translate(50,0) seg3Grp.transform.rotate(seg3Rot) seg3Grp.transform.translate(50,0) seg4.transform.rotate(seg4Rot) seg4.transform.translate(50,0) cgo.animate(armGrp, initArm, armPathFn, animData) cgo.playAnimation() 心得:這周畫了跟第一周很相似的單連桿，因為有第一次的練習所以這次用solvespace話就很快，也練習了導入v-rep"},{"title":"第三周作業","tags":"hw","url":"./di-san-zhou-zuo-ye.html","text":"翻譯影片 hyperworks3 hyperworks3 from 虎尾科大機械設計工程 on Vimeo . Optistuct's one of our focus area Optistuct是我們的重點領域之一 is nonlinear large deformation analysis and in 2017 we added nonlinear transient analysis the main purpose was to couple Acusolve and structure interaction but also one development that happens during the last year came 是非線性大變形分析，在2017年，我們添加了非線性瞬態分析，其主要目的是耦合Acusolve和結構的相互作用，但也發生在去年發生的一個發展 out these lights and different point releases and it's all really maturing in 2017 is our contact analysis we have different ways of defining large sliding contact and things like that the fast contact analysis for for small 這些燈和不同點的釋放，這一切都在2017年真正成熟是我們的聯繫分析我們有不同的方式來定義大滑動接觸和事情，如快速接觸分析為小 deformation is blazing fast at the very simple idea that makes a solution very fast and that adds to optistruct as really a leading nonlinear structural solver our two major optimization packages are optistruct 變形是快速的，在一個非常簡單的想法，使解決方案非常快，並增加了optistruct作為真正的領先的非線性結構解算器我們的兩個主要優化包是光 for structural optimization as a huge multidisciplinary component tools and hyperstudy for general optimization work on multidisciplinary optimization Optistruct spend a lot of time continuing the 結構優化作為一個巨大的多學科組件工具和hyperstudy對多學科優化的一般優化工作Optistruct花費大量的時間繼續 development for topology optimization and we have the wave topology optimization we kept on working on the manufacturing solution to designed optimization the multimodal optimization is really maturing and we find more and 拓撲優化的開發，我們有波拓撲優化，我們繼續致力於製造解決方案設計優化多模態優化是真正成熟的，我們發現更多， more applications where that help our goal is actually to include all the physics in the optimizations of the team right now is working on optimization for nonlinear problems and so on and then hyperstudy on the other hand is going 更多的應用程序，其中幫助我們的目標是實際上包括所有的物理在團隊的優化現在是工作在非線性問題的優化等等，然後hyperstudy另一方面是 through a new transformation of the user experience or the user experience has changed a few years back but we are now trying to make it much more easy to use by hiding a lot of the advanced functionality to the regular users and 通過用戶體驗的新轉型或用戶體驗已經改變了幾年，但是我們現在正試圖通過隱藏許多高級功能給常規用戶更容易使用， depending on the level of expertise or depending on the job that the user has to do they can customize the user experience he added a few new connection one of them is a flux connection such as the electromagnetic code that we just 取決於專業水平或根據用戶必須做的工作，他們可以定制用戶體驗他添加了一些新的連接，其中一個是通量連接，如電磁代碼，我們只是 acquired for a low frequency electromagnetic we can now take a flux database and put it into hyper study into your study as well 獲得了一個低頻電磁，我們現在可以採取通量數據庫，並把它進入高速研究"},{"title":"第二周作業","tags":"hw","url":"./di-er-zhou-zuo-ye.html","text":"利用solvespace組立及v-rep應用 完成圖 HTML 作業心得"},{"title":"第一周作業","tags":"hw","url":"./di-yi-zhou-zuo-ye.html","text":"利用solvespace及onshape組裝四連桿機構 零件1 30公分連桿 零件1 繪製影片 solvespace連桿零件一 from 40423135 on Vimeo . 零件2 50公分連桿 零件2 繪製影片 solvespace連桿零件二 from 40423135 on Vimeo . 零件3 60公分連桿 零件3 繪製影片 solvespace連桿零件三 from 40423135 on Vimeo . solvespace組裝影片 心得 第一周作業畫了上學期學過的solvespace 有點久沒有畫所以畫起來卡卡的 不過畫完這三個試圖後感覺也差不多找回來了 繼續努力 加油"}]};