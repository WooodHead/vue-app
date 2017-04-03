<template lang="html">
  <div class="template-content">
  <div class="content-box">
      <div class="search-icon text-center" @click="toggleType">
        <span class="iconfont font-3x color-success block" style="margin-top:8px;">&#xe62a;</span>
      </div>
      <search v-model="search_input" position="static" top="0" @on-submit="submit_search"  class="list-search border-box"></search>
      <div class="content list container" @scroll="handle_scroll($event)">
            <flexbox wrap="wrap" :gutter="0" class="scroll-content" v-if="type=='large'">
              <flexbox-item :data-currentpage="current_page" :data-lastpage="last_page"  :data-total="total"  :data-perpage="per_page" :data-i="index%2"
              v-for="(item,index) in goods_data" :span="1/2" class="link-img cell-list-2 padding-tb-6 border-box" :class="{'padding-r-2':index%2==0,'padding-l-2':index%2==1}" >
                <router-link :to="{name:'goods',query:{goods_id:item.goods_id,item_index:index}}" class="block">
                  <div>
                    <img :src="item.image?item.image:'/static/grentech/default.jpg'" alt="">
                  </div>
                  <div class="padding-rl-10">
                    <div class="item-title line-ellispse-2">
                      {{item.name}}
                    </div>
                    <div class="item-subtitle color-danger">
                      ￥{{item.price}}
                    </div>
                  </div>
                </router-link>
              </flexbox-item>
            </flexbox>
            <!-- :to="item.url" -->
            <card-list 
            v-for="(item,index) in goods_data" :data-currentpage="current_page" :data-lastpage="last_page" :data-total="total" :data-perpage="per_page" v-if="type=='medium'">
              <router-link :to="{name:'goods',query:{goods_id:item.goods_id,item_index:index}}"  class="block" slot="card-media">
                <img :src="item.image?item.image:'/static/grentech/default.jpg'" alt="">
              </router-link>
              <router-link :to="{name:'goods',query:{goods_id:item.goods_id,item_index:index}}"  slot="card-title">
                <div class="item-title">{{item.name}}</div>
              </router-link>
                <div class="item-subtitle color-danger" slot="card-subtitle">¥{{item.price}}</div>
            </card-list>
            
       <div class="load-more text-center" v-show="loading">
        <spinner type="circles"></spinner>
       </div>    
      </div>
    </div>
  </div>
</template>
  
<script>
    // <scroller 
    //       lock-x 
    //       scrollbar-y
    //       use-pullup 
    //       height="100%"
    //       ref="listScroll"
    //       @on-pullup-loading="load"
    //       :pullup-config="pullupConfig"
    //       class="x-scroller-container">
    //     </scroller>
