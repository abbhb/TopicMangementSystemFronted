import request from '../http/request';

export function login(username,password){
    return request({
        url:'/user/login',
        method:'post',
        data:{
            username:username,
            password:password
        }
    });
}
export function checkToken(){
    return request({
        url:'/user/loginbytgc',
        method:'post'
    });
}
export function loginOut(){
    return request({
        url:'/user/logout',
        method:'post',
    });
}
export function addUser(data){
    return request({
        url:'/user/addUser',
        method:'post',
        data
    });
}
export function addCollege(data){
    return request({
        url:'/college/add',
        method:'post',
        data
    });
}
export function addTopic(data){
    return request({
        url:'/topic/add',
        method:'post',
        data
    });
}
export function addMajor(data){
    return request({
        url:'/major/add',
        method:'post',
        data
    });
}

export function updataUser(data){
    return request({
        url:'/user/updataUser',
        method:'put',
        data
    });
}
export function updataCollege(data){
    return request({
        url:'/college/updata',
        method:'put',
        data
    });
}
export function updataMajor(data){
    return request({
        url:'/major/updata',
        method:'put',
        data
    });
}
export function updataTopic(data){
    return request({
        url:'/topic/updataSelf',
        method:'put',
        data
    });
}
export function userList(pageNum,pageSize){
    return request({
        url:'/user/list',
        method:'get',
        params:{
            pageNums:pageNum,
            pageSize:pageSize
        }
    });
}
export function listTeahcer(){
    return request({
        url:'/user/listTeahcer',
        method:'get',
    });
}
export function TopicList(){
    return request({
        url:'/topic/selfList',
        method:'get',
    });
}
export function TopicTList(){
    return request({
        url:'/topic/selfTeacher',
        method:'get',
    });
}
export function TopicAdminList(){
    return request({
        url:'/topic/admin',
        method:'get',
    });
}
export function CollegeById(id){
    return request({
        url:'/college/id',
        method:'get',
        params:{
            id:id
        }
    });
}
export function CollegeIdById(id){
    return request({
        url:'/major/collegeByMajorId',
        method:'get',
        params:{
            id:id
        }
    });
}
export function listWithCollege(){
    return request({
        url:'/major/listWithCollege',
        method:'get',
    });
}
export function CollegeList(){
    return request({
        url:'/college/list',
        method:'get',
    });
}
export function MajorList(){
    return request({
        url:'/major/list',
        method:'get',
    });
}
export function updataforuser(name,age,gender,email){
    return request({
        url:'/updataforuser',
        method:'post',
        data:{
            name:name,
            age:age,
            gender:gender,
            email:email
        }
    });
}
export function getAllCourseInfo(z,banji){
    return request({
        url:'/course/courseinfo',
        method:'post',
        data:{
            banji:banji,
            z:z,//周
        }
    });
}
export function getAllStudentCourseInfo(z,id){
    return request({
        url:'/course/student/courseinfo',
        method:'post',
        data:{
            z:z,
            id:id,//周
        }
    });
}

export function getAllCourseInfoThisWeek(klassId){
    return request({
        url:'/course/thisweekcourseinfo',
        method:'get',
        params:{
            klassId:klassId
        }
    });
}

export function getStudentAllCourseInfoThisWeek(sid){
    return request({
        url:'/course/student/thisweekcourseinfo',
        method:'get',
        params:{
            sid:sid
        }
    });
}

export function deleteUserById(id){
    return request({
        url:'/user/delete',
        method:'delete',
        data:{
            id:id
        }
    });
}
export function deleteTopicById(id){
    return request({
        url:'/topic/deleteSelf',
        method:'delete',
        data:{
            id:id
        }
    });
}
export function deleteCollegeById(id){
    return request({
        url:'/college/delete',
        method:'delete',
        data:{
            id:id
        }
    });
}
export function deleteMajorById(id){
    return request({
        url:'/major/delete',
        method:'delete',
        data:{
            id:id
        }
    });
}
export function updataUserSelf(data){
    return request({
        url:'/user/self',
        method:'put',
        data
    });
}
export function teaherUpdata(data){
    return request({
        url:'/topic/teaherUpdata',
        method:'put',
        data
    });
}

export function getMaxWeek(klassid){
    return request({
        url:'/course/courseinfo/maxweek',
        method:'post',
        data:{
            classid:klassid
        }
    });
}

export function getStudentMaxWeek(sid){
    return request({
        url:'/course/student/courseinfo/maxweek',
        method:'post',
        data:{
            sid:sid
        }
    });
}

export function getTeacherByCourseId(id){
    return request({
        url:'/teacher/getcourseteacher',
        method:'get',
        params:{
            courseId:id,
        }
    });
}
export function getCascaderList(){
    return request({
        url:'/course/getcascaderlist',
        method:'get',
        params:{
        }
    });
}
export function getClassListByTid(tid){
    return request({
        url:'course/getclasslistbytid',
        method:'get',
        params:{
            tid:tid
        }
    });
}

export function changePassWord(password,newpassword,checknewpassword){
    return request({
        url:'/user/changePassword',
        method:'put',
        data:{
            password:password,
            newpassword:newpassword,
            checkpassword:checknewpassword
        }
    });
}