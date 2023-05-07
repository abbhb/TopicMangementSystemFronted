<template>
  <div>
    <div class="tableBar">
      <el-input
        v-model="input"
        placeholder="请输入用户昵称"
        style="width: 250px"
        clearable
        @clear="cleanQuery"
        @keyup.enter.native="handleQuery"
      >
        <i
          slot="prefix"
          class="el-input__icon el-icon-search"
          style="cursor: pointer"
          @click="init"
        ></i>
      </el-input>
      <div class="tableLab">
        <el-button
          type="primary"
          @click="addUsertype()"
        >
          + 增加用户
        </el-button>
      </div>
    </div>
    <el-table tooltip-effect="dark" :data="tableData" style="width: 100%" max-height="530">
      <el-table-column fixed prop="id" label="用户ID" width="100" />
      <el-table-column prop="username" label="用户名" width="120" />
      <el-table-column prop="name" label="用户昵称" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag v-if="String(scope.row.status)==='1'">正常</el-tag>
          <el-tag effect="dark" type="danger"   v-else-if="String(scope.row.status)==='0'">封号</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="身份" width="120" >
        <template #default="scope">
          <el-tag  effect="dark" v-if="String(scope.row.permission)==='1'">内置管理员</el-tag>
          <el-tag  effect="dark" v-else-if="String(scope.row.permission)==='2'">管理员</el-tag>
          <el-tag v-else-if="String(scope.row.permission)==='3'">指导老师</el-tag>
          <el-tag v-else-if="String(scope.row.permission)==='4'">学生</el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="collegeName" label="学院" width="80" />
      <el-table-column show-overflow-tooltip prop="majorName" label="专业" width="80" />
      <el-table-column prop="age" label="年龄" width="50" />
      <el-table-column prop="sex" label="性别" width="50" />
      <el-table-column prop="phone" label="手机号" width="130" />
      <el-table-column fixed="right" label="操作" width="170">
        <template #default="scope">
          <div style="display: flex;flex-direction: row;">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="bianjiRow(scope)"
            >
              编辑
            </el-button>
            <el-button
              link
              type="danger"
              size="small"
              @click.prevent="deleteRow(scope)"
            >
              删除
            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNums"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper">
    </el-pagination>

    <el-dialog :visible.sync="dialog"
               :before-close="cleanForm"
               :title="addoredit==='add'?'添加':'编辑'+'用户'"
               :close-on-click-modal="false"
               :close-on-press-escape="false"


    >
      <el-form :model="formss" label-width="120px">
        <div class="formitem">
          <el-form-item label="编号">
            <el-input v-model="formss.id" :disabled="addoredit==='edit'" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="formss.name" />
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="用户名">
            <el-input :disabled="addoredit==='edit'" v-model="formss.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input :disabled="addoredit==='edit'" v-model="formss.password" />
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="状态">
            <el-select v-model="formss.status" placeholder="请选择状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="formss.age" />
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="专业">
            <el-cascader
              ref="cascader"
              v-model="cascadervalue"
              :props="{value:'id',label:'name',children:'majorList'}"
              :options="majorIdOptions" :show-all-levels="false"></el-cascader>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="formss.sex" placeholder="请选择性别">
              <el-option
                v-for="item in sexoptions"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="手机号">
            <el-input v-model="formss.phone" />
          </el-form-item>
          <el-form-item label="身份">
            <el-select v-model="formss.permission" placeholder="请选择身份">
              <el-option
                v-for="item in permissionOptions"
                :key="item.label"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="display: flex;flex-direction: column-reverse">
          <el-button type="primary" v-if="addoredit==='add'" @click="add">添加用户</el-button>
          <el-button type="primary" v-else-if="addoredit==='edit'" @click="bianji">编辑用户</el-button>
        </div>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as Api from "@/api/login";
import {MessageBox} from "element-ui";
import { addUser, updataUser } from "@/api/login";

