
export const menuDataAdmin = [
    // 有子菜单 字菜单不分组的
    {
        optionName: "我的主页",
        iconClassName: "el-icon-setting",
        index: '1',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '个人信息',
                index: '1-1',
                routerName: "UserInfoForAdmin"
            },
            {
                optionName: '修改密码',
                index: '1-4',
                routerName: "ChangePasswordForAdmin"
            }
        ]
    },
    {
        optionName: "课题管理",
        iconClassName: "el-icon-setting",
        index: '2',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '课题管理',
                index: '2-1',
                routerName: "Topic"
            },

        ]
    },
    {
        optionName: "用户管理",
        iconClassName: "el-icon-setting",
        index: '3',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '管理用户',
                index: '3-1',
                routerName: "EditUser"
            },

        ]
    },
    {
        optionName: "院系管理",
        iconClassName: "el-icon-setting",
        index: '4',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '学院管理',
                index: '4-1',
                routerName: "EditCollege"
            },{
                optionName: '专业管理',
                index: '4-2',
                routerName: "EditMajor"
            },

        ]
    }
    
]


export const menuDataTeacher = [
    // 有子菜单 字菜单不分组的
    {
        optionName: "我的主页",
        iconClassName: "el-icon-setting",
        index: '1',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '个人信息',
                index: '1-1',
                routerName: "UserInfoForAdmin"
            },
            {
                optionName: '修改密码',
                index: '1-4',
                routerName: "ChangePasswordForAdmin"
            }
        ]
    },
    {
        optionName: "课题管理",
        iconClassName: "el-icon-setting",
        index: '2',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '审题',
                index: '2-1',
                routerName: "TopicT"
            }
        ]
    }

]



export const menuDataStudent = [
    // 有子菜单 字菜单不分组的
    {
        optionName: "我的主页",
        iconClassName: "el-icon-setting",
        index: '1',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '个人信息',
                index: '1-1',
                routerName: "UserInfoForAdmin"
            },
            {
                optionName: '修改密码',
                index: '1-4',
                routerName: "ChangePasswordForAdmin"
            }
        ]
    },
    {
        optionName: "课题管理",
        iconClassName: "el-icon-setting",
        index: '2',
        disabled: false, // 是否禁用
        childList: [
            {
                optionName: '我的题目',
                index: '2-1',
                routerName: "MyTopic"
            }
        ]
    }

]

// export default {menuData}




/* 菜单配置 描述 */
export const menuData描述 = [
    // 有子菜单 并且字菜单分组的
    {
        optionName: "导航一", // 一级菜单名
        iconClassName: "aaa", // element-ui图标名
        index: '1', // 唯一标志
        childList: [ // 分组的
            {
                groupName: '组名一',
                index: '1-1-1',
                list: [
                    {
                        optionName: '选项1',
                        routerName: "home"
                    },
                    {}
                ],
            },
            {
                groupName: '组名二',
                index: '1-1-2',
                list: [
                    {
                        optionName: '选项1',
                        routerName: "home"
                    },
                    {}
                ],
            }
        ],
    },
    // 有子菜单 字菜单不分组的
    {
        optionName: "导航二",
        iconClassName: "el-icon-menu",
        index: '2',
        disabled: false, // 是否禁用
        childList: [ // 不分组的
            {
                optionName: '选项1',
                index: '2-1',
                routerName: "home"
            },
            {}
        ]
    },
    // 无子菜单的
    {
        optionName: "导航三",
        iconClassName: "el-icon-document",
        routerName: "home",
        index: '3',
        disabled: false
    },
    
    "导航四"
]

