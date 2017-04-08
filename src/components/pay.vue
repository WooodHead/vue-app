<template>
    <div class="pay content">
        <div class="content-box padding-10">
            <div class="text-center border-1px-b padding-b-20 margin-t-20">
                <span class="color-success font-2x">¥ </span><span class="color-success font-5x">2690.00</span>
            </div>
            <div class="padding-t-10">请选择支付方式:</div>
             <div class="margin-tb-20 tab-80 block-center" v-for="(item,index) in pay_methods">
                <x-button class="color-white" :class="{'bg-success':item.value=='wxjsapi','bg-light-blue':item.value=='alipay','bg-blue':item.value=='unionPay'}">{{item.title}}</x-button>
             </div>
             <div class="border-1px-t"></div>
             <div class="tab-80 block-center nav-list">
                <flexbox :gutter="0">
                    <flexbox-item class="text-center" v-for="(item,index) in nav_list" :span="1/4">
                        <router-link  :to="item.path">{{item.title}}</router-link>
                    </flexbox-item>
                </flexbox>
                 
             </div>
        </div>
    </div>
</template>
<script>
    import {XButton,Flexbox,FlexboxItem} from 'vux'
    export default {
        name:'pay',
        data:function(){
            return {
                 pay_methods:[
                     {
                         title:'微信支付',
                         value:'wxjsapi'
                     },{
                         title:'支付宝',
                         value:'alipay'
                     },{
                         title:'银联支付',
                         value:'unionPay'
                     }
                 ],
                 nav_list:[
                     {
                         title:'商城主页',
                         path:'home',
                     },{
                         title:'会员中心',
                         path:'home',
                     },{
                         title:'分类',
                         path:'home',
                     },{
                         title:'购物车',
                         path:'home',
                     }
                 ]
            }
        },
        created:function(){

        },
        components:{
            XButton,Flexbox,FlexboxItem
        },
        methods:{
            
        }

    }
</script>
<style lang="css">
    .nav-list{
        position:absolute;
        bottom:2rem;
        width:80%;
        left:10%;
    }

</style>