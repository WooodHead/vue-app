<template lang="html">
  <div class="goods content">
    <div class="goods-header padding-rl-10 padding-tb-6">
      <router-link to="/home">
        <span class="iconfont color-primary font-3x">&#xe6b8;</span>
      </router-link>
       <router-link to="/category">
        <span class="iconfont color-primary font-3x pull-right">&#xe616;</span>
      </router-link>
    </div>
    
    <div style="height:100%">
      <swiper style="width:100%;margin:0 auto;" :aspect-ratio="375/375" dots-position="center">
        <swiper-item v-for="(item,index) in goods_data.data" class="link-img">
           <img :src="Root+item.l_url" alt="">
        </swiper-item>
      </swiper>
      <flexbox :gutter="0" wrap="nowrap" class="bg-white">
        <flexbox-item class="padding-tb-6 padding-l-10 border-box" :span="9">
          <p class="line-ellispse-2">{{goods_data.data[0].name}}</p>
          <p class="color-dark">bn: {{goods_data.data[0].bn}}</p>
          <p class="color-danger font-2x">¥{{goods_data.data[0].price}}</p>
          <p class="color-dark">市场价:<s>¥{{goods_data.data[0].mktprice||'暂无'}}</s></p>
        </flexbox-item>
        <flexbox-item :span="3" class="link-img padding-rl-6 border-box">
          <vue-q-art v-if="false" :config="config" class="qrcode-content"></vue-q-art>
        </flexbox-item>
      </flexbox>
      <div class="padding-10 margin-tb-10 bg-white" @click="toggle_popup_show">
        <flexbox :gutter="0" wrap="nowrap">
          <flexbox-item :span="11">
            <p>颜色: <span class="padding-rl-4 color-dark" v-for="(item,index) in color_arr">{{item}}</span></p>
            <p>尺码: <span class="padding-rl-4 color-dark" v-for="(item,index) in size_arr">{{item}}</span></p>
          </flexbox-item>
          <flexbox-item :span="1">
            <span class="iconfont color-danger">&#xe65f;</span>
          </flexbox-item>
        </flexbox>
      </div>
      <div class="margin-tb-10 padding-rl-10 padding-tb-6 bg-white">
        <x-button mini plain type="warn">优惠</x-button>
      </div>
      <div class="goods-desc" style="height:100%;padding-bottom:3rem;">
        <tab v-model="index" active-color="#FB4F5B">
          <tab-item>商品详情</tab-item>
          <tab-item>服务信息</tab-item>
          <tab-item>评价</tab-item>
        </tab>
        <div v-if="index==0" class="padding-rl-4">
            <div v-html="goods_data.data[0].intro"></div>
        </div>
        <div v-if="index==1" class="params-cell">
            服务信息内容
        </div>
        <div v-if="index==2" class="padding-10">
          商品评价列表
        </div>
      </div>
     <img class="previewer-demo-img" v-if="false" v-for="(item, index) in list" :src="item.src" width="100" @click="show(index)">
       <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <popup v-model="popup_show" height="65%" :hide-on-blur="true" class="bg-white">
      <div class="close-box clear-float padding-rl-10">
        <div class="close-btn text-center circle pull-right bg-danger" @click="toggle_popup_show">
          <span class="iconfont font-3x color-white">&#xe606;</span>
        </div>
      </div>
      <group>
        <cell class="padding-tb-10">  
          <flexbox :gutter="6" wrap="nowrap">
              <flexbox-item :span="3" class="link-img"><img :src="Root+goods_data.data[0].m_url" alt=""></flexbox-item>
              <flexbox-item :span="9">
                <p class="line-ellispse-2 font-normal color-dark">{{goods_data.data[0].name}}</p>
                <p class="color-danger font-2x">¥{{goods_data.data[0].price}}</p>
                <p class="color-gray font-normal">市场价:¥<s>{{goods_data.data[0].mktprice}}</s></p>
              </flexbox-item>
            </flexbox>
        </cell>
      </group>
      <div class="font-normal padding-rl-10">
            <div class="title font-normal padding-t-10">
              颜色:
            </div>
            <div class="color-arr padding-b-10">
             <x-button mini type="primary" style="margin-right:5px;" v-for="(item,index) in color_arr" plain>{{item}}</x-button>
            </div>
      </div>
      <div class="font-normal padding-rl-10 border-1px-t">
            <div class="title font-normal padding-t-10">
              尺码:
            </div>
            <div class="size-arr padding-b-10">
             <x-button mini type="primary" style="margin-right:5px;" v-for="(item,index) in size_arr" plain>{{item}}</x-button>
            </div>
      </div>
      <div class="font-normal panel-cart padding-t-10 border-1px-t">
            <x-number class="font-normal" title="库存" :min="1" :max="10"></x-number>
      </div>
      <div class="navbar-box">
        <tabbar class="color-white">
            <tabbar-item class="bg-white">
              <flexbox slot="label" class="text-center color-dark" :gutter="0">
                <flexbox-item class="vertical-flex border-1px-r"><span class="iconfont">&#xe61e;</span><span>收藏</span></flexbox-item>
                <flexbox-item class="vertical-flex"><span class="iconfont">&#xe67b;</span><span>购物车</span></flexbox-item>
              </flexbox>
            </tabbar-item>
            <tabbar-item class="bg-primary">
              <span slot="label" class="color-white">加入购物车</span>
            </tabbar-item>
             <tabbar-item class="bg-danger">
              <span slot="label" class="color-white">立即购买</span>
            </tabbar-item>
        </tabbar>
      </div>
    </popup>
  </div>

