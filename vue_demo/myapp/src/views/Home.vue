<script setup>
/*
export default {
  setup(){
    console.log('setup')
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  }
}
*/
import {ref, reactive, computed, watch, watchEffect, onMounted, onUnmounted} from "vue";
const refData = ref({name:'zhangsan',age:30});
const reactiveData = reactive({name:'zhangsan',age:30});
const names = ref([
    {name:'小猫'},
    {name:'小狗'},
    {name:'小猪'},
    {name:'小爱'},
]);
const search = ref('小爱');
const martchNames = computed(()=>{
  return names.value.filter(x=>x.name.includes(search.value))
});
const handleClick = ()=>{
  refData.value.name = '张三'
  stopEffect();
};

// watch(search,(newSearch,preSearch)=>{
//   console.log('触发onchange事件:',newSearch,preSearch)
// });

watch([search,names],([newSearch,newNames],[preSearch,preNames])=>{
  console.log('触发onchange事件:',newSearch,preSearch,newNames,preNames)
});

const stopEffect = watchEffect(()=>{
  console.log('触发了立即执行的onchange事件:',search.value);
})



onMounted(()=>{
console.log('页面渲染前执行...')
});


onUnmounted(()=>{
console.log('组件注销前执行')
});

defineProps({
  posts:Array,
  message:String
});

</script>

<template>
  <div class="home">
    <h2>{{message}}</h2>
    <input type="text" v-model="search">
    <p>{{search}}</p>
    <p v-for="(item,index) in martchNames" :key="index">{{item.name}}</p>

    <p>redData:{{refData.name}}--{{refData.age}}</p>
    <p>redData:{{reactiveData.name}}--{{reactiveData.age}}</p>
    <button @click="handleClick">点击改变张三</button>
    <button @click="names.pop()">删除一个names</button>
    <button @click="stopEffect">停止监听立即改变事件</button>
  </div>
</template>

<style scoped>

</style>