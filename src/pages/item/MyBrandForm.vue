<template>
  <div>
    <v-form v-model="valid" ref="myBrandForm">
      <v-text-field v-model="brand.name" :rules="name" label="请输入品牌名称" required />
      <v-text-field v-model="brand.letter" :rules="letter" label="请输入品牌首字母" required/>
      <v-cascader
        url="/item/category/list"
        :rules="category"
        multiple
        aria-required
        v-model="brand.categories"
        lable="请选择商品分类"/>
      <v-layout row>
        <v-flex xs3>
          <span style="font-size: 16px;color: #444444">品牌LOGO:</span>
        </v-flex>
        <v-flex>
          <v-upload
            v-model="brand.image"
            url="/upload/image"
            :multiple="false"
            :pic-width="250"
            :pic-height="90"/>
        </v-flex>
      </v-layout>
      <v-layout class="my-4" row>
        <v-spacer/>
        <v-btn @click="submit" color="primary">提交</v-btn>
        <v-btn @click="clear">重置</v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>

  export default {
    name: "my-brand-form",
    props:{
      oldBrand:{
        type:Object
      },
      isEdit:{
        type:Boolean,
        default:false,
      }
    },
    data() {
      return {
        valid:false, // 表单校验结果标记
        brand:{
          name:'', // 品牌名称
          letter:'', // 品牌首字母
          image:'',// 品牌logo
          categories:[], // 品牌所属的商品分类数组
        },
        name:[
          v => !!v || 'Name is required',
          v => v.length>=2 || "品牌名称至少为2位"
        ],
        letter:[
          v => !!v || 'Letter is required',
          v => /^[A-Z]{1}$/.test(v) || "品牌字母只能是A~Z的大写字母"
        ],
        category:[
          v => !!v || "category is required"
        ]
      }
    },
    methods:{
      submit(){
        //提交表单
        if (this.$refs.myBrandForm.validate()){
          //定义一个请求参数对象，通过解构表达式来获取brand中的属性
          const {categories,letter,...params} = this.brand;
          //书库据中只要保存分类的id即可，因此我们对categories的值进行处理，只保留Id，并转换为字符串
          params.cids = categories.map(c => c.id).join(",");
          //将字母都转换为大写
          params.letter = letter.toUpperCase();
          //将数据提交到后台
          //this.$http.post('/item/brand',this.$qs.stringify(params))
          this.$http({
            method:this.isEdit?'PUT':'POST',
            url:'/item/brand',
            data:this.$qs.stringify(params)
          })
            .then(()=>{
              this.$emit("close");
              //弹出提示
              this.$message.success("保存成功");

            })
            .catch(() =>{
              this.$message.error("保存失败")
            })
        }
      },
      clear(){
        //重置表单
        this.$refs.myBrandForm.reset();
        //需要手动清空商品分类
        this.categories=[];
      }
    },
    watch:{
      oldBrand:{
        //监控oldBrand变化
        handler(val){
          if (val){
            //注意不要直接复制，否认这边的修改会影响到父组件的数据，copy属性即可
            this.brand = Object.deepCopy(val);
            console.log(this.brand)
          }else{
            this.brand = {
              name:'',
              letter:'',
              image:'',
              categories:[],
            }
          }
        }
      },
          deep: true
    }
  }
</script>

<style scoped>

</style>
