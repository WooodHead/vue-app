<template>
  <div class="home content">
    <swiper :list="swiper_list" dots-position="center" :aspect-ratio="360/640"></swiper>
    <router-link to="/test" class="color-danger" v-if="false">test 测试</router-link>
    <div class="cat-goods">
      <divider class="padding-10" v-if="false">产品分类</divider>
      <div class="cat-cover link-img">
        <img :src="category.cover.img" alt="">
      </div>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/3" style="padding:5px 2px 10px 2px;" v-for="(item,index) in category.data"  class="padding-tb-6 border-box cell-list-3">
          <router-link :to="{name:'goods',query:{goods_id:item.goods_id,item_index:index}}" class="link-img">
            <div>
              <img :src="item.images?item.images.url:'/static/grentech/default.jpg'" alt="">
            </div>
            <div class="text-center">
              <div class="item-title color-success font-mini line-ellispse-2">
                {{item.name}}
              </div>
              <div class="item-subtitle color-gray" v-if="false">
                <span>{{item.desc||"暂无描述"}}</span>
              </div>
            </div>
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
    <div class="hot-sales">
      <divider class="padding-rl-10" v-if="false">热销产品</divider>
      <div class="cat-cover link-img">
        <img :src="hot_sales.cover.img" alt="">
      </div>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item style="padding:5px 2px 10px 2px;" :span="1/3" v-for="(item,index) in hot_sales.data" :data-i="index<5" v-if="index<5" class="padding-tb-6 border-box cell-list-3">
          <router-link :to="{name:'goods',query:{goods_id:item.goods_id,item_index:index}}" class="link-img">
            <div>
              <img :src="item.images?item.images.url:'/static/grentech/default.jpg'" alt="">
            </div>
            <div class="text-center">
              <div class="item-title color-success font-mini line-ellispse-2">
                {{item.name}}
              </div>
              <div class="item-subtitle color-gray" v-if="false">
                <span>{{item.desc||"暂无描述"}}</span>
              </div>
            </div>
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
    <div>
      <divider class="padding-10" v-if="false">推荐商品</divider>
      <div class="link-img">
        <img :src="scroller_data.cover.img" alt="">
      </div>
    </div>
    <div class="scroll-content infinite-scroll container padding-b-20">
      <flexbox wrap="wrap" :gutter="0" class="scroll-content">
        <flexbox-item v-for="(item,index) in scroller_data.data" :span="1/2" class="link-img padding-tb-6 border-box cell-list-2" :class="{'padding-r-2':index%2==0,'padding-l-2':index%2==1}" :data-i="index%2">
          <router-link :to="{name:'goods',query:{goods_id:item.goods_id,item_index:index}}" class="block">
            <div>
              <img :src="item.images?item.images.url:'/static/grentech/default.jpg'" alt="">
            </div>
            <div class="padding-rl-10">
              <div class="item-title font-mini line-ellispse-2">
                {{item.name}}
              </div>
              <div class="item-subtitle color-danger">
                ￥{{item.price}}
              </div>
            </div>
          </router-link>
        </flexbox-item>
      </flexbox>
      <div class="load-more text-center" v-show="loading">
        <spinner type="circles"></spinner>
      </div>
    </div>

  </div>
</template>

