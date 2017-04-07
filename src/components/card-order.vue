<template lang="html">
  <div class="card-order border-1px-b">
    <div class="card-header padding-rl-10 padding-tb-6">
      订单:170108173832357
    </div>
    <div class="card-content border-1px-t">
      <flexbox :gutter="0" wrap='nowrap'class="padding-tb-10" v-for="(item1,index1) in data_order">
        <flexbox-item :span="3/12" class="item-media link-img padding-rl-6">
          <img :src="item1.s_url" alt="">
        </flexbox-item>
        <flexbox-item :span="9/12" class="padding-r-6 border-box">
          <div class="item-title line-ellispse-2">
            {{item1.name}}
          </div>
          <div class="item-title line-ellispse-2">
            {{item1.spec_info}}
          </div>
          <div class="item-title line-ellispse-2">
             {{item1.spec_info1}}
          </div>
          <div class="item-title line-ellispse-2">
             {{item1.spec_info2}}
          </div>
          <div class="item-subtitle color-danger">
            数量:×{{item1.ordernum}}
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="card-footer border-1px-t padding-rl-10 padding-tb-6">
      查看订单状态
      <span class="pull-right iconfont color-primary" @click.prevent="collapse_change">&#xe772;</span>
    </div>
    <div class="card-second-footer padding-rl-10 padding-tb-6 border-1px-t color-dark" v-if="collapse_footer">
      <p><label>订单: </label>170108173832357</p>
      <p><label>收件人: </label>王XX</p>
      <p><label>联系方式: </label>1850300XXXX</p>
      <p v-if="false"><label>地址: </label>广东省 深圳市 福田区 XX 街道 XX 号</p>
      <p v-if="false"><label>运费 </label> ¥0.00</p>
      <p><label>创建时间: </label>2017-02-19 23:57:20</p>
      <p v-if="false"><label>支付方式: </label>微信支付</p>
      <p><label>当前状态: </label><span class="color-danger">已审核</span></p>
      <p><label>处理时间: </label>2017-02-19 23:57:20</p>
    </div>
  </div>
</template>

<script>
import {Flexbox,FlexboxItem,FormPreview} from 'vux'
export default {
  name:'card-order',
  data:function(){
    return {
      collapse_footer:false
    }
  },
  components:{
    Flexbox,
    FlexboxItem,
    FormPreview

  },
  created:function(){
    console.log(this.data_order);
  },
  methods:{
    collapse_change:function(){
      console.log("change");
      this.collapse_footer=!this.collapse_footer;
    }
  },
  props:{
    data_order:{
      type:Array
    }
  }
}
</script>

<style lang="css">
  .card-order{
    background-color: #fff;
  }
  .card-order .item-media{
    box-sizing: border-box;
  }
  .card-second-footer label{
    min-width:20%;
    display:inline-block;
    text-align:right;
    padding-right:10px;
  }
</style>
