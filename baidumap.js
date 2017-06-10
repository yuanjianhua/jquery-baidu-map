/**
 * 百度地圖V2.0版本 jquery封裝類
 *
 * author     (Mark <105940137@qq.com>)
 * 2017.06.10
 */

(function ($) {
    $.fn.baidumap = function (options) {
        var opts = $.extend({}, $.fn.baidumap.defaults, options);
        $.fn.baidumap.options = opts;

        /* 創建地圖 */
        var map = new BMap.Map(this.attr('id'));

        /* 設置中心點 */
        var point = new BMap.Point(opts.lng, opts.lat);
        /* 設置縮放大小 */
        map.centerAndZoom(point, options.zoom);


        /* 啟用地圖拖動 */
        if (opts.enableDragging)
            map.enableDragging();
        else
            map.disableDragging();

        /* 啟用滾輪放大縮小 */
        if (opts.enableScrollWheelZoom)
            map.enableScrollWheelZoom();


        /* 啟用雙擊放大 */
        if (opts.enableDoubleClickZoom)
            map.enableDoubleClickZoom();
        else
            map.disableDoubleClickZoom();

        /* 啟用鍵盤操作 */
        if (opts.disableKeyboard)
            map.disableKeyboard();

        /* 啟用地圖慣性拖拽 */
        if (opts.enableInertialDragging)
            map.enableInertialDragging();

        /* 啟用連續縮放效果 */
        if (opts.enableContinuousZoom)
            map.enableContinuousZoom();

        /* 啟用自動適應容器尺寸變化 */
        if (opts.enableAutoResize)
            map.enableAutoResize();
        else
            map.disableAutoResize();

        if (opts.enableCopyrightControl) {
            var cr = new BMap.CopyrightControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT
            });
            map.addControl(cr);
            var bs = map.getBounds();
            cr.addCopyright({
                id: 1,
                content: opts.copyrightContent,
                bounds: bs
            });
        }

        $.fn.baidumap.map = map;
        return $.fn.baidumap;
    }

    /**
     * 默認地圖設置
     */
    $.fn.baidumap.defaults = {
        lng: 113.549834, // 經度
        lat: 22.192794, // 緯度
        zoom: 15, // 縮放級別
        enableDragging: true, // 啟用地圖拖動
        enableScrollWheelZoom: true, // 啟用滾輪放大縮小
        enableDoubleClickZoom: true, // 啟用雙擊放大
        disableKeyboard: false, // 啟用鍵盤操作
        enableInertialDragging: false, // 啟用地圖慣性拖拽
        enableContinuousZoom: false, // 啟用連續縮放效果
        enableAutoResize: true, // 啟用自動適應容器尺寸變化
        cursor: 'pointer', // 默認鼠標指針樣式
        enableNavigationControl: true, // 啟用平移縮放控件
        enableOverviewMapControl: false, // 啟用平移縮放控件
        enableGeolocationControl: false, // 啟用地圖定位
        enableScaleControl: true, // 比例尺控件
        enableCopyrightControl: true, // 開啟自定義版權
        copyrightContent: '<a href=\'http://www.poptek.net\' style=\'font-size:12px;color:red;text-decoration:none;\' target=\'_blank\'>普及科技</a>',// 版權資訊
        copyrightAnchor: BMAP_ANCHOR_TOP_RIGHT, // 版權資訊顯示的位置
        enableMapTypeControl: true // 啟用縮略地圖控件
    };

    /**
     *
     * Creates a marker.
     *
     * @param      {array}  options  配置資訊
     *             point：位置 BMap.point 值
     *             icon： 圖標 BMap.icon值
     *             label: 文本標注 BMap.label
     *             title：標注標題
     *             offset:偏移值
     *             zindex:設置覆蓋物的zIndex
     *             enableDragging：開啟移動
     *
     * @return     {BMap}    { description_of_the_return_value }
     */
    $.fn.baidumap.createMarker = function (options) {
        var marker = new BMap.Marker(options.point);

        /* 設置標注所用的圖示對象 */
        if (options.icon) {
            marker.setIcon(options.icon);
        }

        /* 設置文本標注 */
        if (options.label) {
            marker.setLabel(options.label);
        }

        /* 設置標注的標題 */
        if (options.title) {
            marker.setTitle(options.title);
        }

        /* 設置標注的偏移值 */
        if (options.offset) {
            marker.setOffset(options.offset);
        }

        /* 設置覆蓋物的zIndex */
        if (options.zindex) {
            marker.setZIndex(options.zindex);
        }

        /* 是否可以拖動 */
        if (options.enableDragging)
            marker.enableDragging();
        else
            marker.disableDragging();

        /* 設置動畫 */
        if (options.isAnimation)
            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

        $.fn.baidumap.map.addOverlay(marker);
        return marker;
    };

    /**
     * Get Market Position
     * @param marker
     *
     * return lng lat
     */
    $.fn.baidumap.getMarkerPosition = function (marker) {
        var point = marker.getPosition();  //获取marker的位置
        return {'lng': point.lng, 'lat': point.lat};
    }

    /**
     * Creates an icon.
     *
     * @param      {array}  options
     *             url：圖片地址
     *             width: 圖示可視區域的寬度
     *             height: 圖示可視區域的高度
     * @return     {BMap}    { description_of_the_return_value }
     */
    $.fn.baidumap.createIcon = function (options) {
        return new BMap.Icon(options.url, new BMap.Size(options.width, options.height));
    }

    /**
     * Creates an information window.
     *
     * @param      {array}  options  配置資訊
     *             width: 資訊窗口寬度
     *             height: 資訊窗口高度
     *             title:資訊窗口標題
     *             enableMessage:設置允許資訊窗發送短息
     *             message:
     *             content: 提示資訊
     * @return     {BMap}    { description_of_the_return_value }
     */
    $.fn.baidumap.createInfoWindow = function (options) {
        return new BMap.InfoWindow(options.content, options);
    };

    /**
     * Creates a label.
     *
     * @param      {array}  options
     *             content: 文本標注的內容
     *             title: 文本標注的標題
     *             offsetX: 文本標注的偏移值
     *             offsetY: 文本標注的偏移值
     *             style: 文本標注樣式
     *             positionLng: 文本標注座標
     *             positionLat: 文本標注座標
     * @return     {BMap}    { description_of_the_return_value }
     */
    $.fn.baidumap.createLabel = function (options) {
        var label = new BMap.Label(options.content);

        /* 設置文本標注的標題 */
        if (options.title) {
            label.setTitle(options.title);
        }

        /* 設置文本標注的偏移值 */
        if (options.offsetX) {
            label.setOffset(new BMap.Size(options.offsetX, options.offsetY));
        }

        /* 設置文本標注樣式 */
        if (options.style) {
            label.setStyle(options.style);
        }

        /* 設置文本標注座標 */
        if (options.positionLng) {
            label.setPosition(new BMap.Point(options.positionLng, options.positionLat));
        }

        return label;
    };

    /**
     * Creates a context menu.
     *
     * @param      {<type>}  menuOptions  The menu options
     * @return     {BMap}    { description_of_the_return_value }
     */
    $.fn.baidumap.createContextMenu = function (menuOptions) {
        var contextMenu = new BMap.ContextMenu();

        for (var i = 0; i < menuOptions.length; i++) {
            if (menuOptions[i].text == '-')
            /* 分割線 */
                contextMenu.addSeparato();
            else
                contextMenu.addItem(new BMap.MenuItem(menuOptions[i].text, menuOptions[i].callback, 100));
        }

        $.fn.baidumap.map.addContextMenu(contextMenu);
        return contextMenu;
    };

    /**
     * 搜索位置
     *
     * @param $keyword
     */
    $.fn.baidumap.search = function($keyword){
        var local = new BMap.LocalSearch($.fn.baidumap.map, {
            renderOptions:{map: $.fn.baidumap.map}
        });
        local.search($keyword);
    };

    /**
     * 谷歌地圖座標轉換成百度座標
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    $.fn.baidumap.googlePointConvertor = function (options) {
        var convertor = new BMap.Convertor();
        var pointArr = [];
        for (var i = 0; i < options.points.length; i++) {
            pointArr.push(new BMap.Point(options.points[i][0], options.points[i][1]));
        }

        var newPointArr = [];
        convertor.translate(pointArr, 3, 5, function (data) {
            if (data.status === 0) {
                for (var i = 0; i < data.points.length; i++) {
                    newPointArr.push([data.points[i][0], data.points[i][1]]);
                }
            }
        });

        return newPointArr;
    }
})(jQuery);

