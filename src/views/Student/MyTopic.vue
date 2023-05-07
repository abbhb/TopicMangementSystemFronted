<template>
  <div>
    <div class="tableBar">
      <el-input
        v-model="input"
        placeholder="请输入题目昵称"
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
          @click="addTopictype()"
        >
          + 增加题目
        </el-button>
      </div>
      <div>
        注意：只有组长能编辑或删除
      </div>
    </div>
    <el-table :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}" tooltip-effect="dark" :data="tableData" style="width: 100%" max-height="530">
      <el-table-column fixed prop="id" label="题目ID" width="100" />
      <el-table-column prop="title" label="题目名" width="120" />
      <el-table-column prop="teacherName" label="指导教师名" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag v-if="String(scope.row.status)==='0'">未申报状态（草稿）</el-tag>
          <el-tag v-else-if="String(scope.row.status)==='1'">待审核</el-tag>
          <el-tag v-else-if="String(scope.row.status)==='2'">审核通过</el-tag>
          <el-tag v-else-if="String(scope.row.status)==='3'">结题状态</el-tag>
          <el-tag v-else-if="String(scope.row.status)==='4'">驳回状态</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="topicStudents" label="队员" width="500">
        <template #default="scope">
          <duiyuan :tables="scope.row.topicStudents"></duiyuan>
        </template>
      </el-table-column>
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
               :title="addoredit==='add'?'添加':'编辑'+'题目'"
               :close-on-click-modal="false"
               :close-on-press-escape="false"


    >
      <el-form :model="formss" label-width="120px">
        <div class="formitem">
          <el-form-item v-if="!addoredit==='add'" label="编号">
            <el-input v-model="formss.id" :disabled="true" />
          </el-form-item>
          <el-form-item label="题目名">
            <el-input v-model="formss.title" />
          </el-form-item>
        </div>
        <div class="formitem">
          <el-form-item label="指导老师">
            <el-select v-model="formss.teacher" placeholder="请选择指导老师">
              <el-option
                v-for="item in teacherList"
                :key="item.name"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button @click="addDomain">新增组员</el-button>


        </div>
        <div class="formitem">
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'组员' + (index + 1) + '-ID:'"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
      required: true, message: '组员ID不能为空', trigger: 'blur'
    }"
          >
            <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>

        </div>
        <div style="display: flex;flex-direction: column-reverse">
          <el-button type="primary" v-if="addoredit==='add'" @click="add">添加题目</el-button>
          <el-button type="primary" v-else-if="addoredit==='edit'" @click="bianji">编辑题目</el-button>
        </div>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as Api from "@/api/login";
import {MessageBox} from "element-ui";
import { addTopic, updataTopic } from "@/api/login";
import Duiyuan from "@/components/duiyuan.vue";

export default {
  name: "MyTopic",
  components: { Duiyuan },
  data(){
    return{
      tableData:[],
      dynamicValidateForm: {
        domains: [{
          value: ''
        }]
      },
      formss:{
        id:undefined,
        title:"",
        topicStudents:[],
        teacher:undefined,
      },
      addoredit:'add',
      dialog:false,
      userInfo:{},
      teacherList:[],
    };
  },

  async created() {
    if (localStorage.getItem('userInfo')){
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
    this.init()

  },
  methods:{
    async getTeacherList() {
      const res = await Api.listTeahcer()
      if (String(res.code) === '1') {
        this.teacherList = res.data
      }else {
        this.$message.error(res.msg)
      }
    },
    async bianji() {
      let data = {}
      this.formss.topicStudents = []
      this.formss.topicStudents.push({"studentId":this.userInfo.id,"isTeamEader":1})
      for(let i=0;i<this.dynamicValidateForm.domains.length;i++){
        this.formss.topicStudents.push({"studentId":this.dynamicValidateForm.domains[i].value,"isTeamEader":0})
      }
      data = this.formss
      const res = await updataTopic(data)
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
      this.formss.topicStudents = []
      this.formss.topicStudents.push({"studentId":this.userInfo.id,"isTeamEader":1})
      for(let i=0;i<this.dynamicValidateForm.domains.length;i++){
        this.formss.topicStudents.push({"studentId":this.dynamicValidateForm.domains[i].value,"isTeamEader":0})
      }
      data = this.formss
      const res = await addTopic(data)
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
      this.formss.teacher = undefined
      this.formss.title = ""
      this.formss.topicStudents = []
      this.dialog = false
    },
    async init() {
      this.getTeacherList()

      const data = await Api.TopicList()
      this.tableData = data.data;
    },
    getIs(val){
      for (let i = 0; i < val.lenght; i++) {
        console.log(val[i])
        if (String(val[i].studentId)===String(this.userInfo.id)){
          if (String(val[i].isTeamEader)==='1'){
            return true;
          }
        }
      }
      return false;
    },
    addTopictype(){
      //增加题目
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
          const res = await Api.deleteTopicById(scope.row.id)
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
      this.formss.teacher = scope.row.teacher
      this.formss.title = scope.row.title
      this.formss.topicStudents = scope.row.topicStudents

      this.dynamicValidateForm.domains = []


      for (let i = 0; i < scope.row.topicStudents.length; i++) {
        if (String(scope.row.topicStudents[i].studentId)===String(this.userInfo.id)){
          continue
        }
        this.dynamicValidateForm.domains.push({"value":scope.row.topicStudents[i].studentId})

      }
      this.dialog = true
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
    },

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
    flex-flow: wrap;
}
</style>
