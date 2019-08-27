<template>
  <v-card><!--卡片，是vuetify中提供的组件，提供一个悬浮效果的面板，一般用来展示一组数据-->
      <v-flex xs12 sm10><!--布局容器，用来控制响应式布局，我们可以控制所占的格数来控制宽度，一共12隔-->
        <!--树组件，Vuetify并没有提供树组件，这个是我们自己编写的自定义组件-->
        <v-tree url="/item/category/list"
                :isEdit="isEdit"
                @handleAdd="handleAdd"
                @handleEdit="handleEdit"
                @handleDelete="handleDelete"
                @handleClick="handleClick"
        />
      </v-flex>
  </v-card>
</template>

<script>
  export default {
    name: "category",
    data() {
      return {
        isEdit:true
      }
    },
    methods: {
      handleAdd(node) {
        console.log("add .... ");
        console.log(node);
      },
      handleEdit(id, name) {
        console.log("edit... id: " + id + ", name: " + name)
      },
      handleDelete(id) {
        console.log("delete ... " + id)
      },
      handleClick(node) {
        console.log(node)
      }
    }
  };
</script>

<style scoped>

</style>
