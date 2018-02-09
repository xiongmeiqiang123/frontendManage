import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import CreateMock from '../pages/createmock/index.vue'
import SelectMock from '../pages/selectmock/app.vue'
import SelectBuild  from '../pages/selectbuild/Index.vue'
import SelectUpload from '../pages/selectupload/Index.vue'
import GitProjects from '../pages/gitProjects/Index.vue'

export default [{
    path: '/createMock',
    component: CreateMock,
},{
    path: '/selectmock',
    component: SelectMock,
},{
    path: '/selectbuild',
    component: SelectBuild,
},{
    path: '/selectupload',
    component: SelectUpload,
},{
    path: '/gitProjects',
    component: GitProjects,
}]
