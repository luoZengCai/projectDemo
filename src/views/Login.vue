<template>
    <div>
        <p>login</p>
        <cube-form :model='model'
            :schema='schema'
            @submit="handleSubmit"
            @validate='handleValidate'></cube-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model: {
                    username: '',
                    password: '',
                },
                schema: {
                    fields: [
                        {
                            type: 'input',
                            modelKey: 'username',
                            label: '用户名',
                            props: {
                                placeholder: '请输入用户名'
                            },
                            rules: {
                                required: true
                            },
                            trigger: 'blur',
                            message: {
                                required: '用户名为必填项'
                            }
                        },
                        {
                            type: 'input',
                            modelKey: 'password',
                            label: '用户密码',
                            props: {
                                placeholder: '请输入用户密码',
                                type: 'password',
                                eye: {open: false}
                            },
                            rules: {
                                required: true
                            },
                            trigger: 'blur',
                            message: {
                                required: '用户密码为必填项'
                            }
                        },
                        {
                            type: 'submit',
                            label: '登陆'
                        }
                    ]
                }
            }
        },
        methods: {
            async handleSubmit(e) {
                e.preventDefault()
                console.log('登陆')
                
                const res = await this.$http.get('/api/login',{params:{
                    username: this.model.username,
                    password: this.model.password
                }})

                const {code,token,message} = res.data
                if (code == 0) {
                    localStorage.setItem('token',token)
                    this.$store.commit('setToken',token)
                    const {redirect} = this.$route.query
                    this.$router.push(redirect || '/')
                } else {
                    alert('登陆失败')
                    const toast = this.$createToast({
                        time: 2000,
                        txt: message || '登陆失败',
                        type: 'error'
                    })
                    toast.show()
                }
            },
            handleValidate(ret) {
                console.log(ret)
            },
        },
    }
</script>

<style scoped>

</style>