import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import CreateMock from '../pages/createmock/index.vue'
import SelectModel from '../pages/selectmock/app.vue'
import SelectBuild  from '../pages/selectbuild/Index.vue'
import SelectUpload from '../pages/selectupload/Index.vue'
export default [{
    path: '/createMock',
    component: CreateMock,
},{
    path: '/selectmock',
    component: SelectModel,
},{
    path: '/selectbuild',
    component: SelectBuild,
},{
    path: '/selectupload',
    component: SelectUpload,
}]