export default {
  name: "EditUser",
  data(){
    return{
      tableData:[],
      pageSize:5,
      pageNums:1,
      cascadervalue:['1','1'],
      majorIdOptions:[
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
            value: 'shejiyuanze',
            label: '设计原则',
          }]
        },
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
            }]
        }
        ],
      sexoptions:[
        {
          label:"男",
          value:"男"
        },
        {
          label:"女",
          value:"女"
        }
      ],
      statusOptions:[
        {
          label:"正常",
          value:1
        },{
          label:"封禁",
          value:0
        }
      ],
      permissionOptions:[
        {
          label:"超级管理员",
          value:1
        },{
          label:"管理员",
          value:2
        },{
          label:"教师",
          value:3
        },{
          label:"学生",
          value:4
        }
      ],
      formss:{
        id:undefined,
        name:"",
        status:1,
        permission:4,
        majorId:1,
        username:"",
        password:"",
        age:18,
        sex:'男',
        phone:undefined
      },
      addoredit:'add',
      dialog:false,

    };
  },
  async created() {
    this.init()

  },
  methods:{
    async bianji() {

      console.log(this.$refs.cascader.getCheckedNodes()[0].data.id)
      this.formss.majorId = this.$refs.cascader.getCheckedNodes()[0].data.id
      let data = {}
      data = this.formss
      const res = await updataUser(data)
      if (String(res.code)==='1'){
        this.$message.success(res.msg)
        this.dialog = false
        this.cleanForm()
        this.init()
      }else {
        this.$message.error(res.msg)
      }
    },
    async add() {
      let data = {}
      data = this.formss
      const res = await addUser(data)
      if (String(res.code)==='1'){
        this.$message.success(res.msg)
        this.dialog = false
        this.cleanForm()
      }else {
        this.$message.error(res.msg)
      }
    },
    cleanForm(){
      this.formss.username = ""
      this.formss.name = ""
      this.formss.password = ""
      this.formss.phone = undefined
      this.formss.id = undefined
      this.formss.permission = 4
      this.formss.status = 1
      this.cascadervalue = []
      this.formss.majorId = undefined
      this.formss.age = 1

      this.dialog = false
    },
    async init() {
      const data = await Api.userList(this.pageNums, this.pageSize)
      this.tableData = data.data;
      this.listWithCollege()
    },
    addUsertype(){
      //增加用户
      this.addoredit = 'add'
      this.dialog = true
    },
    deleteRow(scope) {
      MessageBox.confirm(
        '你将删除这一项,确认要继续吗?',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          const res = await Api.deleteUserById(scope.row.id)
          if (String(res.code)==='1'){
            this.$message.success(res.msg)
            this.init()
          }else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {

        })
    },
    async listWithCollege() {
      const res = await Api.listWithCollege()
      if (String(res.code)==='1'){
        this.majorIdOptions = res.data
      }
    },
    async bianjiRow(scope) {
      console.log(scope.row.majorId)
      if (scope.row.majorId){
        this.cascadervalue = [''+scope.row.collegeId,''+scope.row.majorId]
        console.log(this.cascadervalue)

        this.formss.majorId = scope.row.majorId
      }

      this.addoredit = 'edit'
      var that = this
      console.log(scope.row)
      that.formss.id = scope.row.id
      that.formss.name = scope.row.name
      that.formss.username = scope.row.username
      that.formss.phone = scope.row.phone
      that.formss.sex = scope.row.sex
      that.formss.permission = scope.row.permission


      that.formss.status = scope.row.status
      that.formss.age = scope.row.age

      this.dialog = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNums = 1

      this.pageSize = val
      this.init()

    },
    handleCurrentChange(val) {
      this.pageNums = val

      console.log(`当前页: ${val}`);
      this.init()
    }

  }
}
</script>


<style>
.el-table--striped .el-table__body tr.el-table__row--striped td {
    background-color:#f2faff !important; /* def2ff f2faff */
}
.tableLab {
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
  margin-left: 20px;
    padding: 0 20px 0 0;
    color: #818693;
    border-right: solid 1px #d8dde3;
}
.tableLab .el-button {
    margin-left: auto;
}
.formitem {
    display: flex;
}
</style>