<script>
//import {loader} from '../util/util.js'
import api from '../api'
import {Swiper,Flexbox,FlexboxItem,Scroller,Spinner,Divider} from 'vux'
export default {
  name: 'home',
  data () {
    return {
      loading: false,
      scrollTop:0,
      swiper_list:[
        {
          url:'/list?type_id=3',
          img:'/static/images/banner/1490689031_55971.jpg',
          title:'测试轮播标题1'
        },{
          url:'/list?type_id=3',
          img:'/static/images/banner/1490928796_65778.jpg',
          title:'测试轮播标题2'
        },{
          url:'/list?type_id=3',
          img:'/static/images/banner/index_open_14.jpg',
          title:'测试轮播标题3'
        },
      ],
      uuid:'',
      category:{
        cover:{
          url:'',
          img:'/static/slice/yinger_11_02.jpg',
        },
        data:[
          {
            images:{
               url:'/static/goods/product_001.jpg',
            },
            url:'/goods?goods_id=71&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/镶钻七分袖丝毛连衣裙15305690',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_002.jpg',
            },
            url:'/goods?goods_id=74&item_index=0',
            name:'XII BASKET十二篮 清奢时尚简约100%羊毛红色直身连衣裙 7075605028',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_003.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/千鸟格五分袖两件套连衣裙36205840',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_004.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/肌理拼接丝毛七分袖连衣裙1015105200',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_005.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/红色蕾丝刺绣长款七分袖连衣裙1014205770',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_006.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'SongofSong歌中歌2017春季新款方领OL连衣裙装5C37105260',
            cat:'基站',
            desc:'简单管理网络设备'
          }
        ]
      },
      hot_sales:{
        cover:{
          url:'/goods?goods_id=62&item_index=0',
          img:'/static/slice/yinger_11_03.jpg',
        },
        data:[
          {
            images:{
               url:'/static/goods/product_001.jpg',
            },
            url:'/goods?goods_id=71&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/镶钻七分袖丝毛连衣裙15305690',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_002.jpg',
            },
            url:'/goods?goods_id=74&item_index=0',
            name:'XII BASKET十二篮 清奢时尚简约100%羊毛红色直身连衣裙 7075605028',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_003.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/千鸟格五分袖两件套连衣裙36205840',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_004.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/肌理拼接丝毛七分袖连衣裙1015105200',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_005.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/红色蕾丝刺绣长款七分袖连衣裙1014205770',
            cat:'基站',
            desc:'简单管理网络设备'
          },{
            images:{
               url:'/static/goods/product_006.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'SongofSong歌中歌2017春季新款方领OL连衣裙装5C37105260',
            cat:'基站',
            desc:'简单管理网络设备'
          }
        ]
      },
      scroller_data:{
        cover:{
          url:'',
          img:'/static/slice/yinger_goods_new.jpg'
        },
        current_page:0,
        from:0,
        last_page:0,
        per_page:0,
        to:0,
        total:0,
        data:[
            {
            images:{
               url:'/static/goods/product_001.jpg',
            },
            url:'/goods?goods_id=71&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/镶钻七分袖丝毛连衣裙15305690',
            cat:'基站',
            price:'2999.00'
          },{
            images:{
               url:'/static/goods/product_002.jpg',
            },
            url:'/goods?goods_id=74&item_index=0',
            name:'XII BASKET十二篮 清奢时尚简约100%羊毛红色直身连衣裙 7075605028',
            cat:'基站',
            price:'2999.00'
          },{
            images:{
               url:'/static/goods/product_003.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/千鸟格五分袖两件套连衣裙36205840',
            cat:'基站',
            price:'2999.00'
          },{
            images:{
               url:'/static/goods/product_004.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/肌理拼接丝毛七分袖连衣裙1015105200',
            cat:'基站',
            price:'2999.00'
          },{
            images:{
               url:'/static/goods/product_005.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'OBBLIGATO奥丽嘉朵2016秋款/红色蕾丝刺绣长款七分袖连衣裙1014205770',
            cat:'基站',
            price:'2999.00'
          },{
            images:{
               url:'/static/goods/product_006.jpg',
            },
            url:'/goods?goods_id=62&item_index=0',
            name:'SongofSong歌中歌2017春季新款方领OL连衣裙装5C37105260',
            cat:'基站',
            price:'2999.00'
          }
        ]
      }
    }
  },
  computed:{
    length:function(){
      return this.scroller_data.data.length;
    }
  },
  mounted:function(){
    var self=this;
    $(".content").on('scroll',function(){
      //计算位置关系
      //console.log(this);
      self.handle_scroll($(this));
    })
  },
  created:function(){
    // this.get_home_list({});
   
  },
  methods:{
    handle_scroll:function(el){
      //console.log(el);
      var self=this;
      let height=parseFloat(el.height());
      let scrollTop=parseFloat(el.scrollTop());
      //console.log(height,scrollTop);
      var view_height=height+scrollTop;
      var scrollHeight=el[0].scrollHeight;

      // console.log(view_height,el[0].scrollHeight);
      if(scrollHeight-view_height<40){
        // console.log(scrollHeight-view_height);
        //调用加载功能
        self.loadMore();
        return;
      }
    },
    get_home_list:function(query,callback){
      var self=this;
       api.getGoodsData({relations: ["images","image_attach"], parameters:query, per_page: 10 }).then(res=>{
            if(res.data.data&&res.data.data.length>0){
              self.handle_res_data(res.data)
              // self.
            }
            // callback();
      })
    },
    handle_res_data:function(res_data){
              var self=this;
              self.scroller_data.data=self.scroller_data.data.concat(res_data.data);
              self.scroller_data.current_page=res_data.current_page;
              self.scroller_data.from=res_data.from;
              self.scroller_data.last_page=res_data.last_page;
              self.scroller_data.per_page=res_data.per_page;
              self.scroller_data.next_page_url=res_data.next_page_url;
              self.scroller_data.to=res_data.to;
              self.scroller_data.total=res_data.total;
               if(!res_data.next_page_url){
                  self.$vux.toast.show({
                    type:'text',
                    text:'已加载完毕...'
                  });
                }
    },
    loadMore:function(){
      var self=this;
      if(this.loading){
        return
      }
      console.log("触发加载");
      this.loading=true;
      let scroller=$(".container");
      if(!!self.scroller_data.next_page_url){
        api.get_page_data(self.scroller_data.next_page_url,{relations: ["images","image_attach"],per_page: 10 }).then(res=>{
          console.log(res);
          self.loading=false;
           if(res.data.data&&res.data.data.length>0){
              self.handle_res_data(res.data)
              // self.
            }
        }); 
      }else{
         self.loading=false;
      }
    }
  },
  components:{
    Swiper,
    Flexbox,
    FlexboxItem,
    Scroller,
    Spinner,
    Divider
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .scroll-content{
    width:100%;
  }
</style>