import api from '../api'
import * as config from '../config/config.js'
import CardList from './card-list'
import {
  Flexbox,
  FlexboxItem,
  Search,
  Scroller,
  Spinner
} from 'vux'
const list_type = ['small', 'medium', 'large'] //small--小图, medium--横向  large --并排
export default {
  name: 'list',
  data: function() {
    return {
    loading:false,
     goods_data:[],
     current_page: 0,
     last_page: 0,
     total: 0,
     from:0,
     res:{
        data:[
          {
            name:"YINER音儿春新款 白色刺绣格纹亮片装饰女外套84610127",
            price:'596.00',
            image:'/static/goods/product_001.jpg',
            goods_id:'14133',
            mkt_price:'1096.00'
          },{
            name:"YINER音儿春新款 白色刺绣格纹亮片装饰女外套84610127",
            price:'596.00',
            image:'/static/goods/product_001.jpg',
            goods_id:'14133',
            mkt_price:'1096.00'
          },{
            name:"YINER音儿春新款 白色刺绣格纹亮片装饰女外套84610127",
            price:'596.00',
            image:'/static/goods/product_001.jpg',
            goods_id:'14133',
            mkt_price:'1096.00'
          },{
            name:"YINER音儿春新款 白色刺绣格纹亮片装饰女外套84610127",
            price:'596.00',
            image:'/static/goods/product_001.jpg',
            goods_id:'14133',
            mkt_price:'1096.00'
          },{
            name:"YINER音儿春新款 白色刺绣格纹亮片装饰女外套84610127",
            price:'596.00',
            image:'/static/goods/product_001.jpg',
            goods_id:'14133',
            mkt_price:'1096.00'
          }
        ]
     },
     to:0,
     per_page:0,
     toast_msg:false,
      demo4Value: {
        pullupStatus: 'default'
      },
      // loading: false,
      type: config.app_config.list_cell_type,
      search_input: '',
      pullupConfig: {
        content: '上拉加载更多',
        downContent: '松开进行加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...'
      }
    }
  },
  components: {
    Flexbox,
    FlexboxItem,
    Search,
    CardList,
    Scroller,
    Spinner
  },
  created: function() {
    this.handler_query();
    console.log("创建");
  },
  
  methods: {
    handle_scroll:function(el){
      el=$(el.target);
      var self=this;
      let height=parseFloat(el.height());
      let scrollTop=parseFloat(el.scrollTop());
      var view_height=height+scrollTop;
      var scrollHeight=el[0].scrollHeight;

      if(scrollHeight-view_height<40){
       
        //调用加载功能
        console.log("上拉加载");
        this.loadMore();
        return false;
      }
    },
    toggleType: function() {
      this.type = this.type == 'medium' ? 'large' : 'medium';
    },
    submit_search:function(){
      console.log("搜索测试");
      var self=this;
      this.$router.push({name:'list',query:{search:self.search_input}});
      self.goods_data=[];//清空记录
      self.next_page_url=null;
      this.handler_query({loading:true});
    },
    loadMore:function(){
      var self=this;
      if(this.loading){
        return
      }
      console.log("触发加载");
      this.loading=true;
      let scroller=$(".container");
      if(!!self.next_page_url){
        // api.get_page_data(self.next_page_url,{relations: ["images","image_attach"],per_page: 10 }).then(res=>{
          var res=self.res;
          self.loading=false;
           if(res.data.data&&res.data.data.length>0){
              self.commit_resdata(res.data)
              // self.
            }
        // }); 
      }else{
         self.loading=false;
      }
    },
    handler_query:function(params){
       var self=this;
       var query=this.$route.query;
        if(!!params&&params.search){
          query={search:self.search_input};
        }
        console.log(query);
        query.relations=["images","image_attach"];
        var loading=false;
        if(query["search"]&&!loading){
          loading=true;
           api.get_search_result({relations: ["images","image_attach"],search:query.search,per_page:10}).then(res=>{
               console.log(res);
               loading=false;
               self.commit_resdata(res.data,params);
           })
        }else if(query["keyword"]){
          api.get_similar_by_kwd({relations: ["images","image_attach"],id:query.keyword,per_page:10}).then(res=>{
            console.log("查询关键字商品");
            console.log(res);
            self.commit_resdata(res.data,params);
          })
        }else{
          // api.getGoodsData({relations: ["images","image_attach"], parameters:query,per_page:10}).then(res=>{
             
              var res=self.res;
               console.log(res);
               self.commit_resdata(res.data);
          //  })
        }
    },
    commit_resdata:function(res_data,params){
                var self=this;
                self.goods_data=res_data;
                console.log("-------");
                console.log(self.goods_data);
                if(!self.next_page_url){
                  self.$vux.toast.show({
                    type:'text',
                    text:'<span class="font-normal">已加载完毕...</span>',
                    position:'middle'
                  });
                }
    }
  }

}
</script>

<style scoped>
.template-content{
  position:absolute;
  height:100%;
  width:100%;
  padding-top:2.2rem;
  bottom:2.3rem;
  box-sizing:border-box;
}
.page-list .content-box{
  height:100%;
  overflow-y:scroll;
}
#app .list.content {
  overflow-y: scroll;
  height: 100%;
  margin-top: 2.2rem;

}

.list-search {
  position: static!important;
}

.list.content .scroll-content {
  padding-bottom: 0;
}

.search-icon {
  width: 2.2rem;
  height: 2.2rem;
  position: absolute;
  top: 2.2rem;
  left: 0;
  z-index: 199;
  background-color: #EFEFF4;
}

.list-search {
  padding-left: 2.2rem;
  background-color: #EFEFF4;
}
</style>
