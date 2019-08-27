<template>
  <div>
    <v-card>
      <!--卡片的头部-->
      <v-card-title>
        <v-btn color="primary">新增</v-btn>
        <!--空间隔离工具-->
        <v-spacer/>
          <v-text-field
            label="输入关键字搜索"
            single-line
            v-model="search"
            append-icon="search"
            hide-details
          ></v-text-field>
      </v-card-title>
      <!--分割线-->
      <v-divider/>
      <!--卡片的内容-->
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="brands"
          :options.sync="pagination"
          :server-items-length="totalBrands"
          :loading="loading"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{props.item.id}}</td>
            <td>{{props.item.name}}</td>
            <td><img :src="props.item.image"></td>
            <td>{{props.item.letter}}</td>
            <td>
              <v-btn color="info">编辑</v-btn>
              <v-btn color="warning">删除</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card-text>
      <!--卡片的事件-->
      <!--<v-card-actions>
        <v-btn text>Click</v-btn>
      </v-card-actions>-->
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "my-brand",
    data(){
      return{
        search:'',//搜索过滤字段
        totalBrands:0,//总条数
        brands:[],//当前页品牌数据
        loading:true,//是否在加载中
        pagination:{},//分页信息
        headers:[
          {text: 'id', align: 'left', value: 'id'},
          {text: '名称', align: 'left', sortable: false, value: 'name'},
          {text: 'LOGO', align: 'left', sortable: false, value: 'image'},
          {text: '首字母', align: 'left', value: 'letter', sortable: true,},
          {text: '操作', align: 'left', value: 'id', sortable: false,}
        ]
      }
    },
    mounted(){
      //查询数据
      this.getDateFromServer();
    },
    methods:{
      getDateFromServer(){
        this.$http.get("/item/brand/page",{
          params:{
            key:this.search,
            page:this.pagination.page,
            rows:this.pagination.rowsPerPage,
            sortBy:this.pagination.sortBy,
            desc:this.pagination.descending
          }
        })
          .then(data =>
          {
            //将得到的数据赋值给本地属性
            this.brands = data.data.items;
            this.totalBrands = data.data.total;
            //完成赋值后，把加载状态赋值为false
            this.loading = false;
          })
          .catch(data => alert(data.message))

        //设置延迟一段时间，随后进行赋值
        setTimeout(()=>{
          //然后赋值给brands
          this.brands = data;
          this.totalBrands = data.length;
          //完成复制后，吧加载状态赋值为false
          this.loading = false;
        },400)
      }
    }
  }
</script>

<style scoped></style>
