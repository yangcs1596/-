<template>
  <form-create v-model="fApi" :rule="rule"  ></form-create>
</template>

<script>


  export default {
    name: 'CreateTest',
    data () {
      return {
        //实例对象
        fApi: {},
        //表单生成规则
        rule:[{
          type:"input",
          title:"商品名称",
          field:"goods_name",
          value:"iphone 7",
          props: {
            "type": "text",
          },
          validate:[
            { required: true, message: '请输入goods_name', trigger: 'blur' },
          ],
        },
          {
            type: "upload",
            field: "pic",
            title: "轮播图",
            value: [
              'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg',
              'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg'
            ],
            props: {
              "type":"select",
              "uploadType":"image",
              "action": "/upload.php",
              "name":"pic",
              "multiple": true,
              "accept":"image\/*",
              "format":["jpg","jpeg","png","gif"],
              // "maxSize": ,
              // "maxLength":5,
              "onSuccess":function (res) {
                return 'http://img1.touxiang.cn/uploads/20131030/30-075657_191.jpg';
              }
            },
            validate:[
              {required:true, type: 'array', min: 2, message: '请选择2张图片', trigger: 'change'}
            ],
          }
        ],
        //组件参数配置
      };
    }
  };
</script>
