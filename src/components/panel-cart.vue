<template lang="html">
  <flexbox class="panel-cart padding-tb-6">
    <flexbox-item class="item-media text-center link-img" :span="3/12">
      <img :src="cart_data.s_url" alt="">
    </flexbox-item>
    <flexbox-item class="item-content":spam="9/12">
      <div class="item-title padding-rl-10">
        {{cart_data.name}}
      </div>
      <div class="item-subtitle padding-rl-10 font-bold line-ellispse-2">
        {{cart_data.spec_info}}
      </div>
      <div class="item-subtitle padding-rl-10 font-bold line-ellispse-2">
        {{cart_data.spec_info1}}
      </div>
      <div class="item-subtitle padding-rl-10 font-bold line-ellispse-2">
        {{cart_data.spec_info2}}
      </div>
      <div class="item-subtitle">
        <x-number :title="quantity" :min="1" :value="1" class="padding-rl-10 padding-tb-6 font-normal" width="40px">
        </x-number>
      </div>
    </flexbox-item>
  </flexbox>
</template>
<script>
import {Flexbox,FlexboxItem,XNumber} from 'vux'
export default {
  name:'panel-cart',
  data:function(){
    return {
      quantity:'数量',
      value:2,
      min:1,
      max:10,
    }
  },
  props:{
    cart_data:Object
  },
  components:{
    Flexbox,
    FlexboxItem,
    XNumber
  }
}
</script>

<style lang="css">
.vux-number-input{
  font-size:.8rem;
}
</style>
