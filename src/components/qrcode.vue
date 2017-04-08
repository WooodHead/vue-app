<template lang="html">
  <div class="myqrcode content">
    <div class="content-box">
      <div class="card-qrcode bg-white">
        <div class="bg-dark color-white text-center font-2x card-qrcode-header">个人名片</div>
        <div class="border-1px-b text-center">
           <flexbox :gutter="0" class="text-center btn-80 block-center font-2x padding-tb-20">
            <flexbox-item v-for="(item,index) in name">{{item}}</flexbox-item>
          </flexbox>
        </div>
        <div class="border-1px-b text-center">
          <div class="padding-10">
            <p class="color-gray">职位</p>
            <p>开发工程师</p>
          </div>
          <div class="padding-10">
            <p class="color-gray">联系方式</p>
            <p>18503009595</p>
          </div>
        </div>
         <div class="text-center">
           <vue-q-art :config="config" class="qrcode-content"></vue-q-art>
            <div>创建时间</div>
            <div>03.20.2017</div>
         </div>
         <div class="text-center brand-footer">
          <p>&copy;XX 有限公司</p>
         </div>
        
      </div>
     
    </div>
  </div>
</template>

<script>
import VueQArt from 'vue-qart'
import QArt from 'qartjs'
import {Flexbox,FlexboxItem} from 'vux'
export default {
  name:'qrcode',
  data:function(){
    return {
       name:'王小明',
       config: {
          
          value: 'http://119.23.22.185/app',
          imagePath: '/static/slice/girl_avatar.jpg',
          filter: 'color'
        },
    }
  },
  created:function(){

  },
  components:{
    VueQArt,
    Flexbox,
    FlexboxItem
  },
  methods:{

  }
}
</script>

<style lang="css">
.myqrcode button{
  display:none;
}
.qrcode-content{
  margin-top:10%;
}
.myqrcode{
   background: #e55d67; /* Old browsers */
  background: -moz-linear-gradient(45deg,  #e55d67 0%, #e55774 55%, #e6517e 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(45deg,  #e55d67 0%,#e55774 55%,#e6517e 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(45deg,  #e55d67 0%,#e55774 55%,#e6517e 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e55d67', endColorstr='#e6517e',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

}
.myqrcode .content-box{
  height:100%;
}
.myqrcode .qrcode-content canvas{
  width:7rem;
  height:7rem;
}
.qrcode-content button{
  display:none;
}
.card-qrcode{
  height:90%;
  position:absolute;
  top:5%;
  width:90%;
  left:5%;
}
.card-qrcode-header{
  padding:20px 0;
}
.brand-footer{
  position:absolute;
  bottom:1rem;
  width:100%;
}
</style>
