<template>
  <div>
    <div class="tableBar">
      <el-input
        v-model="input"
        placeholder="请输入专业昵称"
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
          @click="addMajortype()"
        >
          + 增加专业
        </el-button>
      </div>
    </div>
    <el-table tooltip-effect="dark" :data="tableData" style="width: 100%" max-height="530">
      <el-table-column fixed prop="id" label="专业ID" width="100" />
      <el-table-column prop="name" label="专业名" width="120" />
      <el-table-column prop="collegeId" label="学院Id" width="120" />
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


    <el-dialog :visible.sync="dialog"
               :before-close="cleanForm"
               :title="addoredit==='add'?'添加':'编辑'+'专业'"
               :close-on-click-modal="false"
               :close-on-press-escape="false"


    >
      <el-form :model="formss" label-width="120px">
        <div class="formitem">
          <el-form-item label="编号">
            <el-input v-model="formss.id" :disabled="addoredit==='edit'" />
          </el-form-item>
          <el-form-item label="专业名">
            <el-input v-model="formss.name" />
          </el-form-item>
          <el-form-item label="学院">
            <el-select v-model="formss.collegeId" placeholder="请选择学院">
              <el-option
                v-for="item in collegeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>


        <div style="display: flex;flex-direction: column-reverse">
          <el-button type="primary" v-if="addoredit==='add'" @click="add">添加专业</el-button>
          <el-button type="primary" v-else-if="addoredit==='edit'" @click="bianji">编辑专业</el-button>
        </div>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as Api from "@/api/login";
import {MessageBox} from "element-ui";
import { addMajor, updataMajor } from "@/api/login";

export default {
  name: "EditMajor",
  data(){
    return{
      tableData:[],
      formss:{
        id:undefined,
        name:"",
        collegeId:"",
      },
      addoredit:'add',
      dialog:false,
      collegeList:[]
    };
  },
  async created() {
    this.init()

  },
  methods:{
    async bianji() {
      let data = {}
      data = this.formss
      const res = await updataMajor(data)
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
      const res = await addMajor(data)
      if (String(res.code)==='1'){
        this.$message.success(res.msg)
        this.dialog = false
        this.cleanForm()
        this.init()
      }else {
        this.$message.error(res.msg)
      }
    },
    cleanForm(){
      this.formss.id = undefined
      this.formss.name = ""
      this.formss.collegeId = ""
      this.dialog = false
    },
    async init() {
      const data = await Api.MajorList()
      const res = await Api.CollegeList()
      this.tableData = data.data;
      this.collegeList = res.data
    },
    addMajortype(){
      //增加专业
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
          const res = await Api.deleteMajorById(scope.row.id)
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
    async bianjiRow(scope) {
      this.addoredit = 'edit'
      var that = this
      console.log(scope.row)
      that.formss.id = scope.row.id
      that.formss.name = scope.row.name
      that.formss.collegeId = scope.row.collegeId
      this.dialog = true
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
