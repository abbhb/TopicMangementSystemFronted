<template>
<div class="aas1">
  <div class="itaemsss" v-for="item in tables" :key="item.isTeamEader">

    <div class="name" v-if="item.studentName">{{item.studentName}}</div>
    <div class="name" v-else>假用户</div>
    <div>
      <el-tag effect="dark" v-if="item.isTeamEader===1">队长</el-tag>
      <el-tag v-else>队员</el-tag>
    </div>
    <div>
      <el-tag effect="dark" type="danger" v-if="String(item.studentId)===String(userInfo.id)">我</el-tag>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "duiyuan",
  props:{
    tables:{
      default:[]
    }
  },
  data(){
    return{
      userInfo:{},
    }
  },
  created() {
    if (localStorage.getItem('userInfo')){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
  }
};
</script>

<style>
.aas1 {
    display: flex;
    flex-direction: row;

}
.itaemsss {
    display: flex;
    flex-direction: column;
    padding: 13px 13px 13px 13px;
    margin-right: 1rem;
    justify-content: center;
    align-items: center;
}
.aaa1 .itaemsss .name {

}
</style>