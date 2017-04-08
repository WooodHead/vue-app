<template lang="html">
  <div class="cart content">
        <swipeout v-for="(item,index) in data_list" class="border-1px-b">
          <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" :right-menu-width="80">
            <div slot="right-menu">
              <swipeout-button @click="handle_delete($event)" type="warn">
                删除
              </swipeout-button>
            </div>
            <div slot="content">
                <panel-cart :cart_data="item"></panel-cart>
            </div>
          </swipeout-item>
        </swipeout>
        <flexbox :gutter="0" wrap="nowrap" class="bar bar-secondary border-1px-t" v-if="false">
          <flexbox-item :span="8/12" class="bar-item">
            <div class="padding-rl-10">
                <span class="font-1x">合计:</span>
                <span class="color-danger font-2x">￥</span>
                <span class="color-danger font-3x">1099.00</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="4/12">
            <x-button type="warn" class="bar-item font-1x">
              立即结算
            </x-button>
          </flexbox-item>
        </flexbox>
  </div>
</template>
<script>
import PanelCart from './panel-cart.vue'

import {
  Flexbox,
  FlexboxItem,
  XButton,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Sticky
} from 'vux'
export default {
  name: 'cart',
  data: function() {
    return {
      type: '1',
      data_list: [
        {
          name:"1800+FAD双频天线",
          spec_info:'频段:1710~1920/1920~2170/2200~2500/2500~2690',
          spec_info1:'增益:11.5/11.5/12/13 dBi',
          s_url:'/static/goods/product_001.jpg'
        },{
          name:"基站大下倾宽频FAD电调智能天线",
          spec_info:'频段:1710~1920/1920~2170/2200~2500/2500~2690',
          spec_info1:'增益:11.5/11.5/12/13 dBi',
          s_url:'/static/goods/product_001.jpg'
        },{
          name:"街道站低增益超宽频双通道（小型化)",
          spec_info:'频段:1710~1920/1920~2170/2200~2500/2500~2690',
          spec_info1:'增益:11.5/11.5/12/13 dBi',
          s_url:'/static/goods/product_002.jpg'
        },{
          name:"基站定向双极化固定下倾角天线(小型化）",
          spec_info:'频段:1710~1920/1920~2170/2200~2500/2500~2690',
          spec_info1:'增益:11.5/11.5/12/13 dBi',
          s_url:'/static/goods/product_003.jpg'
        }
      ]
    }
  },
  methods: {
    handleEvents:function(){

    },
    handle_delete:function(){

    }
  },
  components: {
    PanelCart,
    Flexbox,
    FlexboxItem,
    XButton,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Sticky
  }
}
</script>

<style lang="css">
.cart{
  padding-bottom: 2.3rem;
}
.page-cart .cart .bar-secondary{
  bottom: 0;
  /*top:inherit;*/
}
</style>
