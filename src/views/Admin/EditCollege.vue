<template>
  <div>
    <div class="tableBar">
      <el-input
        v-model="input"
        placeholder="请输入学院昵称"
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
          @click="addCollegetype()"
        >
          + 增加学院
        </el-button>
      </div>
    </div>
    <el-table tooltip-effect="dark" :data="tableData" style="width: 100%" max-height="530">
      <el-table-column fixed prop="id" label="学院ID" width="100" />
      <el-table-column prop="name" label="学院名" width="120" />
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
               :title="addoredit==='add'?'添加':'编辑'+'学院'"
               :close-on-click-modal="false"
               :close-on-press-escape="false"


    >
      <el-form :model="formss" label-width="120px">
        <div class="formitem">
          <el-form-item label="编号">
            <el-input v-model="formss.id" :disabled="addoredit==='edit'" />
          </el-form-item>
          <el-form-item label="学院名">
            <el-input v-model="formss.name" />
          </el-form-item>
        </div>


        <div style="display: flex;flex-direction: column-reverse">
          <el-button type="primary" v-if="addoredit==='add'" @click="add">添加学院</el-button>
          <el-button type="primary" v-else-if="addoredit==='edit'" @click="bianji">编辑学院</el-button>
        </div>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as Api from "@/api/login";
import {MessageBox} from "element-ui";
import { addCollege, updataCollege } from "@/api/login";

export default {
  name: "EditCollege",
  data(){
    return{
      tableData:[],
      formss:{
        id:undefined,
        name:"",
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
      let data = {}
      data = this.formss
      const res = await updataCollege(data)
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
      const res = await addCollege(data)
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
      this.dialog = false
    },
    async init() {
      const data = await Api.CollegeList()
      this.tableData = data.data;
    },
    addCollegetype(){
      //增加学院
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
          const res = await Api.deleteCollegeById(scope.row.id)
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
