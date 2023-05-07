<template>
  <div>

    <el-table tooltip-effect="dark" :data="tableData" style="width: 100%" max-height="530">
      <el-table-column fixed prop="id" label="题目ID" width="100" />
      <el-table-column prop="title" label="题目名" width="120" />

      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag v-if="String(scope.row.status)==='0'">未申报状态（草稿）</el-tag>
          <el-tag v-else-if="String(scope.row.status)==='1'">待审核</el-tag>
          <el-tag v-else-if="String(scope.row.status)==='2'">审核通过</el-tag>
          <el-tag v-else-if="String(scope.row.status)==='3'">结题状态</el-tag>
          <el-tag v-else-if="String(scope.row.status)==='4'">驳回状态</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="teacherName" label="指导老师姓名" width="120"/>
      <el-table-column prop="topicStudents" label="队员" width="500">
        <template #default="scope">
          <duiyuan :tables="scope.row.topicStudents"></duiyuan>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as Api from "@/api/login";
import {MessageBox} from "element-ui";
import Duiyuan from "@/components/duiyuan.vue";


export default {
  name: "Topic",
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


    cleanForm(){
      this.formss.id = undefined
      this.formss.teacher = undefined
      this.formss.title = ""
      this.formss.topicStudents = []
      this.dialog = false
    },
    async init() {

      const data = await Api.TopicAdminList()
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
    addTopicTtype(){
      //增加题目
      this.addoredit = 'add'
      this.dialog = true
    },
    deleteRow(scope) {
      MessageBox.confirm(
        '你将驳回这一项,确认要继续吗?',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          let data = {}
          data.id = scope.row.id
          data.status = 4
          const res = await Api.teaherUpdata(data)
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
    jieti(scope) {
      MessageBox.confirm(
        '你将结题这一项,确认要继续吗?',
        '警告',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(async () => {
          let data = {}
          data.id = scope.row.id
          data.status = 3
          const res = await Api.teaherUpdata(data)
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
      let data = {}
      data.id = scope.row.id
      data.status = 2
      const res = await Api.teaherUpdata(data)
      if (String(res.code)==='1'){
        this.$message.success(res.msg)
        this.init()
      }else {
        this.$message.error(res.msg)
      }
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
