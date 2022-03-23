import Vue from "vue";
import Router from '../router/index'
import store from '../store/index';

/**
 * 封装element弹窗dialog
 * @param component 需要弹出的组件
 * @param dialogOptions dialog的参数
 * @param componentProps 组件传递的参数
 * @returns {Promise<unknown>}
 */
export function toolDialog(component, dialogOptions = null, componentProps = null) {
    return new Promise((resolve, reject) => {
        let options = Object.assign({
            // 接收的参数
            title: '',
            width: '50%',
            customClass:'',
            btnClose:true,
            top: '5vh',
        }, dialogOptions)
        let componentOptionHtml = '';
        if (componentProps && typeof componentProps === "object") {
            for (let key in componentProps) {
                componentOptionHtml += `:${key}="${key}" `
            }
        }
        let template = `<el-dialog :title="options.title" :class="options.class" :width="options.width" :top="options.top" 
                        :visible.sync="dialogVisible" :close-on-click-modal="false" @closed="closed()" 
                        :show-close="options.btnClose" :custom-class="options.customClass" :modal-append-to-body="false" 
                        :before-close="options.beforeClose">
                        <dialog-content @submit="submit" @close-dialog="closed" ${componentOptionHtml}></dialog-content>
                        </el-dialog>`
        let DialogConstructor = Vue.extend({
            Router,
            store,
            data() {
                return {
                    dialogVisible: true,
                    options,
                    ...componentProps
                }
            },
            template: template,
            components: {
                dialogContent: component
            },
            watch:{
                $route(){
                    this.dialogVisible = false
                }
            },
            methods: {
                closed() {
                    this.$nextTick(() => {
                        this.$destroy();
                        document.body.removeChild(this.$el)
                    })
                },
                submit(result) {
                    this.dialogVisible = false
                    resolve(result)
                }
            }
        })
        let instance = new DialogConstructor({
            el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
        Vue.nextTick(() => {
            instance.visible = true;
        });
    })
}
