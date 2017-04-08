<template lang="html">
  <div class="order content">
    <sticky class="order-sticky">
      <tab active-color="#1ABC9C" v-model="index">
        <tab-item :selected="actived===item" v-for="(item,index) in list">{{item}}
        </tab-item>
      </tab>
    </sticky>
    <div>
      <div v-if="index==0" v-for="(item,index) in list" class="order-swiper tab-content">
          <card-order :data_order="item_order" :order_id="index_order" v-for="(item_order,index_order) in order_list" class="margin-b-10">
          </card-order>
      </div>
    </div>
  </div>
</template>
<script>
import CardOrder from './card-order.vue'
import {Sticky,Tab,TabItem,Swiper,SwiperItem} from 'vux'
export default {
  name:"orderNeedpay",
  data:function(){
    return {
      footer:{
        title:"查看订单明细",
        url:''
      },
      index:0,
      actived:"待付款",
      list:["待付款","待发货","待收货","待收货","售后"],
     // list:["待付款"],
      order_list:{
          170108173832356:[
            {
              order_id:'170108173832357',
              createtime:'1477390310',
              bn:'7026205923',
              name:'街道站低增益超宽频双通道（小型化)',
              spec_info:'频段:1710~1920/1920~2170/2200~2500/2500~2690',
              spec_info1:'增益:11.5/11.5/12/13 dBi',
              spec_info2:'电下倾:0/0/0 °',
              ordernum:'1',
              price:'1422.00',
              mktprice:'1690.00',
              product_id:'15745',
              s_url:'static/goods/product_002.jpg',
              ship_addr:'大浪',
              ship_area:'北京/北京市/东城区',
              ship_name:'吴燕平',
              ship_fee:'0',
              ship_status:"0",
              ship_mobile:'1850300XXXX',
              // spec_info:'颜色：白色、尺码：42',
              total_amount:'1422.00',
              pay_time:'1477390510'
            },
            {
              order_id:'170108173832357',
              createtime:'1477390310',
              bn:'7026205923',
              name:'街道站低增益超宽频双通道（小型化)',
              spec_info:'频段:1710~1920/1920~2170/2200~2500/2500~2690',
              spec_info1:'增益:11.5/11.5/12/13 dBi',
              spec_info2:'电下倾:0/0/0 °',
              ordernum:'1',
              price:'1422.00',
              mktprice:'1690.00',
              product_id:'15745',

              s_url:'static/goods/product_003.jpg',
              ship_addr:'大浪',
              ship_mobile:'1850300XXXX',
              ship_area:'北京/北京市/东城区',
              ship_name:'吴燕平',
              ship_status:"0",
              ship_fee:'0',
              // spec_info:'颜色：白色、尺码：42',
              total_amount:'1422.00',
              pay_time:'1477390310'
            }
          ],
          170108173832357:[
            {
              order_id:'170108173832357',
              createtime:'1477390310',
              bn:'7026205923',
              name:'街道站低增益超宽频双通道（小型化）',
              spec_info:'频段:1710~1920/1920~2170/2200~2500/2500~2690',
              spec_info1:'增益:11.5/11.5/12/13 dBi',
              spec_info2:'电下倾:0/0/0 °',
              ordernum:'1',
              price:'1422.00',
              mktprice:'1690.00',
              product_id:'15745',
              s_url:'static/goods/product_002.jpg',
              ship_addr:'大浪',
              ship_mobile:'1850300XXXX',
              ship_area:'北京/北京市/东城区',
              ship_name:'吴燕平',
              ship_status:"0",
              ship_fee:'0',
              // spec_info:'颜色：白色、尺码：42',
              total_amount:'1422.00',
              pay_time:'1477390310'
            }
          ]
       }
    }
  },
  components:{
    Sticky,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    CardOrder
  },
  methods:{

  }
}
</script>

<style lang="less">
  .order{
    height: 100%;
  }
  .order-sticky{
    z-index:9999;
  }

  .tab-content{
    height: 100%;
    padding-bottom:4.5rem;
  }
</style>
