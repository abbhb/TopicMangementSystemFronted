<template>
    <div class="login">
        <div class="shade">
            <header class="header">
                毕业设计题目管理系统
            </header>
            <article class="article">
                <h1>登录界面</h1>
                <el-form label-position="right" label-width="80px" :model="form">
                    <el-form-item label="账号：">
                        <el-input v-model="form.userName" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input v-model="form.userPwd" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSignIn">登录</el-button>
                    </el-form-item>
                </el-form>
            </article>
        </div>
    </div>
</template>
<script>
// import { reqLogin } from "@/api/login";

import * as Api from "@/api/login";
import router from "@/router";

export default {
    name: "login",
    data() {
        return {
            form: {
                userName: "",
                userPwd: ""
            },

        };
    },
    created() {
      if (localStorage.getItem("token")){
        sessionStorage.setItem("token",localStorage.getItem("token"))
      }
      this.checkToken()
    },

    mounted() {},
    methods: {
        /* 登录按钮 */
        async onSignIn() {
          var that = this
          const data = await Api.login(that.form.userName, that.form.userPwd);
          if (String(data.code) === '1' && data.data.tgc !== '') {
            that.$message.success(data.msg);
            localStorage.setItem("token", data.data.tgc);
              localStorage.setItem("userInfo",JSON.stringify(data.data))
            sessionStorage.setItem("token", data.data.tgc);
            sessionStorage.setItem("id", data.data.id);
            sessionStorage.setItem("name", data.data.name);
            console.log(data.data.permission)
            if (String(data.data.permission) === '1') {
              sessionStorage.setItem("type", "admin")
              console.log("admin")
            } else if (String(data.data.permission) === '2') {
              sessionStorage.setItem("type", "admin")
              console.log("admin")
            } else if (String(data.data.permission) === '3') {
              sessionStorage.setItem("type", "teacher")
              console.log("teacher")
            } else if (String(data.data.permission) === '4') {
              sessionStorage.setItem("type", "student")
              console.log("student")
            }
            sessionStorage.setItem("age", data.data.age)
            sessionStorage.setItem("username", data.data.username)
            sessionStorage.setItem("sex", data.data.sex)
              router.push({name:'index'})
          } else {
            that.$message.error(data.msg);
          }

        },
        async checkToken() {
            const res = await Api.checkToken()
            if (String(res.code) === '1') {
                this.$message.success(res.msg);
                localStorage.setItem("userInfo",JSON.stringify(res.data))
                sessionStorage.setItem("id", res.data.id);
                sessionStorage.setItem("name", res.data.name);
                console.log(res.data.permission)
                if (String(res.data.permission) === '1') {
                    sessionStorage.setItem("type", "admin")
                    console.log("admin")
                } else if (String(res.data.permission) === '2') {
                    sessionStorage.setItem("type", "admin")
                    console.log("admin")
                } else if (String(res.data.permission) === '3') {
                    sessionStorage.setItem("type", "teacher")
                    console.log("teacher")
                } else if (String(res.data.permission) === '4') {
                    sessionStorage.setItem("type", "student")
                    console.log("student")
                }
                sessionStorage.setItem("age", res.data.age)
                sessionStorage.setItem("username", res.data.username)
                sessionStorage.setItem("sex", res.data.sex)
                router.push({name:'index'})
            } else {
                this.$message.error(res.msg);
            }

        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    background: url(../../assets/login_bg.jpg) 0 0 no-repeat;
    background-size: 100%;
    .shade {
        height: 100%;
        width: 100%;
        background-color: #8899aa44;
        display: flex;
        flex-direction: column;
        align-items: center;
        .header {
            font-size: 60px;
            color: #eee;
            margin: 180px 0 50px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .logo {
                height: 70px;
                width: 70px;
                margin-right: 20px;
            }
        }
        .article {
            width: 400px;
            background-color: #ffffff44;
            padding: 20px 60px 40px 20px;
            border-radius: 20px;
            h1 {
                font-size: 20px;
                color: #eee;
                margin-left: 25px;
            }
            // /deep/ .el-form-item .el-form-item__label {
            //     color: #eee;
            // }
        }
    }
}
</style>