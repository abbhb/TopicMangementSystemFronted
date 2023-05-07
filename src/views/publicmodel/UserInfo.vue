<template>
<div>
  <el-card class="box-card">
    <el-form :model="form" label-width="120px">
      <el-form-item :rules="[{ required: true, message: '用户名 is required' },]" label="用户名">
        <el-input v-model="form.username" disabled=""/>
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '昵称 is required' },]" label="昵称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :rules="[{ required: true, message: '性别 is required' },]" label="性别">
        <el-select v-model="form.sex" placeholder="请选择你的性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', message: 'age must be a number' },
      ]" label="年龄">
        <el-input type="number" v-model="form.age" />
      </el-form-item>
      <el-form-item   :rules="[
        { required: true, message: 'phone is required' },
      ]"  label="手机号">
        <el-input v-model="form.phone" />
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="(form_serve.age === form.age)&&(form_serve.name === form.name)&&(form_serve.sex === form.sex)&&(form_serve.phone === form.phone) ? true:false">更新</el-button>
        <el-button @click="reWrite">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script>
import * as Api from "@/api/login";



export default {
  name: "UserInfo",
  data(){
    return{
      form:{
        username:'',
        name: '',
        sex: '',
        age: 1,
        phone:'',
      },
      form_serve:{
        username:'',
        name: '',
        sex: '',
        age: 1,
        phone:'',
      },
      userInfo:{},
    };
  },
  created() {
    if (localStorage.getItem('userInfo')){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
    if (this.userInfo.name){
      this.form_serve.name = this.userInfo.name
      this.form.name = this.userInfo.name

    }
    if (this.userInfo.username){
      this.form_serve.username = this.userInfo.username
      this.form.username = this.userInfo.username

    }
    if (this.userInfo.sex){
      this.form_serve.sex = this.userInfo.sex
      this.form.sex = this.userInfo.sex

    }
    if (this.userInfo.age){
      this.form_serve.age = this.userInfo.age
      this.form.age = this.userInfo.age

    }
    if (this.userInfo.phone){
      this.form_serve.phone = this.userInfo.phone
      this.form.phone = this.userInfo.phone

    }
  },
  methods:{
    reWrite(){
      if (sessionStorage.name){
        this.form.name = this.form_serve.name
      }
      if (sessionStorage.username){
        this.form.username = this.form_serve.username
      }
      if (sessionStorage.sex){
        this.form.sex = this.form_serve.sex
      }
      if (sessionStorage.age){
        this.form.age = this.form_serve.age
      }
      if (sessionStorage.phone){
        this.form.phone = this.form_serve.phone
      }
    },
    async onSubmit() {
      let data = {}
      data = this.form
      const res = await Api.updataUserSelf(data);
      if (String(res.code)==='1'){
        this.$message.success(res.msg);
        this.form_serve.phone = this.form.phone;
        this.form_serve.age = this.form.age;
        this.form_serve.name = this.form.name;
        this.form_serve.sex = this.form.sex;
        const datas = await Api.checkToken()
        if (String(res.code)==='1') {
          this.$message.success(datas.msg);
          localStorage.setItem("userInfo",JSON.stringify(datas.data))

          sessionStorage.setItem("id", datas.data.id);
          sessionStorage.setItem("name", datas.data.name);
          if (datas.data.permission === 1) {
            sessionStorage.setItem("type", "admin")
          } else if (datas.data.permission === 2) {
            sessionStorage.setItem("type", "teacher")
          } else if (datas.data.permission === 3) {
            sessionStorage.setItem("type", "student")
          } else if (datas.data.permission === 4) {
            sessionStorage.setItem("type", "user")
          }
          sessionStorage.setItem("age", datas.data.age)
          sessionStorage.setItem("sex", datas.data.sex)
          sessionStorage.setItem("username", datas.data.username)
          sessionStorage.setItem("phone", datas.data.phone)
          sessionStorage.setItem("registerTime", datas.data.registerTime)
          sessionStorage.setItem("lastModificationTime", datas.data.lastModificationTime)

        } else {
          this.$message.error(datas.msg);
        }
      }
    }
  }
}
</script>

<style scoped>
.box-card{
  width: 50rem;
}
</style>