</template>
<script>
import VueQArt from 'vue-qart'
import QArt from 'qartjs'
import api from '../api/index.js'
  import {Swiper,Flexbox,FlexboxItem,XButton,Tab,TabItem,SwiperItem,Group,Cell,Previewer,Popup,XNumber,Tabbar,TabbarItem} from 'vux'
  export default {
    name: 'goods',
    data: function () {
      return {
        config: {
          value: window.location.href,
          imagePath: '/static/slice/girl_avatar.jpg',
          filter: 'color'
        },
        popup_show:false,
        index: 0,
        goods_id: 0,
        item_index: 0,
        Root:window.location.host!="mall.yingerfashion.com"?"http://mall.yingerfashion.com/":'/',
        page_goods_data: {},
        current_page: 0,
        temp_data:{},
        collapse1:true,
        collapse2:true,
        collapse3:true,
        collapse4:true,
        collapse5:true,
        color_arr:["红色","白色","藏蓝","灰色","粉红","黄色","棕色"],
        size_arr:["38","39","40","41","42","44"],
        list: [],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
         }
        },
        product_data:{
            "rsp": "succ",
            "data": [{
                    "product_id": "48633",
                    "jooge_product_id": "JOKZT22748867953p0",
                    "goods_id": "10239",
                    "barcode": "0",
                    "title": null,
                    "bn": "909712013005136",
                    "price": "1431.00",
                    "cost": "0.00",
                    "mktprice": "1590.00",
                    "name": "INSUN恩裳2017年春裤子9097120130",
                    "weight": "0.000",
                    "g_weight": null,
                    "unit": "",
                    "store": 54,
                    "store_place": null,
                    "freez": null,
                    "goods_type": "normal",
                    "spec_info": "颜色：蓝色、尺码：36",
                    "spec_desc": {
                        "spec_value": {
                            "1": "蓝色",
                            "2": "36"
                        },
                        "spec_private_value_id": {
                            "1": "148375651388",
                            "2": "148375651322"
                        },
                        "spec_value_id": {
                            "1": "88",
                            "2": "22"
                        }
                    },
                    "is_default": "true",
                    "qrcode_image_id": "22c0473254439e55aaae6ed9a6bbc316",
                    "uptime": null,
                    "last_modify": "1491034061",
                    "disabled": "false",
                    "marketable": "true",
                    "is_sync": "true"
                },
                {
                    "product_id": "48634",
                    "jooge_product_id": "JOKZT22748867953p1",
                    "goods_id": "10239",
                    "barcode": "0",
                    "title": null,
                    "bn": "909712013005138",
                    "price": "1431.00",
                    "cost": "0.00",
                    "mktprice": "1590.00",
                    "name": "INSUN恩裳2017年春裤子9097120130",
                    "weight": "0.000",
                    "g_weight": null,
                    "unit": "",
                    "store": 109,
                    "store_place": null,
                    "freez": null,
                    "goods_type": "normal",
                    "spec_info": "颜色：蓝色、尺码：38",
                    "spec_desc": {
                        "spec_value": {
                            "1": "蓝色",
                            "2": "38"
                        },
                        "spec_private_value_id": {
                            "1": "148375651388",
                            "2": "148375651324"
                        },
                        "spec_value_id": {
                            "1": "88",
                            "2": "24"
                        }
                    },
                    "is_default": "true",
                    "qrcode_image_id": "be03f7bda5e11d203976ea6a7b7b12e3",
                    "uptime": null,
                    "last_modify": "1491034060",
                    "disabled": "false",
                    "marketable": "true",
                    "is_sync": "true"
                },
                {
                    "product_id": "48635",
                    "jooge_product_id": "JOKZT22748867953p2",
                    "goods_id": "10239",
                    "barcode": "0",
                    "title": null,
                    "bn": "909712013005140",
                    "price": "1431.00",
                    "cost": "0.00",
                    "mktprice": "1590.00",
                    "name": "INSUN恩裳2017年春裤子9097120130",
                    "weight": "0.000",
                    "g_weight": null,
                    "unit": "",
                    "store": 62,
                    "store_place": null,
                    "freez": null,
                    "goods_type": "normal",
                    "spec_info": "颜色：蓝色、尺码：40",
                    "spec_desc": {
                        "spec_value": {
                            "1": "蓝色",
                            "2": "40"
                        },
                        "spec_private_value_id": {
                            "1": "148375651388",
                            "2": "148375651326"
                        },
                        "spec_value_id": {
                            "1": "88",
                            "2": "26"
                        }
                    },
                    "is_default": "false",
                    "qrcode_image_id": "5953476569e8eae379ac1597a35f1c9e",
                    "uptime": null,
                    "last_modify": "1491034061",
                    "disabled": "false",
                    "marketable": "true",
                    "is_sync": "true"
                },
                {
                    "product_id": "48636",
                    "jooge_product_id": "JOKZT22748867953p3",
                    "goods_id": "10239",
                    "barcode": "0",
                    "title": null,
                    "bn": "909712013005142",
                    "price": "1431.00",
                    "cost": "0.00",
                    "mktprice": "1590.00",
                    "name": "INSUN恩裳2017年春裤子9097120130",
                    "weight": "0.000",
                    "g_weight": null,
                    "unit": "",
                    "store": 31,
                    "store_place": null,
                    "freez": "0",
                    "goods_type": "normal",
                    "spec_info": "颜色：蓝色、尺码：42",
                    "spec_desc": {
                        "spec_value": {
                            "1": "蓝色",
                            "2": "42"
                        },
                        "spec_private_value_id": {
                            "1": "148375651388",
                            "2": "148375651360"
                        },
                        "spec_value_id": {
                            "1": "88",
                            "2": "60"
                        }
                    },
                    "is_default": "false",
                    "qrcode_image_id": "9badcd88fc276fcfe56fe8329241f7b9",
                    "uptime": null,
                    "last_modify": "1491034060",
                    "disabled": "false",
                    "marketable": "true",
                    "is_sync": "true"
                }
            ],
            "res": ""
        },
        goods_data:{
          "rsp": "succ",
          "data": [{
                  "image_id": "403fb8c99ceb97f625033d973fdef92c",
                  "storage": "filesystem",
                  "image_name": "主图-(22).jpg",
                  "ident": "/fe/66/46/62349ab12b9079582f9e726c66de7784ee439be0.jpg",
                  "url": "public/images/fe/66/46/62349ab12b9079582f9e726c66de7784ee439be0.jpg",
                  "l_ident": "/69/a5/3a/1843a06a3f0329fcfd357c8477a8c2490b984532.jpg",
                  "l_url": "public/images/69/a5/3a/1843a06a3f0329fcfd357c8477a8c2490b984532.jpg",
                  "m_ident": "/de/b4/be/ec8ed0acb01951f25ca53fe2243aa2d09f559122.jpg",
                  "m_url": "public/images/de/b4/be/ec8ed0acb01951f25ca53fe2243aa2d09f559122.jpg",
                  "s_ident": "/03/71/16/dada49da46a64f0d5fae4495a943477d0818a360.jpg",
                  "s_url": "public/images/03/71/16/dada49da46a64f0d5fae4495a943477d0818a360.jpg",
                  "width": "640",
                  "height": "640",
                  "watermark": "true",
                  "build_size": null,
                  "last_modified": "1491026353",
                  "attach_id": "149508",
                  "target_id": "10239",
                  "target_type": "goods",
                  "goods_id": "10239",
                  "jooge_goods_id": "JOKZT22748867953",
                  "bn": "9097120130",
                  "name": "INSUN恩裳2017年春裤子9097120130",
                  "price": "1431.00",
                  "type_id": "2",
                  "cat_id": "6",
                  "brand_id": "2",
                  "marketable": "true",
                  "store": "256",
                  "fav": "0",
                  "notify_num": "0",
                  "uptime": "1491026358",
                  "downtime": "1486973303",
                  "last_modify": "1491034061",
                  "p_order": "30",
                  "sortnum": "999999999",
                  "d_order": "30",
                  "score": null,
                  "cost": "0.00",
                  "mktprice": "1590.00",
                  "weight": "0.000",
                  "g_weight": "0.000",
                  "unit": "",
                  "brief": "",
                  "goods_type": "normal",
                  "image_default_id": "403fb8c99ceb97f625033d973fdef92c",
                  "udfimg": "false",
                  "thumbnail_pic": "",
                  "small_pic": null,
                  "big_pic": null,
                  "intro": "&nbsp;\n<img src=\"http://mall.yingerfashion.com/public/images/86/a9/ac/c93c94897e3a9c752a94410f05be35c6caa81d7d.jpg?1486973299#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/73/eb/5f/aa4c7ffa806b804ec0ed8ffe889da1097eb42f26.jpg?1486973299#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/85/8e/a7/d5678ae14bb74099f57ad0173c086bced75ecb1d.jpg?1486973300#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/1e/cb/0c/daefcf2887d583af0712044b046ba6d2ad765ea6.jpg?1486973300#h\" width=\"100%\">",
                  "store_place": null,
                  "min_buy": null,
                  "package_scale": "1.00",
                  "package_unit": "",
                  "package_use": null,
                  "score_setting": "number",
                  "store_prompt": null,
                  "nostore_sell": "0",
                  "goods_setting": "a:1:{s:14:\"goods_template\";s:1:\"0\";}",
                  "spec_desc": "a:2:{i:1;a:1:{i:148375651388;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651388\";s:10:\"spec_value\";s:6:\"蓝色\";s:13:\"spec_value_id\";s:2:\"88\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}}i:2;a:4:{i:148375651322;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651322\";s:10:\"spec_value\";s:2:\"36\";s:13:\"spec_value_id\";s:2:\"22\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651324;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651324\";s:10:\"spec_value\";s:2:\"38\";s:13:\"spec_value_id\";s:2:\"24\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651326;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651326\";s:10:\"spec_value\";s:2:\"40\";s:13:\"spec_value_id\";s:2:\"26\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651360;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651360\";s:10:\"spec_value\";s:2:\"42\";s:13:\"spec_value_id\";s:2:\"60\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}}}",
                  "params": "a:0:{}",
                  "disabled": "false",
                  "rank_count": "0",
                  "comments_count": "0",
                  "view_w_count": "0",
                  "view_count": "0",
                  "count_stat": "a:1:{s:3:\"buy\";a:2:{i:17240;d:1;i:17250;d:2;}}",
                  "buy_count": "3",
                  "buy_w_count": "2",
                  "barcode": "0",
                  "wx_image_id": "",
                  "ipad_image_id": "",
                  "is_line": "0",
                  "fx_1_price": "0",
                  "fx_2_price": "0",
                  "fx_3_price": "0",
                  "goods_status": "0",
                  "modify_status": "0",
                  "price_modify": null,
                  "good_form": null,
                  "buy_limit": "0",
                  "taxrate": null,
                  "tip_id": "1",
                  "pmt_text": "",
                  "pmt_color": null,
                  "goods_profit_ratio": "0",
                  "is_pkg": "0",
                  "pkg_info": "a:4:{s:6:\"master\";s:0:\"\";s:5:\"slave\";s:0:\"\";s:9:\"matchSpec\";s:0:\"\";s:8:\"specRows\";s:0:\"\";}",
                  "from_time": null,
                  "to_time": null,
                  "is_starbuy": "0",
                  "rule_id": "0",
                  "is_new": "false"
              },
              {
                  "image_id": "a536a472a60088e3b8bf4b52bb511be7",
                  "storage": "filesystem",
                  "image_name": "主图-(33).jpg",
                  "ident": "/d4/ca/7f/b515ea4fcdc0f81e0c6505fb1f09ed506b2cba85.jpg",
                  "url": "public/images/d4/ca/7f/b515ea4fcdc0f81e0c6505fb1f09ed506b2cba85.jpg",
                  "l_ident": "/48/e7/ae/eb8d53850ad1356b746aa2d1ffc0cade279185ac.jpg",
                  "l_url": "public/images/48/e7/ae/eb8d53850ad1356b746aa2d1ffc0cade279185ac.jpg",
                  "m_ident": "/1e/7d/ce/7f5ed5e741e292e607d323528c9ed9674d41520c.jpg",
                  "m_url": "public/images/1e/7d/ce/7f5ed5e741e292e607d323528c9ed9674d41520c.jpg",
                  "s_ident": "/48/ed/18/9e314dc3fd92bca6c94f3b368e23501f1fd3b77b.jpg",
                  "s_url": "public/images/48/ed/18/9e314dc3fd92bca6c94f3b368e23501f1fd3b77b.jpg",
                  "width": "640",
                  "height": "640",
                  "watermark": "true",
                  "build_size": null,
                  "last_modified": "1491026353",
                  "attach_id": "149509",
                  "target_id": "10239",
                  "target_type": "goods",
                  "goods_id": "10239",
                  "jooge_goods_id": "JOKZT22748867953",
                  "bn": "9097120130",
                  "name": "INSUN恩裳2017年春裤子9097120130",
                  "price": "1431.00",
                  "type_id": "2",
                  "cat_id": "6",
                  "brand_id": "2",
                  "marketable": "true",
                  "store": "256",
                  "fav": "0",
                  "notify_num": "0",
                  "uptime": "1491026358",
                  "downtime": "1486973303",
                  "last_modify": "1491034061",
                  "p_order": "30",
                  "sortnum": "999999999",
                  "d_order": "30",
                  "score": null,
                  "cost": "0.00",
                  "mktprice": "1590.00",
                  "weight": "0.000",
                  "g_weight": "0.000",
                  "unit": "",
                  "brief": "",
                  "goods_type": "normal",
                  "image_default_id": "403fb8c99ceb97f625033d973fdef92c",
                  "udfimg": "false",
                  "thumbnail_pic": "",
                  "small_pic": null,
                  "big_pic": null,
                  "intro": "&nbsp;\n<img src=\"http://mall.yingerfashion.com/public/images/86/a9/ac/c93c94897e3a9c752a94410f05be35c6caa81d7d.jpg?1486973299#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/73/eb/5f/aa4c7ffa806b804ec0ed8ffe889da1097eb42f26.jpg?1486973299#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/85/8e/a7/d5678ae14bb74099f57ad0173c086bced75ecb1d.jpg?1486973300#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/1e/cb/0c/daefcf2887d583af0712044b046ba6d2ad765ea6.jpg?1486973300#h\" width=\"100%\">",
                  "store_place": null,
                  "min_buy": null,
                  "package_scale": "1.00",
                  "package_unit": "",
                  "package_use": null,
                  "score_setting": "number",
                  "store_prompt": null,
                  "nostore_sell": "0",
                  "goods_setting": "a:1:{s:14:\"goods_template\";s:1:\"0\";}",
                  "spec_desc": "a:2:{i:1;a:1:{i:148375651388;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651388\";s:10:\"spec_value\";s:6:\"蓝色\";s:13:\"spec_value_id\";s:2:\"88\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}}i:2;a:4:{i:148375651322;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651322\";s:10:\"spec_value\";s:2:\"36\";s:13:\"spec_value_id\";s:2:\"22\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651324;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651324\";s:10:\"spec_value\";s:2:\"38\";s:13:\"spec_value_id\";s:2:\"24\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651326;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651326\";s:10:\"spec_value\";s:2:\"40\";s:13:\"spec_value_id\";s:2:\"26\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651360;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651360\";s:10:\"spec_value\";s:2:\"42\";s:13:\"spec_value_id\";s:2:\"60\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}}}",
                  "params": "a:0:{}",
                  "disabled": "false",
                  "rank_count": "0",
                  "comments_count": "0",
                  "view_w_count": "0",
                  "view_count": "0",
                  "count_stat": "a:1:{s:3:\"buy\";a:2:{i:17240;d:1;i:17250;d:2;}}",
                  "buy_count": "3",
                  "buy_w_count": "2",
                  "barcode": "0",
                  "wx_image_id": "",
                  "ipad_image_id": "",
                  "is_line": "0",
                  "fx_1_price": "0",
                  "fx_2_price": "0",
                  "fx_3_price": "0",
                  "goods_status": "0",
                  "modify_status": "0",
                  "price_modify": null,
                  "good_form": null,
                  "buy_limit": "0",
                  "taxrate": null,
                  "tip_id": "1",
                  "pmt_text": "",
                  "pmt_color": null,
                  "goods_profit_ratio": "0",
                  "is_pkg": "0",
                  "pkg_info": "a:4:{s:6:\"master\";s:0:\"\";s:5:\"slave\";s:0:\"\";s:9:\"matchSpec\";s:0:\"\";s:8:\"specRows\";s:0:\"\";}",
                  "from_time": null,
                  "to_time": null,
                  "is_starbuy": "0",
                  "rule_id": "0",
                  "is_new": "false"
              },
              {
                  "image_id": "5d197c14b6b35865ae98f13ea5b52f98",
                  "storage": "filesystem",
                  "image_name": "主图-(211.jpg",
                  "ident": "/cc/07/7d/f1098188904935ae0e878055390f309b059d6074.jpg",
                  "url": "public/images/cc/07/7d/f1098188904935ae0e878055390f309b059d6074.jpg",
                  "l_ident": "/9b/2e/50/19fbc38c54f8ea263ff604b9c97b3decbeb0cd9b.jpg",
                  "l_url": "public/images/9b/2e/50/19fbc38c54f8ea263ff604b9c97b3decbeb0cd9b.jpg",
                  "m_ident": "/09/4f/da/db136eec5a3660298c1a987259a48f63762c1904.jpg",
                  "m_url": "public/images/09/4f/da/db136eec5a3660298c1a987259a48f63762c1904.jpg",
                  "s_ident": "/2c/b3/b0/89a25f07de07e782fe755bef46c8ee886df940d2.jpg",
                  "s_url": "public/images/2c/b3/b0/89a25f07de07e782fe755bef46c8ee886df940d2.jpg",
                  "width": "640",
                  "height": "640",
                  "watermark": "true",
                  "build_size": null,
                  "last_modified": "1491026353",
                  "attach_id": "149510",
                  "target_id": "10239",
                  "target_type": "goods",
                  "goods_id": "10239",
                  "jooge_goods_id": "JOKZT22748867953",
                  "bn": "9097120130",
                  "name": "INSUN恩裳2017年春裤子9097120130",
                  "price": "1431.00",
                  "type_id": "2",
                  "cat_id": "6",
                  "brand_id": "2",
                  "marketable": "true",
                  "store": "256",
                  "fav": "0",
                  "notify_num": "0",
                  "uptime": "1491026358",
                  "downtime": "1486973303",
                  "last_modify": "1491034061",
                  "p_order": "30",
                  "sortnum": "999999999",
                  "d_order": "30",
                  "score": null,
                  "cost": "0.00",
                  "mktprice": "1590.00",
                  "weight": "0.000",
                  "g_weight": "0.000",
                  "unit": "",
                  "brief": "",
                  "goods_type": "normal",
                  "image_default_id": "403fb8c99ceb97f625033d973fdef92c",
                  "udfimg": "false",
                  "thumbnail_pic": "",
                  "small_pic": null,
                  "big_pic": null,
                  "intro": "&nbsp;\n<img src=\"http://mall.yingerfashion.com/public/images/86/a9/ac/c93c94897e3a9c752a94410f05be35c6caa81d7d.jpg?1486973299#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/73/eb/5f/aa4c7ffa806b804ec0ed8ffe889da1097eb42f26.jpg?1486973299#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/85/8e/a7/d5678ae14bb74099f57ad0173c086bced75ecb1d.jpg?1486973300#h\" width=\"100%\">\n<img src=\"http://mall.yingerfashion.com/public/images/1e/cb/0c/daefcf2887d583af0712044b046ba6d2ad765ea6.jpg?1486973300#h\" width=\"100%\">",
                  "store_place": null,
                  "min_buy": null,
                  "package_scale": "1.00",
                  "package_unit": "",
                  "package_use": null,
                  "score_setting": "number",
                  "store_prompt": null,
                  "nostore_sell": "0",
                  "goods_setting": "a:1:{s:14:\"goods_template\";s:1:\"0\";}",
                  "spec_desc": "a:2:{i:1;a:1:{i:148375651388;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651388\";s:10:\"spec_value\";s:6:\"蓝色\";s:13:\"spec_value_id\";s:2:\"88\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}}i:2;a:4:{i:148375651322;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651322\";s:10:\"spec_value\";s:2:\"36\";s:13:\"spec_value_id\";s:2:\"22\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651324;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651324\";s:10:\"spec_value\";s:2:\"38\";s:13:\"spec_value_id\";s:2:\"24\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651326;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651326\";s:10:\"spec_value\";s:2:\"40\";s:13:\"spec_value_id\";s:2:\"26\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}i:148375651360;a:5:{s:21:\"private_spec_value_id\";s:12:\"148375651360\";s:10:\"spec_value\";s:2:\"42\";s:13:\"spec_value_id\";s:2:\"60\";s:10:\"spec_image\";s:0:\"\";s:17:\"spec_goods_images\";s:0:\"\";}}}",
                  "params": "a:0:{}",
                  "disabled": "false",
                  "rank_count": "0",
                  "comments_count": "0",
                  "view_w_count": "0",
                  "view_count": "0",
                  "count_stat": "a:1:{s:3:\"buy\";a:2:{i:17240;d:1;i:17250;d:2;}}",
                  "buy_count": "3",
                  "buy_w_count": "2",
                  "barcode": "0",
                  "wx_image_id": "",
                  "ipad_image_id": "",
                  "is_line": "0",
                  "fx_1_price": "0",
                  "fx_2_price": "0",
                  "fx_3_price": "0",
                  "goods_status": "0",
                  "modify_status": "0",
                  "price_modify": null,
                  "good_form": null,
                  "buy_limit": "0",
                  "taxrate": null,
                  "tip_id": "1",
                  "pmt_text": "",
                  "pmt_color": null,
                  "goods_profit_ratio": "0",
                  "is_pkg": "0",
                  "pkg_info": "a:4:{s:6:\"master\";s:0:\"\";s:5:\"slave\";s:0:\"\";s:9:\"matchSpec\";s:0:\"\";s:8:\"specRows\";s:0:\"\";}",
                  "from_time": null,
                  "to_time": null,
                  "is_starbuy": "0",
                  "rule_id": "0",
                  "is_new": "false"
              }
          ],
          "res": ""
        },
        from: 0,
        last_page: 0,
        per_page: 0,
        to: 0,
        total: 0,
      }
    },
    created: function () {
      var query = this.$route.query;
      console.log("create good page");
      this.goods_id = query.goods_id;
      this.item_index = query.item_index;
      this.init_goods_page(query);
    },
    methods: {
      show:function(index){
        console.log("展示");
        console.log(this.list);
        this.$refs.previewer.show(index);
      },
      collapse:function(index){
        this["collapse"+index]=!this["collapse"+index];
      },
      init_goods_page: function (query) {
         var self=this;
          // api.getGoodsData({relations: ["image_attach", "images","mechanics","goods_ports","assemblies","standardfits","electrics"], parameters:query}).then((res)=>{
            var product_data=self.product_data.data;
            var goods_data=self.goods_data.data;
            self.handle_goods_data(product_data,goods_data);
           
          // });
      },
      handle_goods_data:function(product_data,goods_data){
        var self=this;
        // console.log(data);
        console.log("________________________");
        console.log(product_data);
        console.log(goods_data);
        // for(var i=0;i<goods_data.length;i++){

        // }
        setTimeout(function(){
          self.show_previewer();
        },2000)
      },  
      show_previewer:function(){
        var self=this;
        console.log($(".goods-desc img"));
        self.list=[];
        $(".goods-desc img").addClass("previewer-demo-img");
        $(".vux-swiper img").addClass("previewer-demo-img");
        $.each($(".previewer-demo-img"),function(i,n){
          var obj={
            src:$(this).attr("src"),
            w:($(this).width()+8)*2,
            h:$(this).height()*2
          };
          self.list.push(obj);
          // $(this).addClass("previewer-demo-img");
          $(this).on("click",function(){
            console.log(i);
            self.show(i);
          })
        })
        console.log(self.list);
      },
      toggle_popup_show:function(){
        this.popup_show=!this.popup_show;
      }
    },
   
    components: {
      Swiper,
      Flexbox,
      FlexboxItem,
      XButton,
      Tab,
      TabItem,
      SwiperItem,
      Group,
      Cell,
      VueQArt,
      Previewer,
      Popup,
      XNumber,
      Tabbar,
      TabbarItem
    }
  }

</script>

<style lang="css">
  .page-goods .content {
    background-color: #f7f7f7;
  }
  
  .goods-content-swiper {
    height: 100%;
    padding-bottom: 2rem;
    box-sizing: border-box;
  }
  
  .goods-content-swiper>.vux-swiper {
    height: 100%!important;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .goods-content-swiper>.vux-swiper .vux-swiper-item{
    box-sizing:border-box;
  }
.goods .qrcode-content canvas{
  width:4rem;
  height:4rem;
}
.close-btn{
  width:2rem;
  height:2rem;
  line-height:2rem;
   position:absolute;
  top:-20px;
  right:0;
  z-index:8888;
  box-shadow:0 0 10px #E53935;
}
.weui-cell__ft{
  width:100%;
}
</style>
